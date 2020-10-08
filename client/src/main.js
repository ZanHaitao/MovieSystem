import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/api'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/util/reset.css'
import './assets/scss/util/util.scss'

Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')