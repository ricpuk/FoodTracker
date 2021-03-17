import React, { useState } from "react";
import {
  Col,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledPopover,
} from "reactstrap";
import { DiaryEntry } from "../../store/Diaries";
import "./DiaryEntry.css";

interface DiaryEntryProps {
  entry: DiaryEntry;
  canFitAllColumns: boolean;
}

export default (props: DiaryEntryProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { product, numberOfServings, servingId, id } = props.entry;
  const serving = product.servings.filter((x) => x.id === servingId)[0];

  const toggle = () => setPopoverOpen(!popoverOpen);

  const diaryEntryId = () => `diary-entry-${id}`;

  if (!serving) {
    return null;
  }

  return (
    <Row className="bg-light p-2 border-bottom diary-entry" id={diaryEntryId()}>
      <Col xs="8" md="4">
        {product.name}
      </Col>
      <Col xs="4" md="2" className="nutritional-value">
        <span>{serving.calories * numberOfServings}</span>
      </Col>
      {props.canFitAllColumns && (
        <>
          <Col md="2" className="nutritional-value">
            {serving.carbohydrates * numberOfServings}
          </Col>
          <Col md="2" className="nutritional-value">
            {serving.fats * numberOfServings}
          </Col>
          <Col md="2" className="nutritional-value">
            {serving.protein * numberOfServings}
          </Col>
        </>
      )}
      <UncontrolledPopover
        placement="auto"
        // isOpen={popoverOpen}
        target={diaryEntryId()}
        // toggle={toggle}
        trigger="focus"
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </UncontrolledPopover>
    </Row>
  );
};
