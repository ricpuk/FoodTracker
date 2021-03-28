import React from "react";
import * as CoachingStore from "../../store/Coaching";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Loader from "../loader/Loader";
import { RouteComponentProps } from "react-router";
import { getTotalNutrientsConsumed } from "../../utils/nutritionHelper";
import CaloriesBreakdown from "../caloriesBreakdown/CaloriesBreakdown";
import DailySummary from "../daliySummary/DailySummary";
import WidgetsContainer from "../widgetsContainer/WidgetsContainer";
import DiaryContent from "../diaryContent/DiaryContent";
import DatePicker from "../datePicker/datePicker";
import { Alert, Media } from "reactstrap";

type PathParamsType = {
  clientId: string;
};

type ClientPageProps = CoachingStore.CoachingState &
  typeof CoachingStore.actionCreators &
  RouteComponentProps<PathParamsType>;

const ClientPage = (props: ClientPageProps) => {
  const { clientId } = props.match.params;
  const {
    clientsLoading,
    clientDiary,
    fetchClientDiary,
    clientDiaryDate,
    currentClient,
  } = props;

  React.useEffect(() => {
    if (!clientDiaryDate) {
      const date = new Date().toISOString().split("T")[0];
      fetchClientDiary(clientId, date);
    }
  }, [clientId, fetchClientDiary, clientDiaryDate]);

  const getGoals = () => {
    if (!clientDiary) {
      return;
    }
    return clientDiary.userGoals;
  };

  const renderDatePicker = () => (
    <div className="my-2">
      <DatePicker
        date={clientDiaryDate}
        dateSelected={(date: string) => fetchClientDiary(clientId, date)}
      />
    </div>
  );

  const renderDailySummary = () => {
    const {
      remaining,
      protein,
      fats,
      carbs,
      calories,
    } = getTotalNutrientsConsumed(clientDiary);
    return (
      <div className="my-3">
        <h4>Daily summary</h4>
        <CaloriesBreakdown
          prefix="daily"
          remaining={remaining}
          protein={protein}
          carbs={carbs}
          fats={fats}
        />
        <DailySummary
          calories={calories}
          goals={getGoals()}
          isLoading={clientsLoading}
        />
      </div>
    );
  };

  const renderClientProfile = () => {
    if (!currentClient) {
      return null;
    }
    return (
      <div className="d-flex">
        <Media
          left
          src="https://bootdey.com/img/Content/avatar/avatar2.png"
          style={{ width: 100 }}
        />
        <div className="flex-fill pl-3 pr-3">
          <div>
            <a href="#" className="text-dark font-weight-600">
              {currentClient.firstName} {currentClient.lastName}
            </a>
          </div>
          <div className="text-muted fs-13px">
            {currentClient.shortDescription}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Loader isLoading={clientsLoading}>
        {renderClientProfile()}
        {renderDatePicker()}
        {clientDiary ? (
          <React.Fragment>
            {renderDailySummary()}
            <DiaryContent diary={clientDiary} interactive={false} />
            <WidgetsContainer
              interactive={false}
              diary={clientDiary}
              userProfile={currentClient}
            />
          </React.Fragment>
        ) : (
          <Alert color="warning">
            Looks like your client is yet to start a diary for this day.
          </Alert>
        )}
      </Loader>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(ClientPage as any);
