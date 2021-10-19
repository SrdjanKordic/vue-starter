<template>
	<div>
		<PageHeader
			:data="{
				name: 'Users',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row">
			<div class="col-12">
				<div class="card">
					<div v-if="!error" class="card-body">
						<button
							v-if="authUser.permissions.includes('USER_CREATE')"
							data-bs-toggle="modal"
							data-bs-target="#createUser"
							class="btn btn-primary float-end"
						>
							Create <font-awesome-icon :icon="['fas', 'user-plus']" class="me-1" />
						</button>
						<table v-if="!loading" class="table table-hover">
							<thead>
								<tr class="rounded">
									<th>id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="user in users">
									<tr :key="user.id" @click="viewUser(user)" role="button">
										<td>{{ user.id }}</td>
										<td><Avatar :user="user" class="me-1" /> {{ user.name }}</td>
										<td>{{ user.email }}</td>
										<td v-if="user.role">{{ user.role.name }}</td>
										<td v-else>Custom</td>
										<td><span class="badge bg-success"> active </span></td>
									</tr>
								</template>
							</tbody>
						</table>
						<div v-else class="text-center">
							<div class="spinner-border" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					</div>
					<div v-else class="card-body">
						<div class="alert alert-danger" role="alert">
							{{ error }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<div
			v-if="authUser.permissions.includes('USER_CREATE')"
			class="modal fade"
			id="createUser"
			tabindex="-1"
			aria-labelledby="createUserLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<form @submit.prevent="createUser">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">New user</h5>
							<small class="ms-2">User default role is user</small>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<div class="form-group mb-2">
								<label for="name">Name</label>
								<input
									type="text"
									v-model="newUser.name"
									placeholder="Enter user name"
									class="form-control"
									required
								/>
							</div>
							<div class="form-group mb-2">
								<label for="email">Email</label>
								<input
									type="email"
									v-model="newUser.email"
									placeholder="Enter user email"
									class="form-control"
									required
								/>
							</div>
							<div class="form-group mb-2">
								<label for="name">Password</label>
								<input
									type="password"
									v-model="newUser.password"
									placeholder="Enter user password"
									class="form-control"
									required
								/>
							</div>
							<div class="form-group mb-2">
								<label for="name">Password confirm</label>
								<input
									type="password"
									v-model="newUser.password_confirmation"
									placeholder="Confirm user password"
									class="form-control"
									required
								/>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="submit" class="btn btn-primary">Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import { mapState } from 'vuex'
import restApi from '../../api/index.js'
import { Modal } from 'bootstrap'
import Avatar from '@/components/user/Avatar'
export default {
	name: 'Users',
	components: { PageHeader, Avatar },
	data() {
		return {
			users: [],
			loading: false,
			error: '',
			newUser: {},
			$createUserModal: null,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.getUsers()
	},
	mounted() {
		this.$createUserModal = new Modal('#createUser')
	},
	methods: {
		getUsers() {
			this.loading = true
			restApi.get(`/users`).then(
				({ data }) => {
					this.users = data
					this.loading = false
				},
				error => {
					console.log(error)
					this.error = error.response.data.message
				}
			)
		},
		createUser() {
			console.log('ovde')
			restApi.post(`/register`, this.newUser).then(
				({ data }) => {
					console.log(data)
					this.$swal.fire({
						icon: 'success',
						title: 'User created successfully!',
						timer: 4000,
					})
					this.newUser = {}
					this.getUsers()
					this.$createUserModal.hide()
				},
				error => {
					console.log(error.response.data)
					let errorMsg = this.handleValidationErrors(error)
					if (errorMsg != '') {
						this.$swal.fire({
							icon: 'error',
							title: errorMsg,
							timer: 6000,
						})
					} else {
						this.$swal.fire({
							icon: 'error',
							title: error,
							timer: 6000,
						})
					}
				}
			)
		},
		viewUser(user) {
			this.$router.push('/users/' + user.id)
		},
		handleValidationErrors(error) {
			let errorMessage = ''
			if (error.response.data.error) {
				let validationErrors = error.response.data.error
				if (validationErrors.password) {
					errorMessage += ' ' + validationErrors.password
				}
				if (validationErrors.email) {
					errorMessage += ' ' + validationErrors.email
				}
				if (validationErrors.name) {
					errorMessage += ' ' + validationErrors.name
				}
			}
			return errorMessage
		},
	},
}
</script>
