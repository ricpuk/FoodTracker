import * as React from "react";

interface FullScreenLoaderProps {
  backgroundColor: string;
}

const FullScreenLoader = (props: FullScreenLoaderProps) => {
  const bg = props.backgroundColor ? props.backgroundColor : "white";
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: bg,
        opacity: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: -20,
          marginLeft: -25,
          width: 100,
          height: 80,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: 100, height: 100 }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
