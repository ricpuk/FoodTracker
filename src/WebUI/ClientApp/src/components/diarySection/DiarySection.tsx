import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import { DiaryEntry } from "../../store/Diaries";
import { ScreenSize } from "../../utils/screenSize";
import "./diarySection.css";

type DiarySectionProps = {
  items: DiaryEntry[];
};

const DiarySection = (props: DiarySectionProps) => {
  const selectScreenSize = (state: ApplicationState) => {
    if (state.application) {
      return state.application.screenSize;
    }
    return ScreenSize.sm;
  };

  const screenSize = useSelector(selectScreenSize);

  const canFitAllColumns = () => {
    if (!screenSize) {
      return false;
    }
    return screenSize > ScreenSize.sm;
  };

  const renderHeader = () => (
    <Row className="pb-3 border-bottom">
      <Col xs="8" md="4"></Col>
      <Col xs="4" md="2" className="text-right">
        <span>Calories </span>
        <span className="subtitle">kcal</span>
      </Col>
      {canFitAllColumns() && (
        <>
          <Col md="2" className="text-right">
            <span>Carbs </span>
            <span className="subtitle">g</span>
          </Col>
          <Col md="2" className="text-right">
            <span>Fat </span>
            <span className="subtitle">g</span>
          </Col>
          <Col md="2" className="text-right">
            <span>Protein </span>
            <span className="subtitle">g</span>
          </Col>
        </>
      )}
    </Row>
  );

  const renderBody = () => {
    return props.items.map((entry) => {
      const product = entry.product;
      const serving = product.servings
        .filter((x) => x.id === entry.servingId)
        .shift();
      if (!serving) {
        return null;
      }
      return (
        <Row className="bg-light p-2 border-bottom">
          <Col xs="8" md="4">
            {product.name}
          </Col>
          <Col xs="4" md="2" className="nutritional-value">
            <span>{serving.calories * entry.numberOfServings}</span>
          </Col>
          {canFitAllColumns() && (
            <>
              <Col md="2" className="nutritional-value">
                {serving.carbohydrates * entry.numberOfServings}
              </Col>
              <Col md="2" className="nutritional-value">
                {serving.fats * entry.numberOfServings}
              </Col>
              <Col md="2" className="nutritional-value">
                {serving.protein * entry.numberOfServings}
              </Col>
            </>
          )}
        </Row>
      );
    });
  };

  return (
    <Container fluid={true} className="py-3">
      {renderHeader()}
      {renderBody()}
    </Container>
  );
};

export default DiarySection;
