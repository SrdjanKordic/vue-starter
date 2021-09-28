import api from "./api";
import config from "../../config";

export default {
  createSession() {
    return api.get(`${config.apiUrl}/sanctum/csrf-cookie`);
  },

  login(params) {
    return api.post(`${config.apiUrl}/api/login`, params);
  },

  oauthUrlGithub() {
    return api.get(`${config.apiUrl}/api/login/github`);
  },

  oauthUrlGoogle() {
    return api.get(`${config.apiUrl}/api/login/google`);
  },

  oauthUrlFacebook() {
    return api.get(`${config.apiUrl}/api/login/facebook`);
  },

  logout() {
    return api.delete(`${config.apiUrl}/api/logout`);
  },

  getPosts() {
    return api.get(`${config.apiUrl}/api/posts`);
  },
};
