<template>
    <transition name="fade"
                @after-enter="$emit('after-enter')"
                @after-leave="$emit('after-leave')">
        <div v-if="visible"
             :class="[$style.CalculatorModal, {[$style._table]: isTableVisible}]"
             class="flex justify-center">

            <div class="flex items-center w-full">

                <div :class="$style.wrap">

                    <IconClose
                        :class="$style.close"
                        class="frame-icon absolute top-12 right-12 sm:top-10 sm:right-10"
                        @click.native="closeModal"
                    />

                    <h2 class="h2 xs:pr-8">
                        Калькулятор сложного процента
                    </h2>

                    <div v-if="!isTableVisible"
                         class="flex justify-between sm:flex-col">
                        <div :class="$style.text"
                             class="w-1/2 mt-14 mr-32 text sm:w-full sm:mr-0 sm:mt-5">
                            <span>Сложные проценты</span> – начисление <span>процентов</span> в банковском депозите, при котором по окончании каждого периода начисленные проценты становятся <span>основной суммой</span>.
                            <div class="block sm:hidden">
                                <br>
                                <br>
                                Таким образом, в следующем периоде проценты начисляются на <span>большую</span> сумму, чем в предыдущем, за счет чего вклад растет со скоростью <span>экспоненты</span>.
                            </div>
                        </div>

                        <div class="w-1/2 ml-32 -mt-12 sm:w-full sm:ml-0 sm:mt-8">
                            <CalculatorForm
                                @switch-view="switchView"
                            />
                        </div>
                    </div>

                    <CalculatorTable
                        v-else
                        :results="results"
                        @switch-view="switchView"
                    />

                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    import IconClose from '~/components/icons/IconClose';
    import CalculatorForm from '~/components/pages/home/CalculatorForm';
    import CalculatorTable from '~/components/pages/home/CalculatorTable';

    export default {
        name: 'CalculatorModal',

        components: {
            IconClose,
            CalculatorForm,
            CalculatorTable,
        },

        props: {
            submited: {
                type: Boolean,
                default: false,
            },
            visible: Boolean,
        },

        data() {
            return {
                isTableVisible: false,
                results: [],
            };
        },

        methods: {
            closeModal() {
                this.$modal.close();
            },

            switchView(arr) {
                if (arr) {
                    this.results = arr;
                }
                this.isTableVisible = !this.isTableVisible;
            },
        },
    };
</script>

<style lang="scss" module>
    .CalculatorModal {
        position: absolute;
        top: 0;
        right: 0;
        padding: 6rem 9rem;
        //height: 100vh;
        height: auto;
        min-height: 100%;
        width: 100%;
        pointer-events: none;

        @include respond-to(sm) {
            padding: 12.5rem 12.5rem 21rem;
        }

        @include respond-to(xs) {
            padding: 0;
            height: auto;
            min-height: 100%;
        }
    }

    .wrap {
        position: relative;
        width: 100%;
        max-width: 120rem;
        padding: 8rem 8.6rem 8rem 4rem;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        border-radius: 2rem;
        pointer-events: all;

        @include respond-to(sm) {
            padding: 3.5rem 4rem 5rem 4rem;
        }

        @include respond-to(xs) {
            height: 100%;
            padding: 24px 16px 16px 16px;
            border-radius: 0;
        }
    }

    .close {
        color: $blue;
        cursor: pointer;

        @include respond-to(sm) {
            width: 1.7rem;
            height: 1.7rem;
        }

        @include respond-to(xs) {
            width: 12px;
            height: 12px;
        }

        &:hover {
            color: $blue-light;
        }
    }

    .text {
        color: $gray;

        span {
            color: $blue;

            @include respond-to(sm) {
                color: $gray;
            }
        }
    }

</style>
