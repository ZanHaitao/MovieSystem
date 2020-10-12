import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/api'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/util/reset.css'
import './assets/scss/util/util.scss'

api.whoAmI().then(res => {
    if (res.data !== null) {
        console.log("获取用户成功");
        store.dispatch('changeUser', res)
    }
}).catch(err => {
    console.log("未获取到用户");
})

api.adminWhoAmI().then(res => {
    if (res) {
        console.log("获取管理员成功");

        store.dispatch('changeAdmin', res);
    }
}).catch(err => {
    console.log("未获取到管理员")
});

api.cinemaWhoAmI().then(res => {
    if (res) {
        console.log("获取影院用户成功");
        store.dispatch('changeCinema', res);
    }
}).catch(err => {
    console.log("未获取到影院用户")
});


Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')