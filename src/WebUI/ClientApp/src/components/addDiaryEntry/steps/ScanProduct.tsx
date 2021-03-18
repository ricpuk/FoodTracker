import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Button, Input } from "reactstrap";
import BarCodeScanner from "../../barCodeScanner";

export default () => {
  //   const [isCameraSupported, setCameraSupported] = React.useState(false);
  //   const [isCameraEnabled, setCameraEnabled] = React.useState(
  // PermissionHandler.isCameraPermissionGranted()
  const [code, setCode] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setCode(target.value);
  };

  const codeScanned = (value: string) => {
    setCode(value);
  };

  return (
    <React.Fragment>
      <h5 className="text-center mt-2">Scan or enter a barcode</h5>
      <div className="mt-3">
        <BarCodeScanner scanned={codeScanned} />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Input
          placeholder="Barcode here..."
          style={{ width: 250 }}
          value={code}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex mt-2 justify-content-center mb-5">
        <Button color="success" style={{ width: 250 }}>
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};
