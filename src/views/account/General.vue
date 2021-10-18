<template>
	<!-- General -->
	<div class="card">
		<div class="card-body pt-1">
			<div class="text-center">
				<img
					class="img-fluid rounded rounded-circle mt-3 mb-2"
					src="https://picsum.photos/110/110"
					height="100"
					width="100"
					:alt="account.name"
				/>
				<h4>Srdjan Kordic</h4>
				<small v-if="account.role_id">{{ account.role.name }}</small>
			</div>

			<div></div>
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
		...mapState(['authUser', 'account']),
	},
	created() {
		this.user = this.authUser
	},
	methods: {},
}
</script>
