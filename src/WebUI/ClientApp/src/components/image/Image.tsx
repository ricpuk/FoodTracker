import React, { CSSProperties, Fragment, useState } from "react";
import { Spinner } from "reactstrap";

interface ImageProps {
  source: string;
  alt: string;
  style: CSSProperties;
  classes: string;
}

export default (props: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imageStyle = !loaded ? { display: "none" } : {};
  const finalStyle = { ...props.style, ...imageStyle } as CSSProperties;
  return (
    <Fragment>
      {!loaded && (
        <div
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
          }}
          className={props.classes}
        >
          <Spinner color="primary" style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      <img
        src={props.source}
        style={finalStyle}
        alt={props.alt}
        onLoad={() => setLoaded(true)}
        className={loaded ? props.classes : ""}
      />
    </Fragment>
  );
};
