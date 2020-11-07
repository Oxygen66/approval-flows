import React, { ReactElement, useMemo } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { RootState } from "../../../../redux/rootReducer";

export interface TeamProps {
  name: string;
  userIds: string[];
}

function Team({ name, userIds }: TeamProps): ReactElement | null {
  const { users } = useSelector((state: RootState) => state.users);

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

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <div className="row">
          {usersFormatted.map((user) => (
            <div key={user.id} className="col-4">
              <Avatar size="45" round name={user.fullName} />
              <span className="pl-1">{user.fullName}</span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Team;
