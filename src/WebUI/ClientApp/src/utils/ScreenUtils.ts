import { ScreenSize } from "./screenSize";

export const getScreenParams = (): ScreenParams => {
  const width = window.innerWidth;
  if (width < 576) {
    return {
      isMobile: true,
      screenSize: ScreenSize.xs,
    };
  }
  if (width < 768) {
    return {
      isMobile: false,
      screenSize: ScreenSize.sm,
    };
  }
  if (width < 992) {
    return {
      isMobile: false,
      screenSize: ScreenSize.md,
    };
  }
  if (width < 1200) {
    return {
      isMobile: false,
      screenSize: ScreenSize.lg,
    };
  }
  if (width < 1400) {
    return {
      isMobile: false,
      screenSize: ScreenSize.xl,
    };
  }

  return {
    isMobile: false,
    screenSize: ScreenSize.xxl,
  };
};

interface ScreenParams {
  isMobile: boolean;
  screenSize: ScreenSize;
}
