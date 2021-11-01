<template>
	<div class="filters">
		<div class="row">
			<template v-for="(filter, index) in filters">
				<div :key="index" :class="filter.colClass">
					<template v-if="filter.type === 'text' || filter.type === 'number' || filter.type === 'email'">
						<label for="">{{ filter.label }}</label>
						<input
							:type="filter.type"
							class="form-control"
							@change="setFilter()"
							:placeholder="filter.placeholder"
							v-model="filter.value"
						/>
					</template>
					<template v-if="filter.type === 'select'">
						<label for="">{{ filter.label }}</label>
						<select class="form-select" @change="setFilter()" v-model="filter.value">
							<option value="">{{ filter.placeholder }}</option>
							<template v-for="(option, index) in filter.options">
								<option :key="index" :value="option.id">{{ option.name }}</option>
							</template>
						</select>
					</template>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import restApi from '../../api'
export default {
	name: 'LPDataTableFilters',
	props: ['filters'],
	data() {
		return {}
	},
	mounted() {
		this.getOptionsDataForFilters()
	},
	methods: {
		setFilter() {
			this.$emit('getFilters', { filters: this.filters })
		},

		// Load options for filters
		getOptionsDataForFilters() {
			this.filters.forEach(filter => {
				if (filter.optionsEndpoint && filter.optionsEndpoint !== '') {
					restApi.get(filter.optionsEndpoint).then(({ data }) => {
						filter.options = data
					})
				}
			})
		},
	},
}
</script>
