import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ApplicationState } from "../../store";
import { useAppParams } from "../../utils/hooks";
import SearchProducts from "../searchProducts/SearchProducts";
import * as DiariesStore from "../../store/Diaries";
import { Product } from "../../store/Products";

type AddDiaryEntryFormProps = DiariesStore.DiariesState & // ... state we've requested from the Redux store
  typeof DiariesStore.actionCreators; // ... plus action creators we've requested

const AddDiaryEntryForm = (props: AddDiaryEntryFormProps) => {
  const [step, setStep] = useState(1);
  const [isMobile, screenSize] = useAppParams();

  const classBindings = {
    "full-screen": isMobile,
  };

  const toggleModal = () => {
    props.toggleModalState();
  };

  const productSelected = () => {
    setStep(step + 1);
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      toggle={toggleModal}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleModal}>Add diary entry</ModalHeader>
      <ModalBody>
        {step == 1 && <SearchProducts productSelected={productSelected} />}
      </ModalBody>
    </Modal>
  );
};

export default connect(
  (state: ApplicationState) => state.diaries, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(AddDiaryEntryForm as any); // eslint-disable-line @typescript-eslint/no-explicit-any
