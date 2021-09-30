<template>
  <div>
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Profile</li>
      </ol>
    </nav>
    <!-- #Breadcrumb -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            Profile page
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import restApi from "../api/index.js";
export default {
  name: "Profile",
  data() {
    return {
      name: "Srdjan Kordic",
      user: [],
      loading: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {},
};
</script>
