import React from "react";
import { Col, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import WeightWidget from "../weightWidget/WeightWidget";
import * as DiariesStore from "../../store/Diaries";
import * as UserStore from "../../store/User";
import { connect } from "react-redux";
import WaterIntakeWidget from "../waterIntakeWidget/WaterIntakeWidget";

type WidgetContainerProps = {
  diary: DiariesStore.Diary;
  userProfile: UserStore.UserProfile;
} & typeof DiariesStore.actionCreators & {
    isWaterLoading: boolean;
    isWeightLoading: boolean;
  };

const WidgetsContainer = (props: WidgetContainerProps) => {
  const userProfile = props.userProfile;
  const { startingWeight, currentWeight, weightGoal, waterGoal } = userProfile
    ? userProfile
    : {
        startingWeight: undefined,
        currentWeight: undefined,
        weightGoal: undefined,
        waterGoal: undefined,
      };
  const { weight, waterIntake } = props.diary
    ? props.diary
    : { weight: currentWeight, waterIntake: undefined };

  return (
    <Row>
      <Col md="6">
        <WaterIntakeWidget
          goalIntake={waterGoal}
          currentIntake={waterIntake}
          onUpdated={(amount: number) =>
            props.logWater(props.diary.date, amount)
          }
          isLoading={props.isWaterLoading}
        />
      </Col>
      <Col md="6">
        <WeightWidget
          currentWeight={weight}
          goalFrom={startingWeight}
          goalTo={weightGoal}
          onUpdated={(amount: number) => {
            props.logWeight(props.diary.date, amount);
          }}
          isLoading={props.isWeightLoading}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  const { diaries, user } = state;
  let diary;
  let userProfile;
  if (diaries) {
    diary = diaries.diaries[diaries.date];
  }
  if (user) {
    userProfile = user.profile;
  }
  return {
    diary: diary,
    isWaterLoading: diaries ? diaries.isWaterLoading : true,
    isWeightLoading: diaries ? diaries.isWeightLoading : true,
    userProfile: userProfile,
  };
};

export default connect(
  mapStateToProps,
  DiariesStore.actionCreators
)(WidgetsContainer as any);
