import React, { Component } from "react";
import axios from "axios";

class Locations extends Component {
  state = { locations: [] };
  async componentDidMount() {
    const url = "http://localhost:8080/api/location";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Locations;
