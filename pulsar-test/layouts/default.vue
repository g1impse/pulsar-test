<template>
    <div>
        <main :class="$style.main">
            <nuxt />
        </main>

        <TheModal />
    </div>
</template>

<script>
    import TheModal from '~/components/layout/TheModal';

    export default {
        components: {
            TheModal,
        },
    };
</script>

<style lang="scss" module>
    .main {
        min-height: calc(100vh - #{$footer-h});
    }
</style>
