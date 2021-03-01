import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

import { withRouter } from 'react-router';

import './video.css';

const Video = ({ history }) => {
  const [ videoInit, setVideoInit ] = useState(false);
  const [ videoError, setVideoError ] = useState(false);
  const [ attempts, setAttempts ] = useState(0);
  const [ barcode, setBarcode ] = useState(null);

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    alert("captured")
    var code = result.codeResult.code;
    setBarcode(code)
  }

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder : {
          readers : ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
          if (err) {
            setVideoError(true);
            return;
          }
          onInitSuccess();
      });
      Quagga.onDetected(onDetected);
    }
  }, []);

  useEffect(() => {
  }, [barcode]);

  return (
    <div>
    <div className="video" id="video" />
      {barcode && <div>{barcode}</div>}
    </div>
    );
}

export default withRouter(Video);
