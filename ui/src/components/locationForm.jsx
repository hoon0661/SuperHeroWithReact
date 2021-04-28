import React, { Component } from "react";

class LocationForm extends Component {
  state = {
    data: {
      city: "",
      latitude: "",
      longitude: "",
      description: "",
    },
    error: {},
  };
  render() {
    return (
      <div>
        <h1>Location Form</h1>
      </div>
    );
  }
}

export default LocationForm;
