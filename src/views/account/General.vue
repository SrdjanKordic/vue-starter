<template>
	<!-- General -->
	<div class="card">
		<div class="card-header">
			<h4 class="mb-0">Overview</h4>
			<small>Summary of all user activities</small>
		</div>
		<div class="card-body pt-1">
			Some informations about user
		</div>
	</div>
	<!-- #General -->
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'General',
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
		this.user = this.authUser
	},
	methods: {},
}
</script>
