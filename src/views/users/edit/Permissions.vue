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
						<select v-model="user.role_id" class="form-select" name="" id="">
							<option value="null">Select role</option>
							<template v-for="(role, i) in roles">
								<option :key="i" :value="role.id">{{ role.name }}</option>
							</template>
						</select>
					</div>
					<div class="form-group my-3">
						<div class="form-check form-switch d-flex align-items-center">
							<input
								class="form-check-input"
								v-model="customPermissins"
								type="checkbox"
								id="flexSwitchCheckDefault"
							/>
							<label class="form-check-label ms-2" for="flexSwitchCheckChecked">
								Choose custom permissions for user
							</label>
						</div>
					</div>
				</div>
			</div>

			<div v-if="customPermissins" class="table-responsive">
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
										class="form-check-input"
										v-model="permissions.userAccess"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.userCreate"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.userUpdate"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.userDelete"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
						</tr>
						<tr role="row" class="">
							<td class="">Roles</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.roleAccess"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.roleCreate"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.roleUpdate"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.roleDelete"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
						</tr>
						<tr role="row" class="">
							<td class="">Settings</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.settingsGeneralAccess"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										v-model="permissions.settingsGeneralUpdate"
										type="checkbox"
										id="flexSwitchCheckDefault"
									/>
								</div>
							</td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<button v-if="authUser.permissions.includes('user-update')" class="btn btn-primary float-end">
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
			customPermissins: false,
			permissions: {},
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.loadUser()
		this.loadRoles()
	},
	methods: {
		loadUser() {
			this.loading = true
			restApi
				.get('user/' + this.$route.params.id)
				.then(({ data }) => {
					this.user = data
					this.customPermissins = this.user.permissions ? true : false
					this.loading = false
				})
				.catch(error => {
					this.loading = false
					console.log(error)
				})
		},
		loadRoles() {
			restApi
				.get('/roles')
				.then(({ data }) => {
					this.roles = data
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
}
</script>
