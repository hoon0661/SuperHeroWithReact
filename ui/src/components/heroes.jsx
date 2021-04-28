import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getHeroes, deleteHero } from "../services/heroService";
import Pagination from "./common/pagination";
import HeroesTable from "./heroesTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Heroes extends Component {
  state = {
    heroes: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { selectedColumn: "id", order: "asc" },
  };

  async componentDidMount() {
    const { data: heroes } = await getHeroes();
    this.setState({ heroes });
  }

  handleDelete = async (hero) => {
    const originalHeroes = this.state.heroes;
    const heroes = originalHeroes.filter((item) => item.id !== heroes.id);
    this.setState({ heroes });
    try {
      await deleteHero(hero.id);
    } catch {
      this.setState({ heroes: originalHeroes });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, heroes: allHeroes, sortColumn } = this.state;

    const sorted = _.orderBy(
      allHeroes,
      [sortColumn.selectedColumn],
      [sortColumn.order]
    );

    const heroes = paginate(sorted, currentPage, pageSize);

    return { data: heroes };
  };

  render() {
    const { length: count } = this.state.heroes;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) {
      return <p>There are no hero in the database.</p>;
    }

    const { data: heroes } = this.getPagedData();

    return (
      <React.Fragment>
        <Link to="/heroes/new" className="btn btn-success">
          New
        </Link>
        <p>Showing {count} heroes in the database.</p>
        <HeroesTable
          heroes={heroes}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Heroes;
