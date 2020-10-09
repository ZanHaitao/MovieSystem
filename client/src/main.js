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
        store.dispatch('changeUser', res)
    }
}).catch(err => {
    console.log("未获取到用户");
})

api.adminWhoAmI().then(res => {
    if (res) {
        store.dispatch('changeAdmin', res);
    }
}).catch(err => {
    console.log("未获取到用户")
});

Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')