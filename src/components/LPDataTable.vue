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
							<td :key="index">{{ getDataValue(d, column.field) }}</td>
						</template>
						<td><button class="btn btn-sm btn-primary">Test</button></td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'LPDataTable',
	props: ['data', 'columns', 'options'],
	data() {
		return {}
	},
	created() {},
	methods: {
		getDataValue(dataValue, value) {
			console.log(value)
			let values = []
			if (value.includes('.')) {
				let values = value.split('.')
				console.log(values)
				console.log('OBJECT')
			} else {
				console.log('PROP')
				console.log(dataValue[value])
			}

			if (values.length > 0) {
				//if (typeof value == 'object' && value !== null) {
				let object = JSON.parse(JSON.stringify(dataValue[values[0]][values[1]]))
				console.log('OVDEE OBJECT')
				console.log(object)
				//return object.name
				//}
			}
			return dataValue[value]
		},
	},
}
</script>
