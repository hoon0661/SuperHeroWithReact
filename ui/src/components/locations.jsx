import React, { Component } from "react";
import { getLocations, deleteLocation } from "../services/locationService";

class Locations extends Component {
  state = { locations: [] };

  async componentDidMount() {
    const { data: locations } = await getLocations();
    this.setState({ locations });
  }

  handleDelete = async (location) => {
    const originalLocations = this.state.locations;
    const locations = originalLocations.filter(
      (item) => item.id !== location.id
    );
    this.setState({ locations });
    try {
      await deleteLocation(location.id);
    } catch {
      this.setState({ locations: originalLocations });
    }
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.city}</td>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
              <td>{location.description}</td>
              <td>
                <button
                  onClick={() => this.handleDelete(location)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Locations;
