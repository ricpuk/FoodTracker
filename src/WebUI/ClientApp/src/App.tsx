import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Diary from "./components/diary/Diary";
import Coaching from "./components/coaching/Coaching";
import ClientPage from "./components/clientPage/ClientPage";
import * as UserStore from "./store/User";

import "./custom.css";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { AppPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "./store";
import FullScreenLoader from "./components/FullScreenLoader";
import ProfilePage from "./components/profilePage/ProfilePage";
import ClientDiary from "./components/clientPage/ClientDiary";
import ProductsPage from "./components/admin/ProductsPage";
import ReportsPage from "./components/admin/ReportsPage";
import CoachPage from "./components/coachPage/CoachPage";

export default () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state: ApplicationState) => {
    if (!state.user) {
      return false;
    }
    return state.user.initialized;
  });
  const { fetchUserProfile } = UserStore.actionCreators;
  React.useEffect(() => {
    dispatch(fetchUserProfile());
  }, [fetchUserProfile, dispatch]);

  if (!initialized) {
    return (
      <Layout>
        <Route path="/" render={() => <FullScreenLoader />} />
        <Route
          path={AppPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
      </Layout>
    );
  }
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <AuthorizeRoute exact path="/diary" component={Diary} />
      <AuthorizeRoute exact path="/coaching" component={Coaching} />
      <AuthorizeRoute
        exact
        path="/coaching/coach/:coachId"
        component={CoachPage}
      />
      <AuthorizeRoute exact path="/profile" component={ProfilePage} />
      <AuthorizeRoute exact path="/coaching/:clientId" component={ClientPage} />
      <AuthorizeRoute
        path="/coaching/:clientId/diary"
        component={ClientDiary}
      />
      <AuthorizeRoute path="/admin/products" component={ProductsPage} />
      <AuthorizeRoute path="/admin/reports" component={ReportsPage} />
      <Route
        path={AppPaths.ApiAuthorizationPrefix}
        component={ApiAuthorizationRoutes}
      />
    </Layout>
  );
};
