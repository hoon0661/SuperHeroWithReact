import React, { Component } from "react";
import Table from "./common/table";

class SightingsTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "location", label: "Location" },
    { path: "hero", label: "Hero" },
    { path: "date", label: "Date" },
    {
      key: "delete",
      content: (sighting) => (
        <button
          onClick={() => this.props.onDelete(sighting)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { sightings, onSort, sortColumn } = this.props;
    return (
      <Table
        data={sightings}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default SightingsTable;
