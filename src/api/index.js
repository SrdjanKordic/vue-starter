//import Vue from 'vue'
import axios from 'axios'
import config from '../../config'
import store from '../store'

let isRefreshing = false

let restAPI = axios.create({
	baseURL: config.apiUrl,
	//withCredentials: true,
	//timeout: 1000,
	headers: {
		//'access-control-request-headers':	'link, x-total',
		//'X-Custom-Header': 'foobar',
	},
	params: {
		//serviceToken: '4f29d14b-70b8-4ce2-9bcc-12497ecfcdec'
	},
})

restAPI.interceptors.request.use(request => {
	//request.headers.common['Accept'] = 'application/json'
	//request.headers.common['Content-type'] = 'application/json'
	if (store.state.token) {
		request.headers['Authorization'] = `Bearer ${store.state.token}`
	}
	return request
})

restAPI.interceptors.response.use(
	response => {
		return response
	},
	error => {
		const {
			//config,
			response: { status, data },
		} = error

		//const originalRequest = config

		if (status === 401) {
			if (data.message === 'Token is Expired') {
				if (!isRefreshing) {
					isRefreshing = true
					store
						.dispatch('refreshToken')
						.then(resp => {
							store.commit('SET_AUTH', resp.data.token)
							window.location.reload()
							if (resp.status === 200 || resp.status === 204) {
								isRefreshing = false
							}
						})
						.catch(error => {
							store.dispatch('authLogout')
							console.error(error)
						})
				}
			} else {
				console.log(data.message)
				store.dispatch('authLogout')
			}
		}

		throw error
	}
)

export default restAPI
