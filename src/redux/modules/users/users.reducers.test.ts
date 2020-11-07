import { setupServer } from "msw/node";
import { rest } from "msw";
import { put, takeLatest } from "redux-saga/effects";
import { Action } from "redux";
import { runSaga } from "redux-saga";
import Config from "../../../config";
import { UsersOutput } from "../../../services/api/users/users.dto";
import {
  getAllUsersSaga,
  saga as userSaga,
  usersReducer,
} from "./users.reducers";
import {
  GET_ALL_USERS,
  GET_ALL_USERS_REQUESTED,
  GetAllUsersRequestedAction,
} from "./users.types";

const server = setupServer(
  rest.get(Config.API_URLS.USERS, (req, res, ctx) => {
    return res(
      ctx.json(<UsersOutput>[
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
        {
          id: "u3",
          email: "u3@gmail.com",
          first_name: "first_name 3",
          last_name: "last_name 3",
        },
        {
          id: "u4",
          email: "u4@gmail.com",
          first_name: "first_name 4",
          last_name: "last_name 4",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Users reducers", () => {
  it("should return the initial state", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(usersReducer(undefined, {})).toEqual({
      isLoading: false,
      users: [],
    });
  });

  it("should handle GET_ALL_USERS_USERS action", () => {
    expect(usersReducer(undefined, { type: GET_ALL_USERS })).toEqual(
      expect.objectContaining({ isLoading: true })
    );
  });

  it("should handle GET_ALL_USERS_REQUESTED_USERS action", () => {
    expect(
      usersReducer(
        { isLoading: true, users: [] },
        {
          type: GET_ALL_USERS_REQUESTED,
          payload: {
            users: [
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
            ],
          },
        }
      )
    ).toEqual({
      isLoading: false,
      users: [
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
      ],
    });
  });
});

describe("Users saga", () => {
  it("should dispatch getAllUsersSaga  when we dispatch GET_ALL_USERS_USERS", () => {
    const generator: Generator = userSaga();
    put({ type: GET_ALL_USERS });
    const actual = generator.next();
    expect(actual.value).toEqual(takeLatest(GET_ALL_USERS, getAllUsersSaga));
  });

  it("should call api and dispatch GET_ALL_USERS_REQUESTED", async () => {
    const dispatched: Action[] = [];

    const expectedAction: GetAllUsersRequestedAction = {
      type: GET_ALL_USERS_REQUESTED,
      payload: {
        users: [
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
          {
            id: "u3",
            email: "u3@gmail.com",
            first_name: "first_name 3",
            last_name: "last_name 3",
          },
          {
            id: "u4",
            email: "u4@gmail.com",
            first_name: "first_name 4",
            last_name: "last_name 4",
          },
        ],
      },
    };

    await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getAllUsersSaga
    ).toPromise();

    expect(dispatched[0]).toEqual(expectedAction);
  });
});
