<template>
  <div>
    <div class="row justify-content-center my-5">
      <div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <h3 class="mb-3 text-center">👋 Login to system</h3>
        <p class="mb-3 text-center">Logged users have some privilages 🤷‍♂️</p>
        <p v-if="loading">Loading</p>
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="Your email" v-model="user.email" required /><br />
              <label for="password" class="form-label">Password</label>
              <input type="text" class="form-control" placeholder="Your password" v-model="user.password" required /><br />
              <button class="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      loading: false,
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null

      try {
        await this.$store.dispatch('login', this.user)
        await this.$router.push('/')
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
