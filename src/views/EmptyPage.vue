<template>
	<div>
		<PageHeader
			:data="{
				name: 'Empty Page',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row">
			<div class="col-12">This is a demo of an empty page<br /></div>
		</div>
	</div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
export default {
	name: 'SecondPage',
	components: { PageHeader },
	data() {
		return {
			name: '',
		}
	},
}
</script>
