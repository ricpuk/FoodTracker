import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import * as ProductsStore from "../../store/Products";
import Loader from "../loader/Loader";
import "./SearchProducts.css";

type SearchProductsProps = ProductsStore.ProductsState &
  typeof ProductsStore.actionCreators;

const SearchProducts = (props: SearchProductsProps) => {
  const [query, setQuery] = useState("");

  const fetchProducts = (query: string) => {
    if (props.isLoading || query.length < 3) {
      return;
    }
    props.requestProductsByQuery(query, 1);
  };

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setQuery(target.value);
    fetchProducts(query);
  };

  return (
    <Container fluid={true}>
      <FormGroup>
        <Input
          placeholder="Search for a product"
          value={query}
          onChange={onSearchInputChanged}
        />
      </FormGroup>
      <Loader isLoading={props.isLoading}>
        {props.products.map((product) => {
          return (
            <Row className="py-2 border-bottom product-select">
              <Col xs="9">{product.name}</Col>
              <Col xs="3">
                {product.servings[0] && product.servings[0].calories}
              </Col>
            </Row>
          );
        })}
      </Loader>
    </Container>
  );
};

export default connect(
  (state: ApplicationState) => state.products, // Selects which state properties are merged into the component's props
  ProductsStore.actionCreators
)(SearchProducts as any);
