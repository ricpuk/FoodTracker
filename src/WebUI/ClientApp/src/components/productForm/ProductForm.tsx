import React, { ChangeEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Input, Row } from "reactstrap";
import { Product, ProductServing } from "../../store/Products";
import API from "../../utils/api";

interface ProductFormProps {
  submit: (product: Product) => void;
  barCode: string;
}

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const addServing = () => {
    const arr = servings.map((x) => x);
    arr.push({});
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
      {servings.map((serving: ProductServing) => (
        <Row className="border-bottom">
          <Col xs="6">
            <Input
              type="number"
              placeholder="Serving size"
              className="border-0 no-hov p-0"
              value={serving.servingSize}
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Units (g, ml, etc...)"
              className="border-0 no-hov p-0"
              value={serving.servingSizeUnit}
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Cals"
              className="border-0 no-hov p-0"
              value={serving.calories}
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Protein (g)"
              className="border-0 no-hov p-0"
              value={serving.protein}
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Fat (g)"
              className="border-0 no-hov p-0"
              value={serving.fats}
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Carbs (g)"
              className="border-0 no-hov p-0"
              value={serving.carbohydrates}
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
