import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as teams from "./modules/teams/teams.reducers";

export const rootReducers = combineReducers({
  teams: teams.teamsReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* rootSaga() {
  yield all([teams.saga()]);
}
