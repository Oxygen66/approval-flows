import React from "react";
import { fireEvent, render, act } from "../../../../test-utils";
import ApprovalSchemeEditPage from "./ApprovalSchemeEditPage";
import { User } from "../../../../services/api/users/users.dto";

const mockUsers: User[] = [
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
];

describe("ApprovalSchemeEditPage", () => {
  it("should render ApprovalSchemeEditPage", () => {
    const { getByText, container } = render(<ApprovalSchemeEditPage />);
    expect(getByText(/Set up approvers/i)).toBeTruthy();
    expect(
      container.querySelectorAll(".container-card-approval-schemes-step")
    ).toHaveLength(0);
  });

  it("should add threshold on click button", async () => {
    const { getByText } = render(<ApprovalSchemeEditPage />);
    await fireEvent.click(getByText(/Add a threshold/i));
    expect(getByText("From 0€ to 500€")).toBeTruthy();
    fireEvent.click(getByText(/Add a threshold/i));
    expect(await getByText("From 0€ to 500€")).toBeTruthy();
    expect(await getByText("From 500€ to 1500€")).toBeTruthy();
  });

  it("should be u1 default value of select", async () => {
    const { getByText, container } = render(<ApprovalSchemeEditPage />, {
      reduxState: {
        users: {
          isLoading: false,
          users: [...mockUsers],
        },
      },
    });
    fireEvent.click(getByText(/Add a threshold/i));
    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select.value).toEqual("u1");
  });

  it("should be u2 when select is changed", async () => {
    const { getByText, container } = render(<ApprovalSchemeEditPage />, {
      reduxState: {
        users: {
          isLoading: false,
          users: [...mockUsers],
        },
      },
    });
    fireEvent.click(getByText(/Add a threshold/i));
    fireEvent.click(getByText(/Add a threshold/i));
    const select = container
      .querySelectorAll("select")
      .item(0) as HTMLSelectElement;
    fireEvent.change(select, {
      target: { value: "u2" },
    });
    expect(select.value).toEqual("u2");
  });

  it("should submit and send to store scheme data", async () => {
    await act(async () => {
      const { getByText } = render(<ApprovalSchemeEditPage />);
      await fireEvent.click(getByText(/Add a threshold/i));
      expect(getByText("From 0€ to 500€")).toBeTruthy();
      const submitButton = getByText(/submit/i) as HTMLButtonElement;
      fireEvent.click(submitButton);
    });
  });
});
