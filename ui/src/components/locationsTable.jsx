import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class LocationsTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "city", label: "City" },
    { path: "latitude", label: "Latitude" },
    { path: "longitude", label: "Longitude" },
    { path: "description", label: "Description" },
    {
      key: "edit",
      content: (location) => (
        <Link
          to={`/locations/${location.id}`}
          className="btn btn-success btn-sm"
        >
          Edit
        </Link>
      ),
    },
    {
      key: "delete",
      content: (location) => (
        <button
          onClick={() => this.props.onDelete(location)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { locations, onSort, sortColumn } = this.props;
    return (
      <Table
        data={locations}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default LocationsTable;
