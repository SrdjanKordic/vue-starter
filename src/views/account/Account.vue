<template>
	<div>
		<PageHeader
			:data="{
				name: 'Account settings',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row p-0">
			<!-- Account navigation -->
			<div class="col-xl-3 col-lg-4 col-md-4 order-1 order-md-0">
				<ul class="nav nav-pills mb-2 flex-column nav-left">
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'account' ? 'active' : ''"
							aria-current="page"
							to="/account"
						>
							<font-awesome-icon :icon="['fas', 'user']" class="me-2" /> General
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountInformation' ? 'active' : ''"
							aria-current="page"
							to="/account/information"
						>
							<font-awesome-icon :icon="['fas', 'info-circle']" class="me-2" /> Information
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountSocial' ? 'active' : ''"
							aria-current="page"
							to="/account/social"
						>
							<font-awesome-icon :icon="['fas', 'clock']" class="me-2" /> Social
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountNotifications' ? 'active' : ''"
							aria-current="page"
							to="/account/notifications"
						>
							<font-awesome-icon :icon="['fas', 'lock']" class="me-2" /> Notifications
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'accountPassword' ? 'active' : ''"
							aria-current="page"
							to="/account/password"
						>
							<font-awesome-icon :icon="['fas', 'lock']" class="me-2" /> Change Password
						</router-link>
					</li>
				</ul>
			</div>
			<!-- #Account navigation -->
			<!-- Account pages -->
			<div class="col-xl-9 col-lg-8 col-md-8 order-0 order-md-1">
				<router-view></router-view>
			</div>
			<!-- #Account pages -->
		</div>
	</div>
</template>

<script>
//import restApi from "../api/index.js";
import PageHeader from '@/components/layout/PageHeader'
export default {
	name: 'Account',
	components: { PageHeader },
	data() {
		return {}
	},
}
</script>
