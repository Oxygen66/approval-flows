import React, { ReactElement, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ApprovalSchemeStep } from "../../../../redux/modules/approval-schemes/approval-schemes.types";
import { RootState } from "../../../../redux/rootReducer";
import "./index.scss";
import { User } from "../../../../services/api/users/users.dto";
import { updateApprovalSchemeStep } from "../../../../redux/modules/approval-schemes/approval-schemes.actions";

export interface ApprovalSchemeEditFormValues {
  approvalSchemesSteps: ApprovalSchemeStep[];
}

export interface ApprovalSchemeEditPageRouteParams {
  teamId: string;
}

export interface ErrorsType {
  [key: string]: {
    [key: number]: {
      [key: string]: string;
    };
  };
}

export interface ApprovalSchemesStepsErrorsType {
  [key: number]: {
    [key: string]: string;
  };
}

function ApprovalSchemeEditPage(): ReactElement {
  const { teamId } = useParams<ApprovalSchemeEditPageRouteParams>();
  const users = useSelector((state: RootState) => state.users.users);
  const { approvalSchemes, isSubmitting } = useSelector(
    (state: RootState) => state.approvalSchemes
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik<ApprovalSchemeEditFormValues>({
    initialValues: {
      approvalSchemesSteps: approvalSchemes[teamId] || [],
    },
    validate: (values) => {
      const errors: ErrorsType = {};

      const approvalSchemesStepsErrors: ApprovalSchemesStepsErrorsType = {};
      values.approvalSchemesSteps.forEach((approvalSchemesStep, index) => {
        const indexOfUserId = values.approvalSchemesSteps
          .map((data) => data.approver.id)
          .indexOf(approvalSchemesStep.approver.id);
        const stepError: { [key: string]: string } = {};
        if (indexOfUserId !== index) {
          stepError.approver = "This user cant be added";
        }

        if (approvalSchemesStep.from < 0) {
          stepError.from = 'The value of "from" is below 0 "';
        } else if (approvalSchemesStep.from >= approvalSchemesStep.to) {
          stepError.from = 'The value of "from" is above "to"';
        }

        if (approvalSchemesStep.to <= approvalSchemesStep.from) {
          stepError.to = "Error";
        }

        if (Object.keys(stepError).length > 0) {
          approvalSchemesStepsErrors[index] = stepError;
        }
      });

      if (Object.keys(approvalSchemesStepsErrors).length > 0) {
        errors.approvalSchemesSteps = approvalSchemesStepsErrors;
      }

      return errors;
    },
    onSubmit(values) {
      dispatch(updateApprovalSchemeStep(teamId, values.approvalSchemesSteps));
    },
  });

  const getFullName = (user: User) => `${user.first_name} ${user.last_name}`;

  const addThreshold = (): void => {
    const values = [...formik.values.approvalSchemesSteps];
    if (!values.length) {
      values.push({
        to: 500,
        from: 0,
        approver: { ...users[0] },
      });
    } else {
      values.push({
        to: values[values.length - 1].to + 1000,
        from: values[values.length - 1].to,
        approver: { ...users[0] },
      });
    }
    formik.setValues({
      approvalSchemesSteps: [...values],
    });
  };

  const deleteThreshold = (indexStep: number): void => {
    const copyApprovalSchemesSteps = [...formik.values.approvalSchemesSteps];
    copyApprovalSchemesSteps.splice(indexStep, 1);
    formik.setValues({
      approvalSchemesSteps: [...copyApprovalSchemesSteps],
    });
  };

  const updateStepApprover = (
    event: React.ChangeEvent<HTMLSelectElement>,
    indexStep: number
  ) => {
    const userFound = users.find(
      (user) => user.id === event.target.value
    ) as User;
    formik.setValues({
      approvalSchemesSteps: [...formik.values.approvalSchemesSteps].map(
        (step, indexApprovalStep) => {
          return indexApprovalStep !== indexStep
            ? step
            : {
                ...step,
                approver: userFound,
              };
        }
      ),
    });
  };

  useEffect(() => {
    if (formik.isSubmitting && !isSubmitting) {
      history.push("/teams");
    }
  }, [formik.isSubmitting, history, isSubmitting]);

  return (
    <Container className="pt-3">
      <div className="row">
        <div className="col-6">
          <h2>Set up approvers</h2>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center mb-3">
          <Button className="button__add-threshold" onClick={addThreshold}>
            Add a threshold
          </Button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* eslint-disable react/no-array-index-key */}
          {formik.values.approvalSchemesSteps.map(
            (approvalSchemesStep, indexStep) => (
              <div
                key={indexStep}
                className="col-12 container-card-approval-schemes-step"
              >
                <Card>
                  <Card.Header>
                    <div className="row">
                      <div className="col-10">
                        <h3>
                          From {approvalSchemesStep.from}€ to{" "}
                          {approvalSchemesStep.to}€
                        </h3>
                      </div>
                      <div className="col-2 d-flex justify-content-end">
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Actions"
                          menuAlign="right"
                        >
                          <Dropdown.Item
                            onClick={() => deleteThreshold(indexStep)}
                          >
                            Delete
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label
                            htmlFor={`approvalSchemesSteps.${indexStep}.from`}
                          >
                            From
                          </label>
                          <input
                            type="number"
                            className={`form-control${
                              (formik.errors as ErrorsType)
                                .approvalSchemesSteps?.[indexStep]?.from
                                ? " is-invalid"
                                : ""
                            }`}
                            id={`approvalSchemesSteps.${indexStep}.from`}
                            name={`approvalSchemesSteps.${indexStep}.from`}
                            onChange={formik.handleChange}
                            value={
                              formik.values.approvalSchemesSteps[indexStep].from
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label
                            htmlFor={`approvalSchemesSteps.${indexStep}.to`}
                          >
                            To
                          </label>
                          <input
                            type="number"
                            className={`form-control${
                              (formik.errors as ErrorsType)
                                .approvalSchemesSteps?.[indexStep]?.to
                                ? " is-invalid"
                                : ""
                            }`}
                            id={`approvalSchemesSteps.${indexStep}.to`}
                            name={`approvalSchemesSteps.${indexStep}.to`}
                            onChange={formik.handleChange}
                            value={
                              formik.values.approvalSchemesSteps[indexStep].to
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <select
                          className={`form-control${
                            (formik.errors as ErrorsType)
                              .approvalSchemesSteps?.[indexStep]?.approver
                              ? " is-invalid"
                              : ""
                          }`}
                          onChange={(event) =>
                            updateStepApprover(event, indexStep)
                          }
                          value={approvalSchemesStep.approver.id}
                        >
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {getFullName(user)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          )}
          <div className="col-12">
            <Button disabled={!formik.isValid} className="mt-3" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ApprovalSchemeEditPage;
