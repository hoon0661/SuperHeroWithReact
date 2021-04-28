import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSightings, deleteSighting } from "../services/sightingService";
import Pagination from "./common/pagination";
import SightingsTable from "./sightingsTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Sightings extends Component {
  state = {
    sightings: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { selectedColumn: "id", order: "asc" },
  };

  async componentDidMount() {
    const { data: sightings } = await getSightings();
    this.setState({ sightings });
  }

  handleDelete = async (sighting) => {
    const originalSightings = this.state.sightings;
    const sightings = originalSightings.filter(
      (item) => item.id !== sightings.id
    );
    this.setState({ sightings });
    try {
      await deleteSighting(sighting.id);
    } catch {
      this.setState({ sightings: originalSightings });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sightings: allSightings,
      sortColumn,
    } = this.state;

    const sorted = _.orderBy(
      allSightings,
      [sortColumn.selectedColumn],
      [sortColumn.order]
    );

    const sightings = paginate(sorted, currentPage, pageSize);

    return { data: sightings };
  };

  render() {
    const { length: count } = this.state.sightings;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) {
      return <p>There are no sighting in the database.</p>;
    }

    const { data: sightings } = this.getPagedData();

    return (
      <React.Fragment>
        <Link to="/sightings/new" className="btn btn-success">
          New
        </Link>
        <p>Showing {count} sightings in the database.</p>
        <SightingsTable
          sightings={sightings}
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

export default Sightings;
