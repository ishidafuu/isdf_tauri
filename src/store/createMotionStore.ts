import {Attack, Koma, Motion, MotionState} from '../types/interface.ts';
import {LoopPoint, Rotation90} from '../types/enum.ts';
import {getFormattedDate} from './stringUtil.ts';
import {createDir, exists, readTextFile, writeFile} from "@tauri-apps/api/fs";
import {documentDir} from "@tauri-apps/api/path";
import {store} from "./index.ts";

export function createMotionStore<T extends Motion>(saveFileName: string, hasAttack: boolean) {
    const initialAttack: Attack = {
        hitX: 0,
        hitY: 0,
        hitW: 0,
        hitH: 0,
        moveType: 0,
    };

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
        flipX: 0,
        flipY: 0,
        rotation: Rotation90.r0,
        attack: hasAttack ? initialAttack : null,
    };

    const initialBaseMotion: T = {
        name: hasAttack ? "BattleMotion" : "BaseMotion",
        komas: Array.from({length: 1}, () => ({...initialKoma})),
    } as T;

    const state: MotionState = {
        motions: Array.from({length: 100}, () => ({
            ...initialBaseMotion,
            komas: [...initialBaseMotion.komas.map(koma => ({...koma}))]
        })),
        activeMotionIndex: 0,
        activeKomaIndex: 0,
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
                motions: state.motions.map(motion => ({...motion})),
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
                    motions: state.motions.map(motion => ({...motion})),
                    activeMotionIndex: state.activeMotionIndex,
                    activeKomaIndex: state.activeKomaIndex,
                });
                Object.assign(state.motions, previousState.motions);
                state.activeMotionIndex = previousState.activeMotionIndex;
                state.activeKomaIndex = previousState.activeKomaIndex;
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future.pop();
                state.past.push({
                    motions: state.motions.map(motion => ({...motion})),
                    activeMotionIndex: state.activeMotionIndex,
                    activeKomaIndex: state.activeKomaIndex,
                });
                Object.assign(state.motions, nextState.motions);
                state.activeMotionIndex = nextState.activeMotionIndex;
                state.activeKomaIndex = nextState.activeKomaIndex;
            }
        },
        loadState(state, newState) {
            Object.assign(state, newState);
        },
        // モーションインデックス
        changeMotionIndex(state, amount) {
            this.commit('pushToPast');
            state.activeMotionIndex = amount >= 0 ? amount : 0;
            state.activeKomaIndex = 0;
        },
        // モーション追加削除
        addMotion(state) {
            this.commit('pushToPast');
            state.motions.splice(state.activeMotionIndex, 0, {initialBaseMotion});
            state.activeMotionIndex += 1;
            state.activeKomaIndex = 0;
        },
        removeMotion(state) {
            if (state.motions.length <= 1) {
                return;
            }
            this.commit('pushToPast');
            state.motions.splice(state.activeMotionIndex, 1);
            const motionsLength = state.motions.length;
            state.activeMotionIndex = Math.min(Math.max(0, state.activeKomaIndex), motionsLength - 1);
            state.activeKomaIndex = 0;
        },
        // モーション名
        changeMotionName(state, amount) {
            this.commit('pushToPast');
            const motion = state.motions[state.activeMotionIndex];
            motion.name = amount;
        },
        // コマインデックス
        changeKomaIndex(state, amount) {
            this.commit('pushToPast');
            const komasLength = state.motions[state.activeMotionIndex].komas.length;
            state.activeKomaIndex = Math.min(Math.max(0, amount), komasLength - 1);
        },
        // コマ追加削除
        addKoma(state) {
            this.commit('pushToPast');
            const komas = state.motions[state.activeMotionIndex].komas;
            komas.splice(state.activeKomaIndex + 1, 0, initialKoma);
        },
        removeKoma(state) {
            const komas = state.motions[state.activeMotionIndex].komas;
            if (komas.length <= 1) {
                return;
            }
            this.commit('pushToPast');
            komas.splice(state.activeKomaIndex, 1);
            const komasLength = state.motions[state.activeMotionIndex].komas.length;
            state.activeKomaIndex = Math.min(Math.max(0, state.activeKomaIndex), komasLength - 1);
        },
        // コマコピペ
        copyKoma(state) {
            state.clipKoma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
        },
        pasteKoma(state) {
            if (state.clipKoma === null) {
                return;
            }
            this.commit('pushToPast');
            state.motions[state.activeMotionIndex].komas[state.activeKomaIndex] = state.clipKoma;
        },
        // コマ編集
        changeCellNo(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.cellNo += amount;
            if (koma.cellNo < 0) koma.cellNo = 0;
        },
        changeOffsetX(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.offsetX += amount;
        },
        changeOffsetY(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.offsetY += amount;
        },
        toggleFlipX(state) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.flipX = koma.flipX === 0 ? 1 : 0;
        },
        toggleFlipY(state) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.flipY = koma.flipY === 0 ? 1 : 0;
        },
        changeRotation(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.rotation = (koma.rotation + Rotation90.Rotation90Count + amount) % Rotation90.Rotation90Count;
        },
        // 効果音
        changeSeNo(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.seNo += amount;
            if (koma.seNo < 0) koma.seNo = 0;
        },
        toggleLoopSe(state) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.isLoopSe = koma.isLoopSe === 0 ? 1 : 0;
        },
        // ループ
        changeLoopPoint(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.loopPoint = (koma.loopPoint + LoopPoint.LoopPointCount + amount) % LoopPoint.LoopPointCount;
        },
        changeLoopCount(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.loopCount += amount;
            if (koma.loopCount < 0) koma.loopCount = 0;
        },
        // フレーム数
        changeFrame(state, amount) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.frame += amount;
            if (koma.frame < 0) koma.frame = 0;
        },
        changeFrameAll(state) {
            this.commit('pushToPast');
            const frame = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex].frame;
            state.motions[state.activeMotionIndex].komas.forEach((koma) => {
                koma.frame = frame;
            });
        },
        // アクションポイント
        toggleAction(state) {
            this.commit('pushToPast');
            const koma = state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
            koma.isAction = koma.isAction === 0 ? 1 : 0;
        },
    };

    const actions = {
        async saveState({state, dispatch}) {
            try {
                const dataToSave = {
                    cells: state.motions,
                };

                const saveDir = await dispatch('getSaveDir');
                if (!await exists(saveDir)) {
                    await createDir(saveDir);
                }

                // Create a backup directory if it doesn't exist
                const backupDir = `${saveDir}/${saveFileName}_backup`;
                if (!await exists(backupDir)) {
                    await createDir(backupDir);
                }

                // Backup the current state
                const timestamp = getFormattedDate();
                const backupPath = `${backupDir}/${saveFileName}_backup_${timestamp}.json`;
                await writeFile({path: backupPath, contents: JSON.stringify(dataToSave)});

                // Save the current state
                const path = `${saveDir}/${saveFileName}.json`;
                await writeFile({path, contents: JSON.stringify(dataToSave)});
            } catch (error) {
                console.error('Failed to save state:', error);
                store.commit('errorHandler/setError', error);
            }
        },
        async loadState({commit, dispatch}) {
            try {
                const saveDir = await dispatch('getSaveDir');
                const path = `${saveDir}/${saveFileName}.json`;

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
            return state.motions[state.activeMotionIndex];
        },
        currentKomaState: (state: typeof state) => {
            return state.motions[state.activeMotionIndex].komas[state.activeKomaIndex];
        },
    };

    return {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
    };
}