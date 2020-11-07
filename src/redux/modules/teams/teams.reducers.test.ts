import { put, takeLatest } from "redux-saga/effects";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { runSaga } from "redux-saga";
import { Action } from "redux";
import {
  getAllTeamsSaga,
  saga as teamSaga,
  teamsReducer,
} from "./teams.reducers";
import {
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_REQUESTED,
  GetAllTeamsAction,
  GetAllTeamsRequestedAction,
} from "./teams.types";
import Config from "../../../config";

const server = setupServer(
  rest.get(Config.API_URLS.TEAMS, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "Team 1",
          name: "Team 1",
          users: ["u1", "u1234"],
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Teams reducers", () => {
  it("should return the initial state", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(teamsReducer(undefined, {})).toEqual({
      isLoading: false,
      teams: [],
    });
  });

  it("should handle GET_ALL_TEAMS action", () => {
    const action: GetAllTeamsAction = {
      type: GET_ALL_TEAMS,
    };
    expect(teamsReducer(undefined, action)).toEqual({
      isLoading: true,
      teams: [],
    });
  });

  it("should handle GET_ALL_TEAMS_REQUESTED", () => {
    const action: GetAllTeamsRequestedAction = {
      type: GET_ALL_TEAMS_REQUESTED,
      payload: {
        teams: [
          {
            id: "Team 1",
            name: "Team 1",
            users: [],
          },
        ],
      },
    };
    expect(teamsReducer(undefined, action)).toEqual({
      isLoading: false,
      teams: [
        {
          id: "Team 1",
          name: "Team 1",
          users: [],
        },
      ],
    });
  });
});

describe("Teams saga", () => {
  it("should dispatch getAllTeamsSaga  when we dispatch GET_ALL_TEAMS", () => {
    const generator: Generator = teamSaga();
    put({ type: GET_ALL_TEAMS });
    const actual = generator.next();
    expect(actual.value).toEqual(takeLatest(GET_ALL_TEAMS, getAllTeamsSaga));
  });

  it("should call api and dispatch GET_ALL_TEAMS_REQUESTED", async () => {
    const dispatched: Action[] = [];

    const expectedAction: GetAllTeamsRequestedAction = {
      type: GET_ALL_TEAMS_REQUESTED,
      payload: {
        teams: [
          {
            id: "Team 1",
            name: "Team 1",
            users: ["u1", "u1234"],
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
      getAllTeamsSaga
    ).toPromise();

    expect(dispatched[0]).toEqual(expectedAction);
  });
});
