import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
// import cookies from 'browser-cookies';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
// import {AUTH_TOKEN_KEY} from "@/api/httpClient";
import store from '@/stores/index';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            authorizedOnly: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            guestOnly: true
        }
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: {
            name: 'Home'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});


router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.authorizedOnly && store.getters.isGuest) {
        // Если гость, шлём авторизоваться
        router.push({
            name: 'Login'
        });

        return;
    }

    if (to.meta) {

        if (to.meta.guestOnly && !store.getters.isGuest) {
            // Если авторизован, шлём внутрь приложения
            router.push({
                name: 'Home'
            });

            return;
        }
    }

    next();
});

export default router
