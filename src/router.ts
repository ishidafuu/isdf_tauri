import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import BaseMotion from './components/BaseMotion.vue';
import HelloWorld from './components/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/base_motion', component: BaseMotion },
    { path: '/hello_world', component: HelloWorld }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;