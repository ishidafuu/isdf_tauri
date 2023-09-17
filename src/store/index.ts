import {createStore} from 'vuex'
import charaCell from './charaCellEditor.ts';
import baseMotion from './baseMotion.ts';

export const store = createStore({
    modules: {
        charaCell,
        baseMotion,
    }
});