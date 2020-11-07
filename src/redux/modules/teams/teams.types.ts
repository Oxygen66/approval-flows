import { Action } from "redux";
import { TeamsOutput } from "../../../services/api/teams/teams.dto";

export const GET_ALL_TEAMS = "[Get all teams] Teams";
export const GET_ALL_TEAMS_REQUESTED = "[Get all teams requested] Teams";

export interface TeamsStateType {
  teams: TeamsOutput;
  isLoading: boolean;
}

export interface GetAllTeamsAction extends Action {
  type: typeof GET_ALL_TEAMS;
}

export interface GetAllTeamsRequestedAction extends Action {
  type: typeof GET_ALL_TEAMS_REQUESTED;
  payload: { teams: TeamsOutput };
}

export type TeamsActionTypes = GetAllTeamsAction | GetAllTeamsRequestedAction;
