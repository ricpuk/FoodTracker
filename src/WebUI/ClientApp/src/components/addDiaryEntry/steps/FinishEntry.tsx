import React, { ChangeEvent } from "react";
import { Button, Col, FormGroup, Input, Row, Spinner } from "reactstrap";
import { Product } from "../../../store/Products";
import CaloriesBreakdown from "../../caloriesBreakdown/CaloriesBreakdown";
import { UpdateType } from "../AddDiaryEntryForm";
import "./styles.css";

interface FinishEntryProps {
  product?: Product;
  servingId?: number;
  numberOfServings: number;
  blocked: boolean;
  onUpdate: (type: UpdateType, value: number) => void;
  onSubmit: () => void;
}

const FinishEntry = (props: FinishEntryProps) => {
  const { product, numberOfServings } = props;
  if (!product) {
    return null;
  }

  const servingIndex = product.servings.findIndex(
    (x) => x.id === props.servingId
  );
  const serving = product.servings[servingIndex];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const updateType = UpdateType[target.name as keyof typeof UpdateType];
    props.onUpdate(updateType, Number(target.value));
  };

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
              style={{ width: 50 }}
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
                  <option value={serving.id}>
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
            {serving.calories * numberOfServings}
          </div>
          <div className="text-center">Calories</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {serving.carbohydrates * numberOfServings}g
          </div>
          <div className="text-center">Carbs</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {serving.fats * numberOfServings}g
          </div>
          <div className="text-center">Fat</div>
        </div>
      </Col>
      <Col xs="3" className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="text-center font-weight-bold">
            {serving.protein * numberOfServings}g
          </div>
          <div className="text-center">Protein</div>
        </div>
      </Col>
    </Row>
  );

  const renderSubmit = () => {
    return (
      <div>
        <Button
          onClick={props.onSubmit}
          className="w-100"
          color="primary"
          disabled={props.blocked}
        >
          {!props.blocked ? "Submit" : <Spinner color="light" />}
        </Button>
      </div>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderCalorieBreakdown()}
      {renderSubmit()}
    </div>
  );
};

export default FinishEntry;
