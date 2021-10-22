<template>
	<!-- Change Password -->
	<div class="card">
		<div class="card-header d-flex justify-content-between align-items-center">
			<div class="summary">
				<h4 class="mb-0">Change Password</h4>
				<small>In this section you can change your password</small>
			</div>
		</div>
		<div class="card-body pt-1">
			<form @submit.prevent="changePassword">
				<div class="row mb-2">
					<div class="form-group col-6">
						<label for="currentPassword" class="form-label">Current Password</label>
						<input
							type="password"
							class="form-control"
							v-model="current_password"
							placeholder="Current Password"
							id="currentPassword"
							required
						/>
					</div>
				</div>
				<div class="row mb-2">
					<div class="form-group col-6">
						<label for="newPassword" class="form-label">New Password</label>
						<input
							type="password"
							class="form-control"
							v-model="new_password"
							placeholder="New Password"
							id="newPassword"
							required
						/>
					</div>
					<div class="form-group col-6">
						<label for="confirmNewPassword" class="form-label">Retype new Password</label>
						<input
							type="password"
							class="form-control"
							v-model="new_confirm_password"
							placeholder="New Password"
							id="confirmNewPassword"
							required
						/>
					</div>
				</div>
				<button class="btn btn-primary float-end mt-2">Update</button>
			</form>
		</div>
	</div>
	<!-- #Change Password -->
</template>

<script>
import restApi from '../../api'
import { handleErrors, logActivity } from '../../actions/helpers'
export default {
	name: 'ChangePassword',
	data() {
		return {
			current_password: '',
			new_password: '',
			new_confirm_password: '',
			loading: false,
		}
	},
	methods: {
		changePassword() {
			this.loading = true
			let data = {
				current_password: this.current_password,
				new_password: this.new_password,
				new_confirm_password: this.new_confirm_password,
			}
			restApi
				.post('/user/change-password', data)
				.then(() => {
					this.loading = false
					logActivity('default', 'update', 'User password updated', 'User', null, null)
					this.$swal.fire({
						icon: 'success',
						title: 'Password successfully changed!',
					})
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'changePassword'),
						timer: 6000,
					})
				})
		},
	},
}
</script>
