import { createStore } from 'vuex'

interface State {
    charIndex: number;
    offsetX: number; // add new state properties for offsets
    offsetY: number;
}

// mutation types
enum MutationTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    SET_OFFSET_X = 'SET_OFFSET_X',
    SET_OFFSET_Y = 'SET_OFFSET_Y',
}

// mutations
type Mutations<S = State> = {
    [MutationTypes.INCREMENT](state: S): void
    [MutationTypes.DECREMENT](state: S): void
    [MutationTypes.SET_OFFSET_X](state: S, value: number): void // add new mutations for offsets
    [MutationTypes.SET_OFFSET_Y](state: S, value: number): void
}

// store
export const store = createStore<State>({
    state: {
        charIndex: 0,
        offsetX: 0, // initialize offsets to 0
        offsetY: 0,
    },
    mutations: {
        [MutationTypes.INCREMENT](state) {
            state.charIndex++
        },
        [MutationTypes.DECREMENT](state) {
            if (state.charIndex > 0) {
                state.charIndex--
            }
        },
        [MutationTypes.SET_OFFSET_X](state, value) { // set offsets to the passed value
            state.offsetX = value
        },
        [MutationTypes.SET_OFFSET_Y](state, value) {
            state.offsetY = value
        }
    }
})