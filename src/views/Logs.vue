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
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="log in logs">
									<tr
										:key="log.id"
										data-bs-toggle="modal"
										@click="setLogInfo(log)"
										data-bs-target="#logInfo"
										role="button"
									>
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
										<td class="align-middle">
											{{
												formatDistance(new Date(log.created_at), new Date(), {
													addSuffix: true,
												})
											}}
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

		<!-- Modal for creating user -->
		<div
			v-if="authUser.permissions.includes('USER_CREATE')"
			class="modal fade"
			id="logInfo"
			tabindex="-1"
			aria-labelledby="lofInfoLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Log</h5>
						<small class="ms-2">User log informations</small>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<table class="table table-hover">
								<tbody>
									<template v-for="(prop, index) in logInfo">
										<tr :key="index" v-if="index !== 'properties' && index !== 'updated_at'">
											<td>
												<b class="text-muted">{{ index }}</b>
											</td>
											<td class="word-wrap">{{ prop }}</td>
										</tr>
									</template>
								</tbody>
							</table>

							<div class="col-12 mb-2">
								<h5>Properties</h5>
							</div>
							<div class="col-12 mb-2 flex-wrap" v-if="logInfo.properties">
								<table class="table table-hover">
									<tbody>
										<template v-for="(prop, index) in JSON.parse(logInfo.properties)">
											<tr :key="index">
												<td>
													<b class="text-muted">{{ index }}</b>
												</td>
												<td>{{ prop }}</td>
											</tr>
										</template>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<!-- #Modal for creating user -->
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import { mapState } from 'vuex'
import restApi from '../api/index.js'
import { handleErrors } from '../actions/helpers'
import { formatDistance } from 'date-fns'
import { Modal } from 'bootstrap'
export default {
	name: 'Logs',
	components: { PageHeader },
	data() {
		return {
			logs: [],
			loading: false,
			$logInfoModal: null,
			logInfo: {},
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.getLogs()
	},
	mounted() {
		this.$logInfoModal = new Modal('#logInfo')
	},
	methods: {
		formatDistance,
		// Get all logs from DB
		getLogs() {
			this.loading = true
			restApi
				.get(`/logs`)
				.then(({ data }) => {
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
		setLogInfo(log) {
			this.logInfo = log
		},
	},
}
</script>
