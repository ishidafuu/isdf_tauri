import {Koma, BaseMotion} from './interface.ts';
import {getFormattedDate} from './stringUtil.ts';
import {createDir, exists, readTextFile, writeFile} from "@tauri-apps/api/fs";
import {documentDir} from "@tauri-apps/api/path";

enum LoopPoint {
    None = 0,
    Start = 1,
    End = 2,
    SingleLoop = 3,
    LoopPointCount = 4,
}


const initialKoma: Koma = {
    cellNo: 0,
    offsetX: 0,
    offsetY: 0,
    frame: 0,
    isAction: 0,
    loopPoint: LoopPoint.None,
    loopCount: 0,
    seNo: 0,
    isLoopSe: 0,
};

const initialBaseMotion: BaseMotion = {
    name: "",
    komas: Array.from({length: 100}, () => ({...initialKoma})),
};


const state = {
    baseMotions: Array.from({length: 100}, () => ({...initialBaseMotion})),
    activeMotionIndex: 0,
    activeKomaIndex: 0,
    // editMode: 'Body',
    past: [],
    future: [],
    clipKoma: null as Koma | null,
};


const mutations = {
    setEditMode(state, mode) {
        state.editMode = mode;
    },
    pushToPast(state) {
        state.past.push({
            baseMotions: state.baseMotions.map(baseMotion => ({...baseMotion})),
            activeMotionIndex: state.activeMotionIndex,
            activeKomaIndex: state.activeKomaIndex,
        });
        state.future = []
    },
    clearPast(state) {
        state.past = [];
        state.future = [];
    },
    undo(state) {
        if (state.past.length > 0) {
            const previousState = state.past.pop();
            state.future.push({
                baseMotions: state.baseMotions.map(baseMotion => ({...baseMotion})),
                activeMotionIndex: state.activeMotionIndex,
                activeKomaIndex: state.activeKomaIndex,
            });
            Object.assign(state.baseMotions, previousState.baseMotions);
            state.activeMotionIndex = previousState.activeMotionIndex;
            state.activeKomaIndex = previousState.activeKomaIndex;
        }
    },
    redo(state) {
        if (state.future.length > 0) {
            const nextState = state.future.pop();
            state.past.push({
                baseMotions: state.baseMotions.map(baseMotion => ({...baseMotion})),
                activeMotionIndex: state.activeMotionIndex,
                activeKomaIndex: state.activeKomaIndex,
            });
            Object.assign(state.baseMotions, nextState.baseMotions);
            state.activeMotionIndex = nextState.activeMotionIndex;
            state.activeKomaIndex = nextState.activeKomaIndex;
        }
    },
    loadState(state, newState) {
        Object.assign(state, newState);
    },
    // モーションインデックス
    changeMotionIndex(state, amount) {
        this.commit('baseMotion/pushToPast');
        const newIndex = state.activeMotionIndex + amount;
        state.activeMotionIndex = newIndex >= 0 ? newIndex : 0;
        state.activeKomaIndex = 0;
    },
    // モーション追加削除
    addMotion(state) {
        this.commit('baseMotion/pushToPast');
        state.baseMotions.splice(state.activeMotionIndex, 0, {initialBaseMotion});
        state.activeMotionIndex += 1;
        state.activeKomaIndex = 0;
    },
    removeMotion(state) {
        if (state.baseMotions.length <= 1) {
            return;
        }
        this.commit('baseMotion/pushToPast');
        state.baseMotions.splice(state.activeMotionIndex, 1);
        const motionsLength = state.baseMotions.length;
        state.activeMotionIndex = Math.min(Math.max(0, state.activeKomaIndex), motionsLength - 1);
        state.activeKomaIndex = 0;
    },
    // モーション名
    changeMotionName(state, amount) {
        this.commit('baseMotion/pushToPast');
        const motion = state.baseMotions[state.activeMotionIndex];
        motion.name = amount;
    },
    // コマインデックス
    changeKomaIndex(state, amount) {
        this.commit('baseMotion/pushToPast');
        const newIndex = state.activeKomaIndex + amount;
        const komasLength = state.baseMotions[state.activeMotionIndex].komas.length;
        state.activeKomaIndex = Math.min(Math.max(0, newIndex), komasLength - 1);
    },
    // コマ追加削除
    addKoma(state) {
        this.commit('baseMotion/pushToPast');
        const komas = state.baseMotions[state.activeMotionIndex].komas;
        komas.splice(state.activeKomaIndex, 0, {initialKoma});
        const komasLength = state.baseMotions[state.activeMotionIndex].komas.length;
        state.activeKomaIndex += 1;
    },
    removeKoma(state) {
        const komas = state.baseMotions[state.activeMotionIndex].komas;
        if (komas.length <= 1) {
            return;
        }
        this.commit('baseMotion/pushToPast');
        komas.splice(state.activeKomaIndex, 1);
        const komasLength = state.baseMotions[state.activeMotionIndex].komas.length;
        state.activeKomaIndex = Math.min(Math.max(0, state.activeKomaIndex), komasLength - 1);
    },
    // コマコピペ
    copyKoma(state) {
        state.clipKoma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
    },
    pasteKoma(state) {
        if (state.clipKoma === null) {
            return;
        }
        this.commit('baseMotion/pushToPast');
        state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex] = state.clipKoma;
    },
    // コマ編集
    changeOffsetX(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.offsetX += amount;
    },
    changeOffsetY(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.offsetY += amount;
    },
    // 効果音
    changeSeNo(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.seNo = amount;
    },
    toggleLoopSe(state) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.isLoopSe = koma.isLoopSe === 0 ? 1 : 0;
    },
    // ループ
    changeLoopPoint(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.loopPoint = (koma.loopPoint + amount) % LoopPoint.LoopPointCount;
    },
    changeLoopCount(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.loopCount += amount;
        if (koma.loopCount < 0) koma.loopCount = 0;
    },
    // フレーム数
    changeFrame(state, amount) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.frame += amount;
        if (koma.frame < 0) koma.frame = 0;
    },
    changeFrameAll(state) {
        this.commit('baseMotion/pushToPast');
        const frame = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex].frame;
        state.baseMotions[state.activeMotionIndex].komas.forEach((koma) => {
            koma.frame = frame;
        });
    },
    // アクションポイント
    toggleAction(state) {
        this.commit('baseMotion/pushToPast');
        const koma = state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
        koma.isAction = koma.isAction === 0 ? 1 : 0;
    },
};

const actions = {
    async saveState({state, dispatch}) {
        try {
            const dataToSave = {
                cells: state.baseMotions,
            };

            const saveDir = await dispatch('getSaveDir');
            if (!await exists(saveDir)) {
                await createDir(saveDir);
            }

            // Create a backup directory if it doesn't exist
            const backupDir = `${saveDir}/base_motion_data_backup`;
            if (!await exists(backupDir)) {
                await createDir(backupDir);
            }

            // Backup the current state
            const timestamp = getFormattedDate();
            const backupPath = `${backupDir}/base_motion_data_backup_${timestamp}.json`;
            await writeFile({path: backupPath, contents: JSON.stringify(dataToSave)});

            // Save the current state
            const path = `${saveDir}/base_motion_data.json`;
            await writeFile({path, contents: JSON.stringify(dataToSave)});
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    },
    async loadState({commit, dispatch}) {
        try {
            const saveDir = await dispatch('getSaveDir');
            const path = `${saveDir}/base_motion_data.json`;

            const loadedState = JSON.parse(await readTextFile(path));
            commit('loadState', loadedState);
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    },
    async getSaveDir() {
        return `${await documentDir()}/sai2_data`;
    },
};

const getters = {
    currentMotionState: (state: typeof state) => {
        return state.baseMotions[state.activeMotionIndex];
    },
    currentKomaState: (state: typeof state) => {
        return state.baseMotions[state.activeMotionIndex].komas[state.activeKomaIndex];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};