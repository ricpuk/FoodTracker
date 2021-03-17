import classNames from "classnames";
import React from "react";
import { Col, Row } from "reactstrap";
import { DiaryEntry } from "../../store/Diaries";
import "./DiaryEntry.css";

interface DiaryEntryProps {
  entry: DiaryEntry;
  canFitAllColumns: boolean;
  onClick: () => void;
}

export default (props: DiaryEntryProps) => {
  const { product, numberOfServings, servingId, id } = props.entry;
  const serving = product.servings.filter((x) => x.id === servingId)[0];

  const diaryEntryId = () => `diary-entry-${id}`;

  const rowClassBindings = {
    "bg-light p-2 border-bottom diary-entry": true,
  };

  if (!serving) {
    return null;
  }

  return (
    <Row
      className={classNames(rowClassBindings)}
      id={diaryEntryId()}
      onClick={props.onClick}
    >
      <Col xs="8" md="4">
        {product.name} - {serving.servingSize * numberOfServings}{" "}
        {serving.servingSizeUnit}
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
    </Row>
  );
};
