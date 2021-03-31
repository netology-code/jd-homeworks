import axios from "axios";
import cookies from 'browser-cookies';

const AUTH_TOKEN_KEY = 'auth-token';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

const getAuthToken = () => cookies.get(AUTH_TOKEN_KEY);

const authInterceptor = (config: any) => {
    config.mode =  'no-cors';

    if (getAuthToken() !== null) {
        config.headers[AUTH_TOKEN_KEY] = `Bearer ${getAuthToken()}`;
    }

    return config;
}

export function setupHttpInterceptors(store: any, router: any) {
    httpClient.interceptors.request.use(authInterceptor);

    httpClient.interceptors.response.use(r => r, function (error) {
        if (error.response.status === 401 && error.response.config.url !== '/logout') {
            store.dispatch('logout')
                .then(() => {
                    router.push({
                        name: 'Login'
                    });
                })

            console.error('Сервер вернул 401, авторизация на фронтенде принудительно удалена');
        }
        return Promise.reject(error);
    });
}

export default httpClient;

export {
    AUTH_TOKEN_KEY
};
