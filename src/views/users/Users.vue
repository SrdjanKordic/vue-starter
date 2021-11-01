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
						<div class="actions d-flex mb-4 justify-content-end">
							<button
								v-if="authUser.permissions.includes('USER_CREATE')"
								data-bs-toggle="modal"
								data-bs-target="#createUser"
								class="btn btn-primary float-end"
							>
								Create <font-awesome-icon :icon="['fas', 'user-plus']" class="me-1" />
							</button>
						</div>

						<LPDataTableFilters :filters="filters" v-on:getFilters="getFilters($event.filters)" />

						<table :class="!loading ? 'table table-hover' : 'table table-hover loading'">
							<thead>
								<tr class="rounded">
									<th>
										<span role="button" @click="setOrderBy('id')">
											ID
											<span v-if="orderBy === 'id'">
												<font-awesome-icon
													v-if="direction === 'asc'"
													:icon="['fas', 'arrow-circle-up']"
													class="me-1"
												/>
												<font-awesome-icon
													v-if="direction === 'desc'"
													:icon="['fas', 'arrow-circle-down']"
													class="me-1"
												/>
											</span>
										</span>
									</th>
									<th>
										<span role="button" @click="setOrderBy('name')">
											Name
											<span v-if="orderBy === 'name'">
												<font-awesome-icon
													v-if="direction === 'asc'"
													:icon="['fas', 'arrow-circle-up']"
													class="me-1"
												/>
												<font-awesome-icon
													v-if="direction === 'desc'"
													:icon="['fas', 'arrow-circle-down']"
													class="me-1"
												/>
											</span>
										</span>
									</th>
									<th>
										<span role="button" @click="setOrderBy('phone')">
											Phone
											<span v-if="orderBy === 'phone'">
												<font-awesome-icon
													v-if="direction === 'asc'"
													:icon="['fas', 'arrow-circle-up']"
													class="me-1"
												/>
												<font-awesome-icon
													v-if="direction === 'desc'"
													:icon="['fas', 'arrow-circle-down']"
													class="me-1"
												/>
											</span>
										</span>
									</th>
									<th>Role</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="user in users">
									<tr :key="user.id" @click="viewUser(user)" role="button">
										<td width="80">{{ user.id }}</td>
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
						</table>

						<LPDataTablePagination :pagination="pagination" v-on:getItems="getItems($event.page)" />
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
import LPDataTablePagination from '@/components/lp-data-table/LPDataTablePagination'
import LPDataTableFilters from '@/components/lp-data-table/LPDataTableFilters'
export default {
	name: 'Users',
	components: { PageHeader, Avatar, LPDataTablePagination, LPDataTableFilters },
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
			page: this.$route.query.page || 1,
			orderBy: this.$route.query.orderBy || 'id',
			direction: this.$route.query.direction || 'asc',

			filters: [
				{
					name: 'search',
					label: 'Search',
					type: 'text',
					placeholder: 'search',
					colClass: 'col-4',
					value: this.$route.query.search || '',
				},
				{
					name: 'role_id',
					label: 'Role',
					type: 'select',
					placeholder: 'All roles',
					colClass: 'col-4',
					options: [],
					optionsEndpoint: '/roles',
					value: this.$route.query.role_id || '',
				},
			],
			params: {},
			roles: [],
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.filters.forEach(filter => {
			if (filter.value !== '') {
				this.params[filter.name] = filter.value
			} else {
				delete this.params[filter.name]
			}
		})
		this.getUsers()
	},
	mounted() {
		this.$createUserModal = new Modal('#createUser')
	},
	methods: {
		// Get all users from DB
		getUsers() {
			this.loading = true

			this.params = {
				...this.params,
				page: this.page,
				orderBy: this.orderBy,
				direction: this.direction,
			}

			restApi
				.get('/users', { params: this.params })
				.then(({ data }) => {
					this.users = data.data
					this.pagination = data
					delete this.pagination.data
					this.loading = false
					this.$router.replace({ query: this.params })
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

		// Load Roles
		getRoles() {
			restApi
				.get('/roles')
				.then(({ data }) => {
					return data
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, ''),
						timer: 6000,
					})
				})
		},

		// Go to user page
		viewUser(user) {
			this.$router.push('/users/' + user.id)
		},

		// Get items from page that returned from LPDataTablePagination
		getItems(page) {
			this.page = page
			this.getUsers()
		},

		// Set direction
		setOrderBy(column) {
			if (this.orderBy === column && this.direction === 'asc') {
				this.direction = 'desc'
			} else {
				this.orderBy = column
				this.direction = 'asc'
			}

			this.getUsers()
		},

		// Get filters from LPDataTableFilters component
		getFilters(filters) {
			filters.forEach(filter => {
				if (filter.value !== '') {
					this.params[filter.name] = filter.value
				} else {
					delete this.params[filter.name]
				}
			})

			this.getUsers()
		},
	},
}
</script>
