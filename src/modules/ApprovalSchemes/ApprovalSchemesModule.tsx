import React, { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ApprovalSchemeEdit from "./pages/ApprovalSchemeEdit";

function ApprovalSchemesModule(): ReactElement {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:teamId`}>
        <ApprovalSchemeEdit />
      </Route>
    </Switch>
  );
}

export default ApprovalSchemesModule;
