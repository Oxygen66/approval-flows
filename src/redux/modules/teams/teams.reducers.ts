import { Reducer } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_REQUESTED,
  TeamsActionTypes,
  TeamsStateType,
} from "./teams.types";
import api from "../../../services/api";
import { TeamsOutput } from "../../../services/api/teams/teams.dto";
import { getAllTeamsRequested } from "./teams.actions";

const initialState: TeamsStateType = {
  teams: [],
  isLoading: false,
};

export const teamsReducer: Reducer<TeamsStateType, TeamsActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_TEAMS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ALL_TEAMS_REQUESTED: {
      return {
        ...state,
        isLoading: false,
        teams: [...action.payload.teams],
      };
    }
    default: {
      return state;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getAllTeamsSaga() {
  const { data }: AxiosResponse<TeamsOutput> = yield call(
    api.Teams.getAllTeams
  );
  yield put(getAllTeamsRequested(data));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* saga() {
  yield takeLatest(GET_ALL_TEAMS, getAllTeamsSaga);
}
