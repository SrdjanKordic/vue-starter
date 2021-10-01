<template>
	<div>
		<!-- Breadcrumb -->
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Profile</li>
			</ol>
		</nav>
		<!-- #Breadcrumb -->
		<div class="row">
			<div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
				<!-- User Card -->
				<div class="card">
					<div class="card-body">
						<div class="user-avatar-section">
							<div class="d-flex align-items-center flex-column">
								<img
									class="img-fluid rounded mt-3 mb-2"
									src="https://picsum.photos/110/110"
									height="110"
									width="110"
									:alt="authUser.name"
								/>
								<div class="user-info text-center">
									<h4>{{ authUser.name }}</h4>
									<span class="badge badge-light-primary">Author</span>
								</div>
							</div>
						</div>

						<h4 class="fw-bolder border-bottom pb-2 mb-1">Details</h4>
						<div class="info-container">
							<ul class="list-unstyled">
								<li class="mb-2">
									<span class="fw-bolder me-2">Email:</span>
									<span>{{ authUser.email }}</span>
								</li>
								<li class="mb-2">
									<span class="fw-bolder me-2">Status:</span>
									<span class="badge bg-success">Active</span>
								</li>
								<li class="mb-2">
									<span class="fw-bolder me-2">Role:</span>
									<span>Author</span>
								</li>

								<li class="mb-2">
									<span class="fw-bolder me-2">Language:</span>
									<span>English</span>
								</li>
								<li class="mb-2">
									<span class="fw-bolder me-2">Country:</span>
									<span>Serbia</span>
								</li>
							</ul>
							<div class="d-flex justify-content-center pt-2">
								<a
									href="javascript:;"
									class="btn btn-primary me-1 waves-effect waves-float waves-light"
									data-bs-target="#editUser"
									data-bs-toggle="modal"
								>
									Edit
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- /User Card -->
			</div>
			<div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
				<!-- Activity Timeline -->
				<div class="card">
					<h4 class="card-header">User Activity Timeline</h4>
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
		</div>
	</div>
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'Profile',
	data() {
		return {
			name: 'Srdjan Kordic',
			user: [],
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {},
	methods: {},
}
</script>
