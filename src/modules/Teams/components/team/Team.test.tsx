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
};

describe("Team", () => {
  it("should render team component", () => {
    const name = "Jean Lucas";
    const userIds = ["u1", "u2", "u3"];
    const { container, getByText } = render(
      <Team name={name} userIds={userIds} />,
      {
        reduxState: { ...initialState },
      }
    );
    expect(getByText(name)).toBeTruthy();
    expect(container.querySelectorAll(".sb-avatar")).toHaveLength(3);
    expect(getByText(/first_name 1 last_name 1/i)).toBeTruthy();
    expect(getByText(/first_name 2 last_name 2/i)).toBeTruthy();
    expect(getByText(/first_name 3 last_name 3/i)).toBeTruthy();
    expect(() => getByText(/first_name 4 last_name 4/i)).toThrowError();
  });

  it("should render team component without user", () => {
    const name = "Jean Lucas";
    const { container, getByText } = render(<Team name={name} userIds={[]} />, {
      reduxState: { ...initialState },
    });
    expect(getByText(name)).toBeTruthy();
    expect(container.querySelectorAll(".sb-avatar")).toHaveLength(0);
    expect(() => getByText(/first_name 1 last_name 1/i)).toThrowError();
    expect(() => getByText(/first_name 2 last_name 2/i)).toThrowError();
    expect(() => getByText(/first_name 3 last_name 3/i)).toThrowError();
    expect(() => getByText(/first_name 4 last_name 4/i)).toThrowError();
  });
});
