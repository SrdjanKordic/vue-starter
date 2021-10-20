<template>
	<div class="card">
		<div class="card-header">
			<h4 class="mb-0">Notifications</h4>
			<small>Chouse when you want to be notified</small>
		</div>

		<div class="card-body">
			<div class="row">
				<div class="form-group col-12">
					<p class="text-muted">Activity</p>
					<div class="form-check form-switch d-flex align-items-center mb-2">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
						<label for="" class="form-check-label ms-2">Email me when someone watch my profile</label>
					</div>
					<div class="form-check form-switch d-flex align-items-center mb-2">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
						<label for="" class="form-check-label ms-2">Email me when im not active for 3 days</label>
					</div>
					<p class="text-muted">Application</p>
					<div class="form-check form-switch d-flex align-items-center mb-2">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
						<label for="" class="form-check-label ms-2">News and announcements</label>
					</div>
					<div class="form-check form-switch d-flex align-items-center mb-2">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
						<label for="" class="form-check-label ms-2">News and announcements</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'Notifications',
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		...mapState(['account']),
	},
	methods: {},
}
</script>
