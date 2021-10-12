<template>
	<div>
		<PageHeader
			:data="{
				name: 'Users',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div v-if="!error" class="card-body">
						<table v-if="!loading" class="table table-hover">
							<thead>
								<tr class="rounded">
									<th>id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="user in users">
									<tr :key="user.id" @click="viewUser(user)" role="button">
										<td>{{ user.id }}</td>
										<td>{{ user.name }}</td>
										<td>{{ user.email }}</td>
										<td>{{ user.role.name }}</td>
										<td><span class="badge bg-success"> active </span></td>
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
					<div v-else class="card-body">
						<div class="alert alert-danger" role="alert">
							{{ error }}
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
import restApi from '../../api/index.js'
export default {
	name: 'Users',
	components: { PageHeader },
	data() {
		return {
			name: 'Srdjan Kordic',
			users: [],
			loading: false,
			error: '',
		}
	},
	computed: {
		...mapState(['authUser']),
	},
	created() {
		this.getUsers()
	},
	methods: {
		getUsers() {
			this.loading = true
			restApi.get(`/users`).then(
				({ data }) => {
					this.users = data
					this.loading = false
				},
				error => {
					console.log(error.response.data.message)
					console.log(error.response.data.permission)
					this.error = error.response.data.message
				}
			)
		},
		viewUser(user) {
			this.$router.push('/users/' + user.id)
		},
	},
}
</script>
