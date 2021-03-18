import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import { withRouter } from "react-router";
import "./barCodeScanner.css";
import { Spinner } from "reactstrap";
import classNames from "classnames";

const BarCodeScanner = (props) => {
  const [cameraInit, setCameraInit] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [scanThrottled, setScanThrottled] = useState(false);
  const onInitSuccess = () => {
    Quagga.start();
    setCameraInit(true);
  };
  const onDetected = (result) => {
    if (scanThrottled) {
      return;
    }
    setScanThrottled(true);

    var code = result.codeResult.code;
    if (props.scanned) {
      props.scanned(code);
    }
    setTimeout(() => {
      setScanThrottled(false);
    }, 1000);
  };
  useEffect(() => {
    if (cameraInit) {
      return;
    }
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          initQuagga();
        })
        .catch((err) => {
          setCameraError(true);
          setCameraInit(true);
        });
    }
  });

  const renderLoader = () => {
    if (cameraInit) {
      return null;
    }
    return (
      <div className="video__container d-flex justify-content-center">
        <Spinner color="success" style={{ width: 45, height: 45 }} />
      </div>
    );
  };

  const initQuagga = () => {
    try {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#camera"),
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "code_128_reader",
            ],
          },
        },
        (err) => {
          if (err) {
            setCameraError(true);
            setCameraInit(true);
            return;
          }
          onInitSuccess();
        }
      );
    } catch (err) {
      console.log(err);
      setCameraError(true);
    }

    Quagga.onDetected(onDetected);
  };

  return (
    <div className="video__container">
      {cameraError ? (
        <div className="skeleton__unsopported">
          <div>
            <p>Something went wrong when opening camera</p>
            <p>Please use the input for barcode below</p>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {renderLoader()}
          <div className={classNames({ invisivle: !cameraInit })}>
            <div className="camera" id="camera" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default withRouter(BarCodeScanner);
