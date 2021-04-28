import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getOrganizations,
  deleteOrganization,
} from "../services/organizationService";
import Pagination from "./common/pagination";
import OrganizationsTable from "./organizationsTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Organizations extends Component {
  state = {
    organizations: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { selectedColumn: "id", order: "asc" },
  };

  async componentDidMount() {
    const { data: organizations } = await getOrganizations();
    this.setState({ organizations });
  }

  handleDelete = async (organization) => {
    const originalOrganizations = this.state.organizations;
    const organizations = originalOrganizations.filter(
      (item) => item.id !== organizations.id
    );
    this.setState({ organizations });
    try {
      await deleteOrganization(organization.id);
    } catch {
      this.setState({ organizations: originalOrganizations });
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
      organizations: allOrganizations,
      sortColumn,
    } = this.state;

    const sorted = _.orderBy(
      allOrganizations,
      [sortColumn.selectedColumn],
      [sortColumn.order]
    );

    const organizations = paginate(sorted, currentPage, pageSize);

    return { data: organizations };
  };

  render() {
    const { length: count } = this.state.organizations;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) {
      return <p>There are no organization in the database.</p>;
    }

    const { data: organizations } = this.getPagedData();

    return (
      <React.Fragment>
        <Link to="/organizations/new" className="btn btn-success">
          New
        </Link>
        <p>Showing {count} organizations in the database.</p>
        <OrganizationsTable
          organizations={organizations}
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

export default Organizations;
