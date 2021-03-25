import React, { Fragment, useEffect, useState } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizationService";
import { AppPaths } from "./ApiAuthorizationConstants";

interface PathState {
  pathname: string;
  state: any;
}

export const LoginMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  let _subscription: any;

  useEffect(() => {
    _subscription = authService.subscribe(() => populateState());
    populateState();
    return () => {
      authService.unsubscribe(_subscription);
    };
  });

  const populateState = async () => {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    setIsAuthenticated(isAuthenticated);
    setUserName(user && user.name);
  };

  const anonymousView = (registerPath: string, loginPath: string) => {
    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={registerPath}>
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={loginPath}>
            Login
          </NavLink>
        </NavItem>
      </Fragment>
    );
  };

  const authenticatedView = (
    userName: string,
    profilePath: string,
    logoutPath: PathState
  ) => {
    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={profilePath}>
            Hello {userName}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={logoutPath}>
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    );
  };

  if (!isAuthenticated) {
    const registerPath = `${AppPaths.Register}`;
    const loginPath = `${AppPaths.Login}`;
    return anonymousView(registerPath, loginPath);
  }

  const profilePath = `${AppPaths.Profile}`;
  const logoutPath: PathState = {
    pathname: `${AppPaths.LogOut}`,
    state: { local: true },
  };

  return authenticatedView(userName, profilePath, logoutPath);
};
