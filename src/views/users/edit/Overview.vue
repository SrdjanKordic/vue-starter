<template>
	<div>
		<!-- Account Overview -->
		<div class="card">
			<div class="card-header">
				<h4 class="mb-0">Overview</h4>
				<small>Summary of all user activities</small>
			</div>
			<div class="card-body pt-1">
				Some informations about user
			</div>
		</div>
		<!-- #Account Overview -->
	</div>
</template>

<script>
import restApi from '../../../api'
import { mapState } from 'vuex'
import { handleErrors } from '../../../actions/helpers'
export default {
	name: 'Overview',
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
					this.loading = false
					this.user = data
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, ''),
						timer: 6000,
					})
					this.loading = false
				})
		},
	},
}
</script>
