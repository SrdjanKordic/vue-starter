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
			<div class="row mb-2">
				<div class="form-group col-6">
					<label for="oldPassword" class="form-label">Old Password</label>
					<input type="password" class="form-control" v-model="password.old" placeholder="Old Password" />
				</div>
			</div>
			<div class="row mb-2">
				<div class="form-group col-6">
					<label for="password" class="form-label">New Password</label>
					<input type="password" class="form-control" v-model="password.new" placeholder="New Password" />
				</div>
				<div class="form-group col-6">
					<label for="confirmPassword" class="form-label">Retype new Password</label>
					<input type="password" class="form-control" v-model="password.confirm" placeholder="New Password" />
				</div>
			</div>
		</div>
	</div>
	<!-- #Change Password -->
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'ChangePassword',
	data() {
		return {
			user: {},
			password: {
				old: '',
				new: '',
				confirm: '',
			},
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.user = this.authUser
	},
	methods: {},
}
</script>
