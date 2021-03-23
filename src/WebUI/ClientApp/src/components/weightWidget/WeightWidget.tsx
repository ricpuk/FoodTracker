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
} from "reactstrap";

interface WeightWidgetProps {
  goalFrom?: number;
  goalTo?: number;
  currentWeight?: number;
  onUpdated: (weight: number) => void;
}

const WeightWidget = (props: WeightWidgetProps) => {
  const { goalFrom, goalTo, currentWeight, onUpdated } = props;
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

  if (!weight || goalTo || currentWeight) {
    return (
      <Alert color="danger">
        Weight widget could not be displayed because you have not entered
        information related to your weight. Please enter: starting weight,
        current weight and your goal weight
      </Alert>
    );
  }

  return (
    <Card className="mb-3">
      <CardHeader tag="h5">Weight</CardHeader>
      <CardBody>
        <div className="d-flex mb-2">
          <span className="mr-2">{goalFrom}</span>
          <div className="flex-grow-1 m-auto">
            <Progress color="primary" value={500} max={2000} />
          </div>
          <span className="ml-2">{goalTo}</span>
        </div>
        <h6 className="text-center">Current weight: {currentWeight} kg</h6>
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
              />
              <InputGroupAddon addonType="append">kg</InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xs="4" className="pl-3">
            <Button onClick={handleSubmit} color="primary" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WeightWidget;
