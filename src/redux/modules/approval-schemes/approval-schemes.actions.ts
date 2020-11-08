import {
  ADD_APPROVAL_SCHEME_STEP,
  ADD_APPROVAL_SCHEME_STEP_REQUESTED,
  ApprovalSchemesActionTypes,
  ApprovalSchemeStep,
  UPDATE_APPROVAL_SCHEME_STEPS,
  UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
} from "./approval-schemes.types";

export function addApprovalSchemeStep(
  teamId: string,
  approvalSchemeStep: ApprovalSchemeStep
): ApprovalSchemesActionTypes {
  return {
    type: ADD_APPROVAL_SCHEME_STEP,
    payload: { approvalSchemeStep, teamId },
  };
}

export function addApprovalSchemeStepRequested(
  teamId: string,
  approvalSchemeStep: ApprovalSchemeStep
): ApprovalSchemesActionTypes {
  return {
    type: ADD_APPROVAL_SCHEME_STEP_REQUESTED,
    payload: { approvalSchemeStep, teamId },
  };
}

export function updateApprovalSchemeStep(
  teamId: string,
  approvalSchemeSteps: ApprovalSchemeStep[]
): ApprovalSchemesActionTypes {
  return {
    type: UPDATE_APPROVAL_SCHEME_STEPS,
    payload: { teamId, approvalSchemeSteps },
  };
}

export function updateApprovalSchemeRequestedStep(
  teamId: string,
  approvalSchemeSteps: ApprovalSchemeStep[]
): ApprovalSchemesActionTypes {
  return {
    type: UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED,
    payload: { teamId, approvalSchemeSteps },
  };
}
