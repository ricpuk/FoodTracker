import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { ProductServing } from "../../store/Products";

interface ProductFormServingProps {
  serving: ProductServing;
  onUpdated: (serving: ProductServing) => void;
}



export default (props: ProductFormServingProps) => {

  //   const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
  //     const { target } = event;
  //     const { name, value } = target;
  //     onUpdated(name, value);
  //   };

  return (

  );
};
