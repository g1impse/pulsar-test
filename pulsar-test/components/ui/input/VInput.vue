<template>
    <div class="v-input__wrap">
        <div v-if="label"
             class="label v-input__label">
            {{ label }}
        </div>

        <input v-model="lazyValue"
               :class="{_error: error}"
               class="v-input"
               :type="type"
               :min="min"
               :max="max"
               :placeholder="placeholder"
               :disabled="disabled"
               @input="onInput"
               @change="onChange"
               @focus="onFocus">

        <transition name="fade">
            <span v-if="error"
                  class="v-input__error">
                {{ error }}
            </span>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'VInput',

        props: {
            value: [String, Number],

            type: {
                type: String,
                default: 'text',
            },

            label: {
                type: String,
                default: '',
            },

            min: Number,
            max: Number,

            placeholder: {
                type: String,
                default: '',
            },

            error: {
                type: String,
                default: '',
            },

            disabled: Boolean,
        },

        data() {
            return {
                lazyValue: this.value || '',
            };
        },

        watch: {
            value(val) {
                if (val !== this.lazyValue) {
                    const newValue = val;

                    this.lazyValue = newValue;
                    this.$emit('input', newValue);
                }
            },
        },

        methods: {
            onInput() {
                this.$emit('input', this.lazyValue);
            },

            onChange(e) {
                this.$emit('focus', e);
            },

            onFocus(e) {
                this.$emit('focus', e);
            },
        },
    };
</script>

<style lang="scss">
    .v-input {
        width: 100%;
        height: 4.4rem;
        padding: .8rem 1.6rem;
        border: 1px solid $gray-800;
        border-radius: 3px;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.4rem;
        transition: border-color $default-transition;

        @include respond-to(xs) {
            padding: .8rem 1rem;
            height: 4rem;
        }

        &:disabled {
            border-color: $gray;
        }

        &:hover {
            border-color: black;
        }

        &._error {
            border-color: $blue;
        }

        &__wrap {
            position: relative;
            //padding-bottom: 2rem;
        }

        &__label {
            margin-bottom: 8px;
        }

        &__error {
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 100%;
            color: $red;
            text-align: left;
            font-size: 10px;
            line-height: 12px;
        }
    }
</style>
