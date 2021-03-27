import React from "react";
import { Button, ListGroup, ListGroupItem, Media, Row } from "reactstrap";

const CoachingRequests = () => {
  return (
    <React.Fragment>
      <ListGroup className="mt-3 request-list">
        <ListGroupItem className="d-flex align-items-center flex-wrap">
          <Media
            left
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            style={{ width: 75 }}
          />
          <div className="flex-fill pl-3 pr-3">
            <div>
              <a href="#" className="text-dark font-weight-600">
                Ethel Wilkes
              </a>
            </div>
            <div className="text-muted fs-13px">North Raundspic</div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button color="primary mr-3">Accept</Button>
            <Button color="danger ml-3">Deny</Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    </React.Fragment>
  );
};

export default CoachingRequests;
