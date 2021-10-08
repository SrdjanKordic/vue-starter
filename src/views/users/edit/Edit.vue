<template>
	<div>
		<PageHeader
			:data="{
				name: user.name,
				breadcrumbs: [
					{ name: 'Home', to: '/' },
					{ name: 'Users', to: '/users' },
				],
			}"
		/>

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
									:alt="user.name"
								/>
								<div class="user-info text-center">
									<h4 v-if="!loading">{{ user.name }}</h4>
									<h4 v-else>
										<div class="spinner-grow" role="status" style="width:15px;height:15px">
											<span class="visually-hidden">Loading...</span>
										</div>
									</h4>
									<span class="badge badge-light-primary">Author</span>
								</div>
							</div>
						</div>

						<h4 class="fw-bolder border-bottom pb-2 mb-1">Details</h4>
						<div class="info-container">
							<ul class="list-unstyled">
								<li class="mb-2">
									<span class="fw-bolder me-2">Email:</span>
									<span v-if="!loading">{{ user.email }}</span>
									<span v-else>
										<div class="spinner-grow" role="status" style="width:15px;height:15px">
											<span class="visually-hidden">Loading...</span>
										</div>
									</span>
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
									<span class="fw-bolder me-2">Country:</span>
									<span>{{ user.country }}</span>
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
							:class="this.$route.name === 'userOverview' ? 'active' : ''"
							aria-current="page"
							:to="'/users/' + this.$route.params.id"
						>
							<font-awesome-icon :icon="['fas', 'user']" /> Overview
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'userInformation' ? 'active' : ''"
							aria-current="page"
							:to="'/users/' + this.$route.params.id + '/information'"
						>
							<font-awesome-icon :icon="['fas', 'info-circle']" /> Information
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'userTimeline' ? 'active' : ''"
							aria-current="page"
							:to="'/users/' + this.$route.params.id + '/timeline'"
						>
							<font-awesome-icon :icon="['fas', 'clock']" /> Timeline
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'userPermissions' ? 'active' : ''"
							aria-current="page"
							:to="'/users/' + this.$route.params.id + '/permissions'"
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
import restApi from '../../../api'
import { mapState } from 'vuex'
import PageHeader from '../../../components/layout/PageHeader.vue'
export default {
	name: 'Edit',
	components: { PageHeader },
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
	updated() {},
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
					console.log(error)
					this.loading = false
				})
		},
	},
}
</script>
