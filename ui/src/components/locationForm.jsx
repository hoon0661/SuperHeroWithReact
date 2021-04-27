import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getLocationById } from "../services/locationService";

class LocationForm extends Form {
  state = {
    data: {
      city: "",
      latitude: "",
      longitutde: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    city: Joi.string().required.label("City"),
    latitude: Joi.string().required.label("Latitude"),
    longitude: Joi.string().required.label("Longitude"),
    description: Joi.string().required.label("description"),
  };

  async populateLocation() {
    try {
      const locationId = this.props.match.params.id;
      if (locationId === "new") return;
      const { data: location } = await getLocationById(locationId);
      this.setState({ data: this.mapToViewModel(location) });
    } catch (e) {
      if (e.response && e.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateLocation();
  }

  mapToViewModel(location) {
    return {
      id: location.id,
      city: location.city,
      latitude: location.latitude,
      longitude: location.longitude,
      description: location.description,
    };
  }

  render() {
    return (
      <div>
        <h1>Location Form</h1>
      </div>
    );
  }
}

export default LocationForm;
