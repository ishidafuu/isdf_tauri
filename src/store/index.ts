import { createStore } from 'vuex'

interface State {
    charIndex: number;
    offsetX: number;
    offsetY: number;
    past: Array<{charIndex: number, offsetX: number, offsetY: number}>;
    future: Array<{charIndex: number, offsetX: number, offsetY: number}>;
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
            state.past = [...state.past, { charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }];
            state.future = [];
            state.charIndex++;
        },
        decrement(state) {
            if (state.charIndex > 0) {
                state.past = [...state.past, { charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }];
                state.future = [];
                state.charIndex--;
            }
        },
        setOffsetX(state, value) {
            state.past = [...state.past, { charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }];
            state.future = [];
            state.offsetX = value;
        },
        setOffsetY(state, value) {
            state.past = [...state.past, { charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }];
            state.future = [];
            state.offsetY = value;
        },
        undo(state) {
            if (state.past.length > 0) {
                const previousState = state.past[state.past.length - 1];
                state.past = state.past.slice(0, state.past.length - 1);
                state.future = [{ charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }, ...state.future];
                state.charIndex = previousState.charIndex;
                state.offsetX = previousState.offsetX;
                state.offsetY = previousState.offsetY;
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future[0];
                state.future = state.future.slice(1);
                state.past = [...state.past, { charIndex: state.charIndex, offsetX: state.offsetX, offsetY: state.offsetY }];
                state.charIndex = nextState.charIndex;
                state.offsetX = nextState.offsetX;
                state.offsetY = nextState.offsetY;
            }
        },
    }
})