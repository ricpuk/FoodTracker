import React from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Progress,
  Row,
} from "reactstrap";
import { ApplicationState } from "../../store";
import WeightWidget from "../weightWidget/WeightWidget";
import * as DiariesStore from "../../store/Diaries";
import * as UserStore from "../../store/User";
import { connect } from "react-redux";
import GoalsForm from "../goalsForm/GoalsForm";
import WaterIntakeWidget from "../waterIntakeWidget/WaterIntakeWidget";

type WidgetContainerProps = {
  diary: DiariesStore.Diary;
  userProfile: UserStore.UserProfile;
} & typeof DiariesStore.actionCreators;

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
  debugger;
  const { weight, waterIntake } = props.diary
    ? props.diary
    : { weight: currentWeight, waterIntake: undefined };

  return (
    <Row>
      <Col md="6">
        <WaterIntakeWidget goalIntake={waterGoal} currentIntake={waterIntake} />
      </Col>
      <Col md="6">
        <WeightWidget
          currentWeight={weight}
          goalFrom={startingWeight}
          goalTo={weightGoal}
          onUpdated={() => {}}
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
    userProfile: userProfile,
  };
};

export default connect(
  mapStateToProps,
  DiariesStore.actionCreators
)(WidgetsContainer as any);
