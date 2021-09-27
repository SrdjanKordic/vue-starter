import api from './api'
import config from '../../config'

export default {
  createSession() {
    return api.get(`${config.apiUrl}/sanctum/csrf-cookie`)
  },

  login(params) {
    return api.post(`${config.apiUrl}/api/login`, params)
  },

  loginGithub() {
    return api.get(`${config.apiUrl}/api/login/github`)
  },

  logout() {
    return api.delete(`${config.apiUrl}/api/logout`)
  },

  getPosts() {
    return api.get(`${config.apiUrl}/api/posts`)
  },
}
