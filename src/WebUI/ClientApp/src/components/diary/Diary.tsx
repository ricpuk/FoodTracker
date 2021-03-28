import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import { ApplicationState } from "../../store";
import DatePicker from "../datePicker/datePicker";
import DiarySection from "../diarySection/DiarySection";
import * as DiariesStore from "../../store/Diaries";
import * as UserStore from "../../store/User";
import Loader from "../loader/Loader";
import "./Diary.css";
import AddDiaryEntryForm from "../addDiaryEntry/AddDiaryEntryForm";
import CaloriesBreakdown from "../caloriesBreakdown/CaloriesBreakdown";
import WidgetsContainer from "../widgetsContainer/WidgetsContainer";
import DailySummary from "../daliySummary/DailySummary";
import DiaryContent from "../diaryContent/DiaryContent";

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

  const getTotalNutrientsConsumed = () => {
    const diary = props.diaries[props.date];
    if (!diary) {
      return {
        remaining: 100,
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
      };
    }
    const result = diary.entries.reduce(
      (total, value) => {
        const { product, servingId, numberOfServings } = value;
        const index = product.servings.findIndex((x) => x.id === servingId);
        if (index === -1) {
          return total;
        }
        const serving = product.servings[index];

        return {
          remaining: 0,
          protein: total.protein + serving.protein * numberOfServings,
          fats: total.fats + serving.fats * numberOfServings,
          carbs: total.carbs + serving.carbohydrates * numberOfServings,
          calories: total.calories + serving.calories * numberOfServings,
        };
      },
      {
        remaining: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
      }
    );

    return result;
  };

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
    const {
      remaining,
      protein,
      fats,
      carbs,
      calories,
    } = getTotalNutrientsConsumed();
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

  return (
    <div>
      <Loader isLoading={props.isLoading}>
        {renderDailySummary()}
        {renderDatePicker()}
        <DiaryContent diary={getDiary()} toggleModal={toggleModal} />
        <WidgetsContainer interactive={true} />
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
