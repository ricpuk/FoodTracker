import classnames from "classnames";
import React, { useState } from "react";
import {
  Nav,
  TabContent,
  TabPane,
  Row,
  Button,
  Card,
  CardTitle,
  Col,
  NavItem,
  NavLink,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const TAB_CLIENTS = "clients";
const TAB_REQUESTS = "coachingRequests";

const Coaching = () => {
  const [activeTab, setActiveTab] = useState(TAB_CLIENTS);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const renderTrainer = () => (
    <Col sm="6" lg="4">
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
            John Doe
          </CardTitle>
          <CardSubtitle className="text-secondary mb-1 text-center">
            Professional trainer
          </CardSubtitle>
          <CardSubtitle className="text-muted font-size-lg text-center">
            15 clients
          </CardSubtitle>
          <Button color="primary w-100 mt-2" outline>
            Request coaching
          </Button>
        </CardBody>
      </Card>
    </Col>
  );

  const trainers = [];
  for (var i = 0; i < 12; i++) {
    trainers.push(renderTrainer());
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_CLIENTS })}
            onClick={() => {
              toggle(TAB_CLIENTS);
            }}
          >
            Clients
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_REQUESTS })}
            onClick={() => {
              toggle(TAB_REQUESTS);
            }}
          >
            Coaching requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={TAB_CLIENTS} className="p-3">
          <Row>{trainers}</Row>
        </TabPane>
        <TabPane tabId={TAB_REQUESTS}></TabPane>
      </TabContent>
    </div>
  );
};

export default Coaching;
