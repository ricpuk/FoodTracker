import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { ApplicationState } from "../../store";
import * as ProductsStore from "../../store/Products";
import ListLoader from "../loader/ListLoader";
import "./SearchProducts.css";

interface SearchProductsProps {
  productSelected: (product: ProductsStore.Product) => void;
  scanButtonPressed: () => void;
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
  };

  const searchClicked = () => {
    if (props.isLoading) {
      return;
    }
    props.requestProductsByQuery(query, 1);
  };

  const handleProductSelect = (product: ProductsStore.Product) => {
    props.productSelected(product);
  };

  return (
    <Container fluid={true} className="pt-3">
      <FormGroup>
        <div className="d-flex justify-content-around">
          <div className="flex-grow-1 mr-1">
            <Input
              placeholder="Search for a product"
              value={query}
              onChange={onSearchInputChanged}
            />
          </div>
          <div>
            <ButtonGroup>
              <Button
                disabled={props.isLoading}
                onClick={searchClicked}
                color="primary"
              >
                <FontAwesomeIcon icon={faSearch} size="sm" />
              </Button>
              <Button disabled={props.isLoading} outline color="primary">
                <FontAwesomeIcon icon={faBarcode} size="sm" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
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
