import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class HeroesTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "name", label: "Name" },
    { path: "superPower", label: "Super Power" },
    { path: "heroType", label: "Hero Type" },
    {
      key: "detail",
      content: (hero) => (
        <Link to={`/heroes/${hero.id}`} className="btn btn-success btn-sm">
          Detail
        </Link>
      ),
    },
    {
      key: "delete",
      content: (hero) => (
        <button
          onClick={() => this.props.onDelete(hero)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { heroes, onSort, sortColumn } = this.props;
    return (
      <Table
        data={heroes}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default HeroesTable;
