import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { ApplicationState } from "../../store";
import * as ProductsStore from "../../store/Products";
import ListLoader from "../loader/ListLoader";
import "./SearchProducts.css";

interface SearchProductsProps {
  productSelected: () => void;
}

type SearchProductsState = ProductsStore.ProductsState &
  typeof ProductsStore.actionCreators &
  SearchProductsProps;

const SearchProducts = (props: SearchProductsState) => {
  const [query, setQuery] = useState("");

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setQuery(value);
    if (props.isLoading || value.length < 3) {
      return;
    }
    props.requestProductsByQuery(value, 1);
  };

  const handleProductSelect = (produt: ProductsStore.Product) => {
    //set in props
    props.productSelected();
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
      <ListLoader isLoading={props.isLoading}>
        {props.products.map((product) => {
          const serving = product.servings[0];
          return (
            <Row
              className="py-2 border-bottom product-select"
              key={product.id}
              onClick={() => handleProductSelect(product)}
            >
              <Col xs="10">
                {product.name}
                {serving && ` - ${serving.calories} ${serving.servingSizeUnit}`}
              </Col>
              <Col xs="2">{serving && serving.calories}</Col>
            </Row>
          );
        })}
      </ListLoader>
    </Container>
  );
};

const mapStateToProps = (
  state: ApplicationState,
  ownProps: SearchProductsProps
) => {
  return {
    ...state.products,
    ...ownProps,
  };
};

export default connect(
  mapStateToProps, // Selects which state properties are merged into the component's props
  ProductsStore.actionCreators
)(SearchProducts as any);
