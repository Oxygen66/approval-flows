import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/navbar";
import Routes from "./Routes";
import { getAllTeams } from "./redux/modules/teams/teams.actions";
import { getAllUsers } from "./redux/modules/users/users.actions";
import { RootState } from "./redux/rootReducer";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const appLoading = useSelector(
    ({ users, teams }: RootState) => users.isLoading || teams.isLoading
  );

  // Effects
  useEffect(() => {
    dispatch(getAllTeams());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Router>
      <Container className="px-0" fluid>
        <NavBar />
        {!appLoading && <Routes />}
      </Container>
    </Router>
  );
}

export default App;
