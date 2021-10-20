<template>
	<!-- General -->
	<div class="card">
		<div v-if="account" class="card-body pt-1">
			<div class="row">
				<div class="col-4">
					<div class="text-center">
						<span @click="openDialog()">
							<Avatar role="button" :user="account" class="my-3" :size="120" />
						</span>
						<input
							type="file"
							class="d-none"
							name="avatar"
							accept="image/*"
							id="avatar"
							@change="uploadAvatar($event)"
						/>

						<h4>{{ account.name }}</h4>
						<small v-if="account.role_id">{{ account.role.name }}</small>
						<small v-if="account.permissions">Custom</small>
					</div>
				</div>
				<div class="col-8">
					<div class="about mt-3"></div>
					<h5>{{ account.name }}</h5>
					<h5>{{ account.email }}</h5>
					<h5>{{ account.phone }}</h5>
					<h5>{{ account.about }}</h5>
				</div>
			</div>
		</div>
	</div>
	<!-- #General -->
</template>

<script>
import restApi from '../../api'
import { mapState } from 'vuex'
import Avatar from '@/components/user/Avatar'
import { handleErrors } from '../../actions/helpers'
export default {
	name: 'General',
	components: {
		Avatar,
	},
	data() {
		return {
			loading: false,
			avatar: '',
		}
	},
	computed: {
		...mapState(['account', 'storageUrl']),
	},
	updated() {
		this.avatar = this.account.avatar ? this.storageUrl + this.account.avatar : ''
	},
	methods: {
		uploadAvatar($event) {
			var form = new FormData()
			form.append('avatar', $event.target.files[0])
			form.append('id', this.account.id)

			const config = {
				headers: { 'content-type': 'multipart/form-data' },
			}

			restApi
				.post('/user/avatar', form, config)
				.then(({ data }) => {
					this.account.avatar = data
					this.avatar = data
				})
				.catch(error => {
					this.$swal.fire({
						icon: 'error',
						title: handleErrors(error, 'userAvatar'),
						timer: 6000,
					})
				})
		},
		openDialog() {
			document.getElementById('avatar').click()
		},
	},
}
</script>
