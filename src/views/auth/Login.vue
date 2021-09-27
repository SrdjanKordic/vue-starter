<template>
  <div>
    <h3>Login</h3>
    <p v-if="loading">Loading</p>
    <p v-if="error">{{ error }}</p>
    <input type="email" placeholder="email" v-model="user.email" /><br />
    <input type="text" placeholder="password" v-model="user.password" /><br />
    <button @click="login">Login</button>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;

      try {
        await this.$store.dispatch("login", this.user);
        await this.$router.push("/");
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
