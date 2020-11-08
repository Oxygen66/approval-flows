import React, { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ApprovalSchemeEditPage from "./pages/ApprovalSchemeEditPage";

function ApprovalSchemesModule(): ReactElement {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/:teamId`}>
        <ApprovalSchemeEditPage />
      </Route>
    </Switch>
  );
}

export default ApprovalSchemesModule;
