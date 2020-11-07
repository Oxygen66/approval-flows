import { getAllTeams, getAllTeamsRequested } from "./teams.actions";
import {
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_REQUESTED,
  GetAllTeamsAction,
  GetAllTeamsRequestedAction,
} from "./teams.types";
import { TeamsOutput } from "../../../services/api/teams/teams.dto";

describe("Teams actions", () => {
  it("should create an action for request all teams", () => {
    const expectedAction: GetAllTeamsAction = {
      type: GET_ALL_TEAMS,
    };
    expect(getAllTeams()).toEqual(expectedAction);
  });

  it("should create an action for save teams", () => {
    const teams: TeamsOutput = [
      {
        id: "Team 1",
        name: "Team 1",
        users: [],
      },
    ];
    const expectedAction: GetAllTeamsRequestedAction = {
      type: GET_ALL_TEAMS_REQUESTED,
      payload: {
        teams: [...teams],
      },
    };
    expect(getAllTeamsRequested(teams)).toEqual(expectedAction);
  });
});
