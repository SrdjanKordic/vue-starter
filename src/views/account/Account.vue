<template>
	<div>
		<!-- Breadcrumb -->
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Account</li>
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
									class="img-fluid rounded rounded-circle mt-3 mb-2"
									src="https://picsum.photos/110/110"
									height="128"
									width="128"
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
						</div>
					</div>
				</div>
				<!-- /User Card -->
			</div>
			<div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
				<ul class="nav nav-pills mb-2">
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountOverview' ? 'active' : ''"
							aria-current="page"
							to="/account"
						>
							<font-awesome-icon :icon="['fas', 'user']" /> Overview
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountInformation' ? 'active' : ''"
							aria-current="page"
							to="/account/information"
						>
							<font-awesome-icon :icon="['fas', 'info-circle']" /> Information
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountTimeline' ? 'active' : ''"
							aria-current="page"
							to="/account/timeline"
						>
							<font-awesome-icon :icon="['fas', 'clock']" /> Timeline
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountPermissions' ? 'active' : ''"
							aria-current="page"
							to="/account/permissions"
						>
							<font-awesome-icon :icon="['fas', 'lock']" /> Permissions
						</router-link>
					</li>
				</ul>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
//import restApi from "../api/index.js";
import { mapState } from 'vuex'
export default {
	name: 'Account',
	data() {
		return {
			user: {},
			loading: false,
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {},
	updated() {},
	methods: {
		getUser() {},
	},
}
</script>
