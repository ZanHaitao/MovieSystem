import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        CityId: 220,
        loginUser: {},
    },
    mutations: {
        setCityId(state, payload) {
            state.CityId = payload
        },
        setLoginUser(state, payload) {
            state.loginUser = payload
        }
    },
    actions: {
        changeCity({ commit }, { CityId }) {
            commit('setCityId', CityId)
        },
        changeUser({ commit }, payload) {
            commit('setLoginUser', payload);
        }
    },
    modules: {}
})