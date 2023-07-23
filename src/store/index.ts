import {createStore} from 'vuex'
import {readTextFile, writeFile} from '@tauri-apps/api/fs';
import {documentDir} from '@tauri-apps/api/path';

interface BodyState {
    offsetBodyX: number;
    offsetBodyY: number;
    faceIndex: number;
    faceAngle: number;
    offsetFaceX: number;
    offsetFaceY: number;
    facePriority: number;
}


interface State {
    bodyIndex: number;
    offsetBodyX: number;
    offsetBodyY: number;
    faceIndex: number;
    faceAngle: number;
    offsetFaceX: number;
    offsetFaceY: number;
    past: Array<any>;
    future: Array<any>;
}

// This is the initial state for each body part
const initialBodyState: BodyState = {
    offsetBodyX: 0,
    offsetBodyY: 0,
    faceIndex: 0,
    faceAngle: 0,
    offsetFaceX: 0,
    offsetFaceY: 0,
    facePriority: 0,
}

export const store = createStore<State>({
    state: {
        bodyStates: Array.from({length: 100}, () => ({...initialBodyState})),  // Initialize bodyStates with 100 independent body parts
        activeBodyIndex: 0,
        past: [],
        future: []
    },
    mutations: {
        pushToPast(state) {
            state.past.push(state.bodyStates.map(bodyState => ({...bodyState})));
            state.future = []
        },
        clearPast(state) {
            state.past = [];
            state.future = [];
        },
        changeBodyIndex(state, amount) {
            this.commit('clearPast');
            let newIndex = state.activeBodyIndex + amount;
            state.activeBodyIndex = newIndex >= 0 ? newIndex : 0;
        },
        changeOffsetBodyX(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].offsetBodyX = state.bodyStates[state.activeBodyIndex].offsetBodyX + amount;
        },
        changeOffsetBodyY(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].offsetBodyY = state.bodyStates[state.activeBodyIndex].offsetBodyY + amount;
        },
        incrementFaceIndex(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceIndex = (state.bodyStates[state.activeBodyIndex].faceIndex + 1) % 8;
        },
        decrementFaceIndex(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceIndex = (state.bodyStates[state.activeBodyIndex].faceIndex + 8 - 1) % 8;
        },
        incrementFaceAngle(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceAngle = (state.bodyStates[state.activeBodyIndex].faceAngle + 1) % 3;
        },
        decrementFaceAngle(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceAngle = (state.bodyStates[state.activeBodyIndex].faceAngle + 3 - 1) % 3;
        },
        changeOffsetFaceX(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].offsetFaceX = state.bodyStates[state.activeBodyIndex].offsetFaceX + amount;
        },
        changeOffsetFaceY(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].offsetFaceY = state.bodyStates[state.activeBodyIndex].offsetFaceY + amount;
        },
        toggleFacePriority(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].facePriority = state.bodyStates[state.activeBodyIndex].facePriority === 0 ? -1 : 0;
        },
        undo(state) {
            if (state.past.length > 0) {
                const previousState = state.past.pop();
                state.future.push({...state});
                Object.assign(state.bodyStates, previousState);
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future.pop();
                state.past.push({...state});
                Object.assign(state.bodyStates, nextState);
            }
        },
        loadState(state, newState) {
            Object.assign(state, newState);
        },
    },
    actions: {
        async saveState({ state, dispatch }) {
            try {
                const dataToSave = {
                    bodyStates: state.bodyStates,
                };
                const path = await dispatch('getSavePath');
                await writeFile({ path, contents: JSON.stringify(dataToSave) });
            } catch (error) {
                console.error('Failed to save state:', error);
            }
        },
        async loadState({ commit, dispatch }) {
            try {
                const path = await dispatch('getSavePath');
                const loadedState = JSON.parse(await readTextFile(path));
                commit('loadState', loadedState);
            } catch (error) {
                console.error('Failed to load state:', error);
            }
        },
        async getSavePath() {
            return `${await documentDir()}/cell_data.json`;
        },
    },
    getters: {
        currentBodyState: (state) => {
            return state.bodyStates[state.activeBodyIndex];
        },
    },
})
