<template>
	<!-- Page Header -->
	<div class="page-header mb-4 p-2 ps-0 border-bottom d-flex align-items-center">
		<div class="page-title">
			<h3 class="mb-0">{{ data.name }}</h3>
		</div>
		<div v-if="data.breadcrumbs && data.breadcrumbs.length > 0" class="mx-2 text-muted">|</div>
		<div v-if="data.breadcrumbs && data.breadcrumbs.length > 0" class="page-breadcrumbs pb-0">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb mb-0">
					<template v-for="(item, index) in data.breadcrumbs">
						<li :key="index" class="breadcrumb-item">
							<router-link :to="item.to">{{ item.name }}</router-link>
						</li>
					</template>
					<li class="breadcrumb-item active" aria-current="page">{{ data.name }}</li>
				</ol>
			</nav>
		</div>
	</div>
	<!-- #Page Header -->
</template>

<script>
export default {
	name: 'PageHeader',
	props: ['data'],
	computed: {},
	methods: {},
}
</script>
