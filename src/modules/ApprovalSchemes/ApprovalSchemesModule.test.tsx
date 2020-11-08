import React from "react";
import { render } from "../../test-utils";
import ApprovalSchemesModule from "./ApprovalSchemesModule";

describe("ApprovalSchemesModule", () => {
  it("should render ApprovalSchemesModule", () => {
    const { getByText } = render(<ApprovalSchemesModule />, {
      route: "//TEAM1",
    });
    expect(getByText(/Edition approval scheme/i)).toBeTruthy();
  });
});
