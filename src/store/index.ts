import {createStore} from 'vuex'
import { invoke } from '@tauri-apps/api/tauri';
import { writeFile, readTextFile } from '@tauri-apps/api/fs';
import { documentDir } from '@tauri-apps/api/path';

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

export const store = createStore<State>({
    state: {
        bodyIndex: 0,
        offsetBodyX: 0,
        offsetBodyY: 0,
        faceIndex: 0,
        faceAngle: 0,
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
            state.faceIndex = (state.faceIndex + 1) % 8;
        },
        decrementFaceIndex(state) {
            state.past.push({...state});
            state.future = [];
            state.faceIndex = (state.faceIndex + 8 - 1) % 8;
        },
        incrementFaceAngle(state) {
            state.past.push({...state});
            state.future = [];
            state.faceAngle = (state.faceAngle + 1) % 3;
        },
        decrementFaceAngle(state) {
            state.past.push({...state});
            state.future = [];
            state.faceAngle = (state.faceAngle + 3 - 1) % 3;
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
                const path = `${await documentDir()}/save.json`;
                await writeFile({ path, contents: JSON.stringify(state) });
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
    }
})