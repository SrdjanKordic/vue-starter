<template>
	<div>
		<div class="row justify-content-center my-5">
			<div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
				<h3 class="mb-3 text-center">👋 Register</h3>
				<p class="mb-3 text-center">Registered users have more power 🤷‍♂️</p>
				<div v-if="error" class="alert alert-danger" role="alert">
					{{ error }}
				</div>
				<div class="card">
					<div class="card-body">
						<form v-if="!info" @submit.prevent="register">
							<div class="form-group mb-2">
								<label for="name" class="form-label">Name</label>
								<input type="text" class="form-control" placeholder="Your name" v-model="user.name" />
							</div>

							<div class="form-group mb-2">
								<label for="email" class="form-label">Email</label>
								<input
									type="email"
									class="form-control"
									placeholder="Your email"
									v-model="user.email"
									required
								/>
							</div>

							<div class="form-group mb-2">
								<label for="password" class="form-label">Password</label>
								<input
									type="password"
									class="form-control"
									placeholder="Your password"
									v-model="user.password"
									minlength="6"
									required
								/>
							</div>

							<div class="form-group mb-3">
								<label for="passwordConfirmation" class="form-label">Confirm Password</label>
								<input
									type="password"
									class="form-control"
									placeholder="Confirm your password"
									v-model="user.password_confirmation"
									minlength="6"
									required
								/>
							</div>

							<button v-if="!loading" class="btn btn-primary w-100">Register</button>
							<button v-else class="btn btn-primary w-100" type="button" disabled>
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Registering...
							</button>
							<div class="text-center mt-2">
								Have account?
								<router-link class="text-decoration-none" to="/login">
									login
								</router-link>
							</div>
						</form>
						<div v-else>
							<h4 class="text-center">🎉 Your account is successfully created, you can now login</h4>
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
	name: 'Register',
	data() {
		return {
			user: {
				name: '',
				email: '',
				password: '',
				password_confirmation: '',
			},
			loading: false,
			error: '',
			info: '',
		}
	},
	methods: {
		// Function to register user on system
		async register() {
			this.error = null
			this.loading = true
			restApi.post(`/register`, this.user).then(
				({ data }) => {
					this.error = ''
					if (data.error) {
						if (data.error.password) {
							data.error.password.forEach(er => {
								this.error += er + ' '
							})
						}
						if (data.error.email) {
							data.error.email.forEach(er => {
								this.error += er + ' '
							})
						}
						if (data.error.name) {
							data.error.name.forEach(er => {
								this.error += er + ' '
							})
						}
					}

					this.info = data.message
					this.loading = false
				},
				error => {
					this.info = ''
					this.error = error.response ? error.response.data.message : error.message
					if (this.error === undefined) {
						this.error = null
						if (error.password) {
							error.password.forEach(er => {
								this.error += er + ' '
							})
						}
						if (error.email) {
							error.email.forEach(er => {
								this.error += er + ' '
							})
						}
					}
					this.loading = false
				}
			)
		},
	},
}
</script>
