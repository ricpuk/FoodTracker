import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row, Button } from "reactstrap";
import { ApplicationState } from "../../store";
import { DiaryEntry as DiaryEntryDto } from "../../store/Diaries";
import { ScreenSize } from "../../utils/screenSize";
import DiaryEntry from "../diaryEntry/DiaryEntry";
import "./diarySection.css";

type DiarySectionProps = {
  items: DiaryEntryDto[];
  toggleModal: (diaryEntry?: DiaryEntryDto) => void;
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

  const handleEntryClicked = (entry: DiaryEntryDto) => {
    props.toggleModal(entry);
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

  const renderControls = () => {
    return (
      <Row className="my-3">
        <Button color="primary" onClick={() => props.toggleModal()}>
          Add food
        </Button>
      </Row>
    );
  };

  const renderBody = () => {
    return props.items.map((entry) => {
      return (
        <DiaryEntry
          entry={entry}
          canFitAllColumns={canFitAllColumns()}
          onClick={() => handleEntryClicked(entry)}
        />
      );
    });
  };

  return (
    <Container fluid={true} className="py-3">
      {renderHeader()}
      {renderBody()}
      {renderControls()}
    </Container>
  );
};

export default DiarySection;
