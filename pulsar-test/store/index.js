export const state = () => ({
    results: [],
    values: {
        deposit: 0,
        percent: 0,
        replenishment: 0,
        years: 0,
    },
});

export const mutations = {
    calculate(state, payload) {
        const arr = [];
        const percent = parseFloat(payload.percent) / 100 + 1;
        let sum = payload.deposit;

        for (let i = 0; i <= payload.years - 1; i++) {
            sum = (Number(sum * percent) + Number(payload.replenishment)).toFixed(2);
            arr.push({
                value: sum,
                active: true,
            });
        }

        state.values = payload;
        state.results = arr;
    },

    changeResults(state, payload) {
        state.results[payload.index].active = payload.value;

        // пересчитываем результат
        const percent = parseFloat(state.values.percent) / 100 + 1;
        let sum = state.values.deposit;

        for (let i = 0; i <= state.results.length - 1; i++) {
            if (state.results[i].active) {
                sum = (Number(sum * percent) + Number(state.values.replenishment)).toFixed(2);
                state.results[i].value = sum;
            } else {
                state.results[i].value = 0;
            }
        }
    },
};
