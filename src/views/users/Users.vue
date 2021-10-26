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
						<template v-if="!loading">
							<table class="table table-hover">
								<thead>
									<tr class="rounded">
										<th>Name</th>
										<th>Phone</th>
										<th>Role</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="user in users">
										<tr :key="user.id" @click="viewUser(user)" role="button">
											<td>
												<div class="d-flex align-items-center">
													<div class="avatar me-2">
														<Avatar :user="user" :size="36" class="me-1" />
													</div>
													<div class="info d-flex flex-column">
														<span class="fw-bold">{{ user.name }}</span>
														<small class="text-muted">{{ user.email }}</small>
													</div>
												</div>
											</td>
											<td class="align-middle">
												{{ user.phone }}
											</td>
											<td v-if="user.role" class="align-middle">
												{{ user.role.name }}
											</td>
											<td v-else class="align-middle">Custom</td>
											<td class="align-middle">
												<span class="badge bg-success shadow-sm"> active </span>
											</td>
										</tr>
									</template>
								</tbody>
								from
								{{
									pagination.from
								}}
								to
								{{
									pagination.to
								}}
								total
								{{
									pagination.total
								}}
							</table>
							<!-- Navigation -->
							<div>
								<nav>
									<ul class="pagination">
										<!-- Previous Page -->
										<li v-if="pagination.prev_page_url" class="page-item">
											<a
												role="button"
												class="page-link"
												@click="setPage(pagination.current_page - 1)"
												>Previous</a
											>
										</li>
										<!-- Pages -->
										<template v-for="index in pagination.last_page">
											<li
												:key="index"
												class="page-item"
												:class="
													pagination.current_page === index
														? 'page-item active'
														: 'page-item,'
												"
											>
												<span v-if="pagination.current_page === index" class="page-link">{{
													index
												}}</span>
												<a v-else role="button" @click="setPage(index)" class="page-link">{{
													index
												}}</a>
											</li>
										</template>
										<!-- Next Page -->
										<li v-if="pagination.next_page_url" class="page-item">
											<a
												role="button"
												class="page-link"
												@click="setPage(pagination.current_page + 1)"
												>Next</a
											>
										</li>
									</ul>
								</nav>
							</div>
						</template>
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

		<!-- Modal for creating user -->
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
		<!-- #Modal for creating user -->
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import { mapState } from 'vuex'
import restApi from '../../api/index.js'
import { Modal } from 'bootstrap'
import Avatar from '@/components/user/Avatar'
import { handleErrors, logActivity } from '../../actions/helpers'
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
			tableColumns: [
				{ title: 'Name', field: 'name', style: 'user-avatar-email' },
				{ title: 'Phone', field: 'phone', style: 'phone' },
				{ title: 'Role', field: 'role.name', style: 'badge', class: 'bg-success' },
			],
			tableOptions: {},
			pagination: {},
			page: 1,
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
		// Get all users from DB
		getUsers() {
			this.loading = true
			restApi
				.get('/users', { params: { page: this.page } })
				.then(({ data }) => {
					this.users = data.data
					this.pagination = data
					delete this.pagination.data
					this.loading = false
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, ''),
						timer: 6000,
					})
				})
		},
		// Create new user
		createUser() {
			restApi
				.post(`/user`, this.newUser)
				.then(({ data }) => {
					this.$swal.fire({
						icon: 'success',
						title: 'User created successfully!',
						timer: 4000,
					})
					logActivity('default', 'create', 'User created', 'User', data.id, data)
					this.newUser = {}
					this.getUsers()
					this.$createUserModal.hide()
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'userCreate'),
						timer: 6000,
					})
				})
		},
		// Go to user page
		viewUser(user) {
			this.$router.push('/users/' + user.id)
		},

		//Set page name
		setPage(page) {
			this.page = page
			this.getUsers()
		},
	},
}
</script>
