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
            <table class="table table-hover">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'SecondPage',
  data() {
    return {
      name: 'Srdjan Kordic',
      users: [],
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      api.get(`/api/users`).then(
        ({ data }) => {
          console.log(data)
          this.users = data
        },
        (error) => {
          console.log(error)
        }
      )
    },
  },
}
</script>
