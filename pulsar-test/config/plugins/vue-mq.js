import Vue from 'vue';
import VueMq from 'vue-mq';

export default () => {
    Vue.use(VueMq, {
        breakpoints: {
            xs: 768,
            sm: 992,
            md: 1280,
            lg: 1440,
            xl: 1920,
            xxl: Infinity,
        },
        defaultBreakpoint: 'md',
    });
};
