<template>
	<div class="card border mt-1">
		<div class="card-header">
			<h4 class="mb-0">Permissions</h4>
			<small>Control user role and permissions</small>
		</div>

		<div class="card-body">
			<div class="table-responsive">
				<table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-striped">
					<thead role="rowgroup" class="">
						<tr role="row" class="">
							<th class=""><div>Module</div></th>
							<th class=""><div>Read</div></th>
							<th class=""><div>Create</div></th>
							<th class=""><div>Edit</div></th>
							<th class=""><div>Delete</div></th>
						</tr>
					</thead>
					<tbody role="rowgroup">
						<tr role="row" class="">
							<td class="">Users</td>
							<td>
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
								</div>
							</td>
							<td>
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
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
		this.user = this.authUser
	},
	methods: {},
}
</script>
