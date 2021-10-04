import Vue from 'vue'
import axios from 'axios'
import config from '../../config'
import store from '../store'
let restAPI = axios.create({
	baseURL: config.apiUrl,
	withCredentials: true,
	//timeout: 1000,
	headers: {
		//'access-control-request-headers':	'link, x-total',
		//'X-Custom-Header': 'foobar',
	},
	params: {
		//serviceToken: '4f29d14b-70b8-4ce2-9bcc-12497ecfcdec'
	},
})

restAPI.interceptors.request.use(config => {
	//config.headers.common['Accept'] = 'application/json'
	//config.headers.common['Content-type'] = 'application/json'
	if (store.state.token) {
		config.headers['Authorization'] = `Bearer ${store.state.token}`
	}
	return config
})

restAPI.interceptors.response.use(undefined, err => {
	return new Promise(() => {
		if (err.status === 401) {
			store.dispatch('authLogout')
			Vue.toasted.show(`Auth token not valid anymore`, { type: 'error' })
		}

		throw err
	})
})

export default restAPI
