import React, { useEffect, useState } from "react";
import authService from "./AuthorizationService";
import { AuthenticationResultStatus } from "./AuthorizationService";
import { LoginPaths, QueryParams, AppPaths } from "./ApiAuthorizationConstants";
import FullScreenLoader from "../FullScreenLoader";

interface LoginProps {
  action: string;
}

interface AuthorizeResult {
  status: string;
  message: string;
  state: any;
}

export const Login = (props: LoginProps) => {
  const [message, setMessage] = useState<string>();
  const { action } = props;

  useEffect(() => {
    const action = props.action;
    switch (action) {
      case LoginPaths.Login:
        login(getReturnUrl());
        break;
      case LoginPaths.LoginCallback:
        processLoginCallback();
        break;
      case LoginPaths.LoginFailed:
        const params = new URLSearchParams(window.location.search);
        const error = params.get(QueryParams.Message);
        if (!error) {
          return;
        }
        setMessage(error);
        break;
      case LoginPaths.Profile:
        redirectToProfile();
        break;
      case LoginPaths.Register:
        redirectToRegister();
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  });

  const login = async (returnUrl: string) => {
    const state = { returnUrl };
    const result = (await authService.signIn(state)) as AuthorizeResult;
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        break;
      case AuthenticationResultStatus.Success:
        await navigateToReturnUrl(returnUrl);
        break;
      case AuthenticationResultStatus.Fail:
        setMessage(result.message);
        break;
      default:
        throw new Error(`Invalid status result ${result.status}.`);
    }
  };

  const processLoginCallback = async () => {
    const url = window.location.href;
    const result = (await authService.completeSignIn(url)) as AuthorizeResult;
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        // There should not be any redirects as the only time completeSignIn finishes
        // is when we are doing a redirect sign in flow.
        throw new Error("Should not redirect.");
      case AuthenticationResultStatus.Success:
        await navigateToReturnUrl(getReturnUrl(result.state));
        break;
      case AuthenticationResultStatus.Fail:
        setMessage(result.message);
        break;
      default:
        throw new Error(
          `Invalid authentication result status '${result.status}'.`
        );
    }
  };

  const getReturnUrl = (state?: any) => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParams.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
      // This is an extra check to prevent open redirects.
      throw new Error(
        "Invalid return url. The return url needs to have the same origin as the current page."
      );
    }
    return (
      (state && state.returnUrl) || fromQuery || `${window.location.origin}/`
    );
  };

  const redirectToRegister = () => {
    redirectToApiAuthorizationPath(
      `${AppPaths.IdentityRegisterPath}?${QueryParams.ReturnUrl}=${encodeURI(
        AppPaths.Login
      )}`
    );
  };

  const redirectToProfile = () => {
    redirectToApiAuthorizationPath(AppPaths.IdentityManagePath);
  };

  const redirectToApiAuthorizationPath = (apiAuthorizationPath: string) => {
    const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
    window.location.replace(redirectUrl);
  };

  const navigateToReturnUrl = (returnUrl: string) => {
    window.location.replace(returnUrl);
  };

  if (!!message) {
    return <div>{message}</div>;
  }
  switch (action) {
    case LoginPaths.Login:
    case LoginPaths.LoginCallback:
      return <FullScreenLoader />;
    default:
      throw new Error(`Invalid action '${action}'`);
  }
};
