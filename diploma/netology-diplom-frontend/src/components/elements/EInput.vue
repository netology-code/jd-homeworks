<template>
    <div :class="[
            typeClass,
            sizeClass,
            {
                'e-input--error': hasError
            }
        ]"
         class="e-input">
        <input :placeholder="placeholder"
               class="e-input__input"
               @blur="$emit('blur')"
               @change="modelChanged"
               @input="modelChanged">
        <p v-for="(error, index) in errors"
           class="e-input__error"
           v-bind:key="index">
            {{ error }}
        </p>
    </div>
</template>

<script>
    import {computed, defineComponent} from 'vue';

    export default defineComponent({
        name: 'EInput',
        emits: ['blur'],
        props: {
            modelValue: String,
            type: {
                type: String,
                default: 'default',
                validate(v) {
                    return ['default'].includes(v);
                },
            },
            size: {
                type: String,
                default: 'medium',
                validate(v) {
                    return ['medium', 'large'].includes(v);
                },
            },
            errors: {
                type: Array,
            },
            placeholder: String,
        },
        setup(props, {emit}) {
            const typeClass = computed(() => {
                return `e-input--type-${props.type}`;
            });

            const sizeClass = computed(() => {
                return `e-input--size-${props.size}`;
            });

            const hasError = computed(() => {
                return props.errors.length > 0;
            });

            const modelChanged = (e) => {
                const val = e.target.value;
                emit('update:modelValue', val);
            };

            return {
                typeClass,
                sizeClass,
                hasError,
                modelChanged,
            };
        },
    });
</script>

<style lang="scss" scoped>
    @import "@/styles/_variables.scss";

    .e-input {
        width: 100%;

        &--size-large {
            .e-input__input {
                height: 70px;
                font-size: 20px;
            }
        }

        &--error {
            .e-input__input {
                border-color: $color-red;
                color: $color-red;
                background-color: #FFCDCD;

                &::placeholder {
                    color: rgba($color-red, .5);
                }
            }
        }

        &__input {
            padding-left: 30px;
            border: 1px solid #CECECE;
            width: 100%;
            height: 50px;
            background-color: #E0E0E0;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;

            &:focus {
                border-color: #808080;
            }

            &::placeholder {
                color: #b0b0b0;
            }
        }

        &__error {
            padding-top: 13px;
            padding-left: 30px;
            color: $color-red;
            font-size: 18px;
        }

        &__error + .e-input__error {
            padding-top: 4px;
        }
    }
</style>
