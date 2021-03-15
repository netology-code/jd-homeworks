import axios from "axios";
import cookies from 'browser-cookies';

const AUTH_TOKEN_KEY = 'auth-token';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const getAuthToken = () => cookies.get(AUTH_TOKEN_KEY);

const authInterceptor = (config: any) => {
    config.mode =  'no-cors';
    config.headers[AUTH_TOKEN_KEY] = `Bearer ${getAuthToken()}`;
    return config;
}

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;

export {
    AUTH_TOKEN_KEY
};
