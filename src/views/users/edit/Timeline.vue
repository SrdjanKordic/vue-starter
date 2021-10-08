<template>
	<div>
		<!-- Activity Timeline -->
		<div class="card">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="summary">
					<h4 class="mb-0">Timeline</h4>
					<small>Check your activity by time</small>
				</div>
				<div class="actions">
					<div class="dropdown">
						<a
							class="btn btn-primary dropdown-toggle"
							href="#"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Download Data
						</a>

						<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="card-body pt-1">
				<ul class="timeline px-2" style="max-height: 600px;overflow: auto;">
					<li class="timeline-item">
						<span class="timeline-point timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>User login</h6>
								<span class="timeline-event-time me-1">12 min ago</span>
							</div>
							<p>User login at 2:12pm</p>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-warning timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Meeting with john</h6>
								<span class="timeline-event-time me-1">45 min ago</span>
							</div>
							<p>React Project meeting with john @10:15am</p>
							<div class="d-flex flex-row align-items-center mb-50">
								<div class="avatar me-50">
									<img
										src="https://picsum.photos/64/64"
										alt="Avatar"
										width="32"
										height="32"
										class="rounded-circle"
									/>
								</div>
								<div class="user-info ms-2">
									<h6 class="mb-0">Leona Watkins (Client)</h6>
									<p class="mb-0">CEO of pixinvent</p>
								</div>
							</div>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-info timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Create a new react project for client</h6>
								<span class="timeline-event-time me-1">2 day ago</span>
							</div>
							<p>Add files to new design folder</p>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-danger timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Create Invoices for client</h6>
								<span class="timeline-event-time me-1">12 min ago</span>
							</div>
							<p class="mb-0">Create new Invoices and send to Leona Watkins</p>
							<div class="d-flex flex-row align-items-center mt-50">
								<h6 class="mb-0">Invoices.pdf</h6>
							</div>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-warning timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Meeting with john</h6>
								<span class="timeline-event-time me-1">45 min ago</span>
							</div>
							<p>React Project meeting with john @10:15am</p>
							<div class="d-flex flex-row align-items-center mb-50">
								<div class="avatar me-50">
									<img
										src="https://picsum.photos/64/64"
										alt="Avatar"
										width="32"
										height="32"
										class="rounded-circle"
									/>
								</div>
								<div class="user-info ms-2">
									<h6 class="mb-0">Leona Watkins (Client)</h6>
									<p class="mb-0">CEO of pixinvent</p>
								</div>
							</div>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-info timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Create a new react project for client</h6>
								<span class="timeline-event-time me-1">2 day ago</span>
							</div>
							<p>Add files to new design folder</p>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>User login</h6>
								<span class="timeline-event-time me-1">12 min ago</span>
							</div>
							<p>User login at 2:12pm</p>
						</div>
					</li>
					<li class="timeline-item">
						<span class="timeline-point timeline-point-info timeline-point-indicator"></span>
						<div class="timeline-event">
							<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
								<h6>Create a new react project for client</h6>
								<span class="timeline-event-time me-1">2 day ago</span>
							</div>
							<p>Add files to new design folder</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- /Activity Timeline -->
	</div>
</template>

<script>
import restApi from '../../../api'
import { mapState } from 'vuex'
export default {
	name: 'Timeline',
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
					this.user = data
					this.loading = false
				})
				.catch(error => {
					this.loading = false
					console.log(error)
				})
		},
	},
}
</script>
