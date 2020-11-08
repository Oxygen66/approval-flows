import { Action } from "redux";
import { User } from "../../../services/api/users/users.dto";

export const ADD_APPROVAL_SCHEME_STEP =
  "[Add approval scheme step] Approval schemes";
export const ADD_APPROVAL_SCHEME_STEP_REQUESTED =
  "[Add approval scheme step requested] Approval schemes";
export const UPDATE_APPROVAL_SCHEME_STEPS =
  "[Update approval scheme steps] Approval schemes";
export const UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED =
  "[Update approval scheme steps requested] Approval schemes";

export interface ApprovalSchemeStep {
  from: number;
  to: number;
  approver: User;
}

export interface ApprovalSchemesStateType {
  isSubmitting: boolean;
  approvalSchemes: {
    [key: string]: ApprovalSchemeStep[];
  };
}

export interface AddApprovalSchemeStepAction extends Action {
  type: typeof ADD_APPROVAL_SCHEME_STEP;
  payload: { approvalSchemeStep: ApprovalSchemeStep; teamId: string };
}

export interface AddApprovalSchemeStepRequestedAction extends Action {
  type: typeof ADD_APPROVAL_SCHEME_STEP_REQUESTED;
  payload: { approvalSchemeStep: ApprovalSchemeStep; teamId: string };
}

export interface UpdateSchemeStepsAction extends Action {
  type: typeof UPDATE_APPROVAL_SCHEME_STEPS;
  payload: { teamId: string; approvalSchemeSteps: ApprovalSchemeStep[] };
}

export interface UpdateSchemeStepsRequestedAction extends Action {
  type: typeof UPDATE_APPROVAL_SCHEME_STEPS_REQUESTED;
  payload: { teamId: string; approvalSchemeSteps: ApprovalSchemeStep[] };
}

export type ApprovalSchemesActionTypes =
  | AddApprovalSchemeStepAction
  | AddApprovalSchemeStepRequestedAction
  | UpdateSchemeStepsAction
  | UpdateSchemeStepsRequestedAction;
