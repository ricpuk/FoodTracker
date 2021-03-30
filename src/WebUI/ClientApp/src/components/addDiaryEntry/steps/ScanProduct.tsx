import React, { ChangeEvent, useState } from "react";
import { Button, Input } from "reactstrap";
import BarCodeScanner from "../../barCodeScanner";

interface ScanProductProps {
  submit: (code: string) => void;
}

export default (props: ScanProductProps) => {
  const [code, setCode] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.value.length > 13) {
      return;
    }
    setCode(target.value);
  };

  const validate = (value: string) => {
    if (!validateCode(value)) {
      setCode("");
      //toast error
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validateCode(code)) {
      //Error toast
      return;
    }
    props.submit(code);
  };

  const codeScanned = (value: string) => {
    if (validate(value)) {
      props.submit(value);
    }
  };

  const validateCodeLength = (value: string) => {
    const validlengths = [8, 12, 13];
    return validlengths.includes(value.length);
  };

  const validateCode = (value: string) => {
    const digits = () => /^\d{8,13}$/g.test(value);

    if (!digits() || !validateCodeLength(value)) {
      return false;
    }
    return true;
  };

  return (
    <React.Fragment>
      <h5 className="text-center mt-2">Scan or enter a barcode</h5>
      <div className="mt-3">
        <BarCodeScanner scanned={codeScanned} />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Input
          type="number"
          placeholder="Barcode here..."
          style={{ width: 250 }}
          value={code}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex mt-2 justify-content-center mb-5">
        <Button
          color="success"
          style={{ width: 250 }}
          disabled={!validateCodeLength(code)}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};
