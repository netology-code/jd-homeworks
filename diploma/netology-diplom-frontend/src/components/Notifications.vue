<template>
    <div class="notifications">
        <div class="container">
            <div v-for="(notification, notificationIndex) in notifications"
                 :key="notificationIndex"
                 :class="[
                         `notification--status-${notification.status}`
                     ]"
                 class="notification">
                <p class="notification__text">
                    {{ notification.text }}
                    <img v-if="notification.status === 'success'"
                         class="notification__done-icon"
                         src="@/assets/icons/done.svg">
                </p>
                <div class="notification__progress">
                    <div class="notification__progress-fill">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {computed, defineComponent, watch} from "vue";
    import {useStore} from "vuex";

    // import {useRouter} from "vue-router";

    export declare class Notification {
        text: string;
        type: '' | 'loading' | 'success' | 'error';
        hidden: boolean;
    }

    export default defineComponent({
        name: 'Notifications',
        components: {},
        setup() {
            const store = useStore();
            const trackedNotificationIds = [] as any[];
            // const router = useRouter();

            const notifications = computed(() => {
                return store.state.notifications.filter((n: any) => !n.hidden);
            });

            watch(
                () => store.state.notifications,
                () => {
                    for (const notification of notifications.value) {
                        const notificationId = notification.id;

                        if (!trackedNotificationIds.includes(notificationId)) {
                            trackedNotificationIds.push(notificationId);
                        }
                    }
                }, {
                    deep: true
                }
            );

            return {
                notifications
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "@/styles/_variables.scss";

    .container {
        margin: 0 auto;
        width: 1170px;
        max-width: calc(100% - 40px);
    }

    @keyframes loading {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }

    .notifications {
        width: 100%;
        position: fixed;
        bottom: 30px;
        left: 0;
        pointer-events: none;

        .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .notification {
            background-color: #151515;
            border-radius: 4px;
            pointer-events: auto;
            min-width: 800px;
            max-width: 100%;

            &:not(:last-child) {
                margin-bottom: 16px;
            }

            &--status-loading {
                .notification__progress {
                    animation: loading 3s 1;
                }
            }

            &--status-error {
                background-color: #FFCDCD;

                .notification__text {
                    color: $color-red;
                }

                .notification__progress-fill {
                    background-color: $color-red;
                }
            }

            &__text {
                padding: 18px 48px;
                display: flex;
                align-items: center;
                color: #ffffff;
                font-size: 24px;
            }

            &__done-icon {
                margin-left: 10px;
            }

            &__progress {
                height: 5px;
                background-color: #00baf5;
                border-radius: 4px;
            }

            &__progress-fill {
                height: 100%;
                background-color: $color-primary;
                border-radius: 4px;
                transition: .2s ease;
            }
        }
    }
</style>
