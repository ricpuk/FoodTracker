import React from "react";
import { connect } from "react-redux";

import { ApplicationState } from "../../store";
import DatePicker from "../datePicker/datePicker";
import * as DiariesStore from "../../store/Diaries";
import * as UserStore from "../../store/User";
import Loader from "../loader/Loader";
import "./Diary.css";
import CaloriesBreakdown from "../caloriesBreakdown/CaloriesBreakdown";
import WidgetsContainer from "../widgetsContainer/WidgetsContainer";
import DailySummary from "../daliySummary/DailySummary";
import DiaryContent from "../diaryContent/DiaryContent";
import { getTotalNutrientsConsumed } from "../../utils/nutritionHelper";

// type DiaryProps = DiariesStore.DiariesState &
//   typeof DiariesStore.actionCreators;

type DiaryProps = DiariesStore.DiariesState & {
  user: UserStore.UserState;
} & typeof DiariesStore.actionCreators &
  typeof UserStore.actionCreators;

const Diary = (props: DiaryProps) => {
  const { fetchUserGoals, date, requestDiary } = props;

  React.useEffect(() => {
    fetchUserGoals();
    if (!date) {
      const date = new Date().toISOString().split("T")[0];
      requestDiary(date);
    }
  }, [date, fetchUserGoals, requestDiary]);

  const getGoals = () => {
    const diary = props.diaries[props.date];
    if (!diary) {
      return props.user.goals;
    }
    const { userGoals } = diary;
    if (!userGoals) {
      return props.user.goals;
    }
    return userGoals;
  };

  const renderDailySummary = () => {
    const diary = props.diaries[props.date];

    const {
      remaining,
      protein,
      fats,
      carbs,
      calories,
    } = getTotalNutrientsConsumed(diary);
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
          isLoading={props.user.isLoading || props.isLoading}
        />
      </div>
    );
  };
  const renderDatePicker = () => (
    <div className="my-2">
      <DatePicker date={props.date} dateSelected={requestDiary} />
    </div>
  );

  const getDiary = () => {
    return props.diaries[props.date];
  };

  const toggleModal = (diaryEntry?: DiariesStore.DiaryEntry) => {
    if (!diaryEntry) {
      return props.toggleModalState();
    }
    props.toggleModalStateForEdit(diaryEntry);
  };

  const currentDiary = getDiary();

  return (
    <div>
      <Loader isLoading={props.isLoading}>
        {renderDatePicker()}
        {renderDailySummary()}
        <DiaryContent
          diary={currentDiary}
          toggleModal={toggleModal}
          interactive={true}
        />
        <WidgetsContainer
          diary={currentDiary}
          userProfile={props.user.profile}
          interactive={true}
        />
      </Loader>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    ...state.diaries,
    user: state.user,
  };
};

const mapActionsToProps = {
  ...DiariesStore.actionCreators,
  ...UserStore.actionCreators,
};

export default connect(
  mapStateToProps, // Selects which state properties are merged into the component's props
  mapActionsToProps
)(Diary as any); // eslint-disable-line @typescript-eslint/no-explicit-any
