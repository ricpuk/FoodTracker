import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Progress,
  Row,
} from "reactstrap";

const WidgetsContainer = () => {
  return (
    <Row>
      <Col md="6">
        <Card className="mb-3">
          <CardHeader tag="h5">Water intake</CardHeader>
          <CardBody>
            <Progress color="primary" value={500} max={2000} />
            <h6 className="text-center mt-2">500/2000 ml</h6>
            <CardTitle>Log water intake</CardTitle>
            <div className="d-flex flex-wrap justify-content-space-between">
              <Button outline color="primary" className="mb-2 mr-2">
                100ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                200ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                300ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                400ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                600ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                800ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                1000ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                1500ml
              </Button>
              <Button outline color="primary" className="mb-2 mr-2">
                2000ml
              </Button>
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
      </Col>
      <Col md="6">
        <Card className="mb-3">
          <CardHeader tag="h5">Weight</CardHeader>
          <CardBody>
            <div className="d-flex mb-2">
              <span className="mr-2">82</span>
              <div className="flex-grow-1 m-auto">
                <Progress color="primary" value={500} max={2000} />
              </div>
              <span className="ml-2">70</span>
            </div>
            <h6 className="text-center">Current weight: 78 kg</h6>
            <Row className="m-0 mt-3" noGutters={true}>
              <Col xs="8">
                <InputGroup className="w-100">
                  <Input type="number" className="w-100" min={1} max={9999} />
                  <InputGroupAddon addonType="append">kg</InputGroupAddon>
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
      </Col>
    </Row>
  );
};

export default WidgetsContainer;
