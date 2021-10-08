<template>
	<div>
		<PageHeader
			:data="{
				name: 'Second Page',
				breadcrumbs: [{ name: 'Home', to: '/' }],
			}"
		/>

		<div class="row">
			<div class="col-12">
				This is a second page <br />
				{{ name }}
			</div>
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
			name: 'Srdjan Kordic',
		}
	},
}
</script>
