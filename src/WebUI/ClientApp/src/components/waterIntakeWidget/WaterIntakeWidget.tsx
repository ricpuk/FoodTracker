import { go } from "connected-react-router";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  CardTitle,
  Button,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Alert,
} from "reactstrap";

interface WaterIntakeWidgetProps {
  currentIntake?: number;
  goalIntake?: number;
}

const WaterIntakeWidget = (props: WaterIntakeWidgetProps) => {
  const { currentIntake, goalIntake } = props;
  const waterPortions = [100, 200, 300, 400, 600, 800, 1000, 1500, 2000];

  const renderButtons = () => {
    return waterPortions.map((x) => (
      <Button outline color="primary" className="mb-2 mr-2">
        {x} ml
      </Button>
    ));
  };

  const renderHeader = () => {
    let intakeString = `${currentIntake}`;
    if (goalIntake) {
      intakeString += `/${goalIntake} ml`;
    }
    return <h6 className="text-center mt-2">{intakeString}</h6>;
  };

  if (!currentIntake) {
    return (
      <Alert color="danger">
        Something went wrong, we couldn't load your current water intake. Please
        try again later.
      </Alert>
    );
  }

  return (
    <Card className="mb-3">
      <CardHeader tag="h5">Water intake</CardHeader>
      <CardBody>
        <Progress
          color="primary"
          value={currentIntake}
          max={goalIntake ? goalIntake : currentIntake}
        />
        {renderHeader()}
        <CardTitle>Log water intake</CardTitle>
        <div className="d-flex flex-wrap justify-content-space-between">
          {renderButtons()}
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
  );
};

export default WaterIntakeWidget;
