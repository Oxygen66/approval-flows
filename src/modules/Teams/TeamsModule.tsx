import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";

function TeamsModule(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <TeamsPage />
      </Route>
    </Switch>
  );
}

export default TeamsModule;
