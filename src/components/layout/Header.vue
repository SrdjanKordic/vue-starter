<template>
  <div class="header-wrapper py-3">
    <div class="header shadow-sm py-2 px-2 p-2 bg-white rounded d-flex justify-content-between align-items-center">
      <a class="btn d-xs-block d-md-none" @click="$store.commit('TOGGLE_MENU')">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </a>
      <input type="text" class="form-control w-75" placeholder="🔍  Search..." />
      <div v-if="isAuth" class="dropdown w-auto">
        <div role="button" id="profile" data-bs-toggle="dropdown" aria-expanded="false">
          <img :src="authUser.avatar ? authUser.avatar : 'https://picsum.photos/64/64'" width="32" height="32" class="rounded-circle shadow" />
          <span class="d-none d-sm-inline-block ms-2 me-2">{{ authUser.name }}</span>
        </div>

        <ul class="dropdown-menu" aria-labelledby="profile">
          <li>
            <router-link class="dropdown-item" to="/profile"> Profile </router-link>
          </li>
          <li><a role="button" class="dropdown-item" @click="logout()">Log out</a></li>
        </ul>
      </div>
      <div v-else>
        <a class="btn btn-link" href="/login">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState(["token", "authUser"]),
    ...mapGetters(["isAuth"]),
  },
  methods: {
    async logout() {
      this.loading = true;
      console.log("tuje");
      try {
        await this.$store.dispatch("authLogout", this.token);
        await this.$router.push({ name: "login" });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
