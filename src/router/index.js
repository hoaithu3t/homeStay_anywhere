import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import auth from './auth.js';


const routes = [...admin, ...auth];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;