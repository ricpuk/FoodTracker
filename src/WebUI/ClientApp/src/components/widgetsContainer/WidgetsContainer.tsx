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

type WidgetContainerProps = {
  diary: DiariesStore.Diary;
  userProfile: UserStore.UserProfile;
} & typeof DiariesStore.actionCreators;

const WidgetsContainer = (props: WidgetContainerProps) => {
  const userProfile = props.userProfile;
  const { startingWeight, currentWeight, weightGoal } = userProfile
    ? userProfile
    : {
        startingWeight: undefined,
        currentWeight: undefined,
        weightGoal: undefined,
      };
  const weight = props.diary ? props.diary.weight : currentWeight;

  return (
    <Row>
      <Col md="6">
        <Card className="mb-3">
          <CardHeader tag="h5">Water intake</CardHeader>
          <CardBody>
            <Progress color="primary" value={500} max={2000} />
            <h6 className="text-center mt-2">500/2000 ml</h6>
            <CardTitle>Log water intake</CardTitle>
            <div className="d-flex flex-wrap justify-content-space-between">
              <Button outline color="primary" className="mb-2 mr-2">
                100ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                200ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                300ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                400ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                600ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                800ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                1000ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                1500ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                2000ml
              </Button>
            </div>
            <Row className="m-0 mt-3" noGutters={true}>
              <Col xs="8">
                <InputGroup className="w-100">
                  <Input type="number" className="w-100" min={1} max={9999} />
                  <InputGroupAddon addonType="append">ml</InputGroupAddon>
                </InputGroup>
              </Col>
              <Col xs="4" className="pl-3">
                <Button color="primary" className="w-100">
                  Submit
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
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
