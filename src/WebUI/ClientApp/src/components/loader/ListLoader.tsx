import React from "react";
import { Spinner } from "reactstrap";

interface ListLoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export default (props: ListLoaderProps) => {
  const renderLoader = () => {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Spinner color="primary" />
      </div>
    );
  };
  return (
    <div style={{ minHeight: 150 }}>
      {props.isLoading && renderLoader()}
      {props.children}
    </div>
  );
};
