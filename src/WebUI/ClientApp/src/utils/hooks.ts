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
