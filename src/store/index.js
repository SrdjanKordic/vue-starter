import Vue from "vue";
import Vuex from "vuex";
import repository from "../api/repository";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuOpen: false,
    user: localStorage.user ? JSON.parse(localStorage.getItem("user")) : null,
  },
  getters: {
    user: (state) => state.user,
    authenticated: (state) => state.user != null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    toggleMenu(state, open) {
      if (open === undefined) {
        open = !state.menuOpen;
      }

      state.menuOpen = open;
    },
  },
  actions: {
    async login({ commit }, user) {
      await repository.createSession();
      const { data } = await repository.login(user);
      commit("SET_USER", data);

      //sessionStorage.user = JSON.stringify(data)
      localStorage.user = JSON.stringify(data);
    },

    async logout({ commit }) {
      await repository.logout();
      commit("SET_USER", null);
      //sessionStorage.removeItem('user')
      localStorage.removeItem("user");
    },

    async fetchOauthUrlGithub() {
      const { data } = await repository.oauthUrlGithub();
      return data;
    },

    async fetchOauthUrlGoogle() {
      const { data } = await repository.oauthUrlGoogle();
      return data;
    },

    async fetchOauthUrlFacebook() {
      const { data } = await repository.oauthUrlFacebook();
      console.log(data);
      return data;
    },
  },
});
