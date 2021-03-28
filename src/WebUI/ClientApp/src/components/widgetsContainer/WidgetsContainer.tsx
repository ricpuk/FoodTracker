import React from "react";
import { Col, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import WeightWidget from "../weightWidget/WeightWidget";
import * as DiariesStore from "../../store/Diaries";
import * as UserStore from "../../store/User";
import { connect } from "react-redux";
import WaterIntakeWidget from "../waterIntakeWidget/WaterIntakeWidget";

interface WidgetsContainerOwnProps {
  interactive: boolean;
  diary: DiariesStore.Diary;
  userProfile?: UserStore.UserProfile;
}

type WidgetContainerProps = typeof DiariesStore.actionCreators & {
  isWaterLoading: boolean;
  isWeightLoading: boolean;
} & WidgetsContainerOwnProps;

const WidgetsContainer = (props: WidgetContainerProps) => {
  const { userProfile, interactive } = props;
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
          interactive={interactive}
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
          interactive={interactive}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (
  state: ApplicationState,
  ownProps: WidgetsContainerOwnProps
) => {
  const { diaries } = state;
  return {
    isWaterLoading: diaries ? diaries.isWaterLoading : true,
    isWeightLoading: diaries ? diaries.isWeightLoading : true,
    interactive: ownProps.interactive,
    diary: ownProps.diary,
    userProfile: ownProps.userProfile,
  };
};

export default connect(
  mapStateToProps,
  DiariesStore.actionCreators
)(WidgetsContainer as any);
