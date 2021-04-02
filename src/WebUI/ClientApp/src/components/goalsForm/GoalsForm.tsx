import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import * as UserStore from "../../store/User";
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { ApplicationState } from "../../store";
import classnames from "classnames";
import { useAppParams } from "../../utils/hooks";
import API, { API_USER_GOALS } from "../../utils/api";
import { history } from "../../index";

interface GoalsFormOwnProps {
  goals?: UserStore.UserGoals;
  initial: boolean;
  isOpen: boolean;
  toggle: () => void;
  type: "personal" | "client";
}

type GoalsFormProps = UserStore.UserState &
  typeof UserStore.actionCreators &
  GoalsFormOwnProps;

enum FormNames {
  Carbs = "carbs",
  Protein = "protein",
  Fat = "Fat",
  Calories = "calories",
  CurrentWeight = "currentWeight",
  TargetWeight = "targetWeight",
  WaterIntake = "waterIntake",
}

const GoalsForm = (props: GoalsFormProps) => {
  const { initial, isOpen, toggle, goals } = props;
  const deconstructGoals = () => {
    if (!goals) {
      return undefined;
    }
    const { caloriesGoal, proteinGoal, carbohydratesGoal, fatsGoal } = goals;
    return {
      carbs: Math.round(((carbohydratesGoal * 4) / caloriesGoal) * 100),
      fats: Math.round(((fatsGoal * 9) / caloriesGoal) * 100),
      proteins: Math.round(((proteinGoal * 4) / caloriesGoal) * 100),
    };
  };
  const deconstructed = deconstructGoals();
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState(goals ? goals.caloriesGoal : 1800);
  const [carbs, setCarbs] = useState(deconstructed ? deconstructed.carbs : 50);
  const [protein, setProtein] = useState(
    deconstructed ? deconstructed.proteins : 30
  );
  const [currentWeight, setCurrentWeight] = useState(
    goals ? goals.startingWeight : 0
  );
  const [targetWeight, setTargetWeight] = useState(
    goals ? goals.weightGoal : 0
  );
  const [waterIntage, setWaterIntake] = useState(
    goals ? goals.waterGoal : 2000
  );
  const [fat, setFat] = useState(deconstructed ? deconstructed.fats : 20);
  const [isMobile] = useAppParams();

  const totalPercentage = () => {
    return carbs + protein + fat;
  };

  const isValid = () => totalPercentage() == 100;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;
    const valueParsed = Number(value);
    switch (name) {
      case FormNames.Carbs:
        setCarbs(valueParsed);
        break;
      case FormNames.Fat:
        setFat(valueParsed);
        break;
      case FormNames.Protein:
        setProtein(valueParsed);
        break;
      case FormNames.Calories:
        setCalories(valueParsed);
        break;
      case FormNames.CurrentWeight:
        setCurrentWeight(valueParsed);
        break;
      case FormNames.TargetWeight:
        setTargetWeight(valueParsed);
        break;
      case FormNames.WaterIntake:
        setWaterIntake(valueParsed);
        break;
    }
  };

  const submit = () => {
    setLoading(true);
    const goals = constructGoals();
    const request = {
      goals,
    };
    const url = props.type === "personal" ? API_USER_GOALS : "client url";
    API.post<UserStore.UserGoals>(url, request)
      .then((response) => {
        const { data } = response;
        if (props.type === "personal") {
          props.setUserGoals(data);
        } else {
          //set client goals
        }
      })
      .finally(() => {
        setLoading(false);
        toggle();
        if (initial) {
          history.push("/diary");
        }
      });
  };

  const constructGoals = () => {
    const caloriesFromCarbs = (calories * carbs) / 100;
    const caloriesFromFat = (calories * fat) / 100;
    const caloriesFromProtein = (calories * protein) / 100;
    const result: UserStore.UserGoals = {
      id: 0,
      caloriesGoal: calories,
      carbohydratesGoal: Math.round(caloriesFromCarbs / 4),
      proteinGoal: Math.round(caloriesFromProtein / 4),
      fatsGoal: Math.round(caloriesFromFat / 9),
      waterGoal: waterIntage,
      startingWeight: currentWeight,
      weightGoal: targetWeight,
    };

    debugger;
    return result;
  };

  const classBindings = {
    "full-screen": isMobile,
  };

  const totalPercentageBindings = {
    "m-0": true,
    "text-danger": !isValid(),
  };

  const renderInfoBadge = () => {
    if (!initial) {
      return null;
    }
    return (
      <Alert color="info">
        Before we continue, please fill out your initial nutritional goals.
      </Alert>
    );
  };
  const renderForm = () => (
    <React.Fragment>
      <Row className="border-bottom px-3">
        <Col xs="8" className="d-flex flex-column justify-content-center">
          Starting weight (kg)
        </Col>
        <Col xs="4">
          <Input
            type="number"
            className="border-0 no-hov p-0 text-right"
            placeholder="82"
            value={currentWeight}
            name={FormNames.CurrentWeight}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="border-bottom px-3">
        <Col xs="8" className="d-flex flex-column justify-content-center">
          Target weight (kg)
        </Col>
        <Col xs="4">
          <Input
            type="number"
            className="border-0 no-hov p-0 text-right"
            placeholder="82"
            value={targetWeight}
            name={FormNames.TargetWeight}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="border-bottom px-3">
        <Col xs="8" className="d-flex flex-column justify-content-center">
          Water intake (ml)
        </Col>
        <Col xs="4">
          <Input
            type="number"
            className="border-0 no-hov p-0 text-right"
            placeholder="82"
            value={waterIntage}
            name={FormNames.WaterIntake}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="border-bottom px-3">
        <Col xs="8" className="d-flex flex-column justify-content-center">
          Calories
        </Col>
        <Col xs="4">
          <Input
            type="number"
            placeholder="1500"
            className="border-0 no-hov p-0 text-right"
            value={calories}
            name={FormNames.Calories}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs="4" className="text-center">
          Carbs
        </Col>
        <Col xs="4" className="text-center">
          Protein
        </Col>
        <Col xs="4" className="text-center">
          Fat
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs="4" className="text-center">
          <InputGroup>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="50"
              value={carbs}
              name={FormNames.Carbs}
              onChange={handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="px-2">%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col xs="4" className="text-center">
          <InputGroup>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="30"
              value={protein}
              name={FormNames.Protein}
              onChange={handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="px-2">%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col xs="4" className="text-center">
          <InputGroup>
            <Input
              type="number"
              min={0}
              max={100}
              placeholder="20"
              value={fat}
              name={FormNames.Fat}
              onChange={handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="px-2">%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </React.Fragment>
  );

  const renderSummary = () => (
    <Row className="border-bottom px-3 py-2 border-top mt-3">
      <Col xs="8" className="d-flex flex-column justify-content-center">
        <h5 className="m-0">Total %</h5>
        Must be equal to 100%
      </Col>
      <Col xs="4" className="text-right">
        <div className="d-flex flex-column justify-content-center h-100">
          <h5 className={classnames(totalPercentageBindings)}>
            {totalPercentage()}%
          </h5>
        </div>
      </Col>
    </Row>
  );

  const toggleInner = () => {
    if (initial) {
      return;
    }
    toggle();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleInner}
      className={classnames(classBindings)}
    >
      {initial ? (
        <ModalHeader>Set your starting goals</ModalHeader>
      ) : (
        <ModalHeader toggle={toggleInner}>Set goals</ModalHeader>
      )}

      <ModalBody>
        {renderInfoBadge()}
        {renderForm()}
        {renderSummary()}
        <Button
          color="primary"
          disabled={!isValid() || loading}
          className="mt-3 w-100"
          onClick={submit}
        >
          {loading ? <Spinner color="light" /> : "Submit"}
        </Button>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (
  state: ApplicationState,
  ownProps: GoalsFormOwnProps
) => {
  return { ...state.user, ...ownProps };
};

export default connect(
  mapStateToProps,
  UserStore.actionCreators
)(GoalsForm as any);
