import {createStore} from "vuex";
import cookies from 'browser-cookies';
import {AUTH_TOKEN_KEY} from "@/api/httpClient";
import {getFiles, login, logout} from "@/api/api";

export default createStore({
    state() {
        return {
            authToken: cookies.get(AUTH_TOKEN_KEY),
            files: [],
            notifications: [],
            notificationsCount: 0,
        }
    },
    mutations: {
        authToken(state: any, val: string) {
            state.authToken = val
        },
        files(state: any, val: string) {
            state.files = val
        },
        notifications(state: any, val: string) {
            state.notifications = val
        },
        notificationsCount(state: any, val: string) {
            state.notificationsCount = val
        }
    },
    getters: {
        isGuest(state: any) {
            return !state.authToken;
        }
    },
    actions: {
        setAuthToken({commit}: any, token: string) {
            commit('authToken', token);
            cookies.set(AUTH_TOKEN_KEY, token);
        },
        login({dispatch}: any, {email, password}) {
            return login(email, password)
                .then(res => {
                    dispatch('setAuthToken', res.data['auth-token']);
                    return res;
                })
                .catch(err => {
                    if (err.response) {
                        throw err.response;
                    } else {
                        throw err;
                    }
                })
        },
        logout({dispatch}: any) {
            return new Promise((res) => {
                logout()
                    .then(() => {
                        dispatch('setAuthToken', '');
                        cookies.erase(AUTH_TOKEN_KEY);
                        res();
                    })
                    .catch(() => {
                        dispatch('setAuthToken', '');
                        cookies.erase(AUTH_TOKEN_KEY);
                        res();
                    })
            })
        },
        getFiles() {
            return getFiles(3)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    if (err.response) {
                        throw err.response;
                    } else {
                        throw err;
                    }
                })
        },
        addNotification({state, commit}, notification) {
            commit('notificationsCount', state.notificationsCount + 1);

            notification.id = state.notificationsCount;

            state.notifications.push(notification);

            return state.notifications[notification.id - 1];
        },
    }
})


