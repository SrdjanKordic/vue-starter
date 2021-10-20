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
				<div v-if="info" class="alert alert-info" role="alert">
					{{ info }}
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
							<button v-if="!loading" class="btn btn-primary w-100">Request password reset</button>
							<button v-else class="btn btn-primary w-100" type="button" disabled>
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Sending reset link...
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import restApi from '../../api'
import { handleErrors } from '../../actions/helpers'
export default {
	name: 'ForgotPassword',
	data() {
		return {
			info: '',
			email: '',
			loading: false,
		}
	},
	methods: {
		async sendResetPasswordLink() {
			this.loading = true
			restApi.post(`/forgot-password`, { email: this.email }).then(
				({ data }) => {
					this.info = data.message
					this.loading = false
				},
				error => {
					this.info = ''
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'forgotPassword'),
						timer: 6000,
					})
					this.loading = false
				}
			)
		},
	},
}
</script>
