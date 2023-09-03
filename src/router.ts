import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import CharaCellEditor from "./page/CharaCellEditor.vue";
import baseMotionEditor from "./page/BaseMotionEditor.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/chara_cell_editor' },
    { path: '/chara_cell_editor', component: CharaCellEditor },
    { path: '/base_motion_editor', component: baseMotionEditor }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;