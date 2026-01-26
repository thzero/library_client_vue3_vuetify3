<template>
    <VueDatePicker
		v-model="innerValue"
		:enable-time-picker="false"
		:dark="dark"
	/>
</template>

<script>
import { computed} from 'vue';
import { useTheme } from 'vuetify';

import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtDateTimePickerFieldTemp',
    components: {
		VueDatePicker
	},
	props: {
		...useBaseControlEditProps
	},
	setup (props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context, {
			convertValueI: (value) => {
				return value ? value : Date();
			}}
		);

		const theme = useTheme();

		const dark = computed(() => {
			return theme.current.value.dark;
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate,
			dark,
			theme
		};
	}
};
</script>

<style scoped>
</style>
