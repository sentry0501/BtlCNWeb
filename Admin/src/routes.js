import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/App";

export default (
  <Router>
    <Switch>
      
      <Route  path="/admin/home/" component={props => <HomePage {...props}/>} />
      <Route exact path="/admin/" component={props => <LoginPage {...props}/>}/>
    </Switch>
  </Router>
);
