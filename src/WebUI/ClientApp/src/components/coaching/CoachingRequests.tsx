import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as CoachingStore from "../../store/Coaching";
import {
  Alert,
  Button,
  ListGroup,
  ListGroupItem,
  Media,
  Row,
} from "reactstrap";
import { ApplicationState } from "../../store";

type CoachingRequestsProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators & {};

const CoachingRequests = (props: CoachingRequestsProps) => {
  const { fetchCoachingRequests } = props;

  useEffect(() => {
    fetchCoachingRequests(1);
  }, [fetchCoachingRequests]);

  const acceptRequest = (requestId: number) => {
    props.acceptCoachingRequest(requestId);
  };

  const declineRequest = (requestId: number) => {
    props.declineCoachingRequest(requestId);
  };

  const renderRequest = (request: CoachingStore.CoachingRequest) => {
    const user = request.from;
    return (
      <ListGroupItem
        className="d-flex align-items-center flex-wrap"
        key={request.id}
      >
        <Media
          left
          src="https://bootdey.com/img/Content/avatar/avatar2.png"
          style={{ width: 75 }}
        />
        <div className="flex-fill pl-3 pr-3">
          <div>
            <a href="#" className="text-dark font-weight-600">
              {user.firstName} {user.lastName}
            </a>
          </div>
          <div className="text-muted fs-13px">{user.shortDescription}</div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            color="primary mr-3"
            onClick={() => acceptRequest(request.id)}
          >
            Accept
          </Button>
          <Button
            color="danger ml-3"
            onClick={() => declineRequest(request.id)}
          >
            Deny
          </Button>
        </div>
      </ListGroupItem>
    );
  };

  if (props.coachingRequests.length === 0) {
    return (
      <React.Fragment>
        <Alert color="warning" className="mt-3">
          <h6 className="mb-0">You have no coaching requests at the moment.</h6>
        </Alert>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ListGroup className="mt-3 request-list">
        {props.coachingRequests.map((x) => renderRequest(x))}
      </ListGroup>
    </React.Fragment>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(CoachingRequests as any);
