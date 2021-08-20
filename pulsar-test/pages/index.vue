<template>
    <div :class="$style.HomePage"
         class="flex justify-center items-center h-screen">

        <VButton
            color="secondary"
            size="large"
            @click="openModal">
            Сложный процент
        </VButton>

    </div>
</template>

<script>
    import CalculatorModal from '~/components/layout/modals/CalculatorModal';

    export default {
        name: 'HomePage',

        methods: {
            openModal() {
                this.$modal.open(CalculatorModal);
            },
        },
    };
</script>

<style lang="scss" module>
    .HomePage {
        background: $gradient;
        height: 100vh;
    }
</style>
