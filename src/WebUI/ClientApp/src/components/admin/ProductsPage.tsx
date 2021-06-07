import { AxiosRequestConfig } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Product } from "../../store/Products";

import API, { API_ADMIN_PRODUCTS } from "../../utils/api";
import { GetListResponse } from "../../utils/interfaces";
import Toaster from "../../utils/toaster";
import ProductForm from "../productForm/ProductForm";
import ProductsList from "./productsList/ProductsList";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [product, setProduct] = useState<Product>();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const toggleEdit = () => setEditOpen(!editOpen);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    runSearch();
  }, []);

  const runSearch = () => {
    const config: AxiosRequestConfig = {
      params: {
        query: search,
        pageSize: 100,
      },
    };
    setIsLoading(true);
    API.get<GetListResponse<Product>>(API_ADMIN_PRODUCTS, config)
      .then((response) => setProducts(response.data.items))
      .catch((error) => Toaster.error("Error", error.message))
      .finally(() => setIsLoading(false));
  };

  const handleEdit = (product: Product) => {
    setProduct(product);
    toggleEdit();
  };

  const handleDelete = (product: Product) => {
    if (!products) {
      return;
    }

    setIsLoading(true);
    API.delete(`${API_ADMIN_PRODUCTS}/${product.id}`, {})
      .then(() => {
        const productIndex = products.findIndex((x) => x.id == product.id);

        setProducts([
          ...products.slice(0, productIndex),
          ...products.slice(productIndex + 1),
        ]);
        Toaster.success("Success", "Product successfully deleted.");
      })
      .catch((error) => Toaster.error("Error", error.message))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateSubmit = (product: Product) => {
    if (!products) {
      return;
    }
    const productIndex = products.findIndex((x) => x.id == product.id);
    setProducts([
      ...products.slice(0, productIndex),
      product,
      ...products.slice(productIndex + 1),
    ]);
    Toaster.success("Success", "Success updated product.");
    toggleEdit();
  };

  const getBarCode = () => {
    if (product) {
      return product.barCode;
    }
    return "";
  };

  return (
    <div>
      <div className="d-flex mb-3">
        <Input
          value={search}
          placeholder="search"
          className="mr-2"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
        <Button color="primary" className="ml-2" onClick={runSearch}>
          Search
        </Button>
      </div>
      <ProductsList
        isLoading={isLoading}
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={editOpen} toggle={toggleEdit}>
        <ModalHeader>Update product</ModalHeader>
        <ModalBody className="pt-0">
          <ProductForm
            submit={handleUpdateSubmit}
            barCode={getBarCode()}
            edit={true}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductsPage;
// export default connect(
//   (state: ApplicationState) => state.coaching,
//   CoachingStore.actionCreators
// )(ClientPage as any);
