import {createStore} from 'vuex'
import {readTextFile, writeFile} from '@tauri-apps/api/fs';
import {documentDir} from '@tauri-apps/api/path';

interface BodyState {
    bodyX: number;
    bodyY: number;
    faceIndex: number;
    faceAngle: number;
    faceX: number;
    faceY: number;
    facePriority: number;
    itemAngle: number;
    itemX: number;
    itemY: number;
    itemPriority: number;
}


interface State {
    bodyIndex: number;
    bodyX: number;
    bodyY: number;
    faceIndex: number;
    faceAngle: number;
    faceX: number;
    faceY: number;
    itemAngle: number;
    itemX: number;
    itemY: number;
    itemPriority: number;
    past: Array<any>;
    future: Array<any>;
}

// This is the initial state for each body part
const initialBodyState: BodyState = {
    bodyX: 0,
    bodyY: 0,
    faceIndex: 0,
    faceAngle: 0,
    faceX: 0,
    faceY: 0,
    facePriority: 0,
    itemAngle: 0,
    itemX: 0,
    itemY: 0,
    itemPriority: 0,
}

export const store = createStore<State>({
    state: {
        bodyStates: Array.from({length: 100}, () => ({...initialBodyState})),  // Initialize bodyStates with 100 independent body parts
        activeBodyIndex: 0,
        editMode: 'Body',
        past: [],
        future: []
    },
    mutations: {
        setEditMode(state, mode) {
            state.editMode = mode;
        },
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
        changeBodyX(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].bodyX = state.bodyStates[state.activeBodyIndex].bodyX + amount;
        },
        changeBodyY(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].bodyY = state.bodyStates[state.activeBodyIndex].bodyY + amount;
        },
        changeFaceIndex(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceIndex = (state.bodyStates[state.activeBodyIndex].faceIndex + 8 + amount) % 8;
        },
        changeFaceAngle(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceAngle = (state.bodyStates[state.activeBodyIndex].faceAngle + 4 + amount) % 4;
        },
        changeFaceX(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceX = state.bodyStates[state.activeBodyIndex].faceX + amount;
        },
        changeFaceY(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].faceY = state.bodyStates[state.activeBodyIndex].faceY + amount;
        },
        toggleFacePriority(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].facePriority = state.bodyStates[state.activeBodyIndex].facePriority === 0 ? -1 : 0;
        },
        changeItemAngle(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].itemAngle = (state.bodyStates[state.activeBodyIndex].itemAngle + 8 + amount) % 8;
        },
        changeItemX(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].itemX = state.bodyStates[state.activeBodyIndex].itemX + amount;
        },
        changeItemY(state, amount) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].itemY = state.bodyStates[state.activeBodyIndex].itemY + amount;
        },
        toggleItemPriority(state) {
            this.commit('pushToPast');
            state.bodyStates[state.activeBodyIndex].itemPriority = state.bodyStates[state.activeBodyIndex].itemPriority === 0 ? -1 : 0;
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
        async saveState({state, dispatch}) {
            try {
                const dataToSave = {
                    bodyStates: state.bodyStates,
                };
                const path = await dispatch('getSavePath');
                await writeFile({path, contents: JSON.stringify(dataToSave)});
            } catch (error) {
                console.error('Failed to save state:', error);
            }
        },
        async loadState({commit, dispatch}) {
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
