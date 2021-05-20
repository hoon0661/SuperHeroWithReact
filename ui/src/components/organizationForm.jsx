import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  getOrganizationById,
  saveOrganization,
} from "../services/organizationService";

class OrganizationForm extends Form {
  state = {
    data: {
      city: "",
      description: "",
      name: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.string(),
    city: Joi.string().required().label("City"),
    description: Joi.string().label("Description"),
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("email"),
  };

  async componentDidMount() {
    await this.populateOrganization();
  }

  async populateOrganization() {
    try {
      const organizationId = this.props.match.params.id;
      if (organizationId === "new") return;

      const { data: organization } = await getOrganizationById(organizationId);
      this.setState({ data: this.mapToViewModel(organization) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel(organization) {
    return {
      id: organization.id.toString(),
      city: organization.city,
      description: organization.description,
      name: organization.name,
      email: organization.email,
    };
  }

  doSubmit = async () => {
    await saveOrganization(this.state.data);
    this.props.history.push("/organizations");
  };

  render() {
    return (
      <div>
        <h1>Organization Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("city", "City")}
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrganizationForm;
