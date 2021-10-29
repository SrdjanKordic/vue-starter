<template>
	<!-- Pagination -->
	<div class="d-flex justify-content-between align-items-center">
		<!-- Items Statistic -->
		<div class="items-statistic">
			From
			{{ pagination.from }}
			to
			{{ pagination.to }}
			of
			{{ pagination.total }}
		</div>
		<!-- Pages navigation -->
		<div v-if="pagination.last_page > 1">
			<nav>
				<ul class="pagination">
					<!-- Previous Page -->
					<li v-if="pagination.prev_page_url" class="page-item">
						<a role="button" class="page-link" @click="setPage(pagination.current_page - 1)">Previous</a>
					</li>
					<!-- Pages -->
					<template v-for="index in pagination.last_page">
						<li
							:key="index"
							class="page-item"
							:class="pagination.current_page === index ? 'page-item active' : 'page-item,'"
						>
							<span v-if="pagination.current_page === index" class="page-link">{{ index }}</span>
							<a v-else role="button" @click="setPage(index)" class="page-link">{{ index }}</a>
						</li>
					</template>
					<!-- Next Page -->
					<li v-if="pagination.next_page_url" class="page-item">
						<a role="button" class="page-link" @click="setPage(pagination.current_page + 1)">Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LPDataTablePagination',
	props: ['pagination'],
	data() {
		return {}
	},
	created() {},
	methods: {
		// Set page name
		setPage(page) {
			this.$emit('getItems', { page })
		},
	},
}
</script>
