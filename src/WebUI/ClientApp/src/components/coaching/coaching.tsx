import classnames from "classnames";
import React, { useEffect, useState } from "react";
import * as CoachingStore from "../../store/Coaching";
import {
  Nav,
  TabContent,
  TabPane,
  Row,
  Button,
  Card,
  CardTitle,
  Col,
  NavItem,
  NavLink,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import CoachingRequests from "./CoachingRequests";
import "./Coaching.css";
import Clients from "./Clients";

type CoachingProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators & {};

const TAB_COACH = "coach";
const TAB_CLIENTS = "clients";
const TAB_REQUESTS = "coachingRequests";

const Coaching = (props: CoachingProps) => {
  const [activeTab, setActiveTab] = useState(TAB_REQUESTS);
  const { fetchCoaches } = props;

  useEffect(() => {
    fetchCoaches(1);
  }, [fetchCoaches]);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleClick = (coach: CoachingStore.CoachInfo) => {
    if (coach.coachingRequested) {
      return props.revokeCoachingRequest(coach);
    }
    props.requestCoaching(coach);
  };

  const renderCoach = (coach: CoachingStore.CoachInfo) => (
    <Col sm="6" lg="4" key={`${coach.id}`}>
      <Card className="mb-3">
        <img
          src="https://via.placeholder.com/340x120/FFA07A/000000"
          alt="Cover"
          className="card-img-top"
        />
        <CardBody>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            style={{ width: 100, marginTop: -65 }}
            alt="User"
            className="img-fluid img-thumbnail rounded-circle d-flex mr-auto ml-auto"
          />
          <CardTitle tag="h4" className="text-center mt-2">
            {coach.firstName} {coach.lastName}
          </CardTitle>
          <CardSubtitle className="text-secondary mb-1 text-center">
            {coach.shortDescription}
          </CardSubtitle>
          <CardSubtitle className="text-muted font-size-lg text-center">
            {coach.numberOfClients ? coach.numberOfClients : "No"} clients
          </CardSubtitle>
          <Button
            color={coach.coachingRequested ? "warning" : "primary"}
            className="w-100 mt-2"
            outline
            onClick={() => handleClick(coach)}
          >
            {coach.coachingRequested ? "Revoke request" : "Request coaching"}
          </Button>
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <Loader isLoading={props.coachesLoading}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_COACH })}
            onClick={() => {
              toggle(TAB_COACH);
            }}
          >
            Coach
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_CLIENTS })}
            onClick={() => {
              toggle(TAB_CLIENTS);
            }}
          >
            Clients
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_REQUESTS })}
            onClick={() => {
              toggle(TAB_REQUESTS);
            }}
          >
            Coaching requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB_COACH} className="p-3">
          {props.coaches && (
            <Row>{props.coaches.map((coach) => renderCoach(coach))}</Row>
          )}
        </TabPane>
        <TabPane tabId={TAB_CLIENTS} className="p-3">
          <Clients />
        </TabPane>
        <TabPane tabId={TAB_REQUESTS}>
          <CoachingRequests />
        </TabPane>
      </TabContent>
    </Loader>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(Coaching as any);
