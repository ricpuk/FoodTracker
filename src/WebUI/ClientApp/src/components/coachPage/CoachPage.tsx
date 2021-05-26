import React, { useState } from "react";
import Loader from "../loader/Loader";
import { RouteComponentProps } from "react-router";
import Profile from "../profile/Profile";
import { UserProfile } from "../../store/User";
import API from "../../utils/api";
import Toaster from "../../utils/toaster";
import { AxiosError } from "axios";

type PathParamsType = {
  coachId: string;
};

type CoachPageProps = RouteComponentProps<PathParamsType>;

const CoachPage = (props: CoachPageProps) => {
  const [loading, setLoading] = useState(true);
  const [coachProfile, setCoachProfile] = useState<UserProfile>();
  const { coachId } = props.match.params;

  React.useEffect(() => {
    setLoading(true);
    API.get(`api/coaches/${coachId}`)
      .then((response) => {
        const { data } = response;
        setCoachProfile(data);
      })
      .catch((err: Error | AxiosError) => {
        Toaster.error("Error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coachId]);

  const renderProfile = () => {
    if (!coachProfile) {
      return null;
    }
    return <Profile profile={coachProfile} viewMode="coach-preview" />;
  };

  return (
    <div>
      <Loader isLoading={loading}>{renderProfile()}</Loader>
    </div>
  );
};

export default CoachPage;
