import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { ScreenSize } from "./screenSize";

export const useAppParams = () => {
  return useSelector((state: ApplicationState) => {
    if (state.application) {
      return [state.application.isMobile, state.application.screenSize];
    }
    return [false, ScreenSize.sm];
  });
};

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);
  }, []);

  return { isMobile };
};
