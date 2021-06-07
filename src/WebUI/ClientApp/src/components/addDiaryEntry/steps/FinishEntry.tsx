import React, { ChangeEvent, Fragment, useState } from "react";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { ProductReportReason } from "../../../enums/ProductReportReasons";
import { DiaryModalType } from "../../../store/Diaries";
import { Product } from "../../../store/Products";
import API, { API_PRODUCT_REPORTS } from "../../../utils/api";
import {
  servingValue,
  servingValueNumeric,
} from "../../../utils/nutritionHelper";
import Toaster from "../../../utils/toaster";
import CaloriesBreakdown from "../../caloriesBreakdown/CaloriesBreakdown";
import ProductReportReasonList from "../../productReportReasonList/ProductReportReasonList";
import { UpdateType } from "../AddDiaryEntryForm";
import "./styles.css";

interface FinishEntryProps {
  product?: Product;
  servingId?: number;
  numberOfServings: number;
  blocked: boolean;
  modalType: DiaryModalType;
  onUpdate: (type: UpdateType, value: number) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const FinishEntry = (props: FinishEntryProps) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const { product, numberOfServings } = props;

  if (!product) {
    return null;
  }

  let servingIndex = product.servings.findIndex(
    (x) => x.id === props.servingId
  );
  if (servingIndex === -1) {
    servingIndex = 0;
  }
  const serving = product.servings[servingIndex];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const updateType = UpdateType[target.name as keyof typeof UpdateType];
    props.onUpdate(updateType, Number(target.value));
  };

  const isValid = () => numberOfServings > 0;

  const renderHeader = () => {
    return (
      <React.Fragment>
        <Row className="border-bottom">
          <Col className="d-flex flex-column justify-content-center">
            {product.name}
          </Col>
          <Col xs="1">
            <Input className="invisible" />
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col xs="9" className="d-flex flex-column justify-content-center">
            Number of Servings
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Input
              type="number"
              name={UpdateType.numberOfServings}
              className="border-0 no-hov text-primary"
              style={{
                width: 65,
                appearance: "textfield",
                WebkitAppearance: "textfield",
                MozAppearance: "textfield",
              }}
              max={999}
              min={1}
              value={props.numberOfServings}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col xs="4" className="d-flex flex-column justify-content-center">
            Serving size
          </Col>
          <Col xs="8" className="d-flex justify-content-end">
            <Input
              type="select"
              name={UpdateType.serving}
              className="border-0 no-hov text-primary"
              style={{ width: "unset" }}
              value={props.servingId}
              onChange={handleChange}
            >
              {product.servings.map((serving) => {
                return (
                  <option key={serving.id} value={serving.id}>
                    {serving.servingSize} {serving.servingSizeUnit}
                  </option>
                );
              })}
            </Input>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const renderCalorieBreakdown = () => {
    return (
      <FormGroup className="border-bottom py-3">
        <CaloriesBreakdown
          prefix="form"
          protein={serving.protein}
          carbs={serving.carbohydrates}
          fats={serving.fats}
        />
        {renderNutritionalFacts()}
      </FormGroup>
    );
  };

  const renderNutritionalFacts = () => (
    <Row className="mt-3">
      <Col xs="3" className="d-flex justify-content-center flex-wrap">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {servingValueNumeric(serving.calories, numberOfServings)}
          </div>
          <div className="text-center">Calories</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {servingValue(serving.carbohydrates, numberOfServings)}
          </div>
          <div className="text-center">Carbs</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {servingValue(serving.fats, numberOfServings)}
          </div>
          <div className="text-center">Fat</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {servingValue(serving.protein, numberOfServings)}
          </div>
          <div className="text-center">Protein</div>
        </div>
      </Col>
    </Row>
  );

  const handleReport = (reason: ProductReportReason) => {
    setReportOpen(!reportOpen);
    setReportLoading(true);
    const request = {
      productId: product.id,
      reason: reason,
    };
    API.post(API_PRODUCT_REPORTS, request)
      .then((response) => {
        Toaster.success(
          "Success",
          "Your product report was submitted sucessfully."
        );
      })
      .catch((error) => Toaster.error("Error", error.message))
      .finally(() => setReportLoading(false));
  };

  const renderProductReport = () => (
    <div className="w-100 mb-2">
      <div className="d-flex">
        <Button
          onClick={() => setReportOpen(!reportOpen)}
          className="mx-1"
          block
          color="secondary"
          disabled={props.blocked}
        >
          {!props.blocked ? "Report product" : <Spinner color="light" />}
        </Button>
      </div>
      <Collapse isOpen={reportOpen} className="pt-2">
        <ProductReportReasonList onClick={handleReport} />
      </Collapse>
    </div>
  );

  const renderControls = () => {
    if (props.blocked || reportLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner
            color="primary"
            size="lg"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      );
    }

    return (
      <Fragment>
        {props.modalType === DiaryModalType.new && renderProductReport()}
        <div className="d-flex">
          <Button
            onClick={props.onSubmit}
            className="w-100 mx-1"
            color="primary"
            disabled={props.blocked || !isValid()}
          >
            {!props.blocked ? "Submit" : <Spinner color="light" />}
          </Button>
          {props.modalType === DiaryModalType.edit && (
            <Button
              onClick={props.onDelete}
              className="w-100 mx-1"
              color="danger"
              disabled={props.blocked}
            >
              {!props.blocked ? "Delete" : <Spinner color="light" />}
            </Button>
          )}
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderCalorieBreakdown()}
      {renderControls()}
    </div>
  );
};

export default FinishEntry;
