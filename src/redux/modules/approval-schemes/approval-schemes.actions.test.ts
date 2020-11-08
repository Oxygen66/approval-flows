import {
  addApprovalSchemeStep,
  addApprovalSchemeStepRequested,
  updateApprovalSchemeRequestedStep,
  updateApprovalSchemeStep,
} from "./approval-schemes.actions";
import {
  ADD_APPROVAL_SCHEME_STEP,
  ADD_APPROVAL_SCHEME_STEP_REQUESTED,
  ApprovalSchemeStep,
  UPDATE_APPROVAL_SCHEME_STEPS,
  UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
} from "./approval-schemes.types";

const mockApprovalSchemeSteps: ApprovalSchemeStep[] = [
  {
    from: 0,
    to: 1000,
    approver: {
      id: "u1",
      email: "u1@gmail.com",
      first_name: "first_name u1",
      last_name: "last_name u1",
    },
  },
  {
    from: 1000,
    to: 3000,
    approver: {
      id: "u1",
      email: "u1@gmail.com",
      first_name: "first_name u1",
      last_name: "last_name u1",
    },
  },
];

describe("Approval schemes actions", () => {
  it("should create an action for add an approval scheme step", () => {
    expect(
      addApprovalSchemeStep("TEAM1", {
        from: 0,
        to: 10000,
        approver: {
          id: "u1",
          email: "u1@gmail.com",
          first_name: "first_name u1",
          last_name: "last_name u1",
        },
      })
    ).toEqual({
      type: ADD_APPROVAL_SCHEME_STEP,
      payload: {
        teamId: "TEAM1",
        approvalSchemeStep: {
          from: 0,
          to: 10000,
          approver: {
            id: "u1",
            email: "u1@gmail.com",
            first_name: "first_name u1",
            last_name: "last_name u1",
          },
        },
      },
    });
  });

  it("should create an action for save approval scheme step", () => {
    expect(
      addApprovalSchemeStepRequested("TEAM1", {
        from: 0,
        to: 10000,
        approver: {
          id: "u1",
          email: "u1@gmail.com",
          first_name: "first_name u1",
          last_name: "last_name u1",
        },
      })
    ).toEqual({
      type: ADD_APPROVAL_SCHEME_STEP_REQUESTED,
      payload: {
        teamId: "TEAM1",
        approvalSchemeStep: {
          from: 0,
          to: 10000,
          approver: {
            id: "u1",
            email: "u1@gmail.com",
            first_name: "first_name u1",
            last_name: "last_name u1",
          },
        },
      },
    });
  });

  it("should create an action for update all approval scheme for a team", () => {
    expect(updateApprovalSchemeStep("TEAM1", mockApprovalSchemeSteps)).toEqual({
      type: UPDATE_APPROVAL_SCHEME_STEPS,
      payload: {
        teamId: "TEAM1",
        approvalSchemeSteps: mockApprovalSchemeSteps,
      },
    });
  });

  it("should create an action for save all approval scheme for a team", () => {
    expect(
      updateApprovalSchemeRequestedStep("TEAM1", mockApprovalSchemeSteps)
    ).toEqual({
      type: UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
      payload: {
        teamId: "TEAM1",
        approvalSchemeSteps: mockApprovalSchemeSteps,
      },
    });
  });
});
