import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TeamsModule from "./modules/Teams";

function Routes(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from="/" to="/teams" />
      <Route path="/teams" component={TeamsModule} />
      <Redirect to="/teams" />
    </Switch>
  );
}

export default Routes;
