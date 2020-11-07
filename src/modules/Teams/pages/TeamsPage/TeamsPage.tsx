import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { RootState } from "../../../../redux/rootReducer";
import "./index.scss";
import Team from "../../components/team";

function TeamsPage(): JSX.Element | null {
  const { teams } = useSelector((state: RootState) => state.teams);

  return (
    <Container id="teams">
      <div className="row pt-3">
        {teams.map((team) => (
          <div key={team.id} className="col-12 team">
            <Team name={team.name} userIds={team.users} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default TeamsPage;
