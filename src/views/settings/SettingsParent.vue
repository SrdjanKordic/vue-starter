<template>
	<div>
		<PageHeader
			:data="{
				name: 'Settings',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row p-0">
			<div class="col-xl-3 col-lg-4 col-md-4 order-1 order-md-0">
				<ul class="nav nav-pills mb-2 flex-column nav-left">
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'settingsGeneral' ? 'active' : ''"
							aria-current="page"
							to="/settings"
						>
							<font-awesome-icon :icon="['fas', 'cogs']" class="me-2" /> General
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:class="this.$route.name === 'settingsRoles' ? 'active' : ''"
							aria-current="page"
							to="/settings/roles"
						>
							<font-awesome-icon :icon="['fas', 'lock']" class="me-2" /> Roles & Permissions
						</router-link>
					</li>
				</ul>
			</div>
			<div class="col-xl-9 col-lg-8 col-md-8 order-0 order-md-1">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
export default {
	name: 'SettingsParent',
	data() {
		return {
			error: '',
			user: {},
		}
	},
	components: {
		PageHeader,
	},
}
</script>
