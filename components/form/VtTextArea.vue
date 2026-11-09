<template>
	<v-textarea
		v-model="innerValue"
		auto-grow
		hide-details="auto"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:disabled="disabled"
		:clearable="false"
		:hint="$attrs.hint"
		:label="labelI($attrs.label)"
		density="compact"
		@blur="blur"
		@update:modelValue="innerValueUpdate"
		v-bind="attrsI($attrs)"
	/>
</template>

<script>
import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifyTextInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputTextProps';

export default {
	name: 'VtTextArea',
	inheritAttrs: false,
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		...useVuetifyTextInputProps
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
			attrsI,
			labelI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
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
			attrsI,
			labelI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
		};
	}
};
</script>

<style scoped>
</style>
