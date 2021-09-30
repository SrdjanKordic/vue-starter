<template>
  <div>
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Second page</li>
      </ol>
    </nav>
    <!-- #Breadcrumb -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table v-if="!loading" class="table table-hover">
              <thead>
                <tr class="rounded">
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="user in users">
                  <tr :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td><span class="badge bg-success"> active </span></td>
                    <td><button class="btn btn-primary btn-sm">edit</button></td>
                  </tr>
                </template>
              </tbody>
            </table>
            <div v-else class="loading-full">
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import restApi from "../api/index.js";
export default {
  name: "SecondPage",
  data() {
    return {
      name: "Srdjan Kordic",
      users: [],
      loading: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.loading = true;
      restApi.get(`/users`).then(
        ({ data }) => {
          this.users = data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
