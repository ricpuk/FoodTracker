import React, { Fragment } from "react";
import { Button, Spinner, Table } from "reactstrap";
import { Product } from "../../../store/Products";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface ProductsListProps {
  products?: Product[];
  isLoading: boolean;
}

export default (props: ProductsListProps) => {
  const { isLoading, products } = props;

  const renderControls = (product: Product) => (
    <Fragment>
      <Button color="primary" className="mr-1">
        <FiEdit3 />
      </Button>
      <Button color="danger" className="ml-1">
        <FiTrash2 />
      </Button>
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

  const renderTable = () => {
    return (
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
    );
  };

  if (isLoading) {
    return <Spinner style={{ width: 50, height: 50 }} />;
  }
  return renderTable();
};
