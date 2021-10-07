<template>
	<div class="card fade show">
		<div class="card-header">
			<h4 class="mb-0">Informations</h4>
			<small>Your informations, let other to know more about you</small>
		</div>
		<div class="card-body">
			<form v-if="account" @submit.prevent="update">
				<div class="form-group mb-2">
					<label for="name" class="form-label">Name</label>
					<input type="text" v-model="account.name" class="form-control" required />
				</div>
				<div class="form-group mb-2">
					<label for="dob" class="form-label">Date of Birth</label>
					<input type="date" v-model="account.dob" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="" class="form-label">Sex</label><br />
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" value="male" v-model="account.sex" id="male" />
						<label class="form-check-label" for="male">
							Male
						</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="radio" value="female" v-model="account.sex" id="female" />
						<label class="form-check-label" for="female">
							Female
						</label>
					</div>
				</div>

				<div class="form-group mb-2">
					<label for="state" class="form-label">Country</label>
					<input type="text" v-model="account.country" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="state" class="form-label">State</label>
					<input type="text" v-model="account.state" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="city" class="form-label">City</label>
					<input type="text" v-model="account.city" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="address" class="form-label">Address</label>
					<input type="text" v-model="account.address" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="phone" class="form-label">Phone</label>
					<input type="text" v-model="account.phone" class="form-control" />
				</div>
				<button class="btn btn-primary float-end">Update</button>
			</form>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'Information',
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser', 'account']),
	},
	created() {
		this.user = this.authUser
	},
	methods: {
		update() {
			let data = {
				name: this.account.name,
				dob: this.account.dob,
				sex: this.account.sex,
				country: this.account.country,
				state: this.account.state,
				city: this.account.city,
				address: this.account.address,
				phone: this.account.phone,
			}
			this.$store
				.dispatch('accountUpdate', data)
				.then(() => {})
				.catch(() => {})
		},
	},
}
</script>

<style lang="scss"></style>
