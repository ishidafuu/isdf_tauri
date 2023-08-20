import {createStore} from 'vuex'
import {readTextFile, writeFile, exists, createDir} from '@tauri-apps/api/fs';
import {documentDir} from '@tauri-apps/api/path';
import charaCell from './charCellEditor.ts';

interface BodyState {
    bodyX: number;
    bodyY: number;
    faceIndex: number;
    faceAngle: number;
    faceX: number;
    faceY: number;
    faceZ: number;
    itemAngle: number;
    itemX: number;
    itemY: number;
    itemZ: number;
}

export const store = createStore({
    modules: {
        charaCell,
    }
});