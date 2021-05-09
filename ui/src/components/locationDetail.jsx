import React from "react";
import LocationForm from "./locationForm";

const LocationDetail = ({ match, history }) => {
  return (
    <div>
      <h1>{match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/locations")}
      >
        Save
      </button>
    </div>
  );
};

export default LocationDetail;
