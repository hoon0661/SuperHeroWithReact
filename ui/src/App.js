import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Locations from "./components/locations";
// import LocationForm from "./components/locationForm";
import Organizations from "./components/organizations";
import Heroes from "./components/heroes";
import Sightings from "./components/sightings";
import HeroDetail from "./components/heroDetail";
import LocationDetail from "./components/locationDetail";
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
            <Route path="/locations/:id" component={LocationDetail} />
            <Route path="/heroes/:id" component={HeroDetail} />
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
