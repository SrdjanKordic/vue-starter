import api from './api'

export default {
  createSession() {
    return api.get(`/sanctum/csrf-cookie`)
  },

  login(params) {
    return api.post(`/api/login`, params)
  },

  oauthUrlGithub() {
    return api.get(`/api/login/github`)
  },

  oauthUrlGoogle() {
    return api.get(`/api/login/google`)
  },

  oauthUrlFacebook() {
    return api.get(`/api/login/facebook`)
  },

  logout() {
    return api.delete(`/api/logout`)
  },

  getPosts() {
    return api.get(`/api/posts`)
  },
}
