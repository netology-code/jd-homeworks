import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from "@/stores/index";

const app = createApp(App)
    .use(store)
    .use(router);

router.isReady().then(() => {
    app.mount('#app');
});

