<template>
    <component :is="component"
               v-bind="linkProperties"
               class="v-button"
               :class="classes"
               :disabled="disabled"
               :type="!link && !href ? type : null"
               @click="onClick">
        <span v-if="$slots.leftAddon"
              class="v-button__addon is-left">
            <slot name="leftAddon"></slot>
        </span>

        <span v-if="$slots.default"
              class="v-button__text">
            <slot></slot>
        </span>

        <div v-if="$slots.background"
             class="v-button__background">
            <slot name="background"></slot>
        </div>

        <span v-if="$slots.rightAddon"
              class="v-button__addon is-right">
            <slot name="rightAddon"></slot>
        </span>
    </component>
</template>

<script>
    export default {
        name: 'VButton',

        props: {
            /**
             * Определяет классы, которые будут модифицировать размер
             */
            size: {
                type: String,
                default: 'medium',
                validator(value) {
                    return ['large', 'medium', 'small'].indexOf(value) !== -1;
                },
            },

            /**
             * Определяет классы, которые будут модифицировать цвет
             */
            color: {
                type: String,
                default: 'primary',
            },

            /**
             * Устанавливает класс для определения обратного цвета
             */
            inversed: {
                type: Boolean,
                default: false,
            },

            /**
             * Cвойство задизейблет кнопку
             */
            disabled: {
                type: Boolean,
                default: false,
            },

            /**
             * Растягивает кнопку на всю ширину внешнего контейнера
             */
            responsive: {
                type: Boolean,
                default: false,
            },

            /**
             * Меняет тип кнопки
             */
            type: {
                type: String,
                default: 'button',
            },

            /**
             * Устанавливает тег a для кнопки
             */
            href: {
                type: String,
                default: '',
            },

            /**
             * target="_blank" для ссылок
             */
            blank: {
                type: Boolean,
                default: false,
            },

            /**
             * Для внутренних ссылок (тег n-link)
             */
            link: {
                type: [String, Object],
                default: '',
            },

            disabledHover: {
                type: Boolean,
                default: false,
            },

            relative: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            component() {
                if (this.href) {
                    return 'a';
                } else if (this.link) {
                    return 'n-link';
                }
                return 'button';
            },

            linkProperties() {
                const linkProperties = {};
                if (this.link) {
                    linkProperties.to = this.link;
                } else if (this.href) {
                    linkProperties.href = this.href;
                }

                if (this.blank) {
                    linkProperties.target = '_blank';
                }
                return linkProperties;
            },

            classes() {
                return [
                    `v-button--${this.color}`,
                    `v-button--${this.size}`,
                    {
                        'is-inversed': this.inversed,
                        'is-disabled': this.disabled,
                        'is-responsive': this.responsive,
                        'is-background': this.$slots.background,
                        'is-disabled-hover': this.disabledHover,
                        'is-relative': this.relative,
                        'has-right-addon': this.$slots.rightAddon,
                        'has-left-addon': this.$slots.leftAddon,
                    },
                ];
            },
        },

        methods: {
            onClick(e) {
                if (this.disabled) {
                    return;
                }
                this.$emit('click', e);
            },
        },
    };
</script>

<style lang="scss">
    .v-button {
        $block: &;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        font-family: $font-family;
        line-height: 1;
        white-space: nowrap;
        text-align: center;
        cursor: pointer;
        transition: .4s;
        user-select: none;
        outline: none;

        /* Colors */

        &--primary {
            position: relative;
            background-color: $blue;
            color: white;
            border: none;
            overflow: hidden;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: $gradient;
                opacity: 1;
                transition: all $default-transition;
            }

            &:not(.is-disabled-hover) {
                &:hover {
                    &:before {
                        opacity: 0;
                    }
                }

                &:active {
                    box-shadow: 0 0 24px rgba(54, 171, 255, .33);

                    &:before {
                        opacity: 0;
                    }
                }
            }

            &.is-disabled {
                background-color: $gray-900;
                color: white;
                pointer-events: none;
            }

            .v-button__text {
                z-index: 2;
            }
        }

        &--secondary {
            border-color: white;
            background-color: transparent;
            color: white;

            &:not(.is-disabled-hover) {
                &:hover {
                    background-color: white;
                    color: black;
                }

                &:active {
                    background-color: white;
                    color: black;
                }
            }

            &.is-disabled {
                background-color: $gray-900;
                color: white;
                pointer-events: none;
            }
        }

        /* End colors */

        /* Sizes */

        &--large {
            height: 5.6rem;
            padding: 0 3.2rem;
            border-radius: .6rem;
            font-size: 1.6rem;
            line-height: 2.4rem;
            font-weight: 500;

            @include respond-to(xs) {
                height: 40px;
                padding: 0 24px;
                font-size: 12px;
                line-height: 16px;
            }

            &.is-responsive {
                padding: 0;
            }
        }

        &--medium {
            height: 4.4rem;
            padding: 0 2.4rem;
            border-radius: .6rem;
            font-weight: 500;
            font-size: 1.2rem;
            line-height: 1.6rem;

            &.is-responsive {
                padding: 0;
                height: 4rem;
            }
        }

        /* End Sizes */

        &__text {
            display: flex;
            align-items: center;
            opacity: 1;
            transition: opacity $default-transition;
        }

        &__background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &__addon {
            display: flex;
            flex-shrink: 0;

            &.is-left {
                margin-right: 4px;
            }

            &.is-right {
                margin-left: 4px;
            }
        }
    }
</style>
