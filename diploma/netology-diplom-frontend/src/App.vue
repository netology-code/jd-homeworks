<template>
    <navbar />
    <router-view />
    <notifications />
</template>

<script>
    import {defineComponent} from 'vue';
    import Navbar from '@/components/Navbar.vue';
    import Notifications from "@/components/Notifications";

    export default defineComponent({
        name: 'App',
        components: {
            Notifications,
            Navbar,
        },
    });
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        font-family: inherit;
    }

    #app {
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        main {
            flex-grow: 1;
        }
    }
</style>
