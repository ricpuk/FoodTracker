import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ApplicationState } from "../../store";
import { useAppParams } from "../../utils/hooks";
import SearchProducts from "../searchProducts/SearchProducts";
import * as DiariesStore from "../../store/Diaries";

type AddDiaryEntryFormProps = DiariesStore.DiariesState & // ... state we've requested from the Redux store
  typeof DiariesStore.actionCreators; // ... plus action creators we've requested

const AddDiaryEntryForm = (props: AddDiaryEntryFormProps) => {
  const [isMobile, screenSize] = useAppParams();

  const classBindings = {
    "full-screen": isMobile,
  };

  const toggleModal = () => {
    props.toggleModalState();
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      toggle={toggleModal}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleModal}>Add diary entry</ModalHeader>
      <ModalBody>
        <SearchProducts />
      </ModalBody>
    </Modal>
  );
};

export default connect(
  (state: ApplicationState) => state.diaries, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(AddDiaryEntryForm as any); // eslint-disable-line @typescript-eslint/no-explicit-any
