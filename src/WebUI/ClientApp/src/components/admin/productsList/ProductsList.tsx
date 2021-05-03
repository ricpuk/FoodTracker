import React, { Fragment } from "react";
import {
  Button,
  PopoverBody,
  PopoverHeader,
  Spinner,
  Table,
  UncontrolledPopover,
} from "reactstrap";
import { Product } from "../../../store/Products";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface ProductsListProps {
  products?: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default (props: ProductsListProps) => {
  const { isLoading, products, onEdit, onDelete } = props;

  const renderControls = (product: Product) => (
    <Fragment>
      <Button color="primary" className="mr-1" onClick={() => onEdit(product)}>
        <FiEdit3 />
      </Button>
      <Button color="danger" id={`product-${product.id}`} className="ml-1">
        <FiTrash2 />
      </Button>
      <UncontrolledPopover
        trigger="legacy"
        placement="bottom"
        target={`product-${product.id}`}
      >
        <PopoverHeader>Are you sure?</PopoverHeader>
        <PopoverBody>
          <span>Deleting this product will effect previous diaries.</span>
          <Button
            className="w-100"
            color="danger"
            onClick={() => onDelete(product)}
          >
            Delete
          </Button>
        </PopoverBody>
      </UncontrolledPopover>
    </Fragment>
  );

  const renderRow = (product: Product) => (
    <tr key={product.id}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.barCode}</td>
      <td>{product.servings.length}</td>
      <td style={{ whiteSpace: "nowrap" }}>{renderControls(product)}</td>
    </tr>
  );

  const renderLoader = () => (
    <div
      className="position-absolute w-100 h-100 d-flex justify-content-center pt-3"
      style={{ top: 0, left: 0 }}
    >
      <div
        className="w-100 h-100"
        style={{ background: "white", opacity: 0.5 }}
      ></div>
      <Spinner
        style={{ width: 80, height: 80 }}
        color="primary"
        className="position-absolute"
      />
    </div>
  );

  const renderTable = () => {
    return (
      <div className="position-relative">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product name</th>
              <th>Bar code</th>
              <th>Servings</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => renderRow(product))}
          </tbody>
        </Table>
        {isLoading && renderLoader()}
      </div>
    );
  };

  return renderTable();
};
