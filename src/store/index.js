import { createStore } from 'vuex'

export default createStore({
    state: {
        charIndex: 0
    },
    mutations: {
        increment(state) {
            state.charIndex++
        },
        decrement(state) {
            if (state.charIndex > 0) {
                state.charIndex--
            }
        }
    }
})