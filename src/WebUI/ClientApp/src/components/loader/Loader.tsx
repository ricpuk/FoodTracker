import React from "react";
import FullScreenLoader from "../FullScreenLoader";

interface LoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export default (props: LoaderProps) => {
  return (
    <div>
      {props.isLoading && (
        <FullScreenLoader backgroundColor="rgba(0,0,0,0.1)" />
      )}
      {props.children}
    </div>
  );
};
