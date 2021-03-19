import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Input, Row } from "reactstrap";
import { Product, ProductServing } from "../../store/Products";
import API from "../../utils/api";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProductFormServing from "./ProductFormServing";
import classnames from "classnames";
import "./productForm.css";

interface ProductFormProps {
  submit: (product: Product) => void;
  barCode: string;
}

const NAME_SERVING_SIZE = "servingSize";
const NAME_SERVING_SIZE_UNIT = "servingSizeUnit";
const NAME_CALORIES = "calories";
const NAME_PROTEIN = "protein";
const NAME_FATS = "fats";
const NAME_CARBS = "carbohydrates";

const ProductForm = (props: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [servings, setServings] = useState<any[]>([{}]);
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    API.get<Product>(`api/products/${props.barCode}`)
      .then((response) => {
        const { data } = response;
        if (data.complete && data.id && data.servings) {
          props.submit(data);
          return;
        }
        populateProductState(data);
      })
      .catch((err) => {
        //error
      })
      .finally(() => setLoading(false));
  }, []);

  const populateProductState = (data: Product) => {
    if (typeof data !== "object") {
      setStatusMessage(
        "No product found. Please enter the information to help improve our database."
      );
      return;
    }

    if (data.name) {
      setProductName(data.name);
    }
    if (data.servings && data.servings.length > 0) {
      const fetchedServings = data.servings.map((x) => x);
      setServings(fetchedServings);
    }
    if (!data.complete) {
      setStatusMessage(
        "This product has been fetched from open food facts database. Please check if the date provided is correct."
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    switch (name) {
      case "name":
        setProductName(value);
        break;
    }
  };

  const updateServing = (serving: ProductServing, index: number) => {
    const arr = servings.map((x) => x);
    arr[index] = serving;
    setServings(arr);
  };

  const handleServingValueUpdate = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { target } = event;
    const { name, value } = target;
    const item = servings[index];
    item[name] = value;
    updateServing(item, index);
  };

  const addServing = () => {
    const arr = servings.map((x) => x);
    arr.push({});
    setServings(arr);
  };

  const deleteServing = (index: number) => {
    if (index === 0) {
      return;
    }
    const arr = servings.map((x) => x);
    arr.splice(index, 1);
    setServings(arr);
  };

  return (
    <React.Fragment>
      {statusMessage && <Alert color="warning my-2">{statusMessage}</Alert>}
      <Row className="border-bottom border-top">
        <Col className="d-flex flex-column justify-content-center">
          {props.barCode}
        </Col>
        <Col xs="1">
          <Input className="invisible p-0" />
        </Col>
      </Row>
      <Row className="border-bottom">
        <Col className="d-flex flex-column justify-content-center">
          <Input
            className="border-0 no-hov p-0"
            placeholder="Product name"
            value={productName}
            name="name"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="border-bottom">
        <Col
          xs="12"
          className="d-flex flex-column justify-content-center font-weight-bold py-2"
        >
          Servings
        </Col>
      </Row>
      {servings.map((serving: ProductServing, index: number) => (
        <Row className="border-bottom">
          <Col xs="6">
            <Input
              type="number"
              placeholder="Serving size"
              className="border-0 no-hov p-0"
              value={serving.servingSize}
              name={NAME_SERVING_SIZE}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
          <Col xs="5" className="d-flex">
            <Input
              placeholder="Units (g, ml, etc...)"
              className="border-0 no-hov p-0"
              value={serving.servingSizeUnit}
              name={NAME_SERVING_SIZE_UNIT}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
          <Col xs="1" className="p-0 d-flex flex-column justify-content-center">
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className={classnames({
                "icon-hover": true,
                invisible: index === 0,
              })}
              color="red"
              onClick={() => deleteServing(index)}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              placeholder="Cals"
              className="border-0 no-hov p-0"
              value={serving.calories}
              name={NAME_CALORIES}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              placeholder="Protein (g)"
              className="border-0 no-hov p-0"
              value={serving.protein}
              name={NAME_PROTEIN}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              placeholder="Fat (g)"
              className="border-0 no-hov p-0"
              value={serving.fats}
              name={NAME_FATS}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              placeholder="Carbs (g)"
              className="border-0 no-hov p-0"
              value={serving.carbohydrates}
              name={NAME_CARBS}
              onChange={(e) => handleServingValueUpdate(e, index)}
            />
          </Col>
        </Row>
      ))}
      <Button
        outline
        color="success"
        className="mt-2 w-100"
        onClick={addServing}
      >
        Add serving
      </Button>
      <Button color="primary" className="mt-2 w-100">
        Submit
      </Button>
    </React.Fragment>
  );
};

export default ProductForm;