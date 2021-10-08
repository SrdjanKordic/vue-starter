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
			<div class="row mb-2">
				<div class="form-group col-6 mb-2">
					<label for="instagram" class="form-label">Instagram</label>
					<input type="text" class="form-control" v-model="social.instagram" placeholder="Add link" />
				</div>
				<div class="form-group col-6 mb-2">
					<label for="facebook" class="form-label">Facebook</label>
					<input type="text" class="form-control" v-model="social.facebook" placeholder="Add link" />
				</div>
				<div class="form-group col-6 mb-2">
					<label for="twitter" class="form-label">Twitter</label>
					<input type="text" class="form-control" v-model="social.twitter" placeholder="Add link" />
				</div>
				<div class="form-group col-6 mb-2">
					<label for="linkedin" class="form-label">Linkedin</label>
					<input type="text" class="form-control" v-model="social.linkedin" placeholder="Add link" />
				</div>
				<div class="form-group col-6 mb-2">
					<label for="github" class="form-label">Github</label>
					<input type="text" class="form-control" v-model="social.github" placeholder="Add link" />
				</div>
			</div>
		</div>
	</div>
	<!-- #Social -->
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'Social',
	data() {
		return {
			user: {},
			social: {
				instagram: '',
				facebook: '',
				twitter: '',
				linkedin: '',
			},
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.user = this.authUser
	},
	methods: {},
}
</script>
