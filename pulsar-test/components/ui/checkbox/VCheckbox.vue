<template>
    <label ref="label"
           :class="['v-checkbox', classList]"
           role="checkbox"
           :aria-checked="isChecked"
           :aria-disabled="disabled">
        <span :class="{_absolute: absolute}"
              class="v-checkbox__body">

            <span class="v-checkbox__input">
                <input v-model="computedValue"
                       class="v-checkbox__native"
                       type="checkbox"
                       :name="name"
                       :value="trueValue"
                       :true-value="trueValue"
                       :false-value="falseValue"
                       :disabled="disabled || readonly"
                       @keydown.enter.stop.prevent="$refs.label.click()"
                       @focus="onFocus"
                       @blur="onBlur">
                <svg viewBox="0 0 14 11"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.45455 8.70149L1.11364 5.25373L0 6.40299L4.45455 11L14 1.14925L12.8864 0L4.45455 8.70149Z"
                          fill="white" />
                </svg>
            </span>

            <span v-if="$slots.default"
                  class="v-checkbox__label">
                <slot></slot>
            </span>

            <span v-if="hintText"
                  class="v-checkbox__hint-icon"
                  @click.prevent="onToggleHint">
                <IconHint class="frame-icon is-small" />
            </span>
            <span v-if="hintText"
                  class="v-checkbox__hint"
                  v-html="hintText">
            </span>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'VCheckbox',

        props: {
            hintText: {
                type: String,
                default: '',
            },

            /** Имя, которое используется при отправке формы */
            name: {
                type: String,
                default: '',
            },

            /** Текущее значение чекбокса */
            value: {
                type: [Array, String, Number, Boolean],
                required: true,
            },

            /**  Значение, которое используется при отправке формы, а также передается в value при активации чекбокса */
            trueValue: {
                type: [String, Number, Boolean],
                default: true,
            },

            falseValue: {
                type: [String, Number, Boolean],
                default: '',
            },

            /**  Определяет классы, которые будут модифицировать размер */
            size: {
                type: String,
                default: 'medium',
            },

            /**  Определяет классы, которые будут модифицировать цвет */
            color: {
                type: String,
                default: 'default',
            },

            /**  Очевидно, что это свойство отключает взаимодействие с чекбоксом */
            disabled: {
                type: Boolean,
                default: false,
            },

            readonly: {
                type: Boolean,
                default: false,
            },

            absolute: {
                type: Boolean,
                default: false,
            },

            /**  Добавляет параметр, при активации которого чекбокс переходит в состояние focused для изменения стилей */
            forcedFocused: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                isFocused: false,
                isVisibleHint: false,
            };
        },

        computed: {
            classList() {
                return [
                    `v-checkbox--${this.color}`,
                    `v-checkbox--${this.size}`,
                    {
                        'is-disabled': this.disabled,
                        'is-checked': this.isChecked,
                        'is-focused': this.isFocused || this.forcedFocused,
                        '_show-hint': this.isVisibleHint,
                    },
                ];
            },

            computedValue: {
                get() {
                    return this.value;
                },

                set(value) {
                    this.$emit('input', value);
                },
            },

            isChecked() {
                if (Array.isArray(this.value)) {
                    return this.value.indexOf(this.trueValue) > -1;
                }
                return this.value === this.trueValue;
            },
        },

        methods: {
            onFocus() {
                this.isFocused = true;
            },

            onBlur() {
                this.isFocused = false;
            },

            onToggleHint() {
                if (this.$mq !== 'xs') {
                    return;
                }

                this.isVisibleHint = !this.isVisibleHint;
            },
        },
    };
</script>

<style lang="scss">
    .v-checkbox {
        line-height: 0;
        user-select: none;
        outline: none;
        cursor: pointer;

        /* Colors */

        &--default {
            position: relative;
            border-radius: .6rem;
            overflow: hidden;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;
                width: 100%;
                height: 100%;
                background: $gradient;
                opacity: 0;
                transition: opacity $default-transition;
            }

            @include hover {
                .v-checkbox__input {
                    border-color: black;
                }
            }

            .v-checkbox__label {
                color: black;
            }

            .v-checkbox__input {
                display: flex;
                justify-content: center;
                align-items: center;
                border-color: $gray-800;
                background-color: white;
                overflow: hidden;

                svg {
                    position: relative;
                    z-index: 4;
                    width: 1.4rem;
                    height: 1.1rem;
                }
            }

            &:focus,
            &.is-focused {
                .v-checkbox__input {
                    //border-color: $blue;
                    //background-color: $gray;
                }
            }

            &.is-checked {
                &:before {
                    opacity: 1;
                }

                .v-checkbox__input {
                    border-color: transparent;
                    //background-color: $blue;
                }
            }
        }

        /* End Colors */

        /* Sizes */

        &--medium {
            .v-checkbox__label {
                font-size: 1.6rem;
                line-height: 1.35;
                margin-left: .8rem;
            }
        }

        /* End Sizes */

        /* Modificators */

        &.is-disabled {
            pointer-events: none;

            .v-checkbox__input {
                border-color: $gray-900;
                background-color: white;
            }

            .v-checkbox__label {
                color: $blue;
            }
        }

        &.is-checked {
            .v-checkbox__arrow {
                opacity: 1;
            }
        }

        &._show-hint {
            .v-checkbox__hint {
                opacity: 1;
                visibility: visible;
                transition: opacity $default-transition, visibility $default-transition;
            }
        }

        /* End Modificators */

        &__body {
            position: relative;
            display: inline-flex;

            &._absolute {
                position: absolute;
                top: 1.2rem;
            }
        }

        &__input {
            position: relative;
            flex-shrink: 0;
            width: 2rem;
            height: 2rem;
            border: 1px solid;
            border-radius: .6rem;
            transition: border-color .2s, background-color .2s;

            @include respond-to(xs) {
                //width: 16px;
                //height: 16px;
            }
        }

        &__arrow {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1.6rem;
            height: 1.6rem;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: opacity .2s;
        }

        &__native {
            display: none;
        }

        &__label {
            white-space: nowrap;
            transition: color $default-transition;
        }

        &__hint-icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            margin-left: 1.2rem;
            margin-right: -.8rem;
            border-radius: 50%;
            background-color: rgba($gray, .4);
            color: $blue;

            @include respond-to(xs) {
                margin-top: -2px;
            }

            @include hover {
                &:hover ~ .v-checkbox__hint {
                    opacity: 1;
                    visibility: visible;
                    transition: opacity $default-transition, visibility $default-transition;
                }
            }
        }

        &__hint {
            position: absolute;
            top: -1rem;
            right: 0;
            z-index: 5;
            display: inline-block;
            padding: 1.2rem;
            border-radius: .8rem;
            background-color: rgba($blue, .85);
            font-size: 1.2rem;
            line-height: 1.33;
            color: white;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transform: translate(50%, -100%);
            transition: opacity $default-transition, visibility $default-transition .3s;

            @include respond-to(sm) {
                transform: translate(0, -100%);
            }

            @include respond-to(xs) {
                padding: 10px;
                transform: translate(50%, -100%);
            }
        }
    }
</style>
