import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

interface ToastWrapperProps {
  title: string;
  message: string;
}

const ToastWrapper = (props: ToastWrapperProps) => (
  <Toast fade={false}>
    <ToastHeader>{props.title}</ToastHeader>
    <ToastBody className="text-dark">{props.message}</ToastBody>
  </Toast>
);

export default ToastWrapper;
