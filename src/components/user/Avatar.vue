<template>
	<img
		v-if="user"
		class="rounded-circle"
		:src="user.avatar ? storageUrl + user.avatar : defaultAvatar"
		:alt="user.name"
		:width="size || 32"
		:height="size || 32"
		:title="user.name"
	/>
</template>

<script>
import { mapState } from 'vuex'
import config from '../../../config'
export default {
	name: 'Avatar',
	props: ['user', 'size'],
	data() {
		return {
			defaultAvatar: '',
		}
	},
	created() {
		this.defaultAvatar = config.defaultAvatar
	},
	computed: {
		...mapState(['storageUrl']),
	},
}
</script>
