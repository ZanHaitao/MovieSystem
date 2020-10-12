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
        path: 'movielist',
        name: 'movieList',
        component: () => import('../views/admin/movie/movieList.vue')
    }, {
        path: 'addmovie',
        name: 'addMovie',
        component: () => import('../views/admin/movie/addMovie.vue')
    }, {
        path: 'commentlist',
        name: 'commentList',
        component: () => import('../views/admin/comment/commentList.vue')
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
        name: 'bannerList',
        component: () => import('../views/admin/banner/bannerList.vue')
    }, {
        path: 'addbanner',
        name: 'addBanner',
        component: () => import('../views/admin/banner/addBanner.vue')
    }]
}, {
    path: '/cinemaadmin',
    name: 'cinemaDefault',
    redirect: '/cinemaadmin/login',
    component: cinemaDefault,
    children: [{
        path: 'login',
        name: 'cinemaLogin',
        component: () => import('../views/cinema/login.vue')
    }, {
        path: 'index',
        name: 'cinemaIndex',
        component: () => import('../views/cinema/index.vue')
    }, {
        path: 'info',
        name: 'cinemaInfo',
        component: () => import('../views/cinema/info.vue')
    }, {
        path: 'order',
        name: 'cinemaOrder',
        component: () => import('../views/cinema/order.vue')
    }, {
        path: 'session',
        name: 'cinemaSession',
        component: () => import('../views/cinema/session.vue')
    }, {
        path: 'service',
        name: 'cinemaServive',
        component: () => import('../views/cinema/service.vue')
    }, ]
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router