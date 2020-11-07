import { Reducer } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  GET_ALL_USERS_REQUESTED,
  GET_ALL_USERS,
  UsersActionTypes,
  UsersStateType,
} from "./users.types";
import api from "../../../services/api";
import { UsersOutput } from "../../../services/api/users/users.dto";
import { getAllUsersRequested } from "./users.actions";

const initialState: UsersStateType = {
  isLoading: false,
  users: [],
};

export const usersReducer: Reducer<UsersStateType, UsersActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ALL_USERS_REQUESTED: {
      return {
        ...state,
        isLoading: false,
        users: [...action.payload.users],
      };
    }
    default: {
      return state;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getAllUsersSaga() {
  const { data }: AxiosResponse<UsersOutput> = yield call(
    api.Users.getAllUsers
  );
  yield put(getAllUsersRequested(data));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* saga() {
  yield takeLatest(GET_ALL_USERS, getAllUsersSaga);
}
