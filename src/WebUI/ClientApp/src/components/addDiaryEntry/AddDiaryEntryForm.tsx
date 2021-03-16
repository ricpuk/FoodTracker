import classnames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ApplicationState } from "../../store";
import { useAppParams } from "../../utils/hooks";
import SearchProducts from "../searchProducts/SearchProducts";
import * as DiariesStore from "../../store/Diaries";
import { Product } from "../../store/Products";
import FinishEntry from "./steps/FinishEntry";

type AddDiaryEntryFormProps = DiariesStore.DiariesState & // ... state we've requested from the Redux store
  typeof DiariesStore.actionCreators; // ... plus action creators we've requested

const STEP_SEARCH = "SEARCH";
const STEP_CONFIRM = "CONFIRM";
const STEP_SCAN = "SCAN";

export enum UpdateType {
  serving = "serving",
  numberOfServings = "numberOfServings",
}

const AddDiaryEntryForm = (props: AddDiaryEntryFormProps) => {
  const [step, setStep] = useState(STEP_SEARCH);
  const [product, setProduct] = useState<Product>();
  const [servingId, setServingId] = useState<number>();
  const [numberOfServings, setNumberOfServings] = useState<number>(1);
  const [isMobile] = useAppParams();

  const classBindings = {
    "full-screen": isMobile,
  };

  const toggleModal = () => {
    props.toggleModalState();
    setStep(STEP_SEARCH);
  };

  const productSelected = (product: Product) => {
    setProduct(product);
    setServingId(product.servings[0].id);
    setStep(STEP_CONFIRM);
  };

  const scanButtonPressed = () => {
    setStep(STEP_SCAN);
  };

  const handleServingUpdate = (type: UpdateType, value: number) => {
    switch (type) {
      case UpdateType.serving:
        setServingId(value);
        break;
      case UpdateType.numberOfServings:
        setNumberOfServings(value);
        break;
    }
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      toggle={toggleModal}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleModal}>Add diary entry</ModalHeader>
      {props.isModalOpen && (
        <ModalBody className="pt-0">
          {step === STEP_SEARCH && (
            <SearchProducts
              productSelected={productSelected}
              scanButtonPressed={scanButtonPressed}
            />
          )}
          {step === STEP_CONFIRM && (
            <FinishEntry
              product={product}
              servingId={servingId}
              onUpdate={handleServingUpdate}
              numberOfServings={numberOfServings}
            />
          )}
        </ModalBody>
      )}
    </Modal>
  );
};

export default connect(
  (state: ApplicationState) => state.diaries, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(AddDiaryEntryForm as any); // eslint-disable-line @typescript-eslint/no-explicit-any
