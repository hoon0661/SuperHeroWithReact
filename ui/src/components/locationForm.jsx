import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getLocationById, saveLocation } from "../services/locationService";

class LocationForm extends Form {
  state = {
    data: {
      city: "",
      description: "",
      latitude: "",
      longitude: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.string(),
    city: Joi.string().required().label("City"),
    description: Joi.string().label("Description"),
    latitude: Joi.string().required().label("Latitude"),
    longitude: Joi.string().required().label("Longitude"),
  };

  async componentDidMount() {
    const locationId = this.props.match.params.id;
    if (locationId === "new") {
      return;
    }

    const location = await getLocationById(locationId);
    this.setState({ data: this.mapToViewModel(location.data) });
  }

  mapToViewModel(location) {
    return {
      id: location.id,
      city: location.city,
      description: location.description,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  doSubmit = async () => {
    await saveLocation(this.state.data);
    this.props.history.push("/locations");
  };
  render() {
    return (
      <div>
        <h1>Location Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("city", "City")}
          {this.renderInput("latitude", "Latitude")}
          {this.renderInput("longitude", "Longitude")}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default LocationForm;
