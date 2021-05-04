import React, { useEffect, useState } from "react";
import { ProductReportReason } from "../../enums/ProductReportReasons";
import { Product } from "../../store/Products";

import API, { API_ADMIN_REPORTS } from "../../utils/api";
import { GetListResponse } from "../../utils/interfaces";
import Toaster from "../../utils/toaster";
import ProductsList from "./productsList/ProductsList";
import ReportsList from "./reportsList/ReportsList";

export interface Report {
  id: number;
  product: Product;
  reason: ProductReportReason;
  status: string;
}

const ReportsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>();

  const resolved = (report: Report) => {
    setIsLoading(true);
    API.put(`${API_ADMIN_REPORTS}/${report.id}`)
      .then((response) => {
        Toaster.success("Success", "Report has been resolved.");
        if (!reports) {
          return;
        }
        const index = reports.findIndex((x) => x.id === report.id);

        setReports([...reports.slice(0, index), ...reports.slice(index + 1)]);
      })
      .catch((error) => Toaster.error("Error", error.message))
      .finally(() => setIsLoading(false));
  };

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
      <ReportsList
        isLoading={isLoading}
        reports={reports}
        onResolved={resolved}
      />
    </div>
  );
};

export default ReportsPage;
