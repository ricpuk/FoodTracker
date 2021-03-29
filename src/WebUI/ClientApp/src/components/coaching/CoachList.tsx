import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { CoachInfo } from "../../store/Coaching";
import * as CoachingStore from "../../store/Coaching";

interface CoachListProps {
  coaches: CoachInfo[];
}
const CoachList = (props: CoachListProps) => {
  const dispatch = useDispatch();
  const { coaches } = props;
  const {
    revokeCoachingRequest,
    requestCoaching,
  } = CoachingStore.actionCreators;

  const handleClick = (coach: CoachingStore.CoachInfo) => {
    if (coach.coachingRequested) {
      return dispatch(revokeCoachingRequest(coach));
    }
    dispatch(requestCoaching(coach));
  };

  const renderCoach = (coach: CoachingStore.CoachInfo) => (
    <Col sm="6" lg="4" key={`${coach.id}`}>
      <Card className="mb-3">
        <img
          src="https://via.placeholder.com/340x120/FFA07A/000000"
          alt="Cover"
          className="card-img-top"
        />
        <CardBody>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            style={{ width: 100, marginTop: -65 }}
            alt="User"
            className="img-fluid img-thumbnail rounded-circle d-flex mr-auto ml-auto"
          />
          <CardTitle tag="h4" className="text-center mt-2">
            {coach.firstName} {coach.lastName}
          </CardTitle>
          <CardSubtitle className="text-secondary mb-1 text-center">
            {coach.shortDescription}
          </CardSubtitle>
          <CardSubtitle className="text-muted font-size-lg text-center">
            {coach.numberOfClients ? coach.numberOfClients : "No"} clients
          </CardSubtitle>
          <Button
            color={coach.coachingRequested ? "warning" : "primary"}
            className="w-100 mt-2"
            outline
            onClick={() => handleClick(coach)}
          >
            {coach.coachingRequested ? "Revoke request" : "Request coaching"}
          </Button>
        </CardBody>
      </Card>
    </Col>
  );

  return <Row>{coaches.map((coach) => renderCoach(coach))}</Row>;
};

export default CoachList;
