import React from "react";
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { Product } from "../../../store/Products";

interface FinishEntryProps {
  product?: Product;
  servingId?: number;
}

const FinishEntry = (props: FinishEntryProps) => {
  return <Container fluid={true}>CONFIRM</Container>;
};

export default FinishEntry;
