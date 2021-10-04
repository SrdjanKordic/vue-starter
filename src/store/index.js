import Vue from 'vue'
import Vuex from 'vuex'
import restApi from '../api/index'
import { decode } from 'jsonwebtoken'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('auth-token') || null,
		authUser: decode(localStorage.getItem('auth-token')) || null,
		menuOpen: false,
	},
	getters: {
		isAuth(state) {
			if (state.token) {
				return true
			} else {
				return false
			}
		},
	},
	mutations: {
		SET_TOKEN(state, token) {
			localStorage.setItem('auth-token', token)
			state.token = token
		},

		SET_AUTH(state, token) {
			localStorage.setItem('auth-token', token)
			state.token = token
			state.authUser = decode(state.token)
		},

		UNSET_AUTH(state) {
			state.token = null
			state.authUser = null
		},

		TOGGLE_MENU(state, open) {
			if (open === undefined) {
				open = !state.menuOpen
			}
			state.menuOpen = open
		},
	},
	actions: {
		authLogin: ({ commit }, user) => {
			return new Promise((resolve, reject) => {
				restApi
					.post('login', user)
					.then(resp => {
						// This is a successful authentication
						if (resp.data.error) {
							localStorage.removeItem('auth-token')
							reject(resp.data.error)
						} else {
							commit('SET_AUTH', resp.data.token)
							resolve(resp)
						}
					})
					.catch(error => {
						localStorage.removeItem('auth-token')
						reject(error)
					})
			})
		},

		authLoginSocialite: (user, provider) => {
			return new Promise((resolve, reject) => {
				restApi
					.get('login/' + provider, user)
					.then(resp => {
						console.log(resp.data)
						resolve(resp.data)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		authLogout: ({ commit }, token) => {
			return new Promise((resolve, reject) => {
				restApi
					.post('logout', token)
					.then(() => {
						// This is a successful logout
						commit('UNSET_AUTH')
						localStorage.removeItem('auth-token')
						resolve()
						router.push('/login')
						window.location.reload()
					})
					.catch(error => {
						reject(error)
					})
			})
		},
	},
})
