import classnames from "classnames";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ApplicationState } from "../../store";
import { useAppParams } from "../../utils/hooks";
import SearchProducts from "../searchProducts/SearchProducts";
import * as DiariesStore from "../../store/Diaries";
import { Product } from "../../store/Products";
import FinishEntry from "./steps/FinishEntry";
import API, { API_DIARY } from "../../utils/api";

interface OwnProps {
  diaryId: number;
  diarySection: DiariesStore.DiarySection;
}

type AddDiaryEntryFormProps = DiariesStore.DiariesState & // ... state we've requested from the Redux store
  typeof DiariesStore.actionCreators &
  OwnProps; // ... plus action creators we've requested

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
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useAppParams();

  const isModalOpen = useSelector((state: ApplicationState) => {
    if (!state.diaries) {
      return false;
    }
    return state.diaries.isModalOpen;
  });

  const classBindings = {
    "full-screen": isMobile,
  };

  const toggleModal = () => {
    props.toggleModalState();
  };

  const productSelected = (product: Product) => {
    setProduct(product);
    setServingId(product.servings[0].id);
    setStep(STEP_CONFIRM);
  };

  const scanButtonPressed = () => {
    setStep(STEP_SCAN);
  };

  const resetState = () => {
    setIsLoading(false);
    setStep(STEP_SEARCH);
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

  const handleSubmit = () => {
    setIsLoading(true);
    const request = {
      entry: {
        product: product,
        servingId: servingId,
        numberOfServings: numberOfServings,
        diarySection: props.diarySection,
      },
    };
    debugger;
    API.post(`${API_DIARY}/${props.diaryId}`, request)
      .then((response) => {
        debugger;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      onExit={resetState}
      isOpen={isModalOpen}
      toggle={toggleModal}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleModal}>Add diary entry</ModalHeader>
      {isModalOpen && (
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
              onSubmit={handleSubmit}
              blocked={isLoading}
            />
          )}
        </ModalBody>
      )}
    </Modal>
  );
};

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => {
  return {
    ...state.products,
    ...ownProps,
  };
};

export default connect(
  mapStateToProps, // Selects which state properties are merged into the component's props
  DiariesStore.actionCreators
)(AddDiaryEntryForm as any); // eslint-disable-line @typescript-eslint/no-explicit-any
