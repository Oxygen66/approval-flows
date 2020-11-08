import React, { ReactElement, useMemo } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { RootState } from "../../../../redux/rootReducer";
import "./index.scss";

export interface TeamProps {
  teamId: string;
  name: string;
  userIds: string[];
}

function Team({ name, userIds, teamId }: TeamProps): ReactElement | null {
  const { users } = useSelector((state: RootState) => state.users);
  const { approvalSchemes } = useSelector(
    (state: RootState) => state.approvalSchemes
  );

  const usersFormatted = useMemo(() => {
    return userIds.slice(0, 3).map((id) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const userFunded = users.find((user) => user.id === id)!;
      return {
        ...userFunded,
        fullName: `${userFunded.first_name} ${userFunded.last_name}`,
      };
    });
  }, [userIds, users]);

  const approversFormatted = useMemo(() => {
    return (approvalSchemes[teamId] || [])
      .slice(0, 3)
      .map((approvalSchemeStep) => {
        return {
          ...approvalSchemeStep.approver,
          fullName: `${approvalSchemeStep.approver.first_name} ${approvalSchemeStep.approver.first_name}`,
        };
      });
  }, [approvalSchemes, teamId]);

  return (
    <div className="col-12 team">
      <Card>
        <Card.Header>
          <div className="row">
            <div className="col-6">
              <h2>{name}</h2>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <Button
                className="button-link__approval-scheme"
                size="sm"
                as={Link}
                to={`/approval-schemes/${teamId}`}
              >
                Edit Approval Scheme
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-12 pb-2">
              <h3>Users</h3>
            </div>
            {usersFormatted.map((user) => (
              <div key={user.id} className="col-4 user-block">
                <Avatar size="45" round name={user.fullName} />
                <span className="pl-1 fullname">{user.fullName}</span>
              </div>
            ))}
          </div>
        </Card.Body>
        {approversFormatted.length > 0 && (
          <Card.Body className="approvers-block">
            <div className="row">
              <div className="col-12 pb-2">
                <h3>Approvers</h3>
              </div>
              {approversFormatted.map((user) => (
                <div key={user.id} className="col-4 approver-block">
                  <Avatar size="45" round name={user.fullName} />
                  <span className="pl-1 fullname">{user.fullName}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}

export default Team;
