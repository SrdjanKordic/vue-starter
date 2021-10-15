<template>
	<div class="card border mt-1">
		<div class="card-header">
			<h4 class="mb-0">Permissions</h4>
			<small>Control user role and permissions</small>
		</div>

		<div v-if="!loading" class="card-body">
			<div class="row">
				<div class="col-12">
					<div class="form-group">
						<label for="role">Role</label>
						<select v-model="user.role_id" @change="updatePermissions()" class="form-select" name="" id="">
							<option :value="null">Custom permissions</option>
							<template v-for="(role, i) in roles">
								<option :key="i" :value="role.id">{{ role.name }}</option>
							</template>
						</select>
					</div>
				</div>
			</div>

			<div v-if="!permissionsTableLoader" class="table-responsive mt-3">
				<p class="mb-0" v-if="useCustomPermissions">Chose permissions for user</p>
				<table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-striped">
					<thead role="rowgroup" class="">
						<tr role="row" class="">
							<th class=""><div>Module</div></th>
							<th class=""><div>Access</div></th>
							<th class=""><div>Create</div></th>
							<th class=""><div>Edit</div></th>
							<th class=""><div>Delete</div></th>
						</tr>
					</thead>
					<tbody role="rowgroup">
						<tr role="row" class="">
							<td class="">Users</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.USER_ACCESS"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.USER_CREATE"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.USER_UPDATE"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.USER_DELETE"
										type="checkbox"
									/>
								</div>
							</td>
						</tr>
						<tr role="row" class="">
							<td class="">Roles</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.ROLE_ACCESS"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.ROLE_CREATE"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.ROLE_UPDATE"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.ROLE_DELETE"
										type="checkbox"
									/>
								</div>
							</td>
						</tr>
						<tr role="row" class="">
							<td class="">Settings</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.SETTINGS_GENERAL_ACCESS"
										type="checkbox"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										:disabled="!useCustomPermissions"
										class="form-check-input"
										v-model="permissions.SETTINGS_GENERAL_UPDATE"
										type="checkbox"
									/>
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-else class="text-center mt-5">
				<div class="spinner-border text-primary spinner-border-sm" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			<button
				v-if="authUser.permissions.includes('USER_UPDATE')"
				@click="updateUserPermissions()"
				class="btn btn-primary float-end"
			>
				Update
			</button>
		</div>
		<div v-else class="text-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>
import restApi from '../../../api'
import { mapState } from 'vuex'
export default {
	name: 'Permissions',
	data() {
		return {
			user: {},
			loading: false,
			roles: [],
			useCustomPermissions: false,
			allPermissions: {},
			permissions: {},
			permissionsTableLoader: false,
			customPermissions: [],
			choosenPermissions: '',
		}
	},
	computed: {
		...mapState(['authUser']),
	},

	created() {
		this.loadUser()
		this.loadPermissions()
	},
	updated() {
		if (!this.authUser.permissions.includes('ROLE_ACCESS')) {
			this.$router.push('/')
		}
	},
	methods: {
		// Load user
		loadUser() {
			this.loading = true
			restApi
				.get('user/' + this.$route.params.id)
				.then(({ data }) => {
					this.user = data
					this.useCustomPermissions = this.user.permissions ? true : false
					this.loading = false
					this.loadRoles()
				})
				.catch(error => {
					this.loading = false
					console.log(error)
				})
		},

		// Load roles
		loadRoles() {
			restApi
				.get('/roles')
				.then(({ data }) => {
					this.roles = data
					this.updatePermissions()
				})
				.catch(error => {
					console.log(error)
				})
		},

		// Load all permissions and store them
		loadPermissions() {
			this.permissions = {
				USER_ACCESS: true,
			}
			this.permissionsTableLoader = true
			// Get all permisions from API
			restApi
				.get('/permissions')
				.then(({ data }) => {
					this.allPermissions = data
					this.permissionsTableLoader = false
				})
				.catch(error => {
					console.log(error)
				})
		},

		// Get all permisions for role
		getRolePermissions(roleId) {
			let rolePermissions = []
			if (roleId) {
				this.roles
					.find(role => role.id === roleId)
					.permissions.forEach(permission => {
						rolePermissions.push(permission.name)
					})
			}
			return rolePermissions
		},

		// Update permissions table based on role
		updatePermissions() {
			if (this.user.role_id) {
				let rolePerms = this.getRolePermissions(this.user.role_id)
				this.resetPermissions()
				rolePerms.forEach(perm => {
					this.permissions[perm] = true
				})
				this.useCustomPermissions = false
				this.permissionsTableLoader = false
			} else {
				this.resetPermissions()
				this.useCustomPermissions = true
				this.getCustomPermissions().then(data => {
					data.forEach(perm => {
						this.permissions[perm] = true
					})
				})
			}
		},

		// Get customer permissions
		getCustomPermissions() {
			return new Promise((resolve, reject) => {
				this.permissionsTableLoader = true
				// Get custom permissions if already have in database
				restApi
					.post('/permissions/names', { ids: this.user.permissions })
					.then(({ data }) => {
						resolve(data)
						this.permissionsTableLoader = false
					})
					.catch(error => {
						reject(error)
						console.log(error)
						this.permissionsTableLoader = false
					})
			})
		},

		// Reset permissions table
		resetPermissions() {
			this.allPermissions.forEach(perm => {
				this.permissions[perm] = false
			})
		},

		// Data in permission column in user table is stored with id, we get IDs based on permission names here
		applyCustomPermissions() {
			return new Promise((resolve, reject) => {
				this.customPermissions = []
				for (const property in this.permissions) {
					if (this.permissions[property]) {
						this.customPermissions.push(property)
					}
				}

				restApi
					.post('/permissions/ids', { names: JSON.stringify(this.customPermissions) })
					.then(({ data }) => {
						this.choosenPermissions = data.join()
						resolve()
					})
					.catch(error => {
						console.log(error)
						reject(error)
					})
			})
		},

		// Update user permissions in database
		updateUserPermissions() {
			this.applyCustomPermissions()
				.then(() => {
					let data = {
						...this.user,
						permissions: this.user.role_id ? null : this.choosenPermissions,
					}
					restApi
						.put('user/' + this.$route.params.id, data)
						.then(({ data }) => {
							this.user = data
							this.$swal.fire({
								icon: 'success',
								title: 'User permissions successfully updated',
							})
						})
						.catch(error => {
							console.log(error)
							this.$swal.fire({
								icon: 'error',
								title: error.response.data.message,
							})
						})
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
}
</script>
