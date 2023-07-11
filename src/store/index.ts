import { createStore } from 'vuex'

interface State {
    charIndex: number;
    offsetX: number;
    offsetY: number;
    past: Array<any>;
    future: Array<any>;
}

export const store = createStore<State>({
    state: {
        charIndex: 0,
        offsetX: 0,
        offsetY: 0,
        past: [],
        future: []
    },
    mutations: {
        increment(state) {
            state.past.push({ ...state });
            state.future = [];
            state.charIndex++;
        },
        decrement(state) {
            if (state.charIndex > 0) {
                state.past.push({ ...state });
                state.future = [];
                state.charIndex--;
            }
        },
        setOffsetX(state, value) {
            state.past.push({ ...state });
            state.future = [];
            state.offsetX = value;
        },
        setOffsetY(state, value) {
            state.past.push({ ...state });
            state.future = [];
            state.offsetY = value;
        },
        undo(state) {
            if (state.past.length > 0) {
                const previousState = state.past.pop();
                state.future.push({ ...state });
                Object.assign(state, previousState);
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future.pop();
                state.past.push({ ...state });
                Object.assign(state, nextState);
            }
        },
    }
})