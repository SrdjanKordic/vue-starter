<template>
	<div class="header-wrapper py-3">
		<div class="header shadow-sm py-2 px-2 p-2 bg-white rounded d-flex justify-content-between align-items-center">
			<a class="btn d-xs-block d-md-none" @click="$store.commit('TOGGLE_MENU')">
				<font-awesome-icon :icon="['fas', 'bars']" />
			</a>
			<input type="text" class="form-control w-75" placeholder="🔍  Search..." />
			<div v-if="isAuth" class="dropdown w-auto">
				<div role="button" id="account" data-bs-toggle="dropdown" aria-expanded="false">
					<Avatar class="shadow" :user="account" />
					<span class="d-none d-sm-inline-block ms-2 me-2">{{ authUser.name }}</span>
				</div>

				<ul class="dropdown-menu" aria-labelledby="account">
					<li>
						<router-link class="dropdown-item" to="/account"> My Account </router-link>
					</li>
					<li><a role="button" class="dropdown-item" @click="logout()">Log out</a></li>
				</ul>
			</div>
			<div v-else>
				<router-link class="btn btn-link" to="/login"> Login </router-link>
				<router-link class="btn btn-link" to="/register"> Register </router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Avatar from '../user/Avatar.vue'
import { handleErrors } from '../../actions/helpers'
export default {
	name: 'Header',
	components: {
		Avatar,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		...mapState(['token', 'authUser', 'account']),
		...mapGetters(['isAuth']),
	},
	methods: {
		async logout() {
			this.loading = true
			try {
				await this.$store.dispatch('authLogout', this.token)
				await this.$router.push({ name: 'login' })
			} catch (error) {
				this.$swal.fire({
					icon: 'error',
					title: handleErrors(error, ''),
					timer: 6000,
				})
			} finally {
				this.loading = false
			}
		},
	},
}
</script>
