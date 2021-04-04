import React, { useState } from "react";
import * as CoachingStore from "../../store/Coaching";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import { RouteComponentProps } from "react-router";
import GoalsForm from "../goalsForm/GoalsForm";
import Profile from "../profile/Profile";

type PathParamsType = {
  clientId: string;
};

type ClientPageProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators &
  RouteComponentProps<PathParamsType>;

const ClientPage = (props: ClientPageProps) => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const { clientId } = props.match.params;
  const { clientsLoading, currentClient, fetchClientById } = props;

  React.useEffect(() => {
    fetchClientById(clientId);
  }, [clientId, fetchClientById]);

  const toggleGoals = () => {
    setGoalsOpen(!goalsOpen);
  };

  const renderClientProfile = () => {
    if (!currentClient) {
      return null;
    }
    return (
      <Profile
        profile={currentClient}
        viewMode="client"
        secondaryClick={toggleGoals}
      />
    );
  };

  return (
    <div>
      <Loader isLoading={clientsLoading}>{renderClientProfile()}</Loader>
      <GoalsForm
        initial={false}
        isOpen={goalsOpen}
        toggle={toggleGoals}
        goals={currentClient ? currentClient.goals : undefined}
        type="client"
      />
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(ClientPage as any);
