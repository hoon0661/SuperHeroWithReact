import React, { Component } from "react";
import Table from "./common/table";

class OrganizationsTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "name", label: "Name" },
    { path: "city", label: "City" },
    { path: "email", label: "Email" },
    { path: "description", label: "Description" },
    {
      key: "delete",
      content: (organization) => (
        <button
          onClick={() => this.props.onDelete(organization)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { organizations, onSort, sortColumn } = this.props;
    return (
      <Table
        data={organizations}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default OrganizationsTable;
