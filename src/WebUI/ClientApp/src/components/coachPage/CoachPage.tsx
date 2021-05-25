import React, { useState } from "react";
import Loader from "../loader/Loader";
import { RouteComponentProps } from "react-router";
import Profile from "../profile/Profile";
import { UserProfile } from "../../store/User";

type PathParamsType = {
  coachId: string;
};

type CoachPageProps = RouteComponentProps<PathParamsType>;

const CoachPage = (props: CoachPageProps) => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coachProfile, setCoachProfile] = useState<UserProfile>();
  const { coachId } = props.match.params;

  React.useEffect(() => {}, [coachId]);

  const toggleGoals = () => {
    setGoalsOpen(!goalsOpen);
  };

  const renderProfile = () => {
    if (!coachProfile) {
      return null;
    }
    return (
      <Profile
        profile={coachProfile}
        viewMode="coach"
        secondaryClick={toggleGoals}
      />
    );
  };

  return (
    <div>
      <Loader isLoading={loading}>{renderProfile()}</Loader>
    </div>
  );
};

export default CoachPage;
