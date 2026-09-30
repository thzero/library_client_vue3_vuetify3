<template>
	<!-- v-model and every other attribute fall through to the base -->
	<VtDateTimePickerBase :adapter="adapter" />
</template>

<script>
import { format, parse } from 'date-fns';

import VtDateTimePickerBase from './VtDateTimePickerBase';

const adapter = {
	dateFormat: 'yyyy-MM-dd',
	timeFormat: 'HH:mm',
	format: (value, pattern) => format(value, pattern),
	parse: (value, pattern) => parse(value, pattern, new Date())
};

export default {
	name: 'VtDateTimePickerFieldFns',
	components: {
		VtDateTimePickerBase
	},
	setup () {
		return {
			adapter
		};
	}
};
</script>

<style scoped>
</style>
