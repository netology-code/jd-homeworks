import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from "@/stores/index";
import {setupHttpInterceptors} from "@/api/httpClient";

const app = createApp(App)
    .use(store)
    .use(router);

setupHttpInterceptors(store, router)

router.isReady().then(() => {
    app.mount('#app');
});

