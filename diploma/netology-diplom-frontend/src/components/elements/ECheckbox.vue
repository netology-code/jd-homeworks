<template>
    <label :class="{
            'e-checkbox--checked': isChecked,
            'e-checkbox--terminated': isTerminated
         }"
         class="e-checkbox">
        <input :value="modelValue"
               class="e-checkbox__input"
               type="checkbox"
               @change="inputChanged">
    </label>
</template>

<script>
    import {computed, defineComponent, watch} from 'vue';

    export default defineComponent({
        name: 'ECheckbox',
        props: {
            modelValue: {},
            terminated: {
                type: Boolean,
                default: false,
            }
        },
        setup(props, {emit}) {
            // watch(() => props.modelValue, (val) => {
            //     console.log(val);
            // });

            const isChecked = computed(() => {
                return props.modelValue;
            });

            const isTerminated = computed(() => {
                return props.terminated;
            });

            const inputChanged = (e) => {
                // Проверяем, действительно ли произошло изменение. Если нет - форсируем изменения
                if (props.modelValue === e.target.checked) {
                    emit('update:modelValue', !e.target.checked)
                } else {
                    emit('update:modelValue', e.target.checked)
                }
            };

            return {
                isTerminated,
                isChecked,
                inputChanged
            };
        },
    });
</script>

<style lang="scss" scoped>
    @import "@/styles/_variables.scss";

    .e-checkbox {
        border: 3px solid #c4c4c4;
        display: block;
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-radius: 5px;
        box-sizing: border-box;
        cursor: pointer;

        &--checked {
            border-color: $color-primary;
            background-color: $color-primary;
            background-image: url('../../assets/icons/done-tick.svg');
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 80%;
        }

        &--terminated {
            border-color: $color-primary;
        }

        &__input {
            display: none;
        }
    }
</style>
