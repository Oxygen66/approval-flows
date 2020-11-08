import React from "react";
import { render } from "../../test-utils";
import TeamsModule from "./TeamsModule";

describe("TeamsModule", () => {
  it("should render TeamsModule component", () => {
    const { container } = render(<TeamsModule />, { route: "/teams" });
    expect(container.querySelector("#teams")).toBeInTheDocument();
  });
});
