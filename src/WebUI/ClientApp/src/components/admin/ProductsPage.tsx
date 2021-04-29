import React, { useEffect, useState } from "react";
import { Product } from "../../store/Products";

import API, { API_ADMIN_PRODUCTS } from "../../utils/api";
import { GetListResponse } from "../../utils/interfaces";
import Toaster from "../../utils/toaster";
import ProductsList from "./productsList/ProductsList";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    API.get<GetListResponse<Product>>(API_ADMIN_PRODUCTS)
      .then((response) => setProducts(response.data.items))
      .catch((error) => Toaster.error("Error", error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <ProductsList isLoading={isLoading} products={products} />
    </div>
  );
};

export default ProductsPage;
// export default connect(
//   (state: ApplicationState) => state.coaching,
//   CoachingStore.actionCreators
// )(ClientPage as any);
