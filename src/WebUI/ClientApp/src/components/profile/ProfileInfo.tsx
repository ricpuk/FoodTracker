import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { UserProfile } from "../../store/User";

interface ProfileInfoProps {
  profile: UserProfile;
}

const ProfileInfo = (props: ProfileInfoProps) => {
  const {
    firstName,
    lastName,
    shortDescription,
    fitnessPoints,
    numberOfClients,
  } = props.profile;
  return (
    <Card className="mb-3">
      <CardBody className="py-0">
        <Row className="py-3 border-bottom">
          <Col sm="4">
            <h5 className="mb-0">First name</h5>
          </Col>
          <Col sm="8" className="text-secondary">
            {firstName}
          </Col>
        </Row>
        <Row className="py-3 border-bottom">
          <Col sm="4">
            <h5 className="mb-0">Last name</h5>
          </Col>
          <Col sm="8" className="text-secondary">
            {lastName}
          </Col>
        </Row>
        <Row className="py-3 border-bottom">
          <Col sm="4">
            <h5 className="mb-0">Short description</h5>
          </Col>
          <Col sm="8" className="text-secondary">
            {shortDescription}
          </Col>
        </Row>
        <Row className="py-3 border-bottom">
          <Col sm="4">
            <h5 className="mb-0">Clients</h5>
          </Col>
          <Col sm="8" className="text-secondary">
            {numberOfClients}
          </Col>
        </Row>
        <Row className="py-3 border-bottom">
          <Col sm="4">
            <h5 className="mb-0">Fitness points</h5>
          </Col>
          <Col sm="8" className="text-secondary">
            {fitnessPoints}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
