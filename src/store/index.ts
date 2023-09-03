import {createStore} from 'vuex'
import charaCell from './charaCellEditor.ts';

export const store = createStore({
    modules: {
        charaCell,
    }
});