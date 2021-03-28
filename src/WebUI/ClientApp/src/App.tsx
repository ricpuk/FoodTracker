import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Diary from "./components/diary/Diary";
import Coaching from "./components/coaching/Coaching";
import ClientPage from "./components/clientPage/ClientPage";

import "./custom.css";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { AppPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <AuthorizeRoute exact path="/diary" component={Diary} />
    <AuthorizeRoute exact path="/coaching" component={Coaching} />
    <AuthorizeRoute path="/coaching/:clientId" component={ClientPage} />
    <Route
      path={AppPaths.ApiAuthorizationPrefix}
      component={ApiAuthorizationRoutes}
    />
  </Layout>
);
