import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Superhero Sighting
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/sightings">
            Sightings
          </NavLink>
          <NavLink className="nav-item nav-link" to="/heroes">
            heroes
          </NavLink>
          <NavLink className="nav-item nav-link" to="/locations">
            Locations
          </NavLink>
          <NavLink className="nav-item nav-link" to="/organizations">
            Organizations
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
