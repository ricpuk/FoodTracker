import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { Product } from "../../store/Products";
import API from "../../utils/api";

interface ProductFormProps {
  submit: (product: Product) => void;
  barCode: string;
}

const ProductForm = (props: ProductFormProps) => {
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState<string>("");
  const [servings, setServings] = useState<any[]>([]);
  useEffect(() => {
    API.get<Product>(`api/products/${props.barCode}`)
      .then((response) => {
        const { data } = response;
        if (data.complete && data.id && data.servings) {
          props.submit(data);
          return;
        }
        if (data) {
          //Populate product TODO
          //   setProduct(data);
          return;
        }
      })
      .catch((err) => {
        //error
      })
      .finally(() => setLoading(false));
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const addServing = () => {
    const arr = servings.map((x) => x);
    arr.push({});
    setServings(arr);
  };

  return (
    <React.Fragment>
      <Row className="border-bottom">
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
            className="border-0 no-hov text-primary p-0"
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
      {servings.map((serving) => (
        <Row className="border-bottom">
          <Col xs="6">
            <Input
              type="number"
              placeholder="Serving size"
              className="border-0 no-hov p-0"
            />
          </Col>
          <Col xs="6">
            <Input
              placeholder="Units (g, ml, etc...)"
              className="border-0 no-hov p-0"
            />
          </Col>
          <Col xs="6">
            <Input placeholder="Cals" className="border-0 no-hov p-0" />
          </Col>
          <Col xs="6">
            <Input placeholder="Protein (g)" className="border-0 no-hov p-0" />
          </Col>
          <Col xs="6">
            <Input placeholder="Fat (g)" className="border-0 no-hov p-0" />
          </Col>
          <Col xs="6">
            <Input placeholder="Carbs (g)" className="border-0 no-hov p-0" />
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
