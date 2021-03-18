import React, { useState } from "react";
import BarCodeScanner from "../../barCodeScanner";

export default () => {
  //   const [isCameraSupported, setCameraSupported] = React.useState(false);
  //   const [isCameraEnabled, setCameraEnabled] = React.useState(
  // PermissionHandler.isCameraPermissionGranted()
  const [code, setCode] = useState<string>("");

  return (
    <React.Fragment>
      {code && <p> code </p>}
      <BarCodeScanner />
    </React.Fragment>
  );
};
