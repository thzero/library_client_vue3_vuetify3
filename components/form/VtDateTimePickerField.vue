<template>
	<!-- v-model and every other attribute fall through to the base -->
	<VtDateTimePickerBase :adapter="adapter" />
</template>

<script>
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import VtDateTimePickerBase from './VtDateTimePickerBase';

// dayjs ignores a parse pattern unless this plugin is loaded
dayjs.extend(customParseFormat);

const adapter = {
	dateFormat: 'YYYY-MM-DD',
	timeFormat: 'HH:mm',
	format: (value, pattern) => dayjs(value).format(pattern),
	parse: (value, pattern) => dayjs(value, pattern).toDate()
};

export default {
	name: 'VtDateTimePickerField',
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
