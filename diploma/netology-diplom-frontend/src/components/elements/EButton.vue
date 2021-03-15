<template>
    <button :class="[
                typeClass,
                sizeClass
            ]"
            class="e-button">
        <slot></slot>
    </button>
</template>

<script>
    import {computed, defineComponent} from 'vue';

    export default defineComponent({
        name: 'EButton',
        props: {
            type: {
                type: String,
                default: 'primary',
                validate(v) {
                    return ['primary', 'plain', 'text'].includes(v);
                },
            },
            size: {
                type: String,
                default: 'medium',
                validate(v) {
                    return ['medium', 'large'].includes(v);
                },
            },
        },
        setup(props) {
            const typeClass = computed(() => {
                return `e-button--type-${props.type}`;
            });

            const sizeClass = computed(() => {
                return `e-button--size-${props.size}`;
            });

            return {
                typeClass,
                sizeClass,
            };
        },
    });
</script>

<style lang="scss" scoped>
    @import "@/styles/_variables.scss";

    .e-button {
        border: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        font-size: 18px;
        text-align: center;
        transition: .05s ease;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;

        ::v-deep img {
            margin: 0 4px;
        }

        &--type-primary {
            padding: 10px 18px;
            color: #ffffff;
            background-color: $color-primary;
            border-radius: 8px;

            &:hover {
                background-color: lighten($color-primary, 10);
            }

            &[disabled] {
                color: #b0b0b0;
                background-color: #E0E0E0;
                cursor: default;
            }
        }

        &--type-plain {
            padding: 10px 18px;
            color: $color-primary;
            background-color: $color-light-blue;
            border-radius: 8px;
            font-weight: 500;

            &:hover {
                background-color: darken($color-light-blue, 5);
            }

            &[disabled] {
                color: #b0b0b0;
                background-color: #E0E0E0;
                cursor: default;
            }
        }

        &--type-text {
            &:hover {
                opacity: .6;
            }
        }

        &--size-large {
            padding: 20px 32px;
            font-size: 24px;
        }
    }
</style>
