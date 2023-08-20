import {createStore} from 'vuex'
import {readTextFile, writeFile, exists, createDir} from '@tauri-apps/api/fs';
import {documentDir} from '@tauri-apps/api/path';
import charaCell from './charCellEditor.ts';

export const store = createStore({
    modules: {
        charaCell,
    }
});