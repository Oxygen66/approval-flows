import {
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_REQUESTED,
  TeamsActionTypes,
} from "./teams.types";
import { TeamsOutput } from "../../../services/api/teams/teams.dto";

export function getAllTeams(): TeamsActionTypes {
  return {
    type: GET_ALL_TEAMS,
  };
}

export function getAllTeamsRequested(teams: TeamsOutput): TeamsActionTypes {
  return {
    type: GET_ALL_TEAMS_REQUESTED,
    payload: { teams },
  };
}
