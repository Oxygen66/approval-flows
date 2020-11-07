import React from "react";
import { render } from "../../../../test-utils";
import TeamsPage from "./TeamsPage";

describe("TeamsPage", () => {
  it("should render 0 team at start", () => {
    const { container } = render(<TeamsPage />);
    const teams = container.querySelectorAll(".team");
    expect(teams).toHaveLength(0);
  });

  it("should render any team when data updated", () => {
    const { container } = render(<TeamsPage />, {
      reduxState: {
        teams: {
          isLoading: false,
          teams: [
            {
              id: "Team 1",
              name: "Team 1",
              users: [],
            },
            {
              id: "Team 2",
              name: "Team 2",
              users: [],
            },
          ],
        },
      },
    });
    const teams = container.querySelectorAll(".team");
    expect(teams).toHaveLength(2);
  });
});
