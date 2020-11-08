import React from "react";
import { render } from "../../../../test-utils";
import ApprovalSchemeEdit from "./ApprovalSchemeEdit";

describe("ApprovalSchemeEdit", () => {
  it("should render ApprovalSchemeEdit", () => {
    const { getByText } = render(<ApprovalSchemeEdit />);
    expect(getByText(/Edition approval scheme/i)).toBeTruthy();
  });
});
