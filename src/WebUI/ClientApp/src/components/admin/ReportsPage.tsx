import React, { useEffect, useState } from "react";
import { Product } from "../../store/Products";

import API, { API_ADMIN_REPORTS } from "../../utils/api";
import { GetListResponse } from "../../utils/interfaces";
import Toaster from "../../utils/toaster";
import ProductsList from "./productsList/ProductsList";
import ReportsList from "./reportsList/ReportsList";

export interface Report {
  id: number;
  product: Product;
  reason: string;
  status: string;
}

const ReportsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    API.get<GetListResponse<Report>>(API_ADMIN_REPORTS)
      .then((response) => setReports(response.data.items))
      .catch((error) => {
        Toaster.error("Error", error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <ReportsList isLoading={isLoading} reports={reports} />
    </div>
  );
};

export default ReportsPage;
