import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultPage from '../layout/default.vue';
import adminDefault from '../layout/adminDefault.vue';
import cinemaDefault from '../layout/cinemaDefault.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'defaultPage',
    component: defaultPage,
    redirect: '/index',
    children: [{
        path: 'index',
        name: 'index',
        component: () => import('../views/client/index.vue')
    }, {
        path: 'movie',
        name: 'movie',
        component: () => import('../views/client/movie.vue')
    }, {
        path: 'cinema',
        name: 'cinema',
        component: () => import('../views/client/cinema.vue')
    }, {
        path: 'ranking',
        name: 'ranking',
        component: () => import('../views/client/ranking.vue')
    }, {
        path: 'movieDetail/:id',
        name: 'movieDetail',
        component: () => import('../views/client/movieDetail.vue')
    }, {
        path: 'cinemaDetail/:id',
        name: 'cinemaDetail',
        component: () => import('../views/client/cinemaDetail.vue')
    }, {
        path: 'login',
        name: 'login',
        component: () => import('../views/client/login.vue')
    }, {
        path: 'register',
        name: 'register',
        component: () => import('../views/client/register.vue')
    }, {
        path: 'payment',
        name: 'payment',
        component: () => import('../views/client/payment.vue')
    }, {
        path: 'order',
        name: 'order',
        component: () => import('../views/client/order.vue')
    }]
}, {
    path: '/admin',
    name: 'adminDefault',
    component: adminDefault,
    redirect: '/admin/login',
    children: [{
        path: 'login',
        name: 'adminLogin',
        component: () => import('../views/admin/login.vue')
    }, {
        path: 'index',
        name: 'adminIndex',
        component: () => import('../views/admin/index.vue')
    }, {
        path: 'order',
        name: 'adminOrder',
        component: () => import('../views/admin/order.vue')
    }]
}, {
    path: '/cinema',
    name: 'cinemaDefault',
    component: cinemaDefault,
    children: []
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router