import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Locations from "./components/locations";
// import LocationForm from "./components/locationForm";
import Organizations from "./components/organizations";
import Heroes from "./components/heroes";
import Sightings from "./components/sightings";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        {/* <NavBar user={user} /> */}
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/sightings" component={Sightings} />
            <Route path="/heroes" component={Heroes} />
            <Route path="/locations" component={Locations} />
            <Route path="/organizations" component={Organizations} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
