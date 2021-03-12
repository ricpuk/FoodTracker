import axios from 'axios';
import authService from '../components/api-authorization/AuthorizationService';

const API = axios.create({
});

// Add a request interceptor
API.interceptors.request.use(
    async config => {
        const token = await authService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default API