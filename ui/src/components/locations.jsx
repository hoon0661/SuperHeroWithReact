import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getLocations, deleteLocation } from "../services/locationService";
import Pagination from "./common/pagination";
import LocationsTable from "./locationsTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Locations extends Component {
  state = {
    locations: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { selectedColumn: "id", order: "asc" },
  };

  async componentDidMount() {
    const { data: locations } = await getLocations();
    this.setState({ locations });
  }

  handleDelete = async (location) => {
    const originalLocations = this.state.locations;
    const locations = originalLocations.filter(
      (item) => item.id !== location.id
    );
    this.setState({ locations });
    try {
      await deleteLocation(location.id);
    } catch {
      this.setState({ locations: originalLocations });
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
      locations: allLocations,
      sortColumn,
    } = this.state;

    const sorted = _.orderBy(
      allLocations,
      [sortColumn.selectedColumn],
      [sortColumn.order]
    );

    const locations = paginate(sorted, currentPage, pageSize);

    return { data: locations };
  };

  render() {
    const { length: count } = this.state.locations;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const { data: locations } = this.getPagedData();

    return (
      <React.Fragment>
        <Link to="/locations/new" className="btn btn-success">
          New
        </Link>
        <p>Showing {count} locations in the database.</p>
        <LocationsTable
          locations={locations}
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

export default Locations;
