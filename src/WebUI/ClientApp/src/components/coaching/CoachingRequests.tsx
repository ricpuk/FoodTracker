import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as CoachingStore from "../../store/Coaching";
import { Button, ListGroup, ListGroupItem, Media, Row } from "reactstrap";
import { ApplicationState } from "../../store";

type CoachingRequestsProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators & {};

const CoachingRequests = (props: CoachingRequestsProps) => {
  const { fetchCoachingRequests } = props;

  useEffect(() => {
    fetchCoachingRequests(1);
  }, [fetchCoachingRequests]);

  return (
    <React.Fragment>
      <ListGroup className="mt-3 request-list">
        <ListGroupItem className="d-flex align-items-center flex-wrap">
          <Media
            left
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            style={{ width: 75 }}
          />
          <div className="flex-fill pl-3 pr-3">
            <div>
              <a href="#" className="text-dark font-weight-600">
                Ethel Wilkes
              </a>
            </div>
            <div className="text-muted fs-13px">North Raundspic</div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button color="primary mr-3">Accept</Button>
            <Button color="danger ml-3">Deny</Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    </React.Fragment>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(CoachingRequests as any);
