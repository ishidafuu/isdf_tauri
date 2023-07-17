import {createStore} from 'vuex'
import { invoke } from '@tauri-apps/api/tauri';
import { writeFile, readTextFile } from '@tauri-apps/api/fs';
import { documentDir } from '@tauri-apps/api/path';

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
        incrementBodyIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.activeBodyIndex++;
        },
        decrementBodyIndex(state) {
            if (state.activeBodyIndex > 0) {
                state.past.push({...state});
                state.future = [];
                state.activeBodyIndex--;
            }
        },
        setOffsetBodyX(state, value) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].offsetBodyX = value;
        },
        setOffsetBodyY(state, value) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].offsetBodyY = value;
        },
        incrementFaceIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].faceIndex = (state.bodyStates[state.activeBodyIndex].faceIndex + 1) % 8;
        },
        decrementFaceIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].faceIndex = (state.bodyStates[state.activeBodyIndex].faceIndex + 8 - 1) % 8;
        },
        incrementFaceAngle(state) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].faceAngle = (state.bodyStates[state.activeBodyIndex].faceAngle + 1) % 3;
        },
        decrementFaceAngle(state) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].faceAngle = (state.bodyStates[state.activeBodyIndex].faceAngle + 3 - 1) % 3;
        },
        setOffsetFaceX(state, value) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].offsetFaceX = value;
        },
        setOffsetFaceY(state, value) {
            state.past.push({...state});
            state.future = [];
            state.bodyStates[state.activeBodyIndex].offsetFaceY = value;
        },
        toggleFacePriority(state) {
            state.bodyStates[state.activeBodyIndex].facePriority = state.bodyStates[state.activeBodyIndex].facePriority === 0 ? -1 : 0;
        },
        undo(state) {
            if (state.past.length > 0) {
                const previousState = state.past.pop();
                state.future.push({...state});
                Object.assign(state, previousState);
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future.pop();
                state.past.push({...state});
                Object.assign(state, nextState);
            }
        },
        loadState(state, newState) {
            Object.assign(state, newState);
        },
    },
    actions: {
        async saveState({ state }) {
            try {
                const dataToSave = {
                    bodyStates: state.bodyStates,
                };
                const path = `${await documentDir()}/save.json`;
                await writeFile({ path, contents: JSON.stringify(dataToSave) });
            } catch (error) {
                console.error('Failed to save state:', error);
            }
        },
        async loadState({ commit }) {
            try {
                const path = `${await documentDir()}/save.json`;
                const loadedState = JSON.parse(await readTextFile(path));
                commit('loadState', loadedState);
            } catch (error) {
                console.error('Failed to load state:', error);
            }
        },
    },
    getters: {
        currentBodyState: (state) => {
            return state.bodyStates[state.activeBodyIndex];
        },
    },
})
