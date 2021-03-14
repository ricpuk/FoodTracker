import React, { useState } from "react";
import FullScreenLoader from "../FullScreenLoader";

interface LoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export default (props: LoaderProps) => {
  if (props.isLoading) {
    return <FullScreenLoader />;
  }
  return <div>{props.children}</div>;
};
