import React from "react";
import { useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import { RootState } from "../../../../redux/rootReducer";
import "./index.scss";

function TeamsPage(): JSX.Element | null {
  const { teams, isLoading } = useSelector((state: RootState) => state.teams);

  if (isLoading) {
    return null;
  }

  return (
    <Container id="teams">
      <div className="row pt-3">
        {teams.map((team) => (
          <div key={team.id} className="col-12 team">
            <Card>
              <Card.Header>{team.name}</Card.Header>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default TeamsPage;
