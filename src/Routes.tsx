import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TeamsModule from "./modules/Teams";
import ApprovalSchemesModule from "./modules/ApprovalSchemes";

function Routes(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from="/" to="/teams" />
      <Route path="/teams" component={TeamsModule} />
      <Route path="/approval-schemes" component={ApprovalSchemesModule} />
      <Redirect to="/teams" />
    </Switch>
  );
}

export default Routes;
