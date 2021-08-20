<template>
    <div :class="$style.CalculatorTable">

        <div v-if="results.length"
             class="mt-12 xs:mt-1">

            <CalculatorTableRow
                v-for="(item, i) in results"
                :key="i"
                :item="item"
                :year="i + 1"
                @change-active="$emit('change-active', {
                    index: i,
                    value: $event,
                })"
            />

        </div>

        <div class="flex justify-between mt-20 sm:flex-col xs:flex-col-reverse">
            <VButton
                :class="$style.btn"
                @click="$emit('switch-view')">
                Закрыть
            </VButton>

            <div :class="$style.result"
                 class="flex items-center sm:justify-between sm:mt-14">
                <span class="h2 mr-16">
                    Итоговая сумма
                </span>
                <span class="h2">
                    {{ totalSum }} ₽
                </span>
            </div>

        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {splitThousands} from 'assets/js/utils/maskUtils';
    import CalculatorTableRow from '~/components/pages/home/CalculatorTableRow';

    export default {
        name: 'CalculatorTable',

        components: {
            CalculatorTableRow,
        },

        computed: {
            ...mapState({
                results: state => state.results,
            }),

            totalSum() {
                const formattedArray = this.results.filter(e => e.active);
                return splitThousands(formattedArray[formattedArray.length - 1].value);
            },
        },
    };
</script>

<style lang="scss" module>
    .CalculatorTable {
        @include respond-to(sm) {
            padding-bottom: 8rem;
        }

        :global(.h2) {
            color: $blue;
        }
    }

    .result {
        @include respond-to(sm) {
            position: absolute;
            bottom: 12.8rem;
            width: calc(100% - 8rem);
        }

        @include respond-to(xs) {
            position: absolute;
            bottom: 8rem;
            width: calc(100% - 32px);
        }
    }

    .btn {
        width: 41.6rem;

        @include respond-to(sm) {
            position: absolute;
            bottom: 5rem;
            left: 4rem;
            width: calc(100% - 8rem);
        }

        @include respond-to(xs) {
            position: absolute;
            bottom: 16px;
            left: 16px;
            width: calc(100% - 32px);
        }
    }
</style>
