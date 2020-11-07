import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/navbar";
import Routes from "./Routes";
import { getAllTeams } from "./redux/modules/teams/teams.actions";

function App(): JSX.Element {
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  return (
    <Router>
      <Container className="px-0" fluid>
        <NavBar />
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
