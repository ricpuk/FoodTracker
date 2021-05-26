import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Input, Row, Spinner } from "reactstrap";
import { Product, ProductServing } from "../../store/Products";
import API, { API_ADMIN_PRODUCTS } from "../../utils/api";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import "./productForm.css";
import Toaster from "../../utils/toaster";

interface ProductFormProps {
  submit: (product: Product) => void;
  barCode: string;
  edit?: boolean;
}

const NAME_SERVING_SIZE = "servingSize";
const NAME_SERVING_SIZE_UNIT = "servingSizeUnit";
const NAME_CALORIES = "calories";
const NAME_PROTEIN = "protein";
const NAME_FATS = "fats";
const NAME_CARBS = "carbohydrates";

const ProductForm = (props: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [productLoaded, setProductLoaded] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [servings, setServings] = useState<any[]>([{}]);
  const [statusMessage, setStatusMessage] = useState("");
  const [id, setId] = useState<number>();
  const { submit, barCode, edit } = props;
  useEffect(() => {
    if (loading || productLoaded) {
      return;
    }
    setLoading(true);
    API.get<Product>(`api/products/${barCode}`)
      .then((response) => {
        const { data } = response;
        if (data.complete && data.id && data.servings && !edit) {
          submit(data);
          return;
        }
        populateProductState(data);
      })
      .catch((err) => {
        Toaster.error("Error", "Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
        setProductLoaded(true);
      });
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
    if (data.id && edit) {
      setId(data.id);
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

  const handleEdit = (product: Product) => {
    API.put<Product>(`${API_ADMIN_PRODUCTS}/${id}`, product)
      .then((response) => {
        const { data } = response;
        props.submit(data);
      })
      .catch((err) => {
        Toaster.error("Error", "Failed to update product.");
      })
      .finally(() => setLoading(false));
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const product: Product = {
      barCode: props.barCode,
      id: 0,
      complete: false,
      name: productName,
      servings: servings,
    };

    if (edit) {
      handleEdit(product);
      return;
    }

    API.post<Product>("/api/products", product)
      .then((response) => {
        const { data } = response;
        props.submit(data);
      })
      .catch((err) => {
        Toaster.error("Error", "Failed to add a new product.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <React.Fragment>
      {statusMessage && <Alert color="warning my-2">{statusMessage}</Alert>}
      <Form onSubmit={submitForm}>
        <Row
          className={classnames({ "border-bottom": true, "border-top": !edit })}
        >
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
              required
              className="border-0 no-hov p-0"
              placeholder="Product name (required)"
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
                required
                type="number"
                placeholder="Serving size (required)"
                className="border-0 no-hov p-0"
                value={serving.servingSize}
                name={NAME_SERVING_SIZE}
                onChange={(e) => handleServingValueUpdate(e, index)}
              />
            </Col>
            <Col xs="5" className="d-flex">
              <Input
                required
                placeholder="Units (g, ml, etc...) (required)"
                className="border-0 no-hov p-0"
                value={serving.servingSizeUnit}
                name={NAME_SERVING_SIZE_UNIT}
                onChange={(e) => handleServingValueUpdate(e, index)}
              />
            </Col>
            <Col
              xs="1"
              className="p-0 d-flex flex-column justify-content-center"
            >
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
                required
                type="number"
                step="any"
                placeholder="Cals (required)"
                className="border-0 no-hov p-0"
                value={serving.calories}
                name={NAME_CALORIES}
                onChange={(e) => handleServingValueUpdate(e, index)}
              />
            </Col>
            <Col xs="6">
              <Input
                required
                type="number"
                step="any"
                placeholder="Protein (g) (required)"
                className="border-0 no-hov p-0"
                value={serving.protein}
                name={NAME_PROTEIN}
                onChange={(e) => handleServingValueUpdate(e, index)}
              />
            </Col>
            <Col xs="6">
              <Input
                required
                type="number"
                step="any"
                placeholder="Fat (g) (required)"
                className="border-0 no-hov p-0"
                value={serving.fats}
                name={NAME_FATS}
                onChange={(e) => handleServingValueUpdate(e, index)}
              />
            </Col>
            <Col xs="6">
              <Input
                required
                type="number"
                step="any"
                placeholder="Carbs (g) (required)"
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
          disabled={loading}
        >
          Add serving
        </Button>
        <Button
          color="primary"
          className="mt-2 w-100"
          disabled={loading}
          type="submit"
        >
          {loading ? <Spinner color="light" /> : "Submit"}
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default ProductForm;
