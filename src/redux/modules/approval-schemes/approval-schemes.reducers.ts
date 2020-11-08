import { Reducer } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  ADD_APPROVAL_SCHEME_STEP,
  ADD_APPROVAL_SCHEME_STEP_REQUESTED,
  AddApprovalSchemeStepAction,
  ApprovalSchemesActionTypes,
  ApprovalSchemesStateType,
  UPDATE_APPROVAL_SCHEME_STEPS,
  UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
  UpdateSchemeStepsAction,
} from "./approval-schemes.types";
import {
  addApprovalSchemeStepRequested,
  updateApprovalSchemeRequestedStep,
} from "./approval-schemes.actions";

const initialState: ApprovalSchemesStateType = {
  isSubmitting: false,
  approvalSchemes: {},
};

export const approvalSchemesReducer: Reducer<
  ApprovalSchemesStateType,
  ApprovalSchemesActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APPROVAL_SCHEME_STEP: {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case ADD_APPROVAL_SCHEME_STEP_REQUESTED: {
      const copyApprovalSchemes = { ...state.approvalSchemes };
      const teamApprovalSchemesSteps =
        copyApprovalSchemes[action.payload.teamId] || [];
      teamApprovalSchemesSteps.push(action.payload.approvalSchemeStep);
      copyApprovalSchemes[action.payload.teamId] = teamApprovalSchemesSteps;

      return {
        ...state,
        isSubmitting: false,
        approvalSchemes: {
          ...copyApprovalSchemes,
        },
      };
    }
    case UPDATE_APPROVAL_SCHEME_STEPS: {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED: {
      const copyApprovalSchemes = { ...state.approvalSchemes };
      copyApprovalSchemes[action.payload.teamId] =
        action.payload.approvalSchemeSteps;
      return {
        ...state,
        isSubmitting: false,
        approvalSchemes: { ...copyApprovalSchemes },
      };
    }
    default: {
      return state;
    }
  }
};

export const persistApprovalSchemesReducer = persistReducer(
  {
    storage,
    key: "approval-flows_approvalSchemes",
    whitelist: ["approvalSchemes"],
  },
  approvalSchemesReducer
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* addApprovalSchemeSaga({
  payload: { approvalSchemeStep, teamId },
}: AddApprovalSchemeStepAction) {
  yield put(addApprovalSchemeStepRequested(teamId, approvalSchemeStep));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* updateApprovalSchemeStepsSaga({
  payload: { approvalSchemeSteps, teamId },
}: UpdateSchemeStepsAction) {
  yield put(updateApprovalSchemeRequestedStep(teamId, approvalSchemeSteps));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* saga() {
  yield takeLatest(ADD_APPROVAL_SCHEME_STEP, addApprovalSchemeSaga);
  yield takeLatest(UPDATE_APPROVAL_SCHEME_STEPS, updateApprovalSchemeStepsSaga);
}
