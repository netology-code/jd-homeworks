<template>
    <div class="navbar"
         :class="{
            'navbar--center': isGuest
         }">
        <div class="container">
            <img class="navbar__logo"
                 src="../assets/logo.svg">

            <EButton v-if="!isGuest"
                     class="navbar__exit"
                     type="text"
                     @click="logout">
                <img src="@/assets/icons/exit.svg">
                Выйти
            </EButton>
        </div>
    </div>
</template>

<script lang="ts">
    import EButton from '@/components/elements/EButton.vue';
    import {defineComponent, computed} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default defineComponent({
        name: 'Navbar',
        components: {
            EButton,
        },
        setup() {
            const store = useStore();
            const router = useRouter();

            const isGuest = computed(() => store.getters.isGuest);
            const logout = () => {
                store.dispatch('logout')
                    .then(() => {
                        router.push({
                            name: 'Login'
                        });
                    })
            };

            return {
                isGuest,
                logout
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .container {
        margin: 0 auto;
        width: 1170px;
        max-width: calc(100% - 40px);
    }

    .navbar {
        padding: 23px 0;
        border-bottom: 1px solid rgba(#000, .2);

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &--center {
            .container {
                justify-content: center;
            }
        }

        &__exit {
            text-transform: uppercase;
            font-weight: bold;
        }
    }
</style>
