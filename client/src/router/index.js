import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultPage from '../layout/default.vue';
import store from '../store/index';

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
    }, {
        path: 'cinema',
        name: 'cinema',
        component: () => import('../views/cinema.vue')
    }, {
        path: 'ranking',
        name: 'ranking',
        component: () => import('../views/ranking.vue')
    }, {
        path: 'movieDetail/:id',
        name: 'movieDetail',
        component: () => import('../views/movieDetail.vue')
    }, {
        path: 'cinemaDetail/:id',
        name: 'cinemaDetail',
        component: () => import('../views/cinemaDetail.vue')
    }, {
        path: 'login',
        name: 'login',
        component: () => import('../views/login.vue')
    }, {
        path: 'register',
        name: 'register',
        component: () => import('../views/register.vue')
    }, {
        path: 'payment',
        name: 'payment',
        component: () => import('../views/payment.vue')
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router