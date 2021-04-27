import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Locations from "./components/locations";

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
            <Route path="/locations" component={Locations} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
