import classnames from "classnames";
import React, { useEffect, useState } from "react";
import * as CoachingStore from "../../store/Coaching";
import { Nav, TabContent, TabPane, NavItem, NavLink } from "reactstrap";
import { ApplicationState } from "../../store";
import { connect, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCoaches(1);
  }, [fetchCoaches]);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const removeCoach = () => {
    props.removeCoach();
  };

  const renderCoachTab = () => {
    return user.trainer ? (
      <Profile
        profile={user.trainer}
        viewMode="coach"
        secondaryClick={removeCoach}
      />
    ) : (
      <CoachList coaches={coaches} />
    );
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
          {TAB_COACH === activeTab && renderCoachTab()}
        </TabPane>
        <TabPane tabId={TAB_CLIENTS} className="p-3">
          {TAB_CLIENTS === activeTab && <Clients />}
        </TabPane>
        <TabPane tabId={TAB_REQUESTS}>
          {TAB_REQUESTS === activeTab && <CoachingRequests />}
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
