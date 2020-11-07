import { Action } from "redux";
import { UsersOutput } from "../../../services/api/users/users.dto";

export const GET_ALL_USERS = "[Get all users] Users";
export const GET_ALL_USERS_REQUESTED = "[Get all users requested] Users";

export interface UsersStateType {
  isLoading: boolean;
  users: UsersOutput;
}

export interface GetAllUsersAction extends Action {
  type: typeof GET_ALL_USERS;
}

export interface GetAllUsersRequestedAction extends Action {
  type: typeof GET_ALL_USERS_REQUESTED;
  payload: { users: UsersOutput };
}

export type UsersActionTypes = GetAllUsersAction | GetAllUsersRequestedAction;
