<template>
	<div class="card">
		<div class="card-header">
			<h4 class="mb-0">General Settings</h4>
			<small>General settings of application</small>
		</div>
		<div class="card-body">
			<form v-if="settings" @submit.prevent="update">
				<div class="form-group mb-2">
					<label for="name" class="form-label">Application Name</label>
					<input type="text" v-model="settings.name" class="form-control" required />
				</div>
				<button class="btn btn-primary float-end">Update</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'General',
	data() {
		return {
			settings: {},
		}
	},
}
</script>
