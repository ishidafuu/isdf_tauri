import {createStore} from 'vuex'

interface State {
    bodyIndex: number;
    offsetBodyX: number;
    offsetBodyY: number;
    faceIndex: number;
    offsetFaceX: number;
    offsetFaceY: number;
    past: Array<any>;
    future: Array<any>;
}

export const store = createStore<State>({
    state: {
        bodyIndex: 0,
        offsetBodyX: 0,
        offsetBodyY: 0,
        faceIndex: 0,
        offsetFaceX: 0,
        offsetFaceY: 0,
        facePriority: 0,
        past: [],
        future: []
    },
    mutations: {
        incrementBodyIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.bodyIndex++;
        },
        decrementBodyIndex(state) {
            if (state.bodyIndex > 0) {
                state.past.push({...state});
                state.future = [];
                state.bodyIndex--;
            }
        },
        setOffsetBodyX(state, value) {
            state.past.push({...state});
            state.future = [];
            state.offsetBodyX = value;
        },
        setOffsetBodyY(state, value) {
            state.past.push({...state});
            state.future = [];
            state.offsetBodyY = value;
        },
        incrementFaceIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.faceIndex++;
        },
        decrementFaceIndex(state) {
            if (state.faceIndex > 0) {
                state.past.push({...state});
                state.future = [];
                state.faceIndex--;
            }
        },
        setOffsetFaceX(state, value) {
            state.past.push({...state});
            state.future = [];
            state.offsetFaceX = value;
        },
        setOffsetFaceY(state, value) {
            state.past.push({...state});
            state.future = [];
            state.offsetFaceY = value;
        },
        toggleFacePriority(state) {
            state.facePriority = state.facePriority === 0 ? -1 : 0;
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