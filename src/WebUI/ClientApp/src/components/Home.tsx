import * as React from 'react';
import { connect } from 'react-redux';
import PermissionHandler from '../utils/permissionHandler';

const Video = React.lazy(() => import('./video'));

const Home = () => {

  const [ isCameraSupported, setCameraSupported ] = React.useState(false);
  const [ isCameraEnabled, setCameraEnabled ] = React.useState(PermissionHandler.isCameraPermissionGranted());

  React.useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraSupported(true);
    }
  }, [])

  const onCamEnabled = () => {
    PermissionHandler.cameraPermissionGranted();
    setCameraEnabled(true);
  }

  return (
    <>
      {isCameraSupported && isCameraEnabled ?
        <React.Suspense fallback={<div>Loading...</div>}>
          <Video/>
        </React.Suspense>
      :
        ""
      }
      {isCameraSupported && !isCameraEnabled ?
        <>
          <div className="cameraHandler__message">Enable your camera with the button below
            <br/>
          </div>
          <button type="button" aria-label="Enable Camera" className="btn__round camera__enable" onClick={onCamEnabled}>
            CAMERA
          </button>
        </>
        :
        ""
      }
      {!isCameraSupported ?
        <div className="cameraHandler__unsopported">
          <div>
            <p>Your device does not support camera access or something went wrong <span role="img" aria-label="thinking-face">🤔</span></p>
            <p>You can enter the barcode below</p>
          </div>
        </div>
        :
        ""
      }
    </>
  );
};

export default connect()(Home);
