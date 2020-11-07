import {
  GET_ALL_USERS_REQUESTED,
  GET_ALL_USERS,
  UsersActionTypes,
} from "./users.types";
import { UsersOutput } from "../../../services/api/users/users.dto";

export function getAllUsers(): UsersActionTypes {
  return {
    type: GET_ALL_USERS,
  };
}

export function getAllUsersRequested(users: UsersOutput): UsersActionTypes {
  return {
    type: GET_ALL_USERS_REQUESTED,
    payload: { users },
  };
}
