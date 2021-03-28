import React, { ChangeEvent, useState } from "react";
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
  Spinner,
} from "reactstrap";

interface WaterIntakeWidgetProps {
  currentIntake?: number;
  goalIntake?: number;
  onUpdated: (amount: number) => void;
  isLoading: boolean;
  interactive: boolean;
}

const WaterIntakeWidget = (props: WaterIntakeWidgetProps) => {
  const { currentIntake, goalIntake, onUpdated, interactive } = props;
  const waterPortions = [100, 200, 300, 400, 600, 800, 1000, 1500, 2000];
  const [intake, setIntake] = useState<number>();

  const renderButtons = () => {
    return waterPortions.map((x) => (
      <Button
        outline
        color="primary"
        className="mb-2 mr-2"
        onClick={() => {
          onUpdated(x);
        }}
      >
        {x} ml
      </Button>
    ));
  };

  const handleSubmit = () => {
    if (!intake || isNaN(intake)) {
      return;
    }
    onUpdated(intake);
    setIntake(undefined);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setIntake(Number(value));
  };

  const renderHeader = () => {
    let intakeString = `${currentIntake}`;
    if (goalIntake) {
      intakeString += `/${goalIntake}`;
    }
    return <h6 className="text-center mt-2">{intakeString} ml</h6>;
  };

  const renderError = () => (
    <Alert color="danger">
      Something went wrong, we couldn't load your current water intake. Please
      try again later.
    </Alert>
  );

  const renderBody = () => (
    <React.Fragment>
      <Progress
        color="primary"
        value={currentIntake}
        max={goalIntake ? goalIntake : currentIntake}
      />
      {renderHeader()}
      {interactive && (
        <React.Fragment>
          <CardTitle>Log water intake</CardTitle>
          <div className="d-flex flex-wrap justify-content-space-between">
            {renderButtons()}
          </div>
          <Row className="m-0 mt-3" noGutters={true}>
            <Col xs="8">
              <InputGroup className="w-100">
                <Input
                  type="number"
                  className="w-100"
                  min={1}
                  max={9999}
                  value={intake}
                  placeholder="400"
                  disabled={props.isLoading}
                  onChange={handleChange}
                />
                <InputGroupAddon addonType="append">ml</InputGroupAddon>
              </InputGroup>
            </Col>
            <Col xs="4" className="pl-3">
              <Button
                color="primary"
                className="w-100"
                disabled={props.isLoading}
                onClick={handleSubmit}
              >
                {props.isLoading ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  return (
    <Card className="mb-3">
      <CardHeader tag="h5">Water intake</CardHeader>
      <CardBody>
        {typeof currentIntake !== "undefined" ? renderBody() : renderError()}
      </CardBody>
    </Card>
  );
};

export default WaterIntakeWidget;
