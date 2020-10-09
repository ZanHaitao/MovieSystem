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
    }, {
        path: 'adminlist',
        name: 'adminList',
        component: () => import('../views/admin/admin/adminList.vue')
    }, {
        path: 'addadmin',
        name: 'addAdmin',
        component: () => import('../views/admin/admin/addAdmin.vue')
    }, {
        path: 'updateadmin',
        name: 'updateAdmin',
        component: () => import('../views/admin/admin/updateAdmin.vue')
    }, {
        path: 'userlist',
        name: 'userList',
        component: () => import('../views/admin/user/userList.vue')
    }, {
        path: 'adduser',
        name: 'addUser',
        component: () => import('../views/admin/user/addUser.vue')
    }, {
        path: 'cinemalist',
        name: 'cinemaList',
        component: () => import('../views/admin/cinema/cinemaList.vue')
    }, {
        path: 'addcinema',
        name: 'addCinema',
        component: () => import('../views/admin/cinema/addCinema.vue')
    }, {
        path: 'cinemaservelist',
        name: 'cinemaServeList',
        component: () => import('../views/admin/cinemaServe/cinemaServeList.vue')
    }, {
        path: 'addcinemaserve',
        name: 'addCinemaServe',
        component: () => import('../views/admin/cinemaServe/addCinemaServe.vue')
    }, {
        path: 'movielist',
        name: 'movieList',
        component: () => import('../views/admin/movie/movieList.vue')
    }, {
        path: 'addmovie',
        name: 'addMovie',
        component: () => import('../views/admin/movie/addMovie.vue')
    }, {
        path: 'movietypelist',
        name: 'movieTypeList',
        component: () => import('../views/admin/movieType/movieTypeList.vue')
    }, {
        path: 'addmovietype',
        name: 'addMovieType',
        component: () => import('../views/admin/movieType/addMovieType.vue')
    }, {
        path: 'commentlist',
        name: 'commentList',
        component: () => import('../views/admin/comment/commentList.vue')
    }, {
        path: 'addcomment',
        name: 'addComment',
        component: () => import('../views/admin/comment/addComment.vue')
    }, {
        path: 'screenlist',
        name: 'screenList',
        component: () => import('../views/admin/screen/screenList.vue')
    }, {
        path: 'addscreen',
        name: 'addScreen',
        component: () => import('../views/admin/screen/addScreen.vue')
    }, {
        path: 'bannerlist',
        name: 'bannerlist',
        component: () => import('../views/admin/banner/bannerList.vue')
    }, {
        path: 'addbanner',
        name: 'addBanner',
        component: () => import('../views/admin/banner/addBanner.vue')
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