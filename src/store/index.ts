import { createStore } from 'vuex'
import charaCell from './charaCellEditor.ts';
import baseMotion from './baseMotion.ts';
import errorHandler from './errorHandler.ts';

export const store = createStore({
    modules: {
        charaCell,
        baseMotion,
        errorHandler,
    }
});