import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import * as teams from "./modules/teams/teams.reducers";
import * as users from "./modules/users/users.reducers";
import * as approvalSchemes from "./modules/approval-schemes/approval-schemes.reducers";

export const rootReducers = combineReducers({
  teams: teams.teamsReducer,
  users: users.usersReducer,
  approvalSchemes: approvalSchemes.persistApprovalSchemesReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* rootSaga() {
  yield all([teams.saga(), users.saga(), approvalSchemes.saga()]);
}
