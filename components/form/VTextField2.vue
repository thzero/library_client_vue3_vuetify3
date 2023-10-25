<template>
	<v-text-field
		v-model="innerValue"
		v-bind="$attrs"
		:hide-details="hideDetails"
		:readonly="readonly"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		density="compact"
		@blur="blur"
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtTextField2',
	props: {
		...useBaseControlEditProps,
		blur: {
			type: Function,
			default: () => {}
		}
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
			innerValueUpdate,
			initValue
		} = useBaseControlEditComponent(props, context);

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
			innerValueUpdate,
			initValue
		};
	}
};
</script>

<style scoped>
</style>
