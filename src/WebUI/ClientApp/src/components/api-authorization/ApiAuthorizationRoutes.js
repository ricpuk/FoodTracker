import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { AppPaths, LoginPaths, LogoutPaths } from "./ApiAuthorizationConstants";

export default class ApiAuthorizationRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route
          path={AppPaths.Login}
          render={() => loginEndpoint(LoginPaths.Login)}
        />
        <Route
          path={AppPaths.LoginFailed}
          render={() => loginEndpoint(LoginPaths.LoginFailed)}
        />
        <Route
          path={AppPaths.LoginCallback}
          render={() => loginEndpoint(LoginPaths.LoginCallback)}
        />
        <Route
          path={AppPaths.Profile}
          render={() => loginEndpoint(LoginPaths.Profile)}
        />
        <Route
          path={AppPaths.Register}
          render={() => loginEndpoint(LoginPaths.Register)}
        />
        <Route
          path={AppPaths.LogOut}
          render={() => logoutEndpoint(LogoutPaths.Logout)}
        />
        <Route
          path={AppPaths.LogOutCallback}
          render={() => logoutEndpoint(LogoutPaths.LogoutCallback)}
        />
        <Route
          path={AppPaths.LoggedOut}
          render={() => logoutEndpoint(LogoutPaths.LoggedOut)}
        />
      </Fragment>
    );
  }
}

function loginEndpoint(name) {
  return <Login action={name}></Login>;
}

function logoutEndpoint(name) {
  return <Logout action={name}></Logout>;
}
