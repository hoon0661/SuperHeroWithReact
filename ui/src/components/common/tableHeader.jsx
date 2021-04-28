import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (selectedColumn) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.selectedColumn === selectedColumn) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.selectedColumn = selectedColumn;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
