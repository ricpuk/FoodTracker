import axios from "axios";
import authService from "../components/api-authorization/AuthorizationService";
import { AppPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import { History } from "history";

const API = axios.create({});

export const API_DIARY_ENTRIES = (diaryId: number) =>
  `/api/diaries/${diaryId}/entries/`;

export function configureAxios(history: History<any>) {
  // Add a request interceptor
  API.interceptors.request.use(
    async (config) => {
      const token = await authService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        history.push(AppPaths.Login);
        return;
      }
      return Promise.reject(error);
    }
  );
}

export default API;
