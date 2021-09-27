import Vue from 'vue'
import Vuex from 'vuex'
import repository from '../api/repository'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menuOpen: false,
        user: null
    },
    getters: {
        user: state => state.user,
        authenticated: state => state.user != null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },

        toggleMenu(state, open) {
            if (open === undefined) {
                open = !state.menuOpen
            }

            state.menuOpen = open
        }
    },
    actions: {
        async login({ commit }, user) {
            await repository.createSession()
            const { data } = await repository.login(user)
            commit('SET_USER', data)
        }
    }
})
