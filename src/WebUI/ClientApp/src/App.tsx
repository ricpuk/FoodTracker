import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Diary from "./components/Diary";

import "./custom.css";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { AppPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <AuthorizeRoute path="/diary" component={Diary} />
    <Route
      path={AppPaths.ApiAuthorizationPrefix}
      component={ApiAuthorizationRoutes}
    />
  </Layout>
);
