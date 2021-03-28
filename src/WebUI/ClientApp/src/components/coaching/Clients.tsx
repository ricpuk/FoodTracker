import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as CoachingStore from "../../store/Coaching";
import { Button, ListGroup, ListGroupItem, Media, NavLink } from "reactstrap";
import { ApplicationState } from "../../store";
import { Link } from "react-router-dom";
import { UserProfile } from "../../store/User";
import LinkButton from "../linkButton/LinkButton";

type ClientsProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators & {};

const CoachingRequests = (props: ClientsProps) => {
  const { fetchClients } = props;

  useEffect(() => {
    fetchClients(1);
  }, [fetchClients]);

  const renderClient = (user: UserProfile) => {
    return (
      <ListGroupItem
        className="d-flex align-items-center flex-wrap"
        key={user.id}
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
          <LinkButton
            color="primary"
            className="mr-3"
            to={"1"}
            text="View diary"
          />
          <Button color="danger ml-3">Stop coaching</Button>
        </div>
      </ListGroupItem>
    );
  };

  return (
    <React.Fragment>
      <ListGroup className="mt-3 request-list">
        {props.clients.map((x) => renderClient(x))}
      </ListGroup>
    </React.Fragment>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(CoachingRequests as any);
