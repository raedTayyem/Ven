import React from "react";
import { Route, Switch } from "react-router-dom";
import "./style/global.scss";

import { NavBar } from "./cmps/NavBar";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { EventEdit } from "./pages/EventEdit";
import { EventDetails } from "./pages/EventDetails";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UserDetails } from "./pages/UserDetails";

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={EventEdit} path="/edit/:eventId?" />
          <Route exact component={EventDetails} path="/event/:eventId?" />
          <Route exact component={Events} path="/events/:search?" />
          <Route exact component={Login} path="/login" />
          <Route exact component={SignUp} path="/signup" />
          <Route exact component={UserDetails} path="/user/:userId" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
