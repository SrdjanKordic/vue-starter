<template>
	<div>
		<div class="row justify-content-center my-5">
			<div class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
				<h3 class="mb-3 text-center">👋 Login to system</h3>
				<p class="mb-3 text-center">Logged users have some privilages 🤷‍♂️</p>
				<div class="card">
					<div class="card-body">
						<form @submit.prevent="login">
							<label for="email" class="form-label">Email</label>
							<input
								type="email"
								class="form-control"
								placeholder="Your email"
								v-model="user.email"
								required
							/><br />
							<label for="password" class="form-label">Password</label>
							<input
								type="password"
								class="form-control"
								placeholder="Your password"
								v-model="user.password"
								minlength="3"
								required
							/><br />
							<button v-if="!loading" class="btn btn-primary w-100">Login</button>
							<button v-else class="btn btn-primary w-100" type="button" disabled>
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Logging in...
							</button>
							<div class="text-center mt-2">
								<router-link class="text-decoration-none" to="/forgot-password">
									Forgot password?
								</router-link>
							</div>
						</form>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
						<p class="mb-2 text-center">🫂 Login with social network</p>
						<div class="justify-content-center d-flex">
							<button class="btn" @click="githubLogin()">
								<font-awesome-icon :icon="['fab', 'github']" style="color:#212121" /> Github
							</button>
							<button class="btn ms-2" @click="googleLogin()">
								<font-awesome-icon :icon="['fab', 'google']" style="color:#4081ed" /> Google
							</button>
							<button v-if="false" class="btn ms-2" @click="facebookLogin()">
								<font-awesome-icon :icon="['fab', 'facebook']" style="color:#1877f2" /> Facebook
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { handleErrors } from '../../actions/helpers'
export default {
	name: 'Login',
	data() {
		return {
			user: {
				email: null,
				password: null,
			},
			loading: false,
		}
	},
	mounted() {
		window.addEventListener('message', this.onMessage, false)
	},
	beforeDestroy() {
		window.removeEventListener('message', this.onMessage)
	},
	methods: {
		/**
		 * @param {MessageEvent} e
		 */
		async onMessage(e) {
			if (
				e.data.source !== 'vue-devtools-proxy' &&
				e.data.source !== 'vue-devtools-backend' &&
				e.data.source !== 'vue-devtools-backend-injection'
			) {
				console.log(e.origin)
			}

			// TODO: Need bether way for this catching message for social login, bether url from config
			if (e.origin === 'http://127.0.0.1:8000') {
				this.$store.commit('SET_AUTH', e.data.token)
				window.removeEventListener('message', this.onMessage)
				this.$router.push('/')
			}
		},

		// Function to authenticate user with email and password
		async login() {
			this.loading = true
			await this.$store
				.dispatch('authLogin', this.user)
				.then(({ data }) => {
					if (data.success) {
						this.$router.push('/')
					}
					this.loading = false
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'login'),
						timer: 6000,
					})
					this.loading = false
				})
		},

		// Authenticate with Github Account
		async githubLogin() {
			const newWindow = openWindow('', 'Login')

			try {
				const url = await this.$store.dispatch('authLoginSocialite', 'github', this.user)
				newWindow.location.href = url
			} catch (error) {
				this.$swal.fire({
					icon: 'error',
					title: handleErrors(error, 'login'),
					timer: 6000,
				})
			} finally {
				this.loading = false
			}
		},

		// Authenticate with Google Account
		async googleLogin() {
			const newWindow = openWindow('', 'Login')

			try {
				const url = await this.$store.dispatch('authLoginSocialite', 'google', this.user)
				newWindow.location.href = url
			} catch (error) {
				this.$swal.fire({
					icon: 'error',
					title: handleErrors(error, 'login'),
					timer: 6000,
				})
			} finally {
				this.loading = false
			}
		},

		async facebookLogin() {
			const newWindow = openWindow('', 'Login')

			try {
				const url = await this.$store.dispatch('authLoginSocialite', 'facebook', this.user)
				newWindow.location.href = url
			} catch (error) {
				this.$swal.fire({
					icon: 'error',
					title: handleErrors(error, 'login'),
					timer: 6000,
				})
			} finally {
				this.loading = false
			}
		},
	},
}

/**
 * @param  {Object} options
 * @return {Window}
 */
function openWindow(url, title, options = {}) {
	if (typeof url === 'object') {
		options = url
		url = ''
	}
	options = { url, title, width: 600, height: 720, ...options }
	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
	const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
	const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
	options.left = width / 2 - options.width / 2 + dualScreenLeft
	options.top = height / 2 - options.height / 2 + dualScreenTop
	const optionsStr = Object.keys(options)
		.reduce((acc, key) => {
			acc.push(`${key}=${options[key]}`)
			return acc
		}, [])
		.join(',')
	const newWindow = window.open(url, title, optionsStr)
	if (window.focus) {
		newWindow.focus()
	}
	return newWindow
}
</script>
