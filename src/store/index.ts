import {createStore} from 'vuex';
import charaCell from './charaCellEditor.ts';
import errorHandler from './errorHandler.ts';
import { createMotionStore } from './createMotionStore';
import {Motion} from '../types/interface.ts';

const baseMotion = createMotionStore<Motion>('base_motion_data', false);
const battleMotion = createMotionStore<Motion>('battle_motion_data', true);

export const store = createStore({
    modules: {
        charaCell,
        baseMotion,
        battleMotion,
        errorHandler,
    }
});
