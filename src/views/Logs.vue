<template>
	<div>
		<PageHeader
			:data="{
				name: 'Logs',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<table v-if="!loading" class="table table-hover">
							<thead>
								<tr class="rounded">
									<th>Operation</th>
									<th>Description</th>
									<th>Subject</th>
									<th>User</th>
									<th>IP</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="log in logs">
									<tr :key="log.id" role="button">
										<td class="align-middle">
											{{ log.operation }}
										</td>
										<td class="align-middle">
											{{ log.description }}
										</td>
										<td>{{ log.subject_type }} ({{ log.subject_id }})</td>
										<td class="align-middle">
											{{ log.user_id }}
										</td>
										<td class="align-middle">
											{{ log.user_ip }}
										</td>
									</tr>
								</template>
							</tbody>
						</table>
						<div v-else class="text-center">
							<div class="spinner-border" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import { mapState } from 'vuex'
import restApi from '../api/index.js'
import { handleErrors } from '../actions/helpers'
export default {
	name: 'Logs',
	components: { PageHeader },
	data() {
		return {
			logs: [],
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.getLogs()
	},
	methods: {
		// Get all logs from DB
		getLogs() {
			this.loading = true
			restApi
				.get(`/logs`)
				.then(({ data }) => {
					console.log(data)
					this.logs = data
					this.loading = false
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, ''),
						timer: 6000,
					})
				})
		},
	},
}
</script>
