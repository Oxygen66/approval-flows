import React from "react";
import { act, fireEvent, render, waitFor } from "../../../../test-utils";
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

  it("should delete a threshold", () => {
    const { getByText, getAllByText } = render(<ApprovalSchemeEditPage />);
    fireEvent.click(getByText(/Add a threshold/i));
    fireEvent.click(getByText(/Add a threshold/i));
    expect(getByText("From 0€ to 500€")).toBeTruthy();
    expect(getByText("From 500€ to 1500€")).toBeTruthy();
    const actionButtons = getAllByText(/actions/i) as HTMLButtonElement[];
    fireEvent.click(actionButtons[0]);
    fireEvent.click(getByText(/delete/i));
    expect(() => getByText("From 0€ to 500€")).toThrowError();
    expect(getByText("From 500€ to 1500€")).toBeTruthy();
  });

  it("should be disabled if we have duplicate users", async () => {
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
    const selectButtons = container.querySelectorAll("select");
    await waitFor(() => {
      fireEvent.change(selectButtons.item(0), {
        target: { value: "u2" },
      });
    });
    await waitFor(() => {
      fireEvent.change(selectButtons.item(1), {
        target: { value: "u2" },
      });
    });
    const submitButton = getByText(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should be not disabled if we dont have duplicate users", async () => {
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
    const selectButtons = container.querySelectorAll("select");
    await waitFor(() => {
      fireEvent.change(selectButtons.item(0), {
        target: { value: "u1" },
      });
    });
    await waitFor(() => {
      fireEvent.change(selectButtons.item(1), {
        target: { value: "u2" },
      });
    });
    const submitButton = getByText(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it("should be disabled if from is below 0", async () => {
    const { getByText, container } = render(<ApprovalSchemeEditPage />, {
      reduxState: {
        users: {
          isLoading: false,
          users: [...mockUsers],
        },
      },
    });
    fireEvent.click(getByText(/Add a threshold/i));
    const fromInput = container.querySelector(
      "input[name='approvalSchemesSteps.0.from']"
    ) as HTMLInputElement;
    await waitFor(() => fireEvent.change(fromInput, { target: { value: -5 } }));
    const submitButton = getByText(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should be disabled if from is above to", async () => {
    const { getByText, container } = render(<ApprovalSchemeEditPage />, {
      reduxState: {
        users: {
          isLoading: false,
          users: [...mockUsers],
        },
      },
    });
    fireEvent.click(getByText(/Add a threshold/i));
    const fromInput = container.querySelector(
      "input[name='approvalSchemesSteps.0.from']"
    ) as HTMLInputElement;
    await waitFor(() =>
      fireEvent.change(fromInput, { target: { value: 500 } })
    );
    const toInput = container.querySelector(
      "input[name='approvalSchemesSteps.0.to']"
    ) as HTMLInputElement;
    await waitFor(() => fireEvent.change(toInput, { target: { value: 200 } }));
    const submitButton = getByText(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should submit without error", async () => {
    await act(async () => {
      const { getByText } = render(<ApprovalSchemeEditPage />);
      await fireEvent.click(getByText(/Add a threshold/i));
      expect(getByText("From 0€ to 500€")).toBeTruthy();
      const submitButton = getByText(/submit/i) as HTMLButtonElement;
      fireEvent.click(submitButton);
    });
  });
});
