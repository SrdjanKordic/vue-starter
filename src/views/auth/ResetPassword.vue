<template>
	<div>
		<div class="row justify-content-center my-5">
			<div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
				<h3 class="mb-3 text-center">🧐 Reset password?</h3>
				<p class="mb-3 text-center">
					Enter and confirm your new password.👨‍💻
				</p>
				<div v-if="error" class="alert alert-danger" role="alert">
					{{ error }}
				</div>
				<div v-if="info" class="alert alert-info" role="alert">
					{{ info }}
				</div>
				<div class="card">
					<div class="card-body">
						<form v-if="!info" @submit.prevent="sendResetPasswordLink">
							<div class="form-group mb-2">
								<label for="password" class="form-label">Password</label>
								<input type="password" class="form-control" v-model="password" required />
							</div>

							<div class="form-group mb-2">
								<label for="confirmPassword" class="form-label">Confirm Password</label>
								<input type="password" class="form-control" v-model="confirmPassword" required />
							</div>
							<br />
							<button v-if="!loading" class="btn btn-primary w-100">Confirm</button>
							<button v-else class="btn btn-primary w-100" type="button" disabled>
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Resetting your password...
							</button>
						</form>
						<div v-else>
							<h3 class="text-center">🥳 You can now log in with a new password.</h3>
							<router-link class="btn btn-primary w-100" to="/login">
								Login
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import restApi from '../../api'
export default {
	name: 'ResetPassword',
	data() {
		return {
			info: '',
			error: '',
			email: '',
			password: '',
			confirmPassword: '',
			passwordToken: '',
			loading: false,
		}
	},
	created() {
		this.passwordToken = this.$route.query.token
		this.email = this.$route.query.email
	},
	methods: {
		async sendResetPasswordLink() {
			this.loading = true
			restApi
				.post(`/reset-password`, {
					email: this.email,
					password: this.password,
					password_confirmation: this.confirmPassword,
					passwordToken: this.passwordToken,
				})
				.then(
					({ data }) => {
						this.error = ''
						this.info = data.message
						this.loading = false
					},
					error => {
						this.info = ''
						this.error = error.response ? error.response.data.message : error.message
						this.loading = false
					}
				)
		},
	},
}
</script>
