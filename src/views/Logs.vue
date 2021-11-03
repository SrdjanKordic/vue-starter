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
					<div v-if="!error" class="card-body">
						<table :class="!loading ? 'table table-hover' : 'table table-hover loading'">
							<thead>
								<tr class="rounded">
									<th>
										<span role="button" @click="setOrderBy('id')">
											ID
											<span v-if="orderBy === 'id'">
												<font-awesome-icon
													v-if="direction === 'asc'"
													:icon="['fas', 'arrow-circle-up']"
													class="me-1"
												/>
												<font-awesome-icon
													v-if="direction === 'desc'"
													:icon="['fas', 'arrow-circle-down']"
													class="me-1"
												/>
											</span>
										</span>
									</th>
									<th>Operation</th>
									<th>Description</th>
									<th>Subject</th>
									<th>User</th>
									<th>IP</th>
									<th>
										<span role="button" @click="setOrderBy('created_at')">
											DATE
											<span v-if="orderBy === 'created_at'">
												<font-awesome-icon
													v-if="direction === 'asc'"
													:icon="['fas', 'arrow-circle-up']"
													class="me-1"
												/>
												<font-awesome-icon
													v-if="direction === 'desc'"
													:icon="['fas', 'arrow-circle-down']"
													class="me-1"
												/>
											</span>
										</span>
									</th>
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
										<td width="80">{{ log.id }}</td>
										<td class="align-middle">
											{{ log.operation }}
										</td>
										<td class="align-middle">
											{{ log.description }}
										</td>
										<td>{{ log.subject_type }} ({{ log.subject_id }})</td>
										<td class="align-middle">
											{{ log.user.name }}
										</td>
										<td class="align-middle">
											{{ log.causer_ip }}
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
						<LPDataTablePagination :pagination="pagination" v-on:getItems="getItems($event.page)" />
					</div>
					<div v-else class="card-body">
						<div class="alert alert-danger" role="alert">
							{{ error }}
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
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Log</h5>
						<small class="ms-2">User log informations</small>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<table class="table table-hover">
									<tbody>
										<template v-for="(prop, index) in logInfo">
											<tr :key="index" v-if="index !== 'updated_at'">
												<td>
													<b class="text-muted">{{ index }}</b>
												</td>
												<td class="text-break">{{ prop }}</td>
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
import LPDataTablePagination from '@/components/lp-data-table/LPDataTablePagination'
export default {
	name: 'Logs',
	components: { PageHeader, LPDataTablePagination },
	data() {
		return {
			error: '',
			logs: [],
			loading: false,
			$logInfoModal: null,
			logInfo: {},
			page: this.$route.query.page || 1,
			orderBy: this.$route.query.orderBy || 'created_at',
			direction: this.$route.query.direction || 'desc',
			pagination: {},
			params: {},
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

			this.params = {
				...this.params,
				page: this.page,
				orderBy: this.orderBy,
				direction: this.direction,
			}

			restApi
				.get(`/logs`, { params: this.params })
				.then(({ data }) => {
					this.logs = data.data
					this.pagination = data
					delete this.pagination.data
					this.loading = false
					this.$router.replace({ query: this.params })
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
		// Get items from page that returned from LPDataTablePagination
		getItems(page) {
			this.page = page
			this.getLogs()
		},
		// Set direction
		setOrderBy(column) {
			if (this.orderBy === column && this.direction === 'asc') {
				this.direction = 'desc'
			} else {
				this.orderBy = column
				this.direction = 'asc'
			}

			this.getLogs()
		},
	},
}
</script>
