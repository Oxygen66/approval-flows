import {
  GET_ALL_USERS_REQUESTED,
  GET_ALL_USERS,
  UsersActionTypes,
} from "./users.types";
import { UsersOutput } from "../../../services/api/users/users.dto";
import { getAllUsers, getAllUsersRequested } from "./users.actions";

describe("Users actions", () => {
  it("should create an action for request all users", () => {
    const expectedAction: UsersActionTypes = {
      type: GET_ALL_USERS,
    };
    expect(getAllUsers()).toEqual(expectedAction);
  });

  it("should create an action save requested users", () => {
    const users: UsersOutput = [
      {
        id: "u1",
        email: "u1@gmail.com",
        first_name: "first_name 1",
        last_name: "last_name 1",
      },
      {
        id: "u2",
        email: "u2@gmail.com",
        first_name: "first_name 2",
        last_name: "last_name 2",
      },
    ];
    const expectedAction: UsersActionTypes = {
      type: GET_ALL_USERS_REQUESTED,
      payload: {
        users: [...users],
      },
    };
    expect(getAllUsersRequested(users)).toEqual(expectedAction);
  });
});
