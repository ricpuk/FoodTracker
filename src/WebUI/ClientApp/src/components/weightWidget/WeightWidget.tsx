import React, { ChangeEvent, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Progress,
  Row,
  Spinner,
} from "reactstrap";

interface WeightWidgetProps {
  goalFrom?: number;
  goalTo?: number;
  currentWeight?: number;
  onUpdated: (weight: number) => void;
  isLoading: boolean;
  interactive: boolean;
}

const WeightWidget = (props: WeightWidgetProps) => {
  const { goalFrom, goalTo, currentWeight, onUpdated, interactive } = props;
  const [weight, setWeight] = useState(currentWeight);

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setWeight(Number(value));
  };

  const handleSubmit = () => {
    if (!weight || isNaN(weight)) {
      return;
    }
    onUpdated(weight);
  };

  const renderWeightText = () => {
    return <h6 className="text-center">{weightText()}</h6>;
  };

  const weightText = () => {
    if (currentWeight) {
      return `Current weight: ${currentWeight} kg`;
    }
    if (interactive) {
      return "Enter your weight";
    }
    return "No weight provided";
  };

  const renderProgress = () => {
    if (!goalFrom || !goalTo || !currentWeight) {
      return null;
    }

    const desired = Math.abs(goalTo - goalFrom);
    const change = Math.abs(currentWeight - goalFrom);

    return (
      <div className="d-flex mb-2">
        <span className="mr-2">{goalFrom}</span>
        <div className="flex-grow-1 m-auto">
          <Progress color="primary" value={change} max={desired} />
        </div>
        <span className="ml-2">{goalTo}</span>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <React.Fragment>
        {interactive && (
          <Alert color="info">Enter your weigh in for today.</Alert>
        )}
        {renderProgress()}
        {renderWeightText()}
        {interactive && (
          <Row className="m-0 mt-3" noGutters={true}>
            <Col xs="8">
              <InputGroup className="w-100">
                <Input
                  type="number"
                  className="w-100"
                  min={1}
                  max={9999}
                  value={weight}
                  onChange={handleWeightChange}
                  disabled={props.isLoading}
                />
                <InputGroupAddon addonType="append">kg</InputGroupAddon>
              </InputGroup>
            </Col>
            <Col xs="4" className="pl-3">
              <Button
                onClick={handleSubmit}
                color="primary"
                className="w-100"
                disabled={props.isLoading}
              >
                {props.isLoading ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  };

  return (
    <Card className="mb-3">
      <CardHeader tag="h5">Weight</CardHeader>
      <CardBody>{renderBody()}</CardBody>
    </Card>
  );
};

export default WeightWidget;
