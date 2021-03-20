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
} from "reactstrap";
import { ApplicationState } from "../../store";
import classnames from "classnames";
import { useAppParams } from "../../utils/hooks";

interface GoalsFormOwnProps {
  initial: boolean;
  isOpen: boolean;
  toggle: () => void;
}

type GoalsFormProps = UserStore.UserState &
  typeof UserStore.actionCreators &
  GoalsFormOwnProps;

enum NutrientNames {
  Carbs = "carbs",
  Protein = "protein",
  Fat = "Fat",
}

const GoalsForm = (props: GoalsFormProps) => {
  const { initial, isOpen, toggle } = props;
  const [carbs, setCarbs] = useState(50);
  const [protein, setProtein] = useState(30);
  const [fat, setFat] = useState(20);
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
      case NutrientNames.Carbs:
        setCarbs(valueParsed);
        break;
      case NutrientNames.Fat:
        setFat(valueParsed);
        break;
      case NutrientNames.Protein:
        setProtein(valueParsed);
        break;
    }
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
          Calories
        </Col>
        <Col xs="4">
          <Input
            type="number"
            placeholder="1500"
            className="border-0 no-hov p-0 text-right"
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
              name={NutrientNames.Carbs}
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
              name={NutrientNames.Protein}
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
              name={NutrientNames.Fat}
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

  return (
    <Modal isOpen={isOpen} className={classnames(classBindings)}>
      <ModalHeader>Set your goals</ModalHeader>
      <ModalBody>
        {renderInfoBadge()}
        {renderForm()}
        {renderSummary()}
        <Button color="primary" disabled={!isValid()} className="mt-3 w-100">
          Submit
        </Button>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (
  state: ApplicationState,
  ownProps: GoalsFormOwnProps
) => {
  return { ...state, ...ownProps };
};

export default connect(
  mapStateToProps,
  UserStore.actionCreators
)(GoalsForm as any);
