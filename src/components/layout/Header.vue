<template>
  <div class="header-wrapper py-3">
    <div class="header shadow-sm py-2 px-2 p-2 bg-white rounded d-flex justify-content-between align-items-center">
      <a class="btn d-xs-block d-md-none" @click="$store.commit('toggleMenu')">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </a>
      <input type="text" class="form-control w-75" placeholder="🔍  Search..." />

      <div v-if="authenticated" class="dropdown w-auto">
        <div role="button" id="profile" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://picsum.photos/64/64" width="32" height="32" class="rounded-circle shadow" />
          <span class="d-none d-sm-inline-block ms-2 me-2">{{ user.name }}</span>
        </div>

        <ul class="dropdown-menu" aria-labelledby="profile">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Log out</a></li>
        </ul>
      </div>
      <div v-else>
        <a class="btn btn-link" href="/login">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      authenticated: 'authenticated',
    }),
  },
}
</script>
