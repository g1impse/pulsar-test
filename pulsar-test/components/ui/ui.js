import Vue from 'vue';

// Импорт компонентов
import VButton from '~/components/ui/button/VButton';
import VInput from '~/components/ui/input/VInput';
import VCheckbox from '~/components/ui/checkbox/VCheckbox';
import VSlider from '~/components/ui/slider/VSlider';

const components = [
    VButton,
    VInput,
    VCheckbox,
    VSlider,
];


// Регистрация компонентов.
// Теперь можно их использовать в любом vue-шаблоне
components.forEach(component => {
    if (component.name) {
        Vue.component(component.name, component);
    } else {
        console.warn('[UI] Register / No component name: ', component);
    }
});
