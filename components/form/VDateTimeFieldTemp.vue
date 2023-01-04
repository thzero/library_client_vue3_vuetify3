<template>
    <Datepicker 
		v-model="innerValue"
		:enable-time-picker="false"
		:dark="dark"
	/>
</template>

<script>
import { computed} from 'vue';
import { useTheme } from 'vuetify';
		
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtDatetimePicker',
    components: { 
		Datepicker 
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
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			innerValueUpdate,
			initValue
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
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			innerValueUpdate,
			initValue,
			dark,
			theme
		};
	}
};
</script>

<style scoped>
</style>
