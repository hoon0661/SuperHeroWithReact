import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getHeroById, saveHero } from "../services/heroService";
import {
  getOrganizations,
  getOrganizationById,
} from "../services/organizationService";

class HeroForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      superpower: "",
      organizations: [],
      herotype: "",
      imgurl: "",
    },
    organizations: [],
    herotypes: ["Super Hero", "Super Villain"],
    errors: {},
  };

  schema = {
    id: Joi.string(),
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    superpower: Joi.string().required().label("Super Power"),
    herotype: Joi.string().required().label("Hero Type"),
    // organizations: Joi.array()
    //   .items(Joi.string().label("Organization"))
    //   .required(),
    organizations: Joi.string().required(),
    imgurl: Joi.string().label("Image URL"),
  };

  async componentDidMount() {
    await this.populateHero();
    await this.populateOrganizations();
  }

  async populateHero() {
    try {
      const heroId = this.props.match.params.id;
      if (heroId === "new") return;

      const { data: hero } = await getHeroById(heroId);
      this.setState({ data: this.mapToViewModel(hero) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async populateOrganizations() {
    const { data: organizations } = await getOrganizations();
    this.setState({ organizations });
  }

  mapToViewModel(hero) {
    return {
      id: hero.id.toString(),
      name: hero.name,
      description: hero.description,
      superpower: hero.superpower,
      herotype: hero.herotype,
      imgurl: hero.imgurl,
      organizations: hero.organizations.map((organization) => {
        return organization;
      }),
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    const organizations = this.state.data.organizations.map(
      (organizationId) => {
        return getOrganizationById(organizationId);
      }
    );
    console.log(organizations);
    data.organizations = organizations;
    this.setState({ data });
    await saveHero(this.state.data);
    this.props.history.push("/heros");
  };

  render() {
    return (
      <div>
        <h1>Hero Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("superpower", "Super Power")}
          {/* {this.renderInput("herotype", "Hero Type")} */}
          {/* {this.renderSelect("herotype", "Hero Type", this.state.herotypes)} */}
          {this.renderInput("description", "Description")}
          {this.renderInput("imgurl", "Image URL (Optional)")}
          {this.renderSelect(
            "organizations",
            "Organization(s)",
            this.state.organizations
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default HeroForm;
