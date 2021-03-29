import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { UserProfile } from "../../store/User";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiGlobe,
} from "react-icons/fi";
import CanvasJSReact from "../../lib/canvasjs.react";

interface ProfileProps {
  profile: UserProfile;
}

const Profile = (props: ProfileProps) => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    theme: "light2",
    axisX: {
      valueFormatString: "MM/DD",
    },
    data: [
      {
        type: "line",
        color: "blue",
        dataPoints: [{ x: new Date(2018, 0, 16), y: 86 }],
      },
    ],
    responsive: true,
  };
  const { profile } = props;
  const { firstName, lastName } = profile;
  return (
    <Row className="gutters-sm">
      <Col md="4" className="mb-3">
        <Card>
          <CardBody>
            <div className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
              <div className="mt-3">
                <h4>
                  {firstName} {lastName}
                </h4>
                <p className="text-secondary mb-1">
                  {profile.shortDescription}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-3">
          <ListGroup>
            <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <FiGlobe size={24} className="mr-2" />
                Website
              </h6>
              <span className="text-secondary">http://test.com</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <FiYoutube size={24} className="mr-2" />
                YouTube
              </h6>
              <span className="text-secondary">http://test.com</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <FiTwitter size={24} className="mr-2" />
                Twitter
              </h6>
              <span className="text-secondary">http://test.com</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <FiInstagram size={24} className="mr-2" />
                Instagram
              </h6>
              <span className="text-secondary">http://test.com</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <FiFacebook size={24} className="mr-2" />
                Facebook
              </h6>
              <span className="text-secondary">http://test.com</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col md="8">
        <Card className="mb-3">
          <CardBody className="py-0">
            <Row className="py-3 border-bottom">
              <Col sm="3">
                <h5 className="mb-0">First name</h5>
              </Col>
              <Col sm="9" className="text-secondary">
                Test
              </Col>
            </Row>
            <Row className="py-3 border-bottom">
              <Col sm="3">
                <h5 className="mb-0">Last name</h5>
              </Col>
              <Col sm="9" className="text-secondary">
                Test
              </Col>
            </Row>
            <Row className="py-3 border-bottom">
              <Col sm="3">
                <h5 className="mb-0">Clients</h5>
              </Col>
              <Col sm="9" className="text-secondary">
                Test
              </Col>
            </Row>
            <Row className="py-3 border-bottom">
              <Col sm="3">
                <h5 className="mb-0">Fitness points</h5>
              </Col>
              <Col sm="9" className="text-secondary">
                Test
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Row className="gutters-sm">
          <Col sm="12" className="mb-3">
            <Card className="h-100">
              <CardHeader>Weight</CardHeader>
              <CardBody>
                <CanvasJSChart
                  options={options}
                  /* onRef = {ref => this.chart = ref} */
                />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" className="mb-3">
            <Card className="h-100">
              <CardHeader>Water intake</CardHeader>
              <CardBody>
                <CanvasJSChart
                  options={options}
                  /* onRef = {ref => this.chart = ref} */
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
