import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultPage from '../layout/default.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'defaultPage',
    component: defaultPage,
    redirect: '/index',
    children: [{
        path: 'index',
        name: 'index',
        component: () => import('../views/index.vue')
    }, {
        path: 'movie',
        name: 'movie',
        component: () => import('../views/movie.vue')
    }]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router