<template>
	<div class="card fade show">
		<div class="card-header">
			<h4 class="mb-0">Informations</h4>
			<small>Your informations, let other to know more about you</small>
		</div>
		<div class="card-body">
			<form v-if="user" @submit.prevent="updateUser">
				<div class="form-group mb-2">
					<label for="name" class="form-label">Name</label>
					<input type="text" v-model="user.name" class="form-control" required />
				</div>
				<div class="form-group mb-2">
					<label for="dob" class="form-label">Date of Birth</label>
					<input type="date" v-model="user.dob" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="" class="form-label">Sex</label><br />
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" value="male" v-model="user.sex" id="male" />
						<label class="form-check-label" for="male">
							Male
						</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" value="female" v-model="user.sex" id="female" />
						<label class="form-check-label" for="female">
							Female
						</label>
					</div>
				</div>

				<div class="form-group mb-2">
					<label for="state" class="form-label">Country</label>
					<input type="text" v-model="user.country" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="state" class="form-label">State</label>
					<input type="text" v-model="user.state" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="city" class="form-label">City</label>
					<input type="text" v-model="user.city" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="address" class="form-label">Address</label>
					<input type="text" v-model="user.address" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="phone" class="form-label">Phone</label>
					<input type="text" v-model="user.phone" class="form-control" />
				</div>
				<button class="btn btn-primary float-end">Update</button>
			</form>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import restApi from '../../../api'
import { mapState } from 'vuex'
export default {
	name: 'Information',
	data() {
		return {
			user: {},
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.loadUser()
	},
	methods: {
		loadUser() {
			this.loading = true
			restApi
				.get('user/' + this.$route.params.id)
				.then(({ data }) => {
					this.user = data
					this.loading = false
				})
				.catch(error => {
					console.log(error)
					this.loading = false
				})
		},
		updateUser() {
			let data = {
				name: this.user.name,
				dob: this.user.dob,
				sex: this.user.sex,
				country: this.user.country,
				state: this.user.state,
				city: this.user.city,
				address: this.user.address,
				phone: this.user.phone,
			}

			restApi
				.put('user/' + this.$route.params.id, data)
				.then(({ data }) => {
					this.user = data
					Vue.toasted.success(`User successfully updated`)
				})
				.catch(error => {
					console.log(error)
					Vue.toasted.error(error.response.data.message)
				})
		},
	},
}
</script>

<style lang="scss"></style>
