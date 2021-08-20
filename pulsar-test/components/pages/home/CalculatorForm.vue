<template>
    <div :class="$style.CalculatorForm">

        <div class="mb-8">
            <VInput
                v-model="deposit"
                label="Начальный депозит"
                placeholder="Введите данные"
                type="number"
                :min="0"
                :error="errors.deposit"
                @input="errors.deposit = ''"
            />
        </div>

        <div class="flex mb-14 xs:mb-9">
            <VInput
                v-model="percent"
                class="w-1/2 mr-2.5 xs:mr-2"
                label="Ставка/период"
                placeholder="Введите данные"
                type="number"
                :error="errors.percent"
                @input="errors.percent = ''"
            />

            <VInput
                v-model="replenishment"
                class="w-1/2 ml-2.5 xs:ml-2"
                label="Довложения/период"
                placeholder="Введите данные"
                type="number"
                :min="0"
                :error="errors.replenishment"
                @input="errors.replenishment = ''"
            />
        </div>

        <div class="flex items-center">
            <VCheckbox
                :value="checkboxValue"
                @input="checkboxValue = !checkboxValue"
            />

            <div class="h5 ml-7">
                Реинвестировать процент
            </div>
        </div>

        <div class="mt-12 xs:mt-8">
            <div class="label mb-8">
                Срок вложения инвестиций
            </div>

            <VSlider
                v-model="years"
                :min="1"
                :max="10"
                :marks="marks"
            />

            <div class="w-full flex justify-between mt-5">
                <span class="label">1 год</span>

                <span class="label">{{ years }} {{ formatLabel }}</span>
            </div>

            <VButton
                :class="$style.btn"
                class="w-full mt-20"
                size="medium"
                color="primary"
                @click="onSubmit">
                <IconDots class="frame-icon _small mr-8" />
                Рассчитать
            </VButton>
        </div>

    </div>
</template>

<script>
    import IconDots from '~/components/icons/IconDots';

    export default {
        name: 'CalculatorForm',

        components: {
            IconDots,
        },

        data() {
            return {
                deposit: 10000,
                percent: 10,
                replenishment: 0,
                checkboxValue: false,
                years: 5,
                errors: {
                    deposit: '',
                    percent: '',
                    replenishment: '',
                },

                marks: {
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: '',
                    7: '',
                    8: '',
                    9: '',
                    10: '',
                },
            };
        },

        computed: {
            formatLabel() {
                if (this.years === 1) {
                    return 'год';
                }
                return this.years < 5 ? 'года' : 'лет';
            },
        },

        methods: {
            validate() {
                let isValid = true;
                if (this.deposit <= 0) {
                    this.errors.deposit = 'Значение должно быть больше 0';
                    isValid = false;
                }
                if (this.percent <= 0) {
                    this.errors.percent = 'Значение должно быть больше 0';
                    isValid = false;
                }

                return isValid;
            },

            onSubmit() {
                if (!this.validate()) {
                    return;
                }

                this.$store.commit('calculate', {
                    deposit: this.deposit,
                    percent: this.percent,
                    replenishment: this.replenishment,
                    years: this.years,
                });
                this.$emit('switch-view');
            },
        },
    };
</script>

<style lang="scss" module>
    .CalculatorForm {
        width: 100%;
    }

    .btn {
        @include respond-to(xs) {
            position: absolute;
            bottom: 16px;
            left: 16px;
            width: calc(100% - 32px);
        }
    }
</style>
