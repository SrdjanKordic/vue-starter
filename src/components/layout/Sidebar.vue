<template>
  <div class="app-sidebar bg-white rounded-2 p-sm-3">
    <div class="sidebar-overlay" :class="{ 'sidebar-open': menuOpen }" @click="$store.commit('toggleMenu', false)"></div>
    <nav
      aria-label="HeyGov navigation"
      :class="{
        'sidebar-open': menuOpen,
      }"
      @click="$store.commit('toggleMenu')"
    >
      <div class="logo mb-3">
        <img src="https://picsum.photos/160/80" alt="" class="w-100 rounded" />
      </div>
      <ul class="list-unstyled mb-0 py-3 pt-md-1">
        <li class="mb-2">
          <router-link class="btn text-start px-3" to="/"> <font-awesome-icon :icon="['fas', 'house-user']" class="me-1" /> Dashboard </router-link>
        </li>
        <li class="mb-2">
          <router-link class="btn text-start px-3" to="/second-page"> <font-awesome-icon :icon="['fas', 'paperclip']" class="me-1" /> Second page </router-link>
        </li>
        <li class="mb-2"><div class="text-warning">Development</div></li>
        <li class="mb-2">
          <router-link class="btn text-start px-3" to="/ui-kit"> <font-awesome-icon :icon="['fas', 'box']" class="me-1" /> UI Kit </router-link>
        </li>
        <li class="mb-2" v-if="authenticated"><div class="text-warning">Settings</div></li>
        <li class="mb-2" v-if="authenticated">
          <router-link class="btn text-start px-3" to="/users"> <font-awesome-icon :icon="['fas', 'users']" class="me-1" /> Users </router-link>
        </li>
        <li class="mb-2" v-if="authenticated">
          <router-link class="btn text-start px-3" to="/settings"> <font-awesome-icon :icon="['fas', 'cogs']" class="me-1" /> Settings </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['menuOpen', 'user']),
    ...mapGetters({ authenticated: 'authenticated' }),
  },
}
</script>

<style lang="scss">
.app-sidebar nav {
  z-index: 20;
  height: calc(100vh - 4rem);
  .sidebar-brand {
    padding-top: 10px;
    margin-bottom: 1.5rem;
    display: block;
    img {
      margin-top: 6px;
    }
    p {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 0;
    }
    h3 {
      font-weight: 600;
      font-size: 20px;
      line-height: 23px;
      color: #2b2b2e;
    }
    &:hover {
      text-decoration: none;
    }
  }
  .list-unstyled {
    li {
      a {
        color: var(--bs-gray);
        display: block;
        &:hover {
          background-color: #f0f0f0;
        }
        &.router-link-exact-active {
          background-color: var(--bs-primary);
          color: #fff;
        }
      }
    }
  }
  .bottom-nav {
    bottom: 0;
  }
}
@media (max-width: 575.98px) {
  .sidebar-overlay {
    content: '';
    position: fixed;
    z-index: 115;
    transition: background-color 0.2s ease-out;
    top: 0;
    left: 0;
    //will-change: background-color backdrop-filter;
    &.sidebar-open {
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
    }
  }
  .app-sidebar {
    nav {
      position: fixed !important;
      top: 0;
      width: 75vw;
      background-color: white;
      z-index: 9999;
      padding: 1rem;
      height: 100vh;
      left: calc(-75vw);
      transition: left ease-in-out 0.2s;
      &.sidebar-open {
        left: 0;
      }
    }
  }
}
.app-ios .app-sidebar nav {
  padding-top: 2rem !important;
}
</style>
