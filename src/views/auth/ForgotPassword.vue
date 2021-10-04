<template>
	<div>
		<div class="row justify-content-center my-5">
			<div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
				<h3 class="mb-3 text-center">😟 Forgot your password?</h3>
				<p class="mb-3 text-center">
					Enter the email address associated with your account and we will send you a link to reset your
					password. 👨‍💻
				</p>
				<div v-if="error" class="alert alert-danger" role="alert">
					{{ error }}
				</div>
				<div class="card">
					<div class="card-body">
						<form @submit.prevent="sendResetPasswordLink">
							<label for="email" class="form-label">Email</label>
							<input
								type="email"
								class="form-control"
								placeholder="Your email"
								v-model="email"
								required
							/><br />
							<button class="btn btn-primary w-100">Request password reset</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import restApi from '../../api'
export default {
	name: 'ForgotPassword',
	data() {
		return {
			error: '',
			email: '',
			loading: false,
		}
	},
	methods: {
		async sendResetPasswordLink() {
			this.error = ''
			this.loading = true
			restApi.post(`/forgot-password`, { email: this.email }).then(
				({ data }) => {
					console.log(data)
					this.loading = false
				},
				error => {
					console.log(error)
					this.loading = false
				}
			)
		},
	},
}
</script>
