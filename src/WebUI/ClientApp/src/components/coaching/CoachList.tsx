import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import * as CoachingStore from "../../store/Coaching";
import { UserProfile } from "../../store/User";
import LinkButton from "../linkButton/LinkButton";

interface CoachListProps {
  coaches: UserProfile[];
}
const CoachList = (props: CoachListProps) => {
  const dispatch = useDispatch();
  const { coaches } = props;
  const { revokeCoachingRequest, requestCoaching } =
    CoachingStore.actionCreators;

  const handleRequestClick = (coach: UserProfile) => {
    if (coach.coachingRequested) {
      return dispatch(revokeCoachingRequest(coach));
    }
    dispatch(requestCoaching(coach));
  };

  const renderCoach = (coach: UserProfile) => (
    <Col sm="6" lg="4" key={`${coach.id}`}>
      <Card className="mb-3">
        <CardHeader style={{ height: 50 }} />
        <CardBody>
          <img
            src={
              coach.profilePicture
                ? coach.profilePicture
                : require("../../assets/blank.png")
            }
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
          <LinkButton
            to={`coach/${coach.id}`}
            color={"success"}
            className="w-100 mt-2"
            text="View profile"
          />
          <Button
            color={coach.coachingRequested ? "warning" : "primary"}
            className="w-100 mt-2"
            outline
            onClick={() => handleRequestClick(coach)}
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
