import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import { ApplicationState } from "../../store";
import Profile from "../profile/Profile";
import * as UserStore from "../../store/User";
import GoalsForm from "../goalsForm/GoalsForm";
import EditProfile from "../editProfile/EditProfile";

type ProfilePageProps = UserStore.UserState & typeof UserStore.actionCreators;

const ProfilePage = (props: ProfilePageProps) => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const { toggleProfileModal } = props;
  const profile = useSelector((state: ApplicationState) => {
    if (!state.user || !state.user.profile) {
      return undefined;
    }
    return state.user.profile;
  });

  const toggleGoals = () => {
    setGoalsOpen(!goalsOpen);
  };

  const editProfile = () => {
    toggleProfileModal();
  };

  if (!profile) {
    return (
      <Alert color="danger">There was an error fetching your profile.</Alert>
    );
  }
  return (
    <React.Fragment>
      <Profile
        profile={profile}
        viewMode="me"
        primaryClick={editProfile}
        secondaryClick={toggleGoals}
      />
      <GoalsForm
        goals={profile.goals}
        initial={false}
        isOpen={goalsOpen}
        toggle={toggleGoals}
        type="personal"
      />
      <EditProfile />
    </React.Fragment>
  );
};

export default connect(
  (state: ApplicationState) => state.application,
  UserStore.actionCreators
)(ProfilePage as any);
