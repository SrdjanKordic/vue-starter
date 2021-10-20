<template>
	<!-- Social -->
	<div class="card">
		<div class="card-header d-flex justify-content-between align-items-center">
			<div class="summary">
				<h4 class="mb-0">Social Networks</h4>
				<small>Add or remove your social networks accounts</small>
			</div>
		</div>
		<div class="card-body pt-1">
			<form v-if="account" @submit.prevent="update">
				<div class="row mb-2">
					<div class="form-group col-6 mb-2">
						<label for="instagram" class="form-label">Instagram</label>
						<input type="text" class="form-control" v-model="account.instagram" placeholder="Add link" />
					</div>
					<div class="form-group col-6 mb-2">
						<label for="facebook" class="form-label">Facebook</label>
						<input type="text" class="form-control" v-model="account.facebook" placeholder="Add link" />
					</div>
					<div class="form-group col-6 mb-2">
						<label for="twitter" class="form-label">Twitter</label>
						<input type="text" class="form-control" v-model="account.twitter" placeholder="Add link" />
					</div>
					<div class="form-group col-6 mb-2">
						<label for="linkedin" class="form-label">Linkedin</label>
						<input type="text" class="form-control" v-model="account.linkedin" placeholder="Add link" />
					</div>
					<div class="form-group col-6 mb-2">
						<label for="github" class="form-label">Github</label>
						<input type="text" class="form-control" v-model="account.github" placeholder="Add link" />
					</div>
					<div class="form-group col-6 mb-2">
						<label for="github" class="form-label">Youtube</label>
						<input type="text" class="form-control" v-model="account.youtube" placeholder="Add link" />
					</div>
				</div>
				<button class="btn btn-primary float-end">Update</button>
			</form>
		</div>
	</div>
	<!-- #Social -->
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
import { handleErrors } from '../../actions/helpers'
export default {
	name: 'Social',
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		...mapState(['account']),
	},
	created() {},
	methods: {
		update() {
			this.loading = true
			let data = {
				...this.account,
				instagram: this.account.instagram,
				facebook: this.account.facebook,
				twitter: this.account.twitter,
				linkedin: this.account.linkedin,
				github: this.account.github,
				youtube: this.account.youtube,
			}
			this.$store
				.dispatch('accountUpdate', data)
				.then(() => {
					this.loading = false
					this.$swal.fire({
						icon: 'success',
						title: 'User successfully updated',
					})
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'userUpdate'),
						timer: 6000,
					})
				})
		},
	},
}
</script>
