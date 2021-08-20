<template>
    <div :class="$style.CalculatorTableRow">
        <div class="flex items-center">
            <VCheckbox
                class="mr-6"
                :value="item.active"
                @input="onChange"
            />

            <div class="text">
                {{ format(item.value) }} рублей
            </div>
        </div>

        <div :class="$style.date"
             class="text">
            в {{ year }}-{{ yearLabel }} год
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {splitThousands} from 'assets/js/utils/maskUtils';

    export default {
        name: 'CalculatorTableRow',

        props: {
            item: {
                type: Object,
                default: () => ({}),
            },

            year: {
                type: [Number, String],
                default: 0,
            },
        },

        data() {
            return {
                checkboxValue: true,
            };
        },

        computed: {
            ...mapState({
                values: state => state.values,
            }),

            yearLabel() {
                if ([1, 4, 5, 9, 10].includes(this.year)) {
                    return 'ый';
                } else if ([2, 6, 7, 8].includes(this.year)) {
                    return 'ой';
                }
                return 'ий';
            },
        },

        methods: {
            format(e) {
                return splitThousands(e);
            },

            onChange(e) {
                this.$store.commit('changeResults', {
                    index: this.year - 1,
                    value: Boolean(e),
                });
            },
        },
    };
</script>

<style lang="scss" module>
    .CalculatorTableRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 0;
        border-bottom: 1px solid $gray-800;

        @include respond-to(sm) {
            padding: 1.6rem 0;
            justify-content: flex-start;
        }
    }

    .date {
        color: $gray;

        @include respond-to(sm) {
            margin-left: 5px;
        }
    }
</style>
