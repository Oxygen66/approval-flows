import React from "react";
import { render } from "../../../../test-utils";
import Team from "./Team";
import { RootState } from "../../../../redux/rootReducer";

const initialState: Partial<RootState> = {
  users: {
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
  approvalSchemes: {
    isSubmitting: false,
    approvalSchemes: {
      TEAM1: [
        {
          to: 0,
          from: 10,
          approver: {
            id: "u4",
            email: "u4@gmail.com",
            first_name: "first_name 4",
            last_name: "last_name 4",
          },
        },
        {
          to: 10,
          from: 100,
          approver: {
            id: "u3",
            email: "u3@gmail.com",
            first_name: "first_name 3",
            last_name: "last_name 3",
          },
        },
        {
          to: 100,
          from: 1000,
          approver: {
            id: "u2",
            email: "u2@gmail.com",
            first_name: "first_name 2",
            last_name: "last_name 2",
          },
        },
        {
          to: 1000,
          from: 10000,
          approver: {
            id: "u1",
            email: "u1@gmail.com",
            first_name: "first_name 1",
            last_name: "last_name 1",
          },
        },
      ],
    },
  },
};

describe("Team", () => {
  it("should render team component", () => {
    const name = "Jean Lucas";
    const userIds = ["u1", "u2", "u3"];
    const { container, getByText } = render(
      <Team name={name} userIds={userIds} teamId="TEAM1" />,
      {
        reduxState: { ...initialState },
      }
    );
    expect(getByText(name)).toBeTruthy();
    expect(container.querySelectorAll(".team .user-block")).toHaveLength(3);
  });

  it("should render team component without user", () => {
    const name = "Jean Lucas";
    const { container, getByText } = render(
      <Team name={name} userIds={[]} teamId="TEAM1" />,
      {
        reduxState: { ...initialState },
      }
    );
    expect(getByText(name)).toBeTruthy();
    expect(container.querySelectorAll(".team .user-block")).toHaveLength(0);
  });

  it("should render team component with approvers", () => {
    const name = "Jean Lucas";
    const userIds = ["u1", "u2", "u3"];
    const { container } = render(
      <Team name={name} userIds={userIds} teamId="TEAM1" />,
      {
        reduxState: { ...initialState },
      }
    );
    expect(container.querySelectorAll(".team .approver-block")).toHaveLength(3);
  });

  it("should render team component with 0 approvers", () => {
    const name = "Jean Lucas";
    const userIds = ["u1", "u2", "u3"];
    const { container } = render(
      <Team name={name} userIds={userIds} teamId="TEAM2" />,
      {
        reduxState: { ...initialState },
      }
    );
    expect(container.querySelectorAll(".team .approver-block")).toHaveLength(0);
  });
});
