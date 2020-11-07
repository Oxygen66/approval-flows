import React from "react";
import { render } from "../../test-utils";
import NavBar from "./NavBar";

test("renders learn react link", () => {
  const { getByText } = render(<NavBar />);
  const linkElement = getByText(/Teams/i);
  expect(linkElement).toBeInTheDocument();
});
