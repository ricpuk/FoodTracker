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

  return (
    <div>
      <Loader isLoading={clientsLoading}>
        {renderDailySummary()}
        {renderDatePicker()}
        <DiaryContent diary={clientDiary} />
        {/* <WidgetsContainer interactive={false} /> */}
      </Loader>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.coaching,
  CoachingStore.actionCreators
)(ClientPage as any);
