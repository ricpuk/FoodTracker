import classnames from "classnames";
import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Spinner } from "reactstrap";
import { UserGoals } from "../../store/User";

interface DailySumamryProps {
  isLoading: boolean;
  goals?: UserGoals;
  calories: number;
}

const DailySummary = (props: DailySumamryProps) => {
  const { isLoading, goals, calories } = props;

  const renderGoalsCalories = () => {
    if (isLoading) {
      return <Spinner size="sm" color="primary" />;
    }
    if (!goals) {
      return "Error";
    }
    return goals.caloriesGoal;
  };

  const renderGoalsRemainingCalories = (value: number) => {
    if (isLoading) {
      return <Spinner size="sm" color="primary" />;
    }
    if (!goals) {
      return "Error";
    }
    const result = Math.round(goals.caloriesGoal - value);
    return (
      <span
        className={classnames({
          "text-danger": result < 0,
          "text-success": result >= 0,
          "font-weight-bold": true,
        })}
      >
        {result}
      </span>
    );
  };

  const renderGoalsConsumedCalories = (value: number) => {
    if (isLoading) {
      return <Spinner size="sm" color="primary" />;
    }
    return Math.round(value);
  };

  return (
    <Card className="mt-3">
      <CardHeader tag="h5">Calories</CardHeader>
      <CardBody>
        <Row noGutters={true} className="mb-2">
          <Col xs="4" className="text-center">
            {renderGoalsCalories()}
          </Col>
          <Col xs="4" className="text-center">
            {renderGoalsConsumedCalories(calories)}
          </Col>
          <Col xs="4" className="text-center">
            {renderGoalsRemainingCalories(calories)}
          </Col>
        </Row>
        <Row noGutters={true}>
          <Col xs="4" className="text-center">
            <h6>Goal</h6>
          </Col>
          <Col xs="4" className="text-center">
            <h6>Consumed</h6>
          </Col>
          <Col xs="4" className="text-center">
            <h6>Remaining</h6>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DailySummary;
