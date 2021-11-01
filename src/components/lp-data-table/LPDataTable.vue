<template>
	<div class="lp-data-table">
		<table class="table table-hover">
			<thead>
				<tr>
					<template v-for="(column, index) in columns">
						<th :key="index">{{ column.title }}</th>
					</template>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(d, index) in data">
					<tr :key="index">
						<template v-for="(column, index) in columns">
							<!-- If Style User Avatar Email -->
							<td :key="index" v-if="column.style === 'user-avatar-email'">
								<div class="d-flex align-items-center">
									<div class="avatar me-2">
										<Avatar :user="d" :size="36" class="me-1" />
									</div>
									<div class="info d-flex flex-column">
										<span class="fw-bold">{{ d.name }}</span>
										<small class="text-muted">{{ d.email }}</small>
									</div>
								</div>
							</td>
							<td class="align-middle" v-else-if="column.style === 'phone'" :key="index">
								<a :href="'tel:' + d.phone">{{ d.phone }}</a>
							</td>
							<td class="align-middle" v-else-if="column.style === 'badge'" :key="index">
								<span class="badge" :class="column.class">{{ getDataValue(d, column.field) }}</span>
							</td>
							<td class="align-middle" v-else :key="index">{{ getDataValue(d, column.field) }}</td>
						</template>
						<td class="align-middle"><button class="btn btn-sm btn-primary">Test</button></td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script>
import Avatar from '@/components/user/Avatar'
export default {
	name: 'LPDataTable',
	props: ['data', 'columns', 'options'],
	components: { Avatar },
	data() {
		return {}
	},
	created() {},
	methods: {
		getDataValue(dataValue, value) {
			if (value !== null) {
				if (value.includes('.')) {
					let values = value.split('.')
					return dataValue[values[0]][values[1]]
				} else {
					return dataValue[value]
				}
			} else {
				return ''
			}
		},
	},
}
</script>
