import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import CharaCellEditor from "./page/CharaCellEditor.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/chara_cell_editor' },
    { path: '/chara_cell_editor', component: CharaCellEditor },
    { path: '/hello_world', component: HelloWorld }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;