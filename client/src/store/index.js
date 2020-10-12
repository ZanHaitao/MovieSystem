import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        CityId: 220,
        loginUser: {},
        loginAdmin: {},
        loginCinema: {},
    },
    mutations: {
        setCityId(state, payload) {
            state.CityId = payload
        },
        setLoginUser(state, payload) {
            state.loginUser = payload
        },
        setLoginAdmin(state, payload) {
            state.loginAdmin = payload
        },
        setLoginCinema(state, payload) {
            state.loginCinema = payload
        }
    },
    actions: {
        changeCity({ commit }, { CityId }) {
            commit('setCityId', CityId)
        },
        changeUser({ commit }, payload) {
            commit('setLoginUser', payload);
        },
        changeAdmin({ commit }, payload) {
            commit('setLoginAdmin', payload);
        },
        changeCinema({ commit }, payload) {
            commit('setLoginCinema', payload);
        }
    },
    modules: {}
})