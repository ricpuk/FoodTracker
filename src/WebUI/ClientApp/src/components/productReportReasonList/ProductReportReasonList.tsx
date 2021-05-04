import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { ProductReportReason } from "../../enums/ProductReportReasons";

interface ProductReportListProps {
  onClick: (reason: ProductReportReason) => void;
}

export default (props: ProductReportListProps) => {
  const { onClick } = props;
  return (
    <div>
      <ListGroup>
        <ListGroupItem
          onClick={() => onClick(ProductReportReason.WrongData)}
          className="justify-content-between"
          tag="button"
          action
        >
          Wrong product data
        </ListGroupItem>
        <ListGroupItem
          onClick={() => onClick(ProductReportReason.WrongProduct)}
          className="justify-content-between"
          tag="button"
          action
        >
          Wrong product
        </ListGroupItem>
        <ListGroupItem
          onClick={() => onClick(ProductReportReason.InappropriateEntry)}
          className="justify-content-between"
          tag="button"
          action
        >
          Inappropriate product entry
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};
