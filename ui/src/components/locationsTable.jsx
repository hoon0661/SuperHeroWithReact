import React, { Component } from "react";
import Table from "./common/table";

class LocationsTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "city", label: "City" },
    { path: "latitude", label: "Latitude" },
    { path: "longitude", label: "Longitude" },
    { path: "description", label: "Description" },
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
