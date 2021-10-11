<template>
	<div>
		<div class="card">
			<div class="card-header">
				<h4 class="mb-0">User roles and permissions</h4>
				<small>Create and manage user roles and permissions</small>
			</div>
			<div class="card-body">
				<table class="table table-condensed">
					<thead>
						<th>Name</th>
						<th>Permissions</th>
						<th></th>
					</thead>
					<tbody>
						<template v-for="(role, i) in roles">
							<tr :key="i">
								<td>{{ role.name }}</td>
								<td>
									<template v-for="(permission, i) in role.permissions">
										<span :title="permission.description" class="badge bg-info me-1 mb-1" :key="i">
											{{ permission.name }}
										</span>
									</template>
								</td>
								<td>
									<button
										class="btn btn-primary btn-sm"
										data-bs-toggle="modal"
										data-bs-target="#roleModal"
										@click="editRole(role)"
									>
										<font-awesome-icon
											:icon="['fas', 'edit']"
											ata-bs-toggle="modal"
											data-bs-target="#roleModal"
										/>
									</button>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
				<button
					class="btn btn-primary float-end"
					data-bs-toggle="modal"
					data-bs-target="#roleModal"
					@click="createRole()"
				>
					Create Role
				</button>
			</div>
		</div>
		<!-- Modal -->
		<div
			class="modal fade"
			id="roleModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="roleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<form @submit.prevent="type === 'edit' ? updateRole() : storeRole()">
						<div class="modal-header">
							<h5 class="modal-title" id="roleModalLabel">
								{{ type === 'edit' ? 'Edit Role' : 'Create Role' }}
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								@click="reset()"
							></button>
						</div>
						<div class="modal-body">
							<div class="form-group mb-2">
								<label for="roleName">Name</label>
								<input
									type="text"
									class="form-control"
									v-model="role.name"
									placeholder="Enter role name"
									required
								/>
							</div>

							<div class="form-group mb-2">
								<label for="">Description</label>
								<textarea class="form-control" v-model="role.description" name="" id="" rows="3">
								</textarea>
							</div>

							<label for="">Select Permissions</label>
							<multiselect
								:multiple="true"
								v-model="selectedPermissions"
								:options="optionsPermissions"
								required
							>
							</multiselect>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" @click="reset()" data-bs-dismiss="modal">
								Close
							</button>
							<button v-if="type === 'edit'" type="submit" class="btn btn-primary">
								Update
							</button>
							<button v-if="type === 'new'" type="submit" class="btn btn-primary">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import restApi from '../../api'
import { Modal } from 'bootstrap'
export default {
	name: 'Roles',
	components: { Multiselect },
	data() {
		return {
			error: '',
			roles: [],
			role: {},
			type: '',
			selectedPermissions: null,
			optionsPermissions: [],
			$roleModal: null,
		}
	},
	created() {
		this.loadRoles()
		this.loadPermissions()
	},
	mounted() {
		console.log('moundet')
		this.$roleModal = new Modal('#roleModal')
	},
	methods: {
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
		editRole(role) {
			this.role = role
			this.type = 'edit'
			let selectedPermissions = []
			role.permissions.forEach(permission => {
				selectedPermissions.push(permission.name)
			})
			this.selectedPermissions = selectedPermissions
		},
		createRole() {
			this.type = 'new'
		},
		updateRole() {
			let permissions = this.selectedPermissions.toString()
			restApi
				.put('/role/' + this.role.id, { ...this.role, perms: permissions })
				.then(() => {
					this.loadRoles()
					this.$roleModal.hide()
					Vue.toasted.success(`Role successfully updated`)
				})
				.catch(error => {
					console.log(error)
					Vue.toasted.error(error.response.data.message)
				})
		},
		storeRole() {
			let permissions = this.selectedPermissions.toString()
			restApi
				.post('/role/', { ...this.role, perms: permissions })
				.then(() => {
					this.loadRoles()
					this.$roleModal.hide()
					Vue.toasted.success(`Role successfully added`)
				})
				.catch(error => {
					console.log(error)
					Vue.toasted.error(error.response.data.message)
				})
		},
		reset() {
			console.log('Reset')
			this.role = {}
			this.type = ''
			this.selectedPermissions = null
		},
		loadPermissions() {
			// Get all permisions from API
			this.optionsPermissions = [
				'user-access',
				'user-create',
				'user-update',
				'user-delete',
				'role-access',
				'role-create',
				'role-update',
				'role-delete',
			]
		},
	},
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
