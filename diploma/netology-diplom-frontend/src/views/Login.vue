<template>
    <main class="login">
        <h1 class="login__title">
            Облачное хранилище
        </h1>
        <p class="login__subtitle">
            Введите свою почту и пароль, чтобы начать
            работу в облачном хранилище
        </p>

        <form class="login__form"
              @submit.prevent>
            <e-input v-model="form.email"
                     :errors="formErrors.email"
                     class="123"
                     placeholder="Введите вашу почту"
                     size="large"
                     @blur="validateForm('email')" />
            <e-input v-model="form.password"
                     :errors="formErrors.password"
                     placeholder="Введите ваш пароль"
                     size="large"
                     @blur="validateForm('password')" />

            <e-button :disabled="formHasLocalError"
                      class="form__submit"
                      size="large"
                      @click="submitForm">
                Войти
            </e-button>
        </form>
    </main>
</template>

<script lang="ts">
    import {computed, defineComponent, reactive} from 'vue';
    import EInput from '@/components/elements/EInput.vue';
    import EButton from "@/components/elements/EButton.vue";
    import {useStore} from "vuex";
    import {useRouter} from 'vue-router';


    export default defineComponent({
        name: 'LoginComponent',
        components: {
            EInput,
            EButton
        },
        setup() {
            const store = useStore();
            const router = useRouter();

            const form = reactive({
                email: '',
                password: ''
            });

            const formErrors = reactive({
                email: [] as string[],
                password: [] as string[]
            });

            const formHasLocalError = computed(() => {
                return (
                    formErrors.email[0] === 'Необходимо ввести почту'
                    || formErrors.password[0] === 'Необходимо ввести пароль'
                );
            });

            const validateForm = (field = null) => {
                let errorHandled = false;

                if ((!field || field === 'email')) {
                    if (form.email.length === 0) {
                        formErrors.email = ['Необходимо ввести почту'];
                        errorHandled = true;
                    } else {
                        formErrors.email = [];
                    }
                }

                if ((!field || field === 'password')) {
                    if (form.password.length === 0) {
                        formErrors.password = ['Необходимо ввести пароль'];
                        errorHandled = true;
                    } else {
                        formErrors.password = [];
                    }
                }

                return !errorHandled;
            };

            const submitForm = () => {
                if (!validateForm()) return;

                store.dispatch('login', {
                    email: form.email,
                    password: form.password
                }).then(res => {
                    // Очищаем ошибки
                    formErrors.email = [];
                    formErrors.password = [];

                    // Переходим на главную
                    router.push({
                        'name': 'Home'
                    });
                }).catch(res => {
                    // Ошибка при авторизации
                    if (res.data.email.length > 0) {
                        formErrors.email = res.data.email;
                    } else {
                        formErrors.email = [];
                    }

                    if (res.data.password.length > 0) {
                        formErrors.password = res.data.password;
                    } else {
                        formErrors.password = [];
                    }
                });
            }

            return {
                form,
                formErrors,
                formHasLocalError,
                validateForm,
                submitForm
            };
        },
    });
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__title {
            margin-bottom: 58px;
            font-size: 64px;
            text-align: center;
        }

        &__subtitle {
            margin-bottom: 60px;
            max-width: 510px;
            font-size: 24px;
            font-weight: 300;
            text-align: center;
        }

        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 530px;

            .form {
                &__submit {
                    margin-top: 60px;
                    min-width: 175px;
                }
            }
        }
    }

    .e-input + .e-input {
        margin-top: 26px;
    }
</style>
