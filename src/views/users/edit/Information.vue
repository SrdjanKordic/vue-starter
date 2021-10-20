<template>
	<div class="card fade show">
		<div class="card-header">
			<h4 class="mb-0">
				Informations
				<div v-if="loading" class="spinner-border spinner-border-sm text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</h4>
			<small>Your informations, let other to know more about you</small>
		</div>
		<div class="card-body">
			<form v-if="user" @submit.prevent="updateUser">
				<div class="form-group mb-2">
					<label for="name" class="form-label">Name</label>
					<input :readonly="readonly" type="text" v-model="user.name" class="form-control" required />
				</div>
				<div class="form-group mb-2">
					<label for="dob" class="form-label">Date of Birth</label>
					<input :readonly="readonly" type="date" v-model="user.dob" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="" class="form-label">Sex</label><br />
					<div class="form-check form-check-inline">
						<input
							:disabled="readonly"
							class="form-check-input"
							type="radio"
							value="male"
							v-model="user.sex"
							id="male"
						/>
						<label class="form-check-label" for="male">
							Male
						</label>
					</div>
					<div class="form-check form-check-inline">
						<input
							:disabled="readonly"
							class="form-check-input"
							type="radio"
							value="female"
							v-model="user.sex"
							id="female"
						/>
						<label class="form-check-label" for="female">
							Female
						</label>
					</div>
				</div>

				<div class="form-group mb-2">
					<label for="state" class="form-label">Country</label>
					<input :readonly="readonly" type="text" v-model="user.country" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="state" class="form-label">State</label>
					<input :readonly="readonly" type="text" v-model="user.state" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="city" class="form-label">City</label>
					<input :readonly="readonly" type="text" v-model="user.city" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="address" class="form-label">Address</label>
					<input :readonly="readonly" type="text" v-model="user.address" class="form-control" />
				</div>
				<div class="form-group mb-2">
					<label for="phone" class="form-label">Phone</label>
					<input :readonly="readonly" type="text" v-model="user.phone" class="form-control" />
				</div>
				<button v-if="authUser.permissions.includes('USER_UPDATE')" class="btn btn-primary float-end">
					Update
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import restApi from '../../../api'
import { mapState } from 'vuex'
import { handleErrors } from '../../../actions/helpers'
export default {
	name: 'Information',
	props: ['person'],
	data() {
		return {
			loading: false,
			user: this.person,
		}
	},

	computed: {
		...mapState(['authUser']),
		readonly() {
			if (!this.authUser.permissions.includes('USER_UPDATE')) {
				return true
			} else {
				return false
			}
		},
	},
	methods: {
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
					this.$swal.fire({
						icon: 'success',
						title: 'User successfully updated!',
						timer: 4000,
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

<style lang="scss"></style>
