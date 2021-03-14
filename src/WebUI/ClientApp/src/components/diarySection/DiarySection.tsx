import React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import * as ApplicationParamsStore from "../../store/ApplicationParams";
import { DiaryEntry } from "../../store/Diaries";
import { ScreenSize } from "../../utils/screenSize";
import "./diarySection.css";

type DiarySectionProps = ApplicationParamsStore.ApplicationParamsState & // ... state we've requested from the Redux store
  typeof ApplicationParamsStore.actionCreators & { items: DiaryEntry[] }; // ... plus action creators we've requested

const DiarySection = (props: DiarySectionProps) => {
  const canFitAllColumns = () => {
    return props.screenSize > ScreenSize.sm;
  };

  const products = [
    {
      title: "Myprotein - Impact Whey Protein Peach Tea Flavour, 32 g",
      calories: 132,
      carbs: 1,
      fat: 2,
      protein: 27,
    },
    {
      title: "Myprotein - Impact Whey Protein Peach Tea Flavour, 32 g",
      calories: 132,
      carbs: 1,
      fat: 2,
      protein: 27,
    },
  ];

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
      const serving =
      return <Row className="bg-light p-2 border-bottom">
        <Col xs="8" md="4">
          {entry.title}
        </Col>
        <Col xs="4" md="2" className="nutritional-value">
          <span>{entry.calories}</span>
        </Col>
        {canFitAllColumns() && (
          <>
            <Col md="2" className="nutritional-value">
              {entry.carbs}
            </Col>
            <Col md="2" className="nutritional-value">
              {entry.fat}
            </Col>
            <Col md="2" className="nutritional-value">
              {entry.protein}
            </Col>
          </>
  }}
      </Row>
    ));
  };

  return (
    <Container fluid={true} className="py-3">
      {renderHeader()}
      {renderBody()}
    </Container>
  );
};

export default connect(
  (state: ApplicationState) => state.application, // Selects which state properties are merged into the component's props
  ApplicationParamsStore.actionCreators // Selects which action creators are merged into the component's props
)(DiarySection as any); // eslint-disable-line @typescript-eslint/no-explicit-any
