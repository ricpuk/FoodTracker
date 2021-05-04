import React, { Fragment } from "react";
import { Alert, Button, Spinner, Table } from "reactstrap";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Report } from "../ReportsPage";
import { ProductReportReason } from "../../../enums/ProductReportReasons";

interface ReportsListProps {
  reports?: Report[];
  isLoading: boolean;
}

export default (props: ReportsListProps) => {
  const { isLoading, reports } = props;

  const renderControls = (report: Report) => (
    <Fragment>
      <Button color="primary" className="mr-1">
        Resolved
      </Button>
    </Fragment>
  );

  const parseReason = (reason: ProductReportReason) => {
    switch (reason) {
      case ProductReportReason.InappropriateEntry:
        return "Inappropriate entry";
      case ProductReportReason.WrongData:
        return "Wrong data";
      case ProductReportReason.WrongProduct:
        return "Wrong product";
      default:
        return "Reason unkown";
    }
  };

  const renderRow = (report: Report) => (
    <tr key={report.id}>
      <th scope="row">{report.id}</th>
      <td>{parseReason(report.reason)}</td>
      <td>{report.product.barCode}</td>
      <td>{report.product.name}</td>
      <td style={{ whiteSpace: "nowrap" }}>{renderControls(report)}</td>
    </tr>
  );

  const renderTable = () => {
    return (
      <Table hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Reason</th>
            <th>Product barcode</th>
            <th>Product name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports ? (
            reports.map((report) => renderRow(report))
          ) : (
            <td colSpan={5}>
              <Alert color="info">
                There are no unresovled reports currently.
              </Alert>
            </td>
          )}
        </tbody>
      </Table>
    );
  };

  if (isLoading) {
    return <Spinner style={{ width: 50, height: 50 }} />;
  }

  return renderTable();
};
