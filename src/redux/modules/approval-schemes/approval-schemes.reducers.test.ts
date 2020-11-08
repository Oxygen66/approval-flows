import { Action } from "redux";
import { runSaga } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import {
  addApprovalSchemeSaga,
  approvalSchemesReducer,
  saga as approvalSchemesSaga,
  updateApprovalSchemeStepsSaga,
} from "./approval-schemes.reducers";
import {
  ADD_APPROVAL_SCHEME_STEP,
  ADD_APPROVAL_SCHEME_STEP_REQUESTED,
  AddApprovalSchemeStepRequestedAction,
  UPDATE_APPROVAL_SCHEME_STEPS,
  UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
  UpdateSchemeStepsAction,
  UpdateSchemeStepsRequestedAction,
} from "./approval-schemes.types";

const mockApprovalSchemeStepData = {
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
};

describe("Approval schemes reducers", () => {
  it("should return the initial state", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(approvalSchemesReducer(undefined, {})).toEqual({
      isSubmitting: false,
      approvalSchemes: {},
    });
  });

  it("should handle ADD_APPROVAL_SCHEME_STEP", () => {
    expect(
      approvalSchemesReducer(undefined, {
        type: ADD_APPROVAL_SCHEME_STEP,
        payload: { ...mockApprovalSchemeStepData },
      })
    ).toEqual({
      isSubmitting: true,
      approvalSchemes: {},
    });
  });

  it("should handle ADD_APPROVAL_SCHEME_STEP_REQUESTED", () => {
    expect(
      approvalSchemesReducer(undefined, {
        type: ADD_APPROVAL_SCHEME_STEP_REQUESTED,
        payload: { ...mockApprovalSchemeStepData },
      })
    ).toEqual({
      isSubmitting: false,
      approvalSchemes: {
        TEAM1: [{ ...mockApprovalSchemeStepData.approvalSchemeStep }],
      },
    });
  });

  it("should handle UPDATE_APPROVAL_SCHEME_STEPS", () => {
    expect(
      approvalSchemesReducer(undefined, {
        type: UPDATE_APPROVAL_SCHEME_STEPS,
        payload: {
          teamId: "TEAM1",
          approvalSchemeSteps: [
            { ...mockApprovalSchemeStepData.approvalSchemeStep },
          ],
        },
      })
    ).toEqual({
      isSubmitting: true,
      approvalSchemes: {},
    });
  });

  it("should handle UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED", () => {
    expect(
      approvalSchemesReducer(undefined, {
        type: UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
        payload: {
          teamId: "TEAM1",
          approvalSchemeSteps: [
            { ...mockApprovalSchemeStepData.approvalSchemeStep },
          ],
        },
      })
    ).toEqual({
      isSubmitting: false,
      approvalSchemes: {
        TEAM1: [{ ...mockApprovalSchemeStepData.approvalSchemeStep }],
      },
    });
  });
});

describe("Approval schemes saga", () => {
  it("should dispatch addApprovalSchemeSaga  when we dispatch ADD_APPROVAL_SCHEME", () => {
    const generator: Generator = approvalSchemesSaga();
    put({
      type: ADD_APPROVAL_SCHEME_STEP,
      payload: { ...mockApprovalSchemeStepData },
    });
    const actual = generator.next();
    expect(actual.value).toEqual(
      takeLatest(ADD_APPROVAL_SCHEME_STEP, addApprovalSchemeSaga)
    );
  });

  it("should dispatch ADD_APPROVAL_SCHEME_STEP_REQUESTED after call ADD_APPROVAL_SCHEME", () => {
    const dispatched: Action[] = [];

    const expectedAction: AddApprovalSchemeStepRequestedAction = {
      type: ADD_APPROVAL_SCHEME_STEP_REQUESTED,
      payload: {
        ...mockApprovalSchemeStepData,
      },
    };

    runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      addApprovalSchemeSaga,
      {
        payload: { ...mockApprovalSchemeStepData },
        type: ADD_APPROVAL_SCHEME_STEP,
      }
    ).toPromise();

    expect(dispatched[0]).toEqual(expectedAction);
  });

  it("should dispatch updateApprovalSchemeStepsSaga  when we dispatch UPDATE_APPROVAL_SCHEME_STEPS", () => {
    const generator: Generator = approvalSchemesSaga();
    put({
      type: UPDATE_APPROVAL_SCHEME_STEPS,
      payload: <UpdateSchemeStepsAction>{
        type: UPDATE_APPROVAL_SCHEME_STEPS,
        payload: {
          teamId: mockApprovalSchemeStepData.teamId,
          approvalSchemeSteps: [
            { ...mockApprovalSchemeStepData.approvalSchemeStep },
          ],
        },
      },
    });
    generator.next();
    const actual = generator.next();
    expect(actual.value).toEqual(
      takeLatest(UPDATE_APPROVAL_SCHEME_STEPS, updateApprovalSchemeStepsSaga)
    );
  });

  it("should dispatch UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED after call UPDATE_APPROVAL_SCHEME_STEPS", () => {
    const dispatched: Action[] = [];

    const expectedAction: UpdateSchemeStepsRequestedAction = {
      type: UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
      payload: {
        teamId: mockApprovalSchemeStepData.teamId,
        approvalSchemeSteps: [
          { ...mockApprovalSchemeStepData.approvalSchemeStep },
        ],
      },
    };

    runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateApprovalSchemeStepsSaga,
      {
        payload: {
          teamId: mockApprovalSchemeStepData.teamId,
          approvalSchemeSteps: [
            { ...mockApprovalSchemeStepData.approvalSchemeStep },
          ],
        },
        type: UPDATE_APPROVAL_SCHEME_STEPS,
      }
    ).toPromise();

    expect(dispatched[0]).toEqual(expectedAction);
  });
});
