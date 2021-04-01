import React from "react";
import { toastr } from "react-redux-toastr";
import ToastWrapper from "../components/toastWrapper/ToastWrapper";

export default class Toaster {
  static success(title: string, message: string) {
    toastr.success("", "", {
      component: <ToastWrapper title={title} message={message} />,
    });
  }
  static warning(title: string, message: string) {
    toastr.warning("", "", {
      component: <ToastWrapper title={title} message={message} />,
    });
  }
  static error(title: string, message: string) {
    toastr.error("", "", {
      component: <ToastWrapper title={title} message={message} />,
    });
  }
  static info(title: string, message: string) {
    toastr.info("", "", {
      component: <ToastWrapper title={title} message={message} />,
    });
  }
}
