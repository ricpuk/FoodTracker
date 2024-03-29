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
import API, { API_DIARY_ENTRIES } from "../../utils/api";
import ScanProduct from "./steps/ScanProduct";
import ProductForm from "../productForm/ProductForm";
import Toaster from "../../utils/toaster";

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
const STEP_PRODUCT_FORM = "TEST";

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
  const [barCode, setBarCode] = useState<string>("");

  const { isModalOpen, modalType, editedEntry } = useSelector(
    (state: ApplicationState) => {
      if (!state.diaries) {
        return {
          isModalOpen: false,
          modalType: DiariesStore.DiaryModalType.new,
          editedEntry: undefined,
        };
      }
      return state.diaries;
    }
  );

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
    setNumberOfServings(1);
    setProduct(undefined);
  };

  const handleServingUpdate = (type: UpdateType, value: number) => {
    switch (type) {
      case UpdateType.serving:
        setServingId(value);
        break;
      case UpdateType.numberOfServings:
        if (value > 999 || value < 0) {
          return;
        }
        setNumberOfServings(value);
        break;
    }
  };

  const apiCallPromise = () => {
    if (modalType === DiariesStore.DiaryModalType.edit) {
      return editPromise();
    }
    return createPromise();
  };

  const createPromise = () => {
    const request = {
      entry: {
        product: product,
        servingId: servingId,
        numberOfServings: numberOfServings,
        diarySection: props.diarySection,
      },
    };
    return API.post<DiariesStore.DiaryEntry>(
      API_DIARY_ENTRIES(props.diaryId),
      request
    );
  };

  const editPromise = () => {
    if (!editedEntry) {
      //Some sort of error, promise reject
      return Promise.reject();
    }
    const request = {
      servingId: servingId,
      numberOfServings: numberOfServings,
    };
    debugger;
    return API.put<DiariesStore.DiaryEntry>(
      `${API_DIARY_ENTRIES(props.diaryId)}${editedEntry.id}`,
      request
    );
  };

  const handleSubmit = () => {
    setIsLoading(true);

    apiCallPromise()
      .then((response) => {
        let { data } = response;
        if (!product) {
          //toast here
          reloadDiary();
          return;
        }
        data.product = product;
        props.addDiaryEntry(data);
        Toaster.success("Success", "New entry added successfully.");
        props.toggleModalState();
      })
      .catch((error) => {
        Toaster.error("Error", "Failed to add a new entry.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    setIsLoading(true);
    if (!editedEntry) {
      //Some sort of error, promise reject
      return Promise.reject();
    }
    return API.delete<void>(
      `${API_DIARY_ENTRIES(props.diaryId)}${editedEntry.id}`
    )
      .then(() => {
        props.removeEditedDiaryEntry(editedEntry.id);
        Toaster.success("Success", "Diary entry has been deleted.");
        props.toggleModalState();
      })
      .catch((error) => {
        Toaster.error("Error", "Diary entry deletion failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const reloadDiary = () => {
    props.requestDiary(props.date, true);
    props.toggleModalState();
  };

  const handleOpened = () => {
    if (modalType === DiariesStore.DiaryModalType.edit && editedEntry) {
      const { servingId, product, numberOfServings } = editedEntry;
      setProduct(product);
      setServingId(servingId);
      setNumberOfServings(numberOfServings);
      setStep(STEP_CONFIRM);
      return;
    }
    setStep(STEP_SEARCH);
    setProduct(undefined);
  };

  const submitScan = (code: string) => {
    setBarCode(code);
    setStep(STEP_PRODUCT_FORM);
  };

  const handleProductCreationSubmit = (product: Product) => {
    setProduct(product);
    setServingId(product.servings[0].id);
    setStep(STEP_CONFIRM);
  };

  return (
    <Modal
      onOpened={handleOpened}
      onClosed={resetState}
      isOpen={isModalOpen}
      toggle={toggleModal}
      scrollable={true}
      className={classnames(classBindings)}
    >
      <ModalHeader toggle={toggleModal}>Add diary entry</ModalHeader>
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
            onDelete={handleDelete}
            blocked={isLoading}
            modalType={modalType}
          />
        )}
        {step === STEP_SCAN && <ScanProduct submit={submitScan} />}
        {step === STEP_PRODUCT_FORM && (
          <ProductForm barCode={barCode} submit={handleProductCreationSubmit} />
        )}
      </ModalBody>
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
