import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import { withRouter } from "react-router";
import "./barCodeScanner.css";

const BarCodeSCanner = () => {
  const [cameraInit, setCameraInit] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const onInitSuccess = () => {
    Quagga.start();
    setCameraInit(true);
  };
  const onDetected = (result) => {
    alert("captured");
    var code = result.codeResult.code;
    setBarcode(code);
  };
  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((response) => {
          debugger;
          initQuagga();
        })
        .catch((err) => {
          setCameraError(true);
        });
    }
  });

  const initQuagga = () => {
    debugger;
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
            debugger;
            setCameraError(true);
            return;
          }
          onInitSuccess();
        }
      );
    } catch (err) {
      console.log(err);
      debugger;
    }

    Quagga.onDetected(onDetected);
  };

  useEffect(() => {}, [barcode]);
  return (
    <div className="video__container">
      {cameraError ? (
        <div className="skeleton__unsopported">
          <div>
            <p>
              Your device does not support camera access or something went wrong{" "}
            </p>
            <p>You can enter the barcode below</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="video" id="camera" />
        </div>
      )}
    </div>
  );
};
export default withRouter(BarCodeSCanner);
