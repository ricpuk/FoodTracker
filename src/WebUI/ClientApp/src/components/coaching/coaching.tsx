import classnames from "classnames";
import React, { useEffect, useState } from "react";
import * as CoachingStore from "../../store/Coaching";
import { Nav, TabContent, TabPane, NavItem, NavLink } from "reactstrap";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import CoachingRequests from "./CoachingRequests";
import "./Coaching.css";
import Clients from "./Clients";
import { UserProfile } from "../../store/User";
import Profile from "../profile/Profile";
import CoachList from "./CoachList";

type CoachingProps = CoachingStore.CoachingState & {
  user: UserProfile;
} & typeof CoachingStore.actionCreators & {};

const TAB_COACH = "coach";
const TAB_CLIENTS = "clients";
const TAB_REQUESTS = "coachingRequests";

const Coaching = (props: CoachingProps) => {
  const [activeTab, setActiveTab] = useState(TAB_COACH);
  const { fetchCoaches, user, coaches } = props;

  useEffect(() => {
    fetchCoaches(1);
  }, [fetchCoaches]);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
          {user.trainer ? (
            <Profile profile={user.trainer} />
          ) : (
            <CoachList coaches={coaches} />
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

const mapStateToProps = (state: ApplicationState) => {
  const user = state.user ? state.user.profile : undefined;
  return {
    ...state.coaching,
    user: user,
  };
};

export default connect(
  mapStateToProps,
  CoachingStore.actionCreators
)(Coaching as any);
