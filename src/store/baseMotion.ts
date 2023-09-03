// import {BaseMotion} from './interface.ts';
// import {getFormattedDate} from './stringUtil.ts';
// import {createDir, exists, readTextFile, writeFile} from "@tauri-apps/api/fs";
// import {documentDir} from "@tauri-apps/api/path";
//
// const initialBaseMotion: BaseMotion = {
//     cellNo: 0,
//     offsetX: 0,
//     offsetY: 0,
//     frame: 0,
//     isAction: 0,
//     loopPoint: 0,
//     loopCount: 0,
//     seNo: 0,
//     isLoopSe: 0,
// };
//
// const state = {
//     baseMotions: Array.from({length: 100}, () => ({...initialBaseMotion})),
//     activeBodyIndex: 0,
//     editMode: 'Body',
//     past: [],
//     future: [],
// };
//
//
// const mutations = {
//     setEditMode(state, mode) {
//         state.editMode = mode;
//     },
//     pushToPast(state) {
//         state.past.push(state.cellStates.map(bodyState => ({...bodyState})));
//         state.future = []
//     },
//     clearPast(state) {
//         state.past = [];
//         state.future = [];
//     },
//     changeBodyIndex(state, amount) {
//         this.commit('clearPast');
//         let newIndex = state.activeBodyIndex + amount;
//         state.activeBodyIndex = newIndex >= 0 ? newIndex : 0;
//     },
//     changeBodyX(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].bodyX = state.cellStates[state.activeBodyIndex].bodyX + amount;
//     },
//     changeBodyY(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].bodyY = state.cellStates[state.activeBodyIndex].bodyY + amount;
//     },
//     changeFaceIndex(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].faceIndex = (state.cellStates[state.activeBodyIndex].faceIndex + 8 + amount) % 8;
//     },
//     changeFaceAngle(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].faceAngle = (state.cellStates[state.activeBodyIndex].faceAngle + 4 + amount) % 4;
//     },
//     changeFaceX(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].faceX = state.cellStates[state.activeBodyIndex].faceX + amount;
//     },
//     changeFaceY(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].faceY = state.cellStates[state.activeBodyIndex].faceY + amount;
//     },
//     toggleFacePriority(state) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].faceZ = state.cellStates[state.activeBodyIndex].faceZ === 0 ? -1 : 0;
//     },
//     changeItemAngle(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].itemAngle = (state.cellStates[state.activeBodyIndex].itemAngle + 8 + amount) % 8;
//     },
//     changeItemX(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].itemX = state.cellStates[state.activeBodyIndex].itemX + amount;
//     },
//     changeItemY(state, amount) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].itemY = state.cellStates[state.activeBodyIndex].itemY + amount;
//     },
//     toggleitemZ(state) {
//         this.commit('pushToPast');
//         state.cellStates[state.activeBodyIndex].itemZ = state.cellStates[state.activeBodyIndex].itemZ === 0 ? -1 : 0;
//     },
//
//     undo(state) {
//         if (state.past.length > 0) {
//             const previousState = state.past.pop();
//             state.future.push({...state});
//             Object.assign(state.cellStates, previousState);
//         }
//     },
//     redo(state) {
//         if (state.future.length > 0) {
//             const nextState = state.future.pop();
//             state.past.push({...state});
//             Object.assign(state.cellStates, nextState);
//         }
//     },
//     loadState(state, newState) {
//         Object.assign(state, newState);
//     },
// };
//
// const actions = {
//     async saveState({state, dispatch}) {
//         try {
//             const dataToSave = {
//                 bodyStates: state.cellStates,
//             };
//
//             const saveDir = await dispatch('getSaveDir');
//             if (!await exists(saveDir)) {
//                 await createDir(saveDir);
//             }
//
//             // Create a backup directory if it doesn't exist
//             const backupDir = `${saveDir}/cell_data_backup`;
//             if (!await exists(backupDir)) {
//                 await createDir(backupDir);
//             }
//
//             // Backup the current state
//             const timestamp = getFormattedDate();
//             const backupPath = `${backupDir}/cell_data_backup_${timestamp}.json`;
//             await writeFile({path: backupPath, contents: JSON.stringify(dataToSave)});
//
//             // Save the current state
//             const path = `${saveDir}/cell_data.json`;
//             await writeFile({path, contents: JSON.stringify(dataToSave)});
//         } catch (error) {
//             console.error('Failed to save state:', error);
//         }
//     },
//     async loadState({commit, dispatch}) {
//         try {
//             const saveDir = await dispatch('getSaveDir');
//             const path = `${saveDir}/cell_data.json`;
//
//             const loadedState = JSON.parse(await readTextFile(path));
//             commit('loadState', loadedState);
//         } catch (error) {
//             console.error('Failed to load state:', error);
//         }
//     },
//     async getSaveDir() {
//         return `${await documentDir()}/sai2_data`;
//     },
// };
//
// const getters = {
//     currentBodyState: (state: typeof state) => {
//         return state.baseMotions[state.activeBodyIndex];
//     },
// };
//
// export default {
//     state,
//     mutations,
//     actions,
//     getters,
// };