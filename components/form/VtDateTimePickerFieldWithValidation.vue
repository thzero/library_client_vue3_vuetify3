<template>
	<VtDateTimePickerField
		v-model="innerValue"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		hide-details="auto"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="labelI($attrs.label)"
		density="compact"
		:date-format="dateFormat"
		:output-type="outputType"
		:time-format="timeFormat"
		:cancel-text="$t('buttons.cancel')"
		:clear-text="$t('buttons.clear')"
		:ok-text="$t('buttons.ok')"
		@update:model-value="innerValueUpdate"
		v-bind="attrsI($attrs)"
	/>
</template>

<script>
import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

import VtDateTimePickerField from './VtDateTimePickerField';

export default {
	name: 'VtDateTimePickerFieldWithValidation',
	inheritAttrs: false,
	components: {
		VtDateTimePickerField
	},
	props: {
		...useBaseControlEditProps,
		dateFormat: {
			type: String,
			default: null
		},
		// 'date' emits the formatted string, 'timestamp' emits epoch milliseconds
		outputType: {
			type: String,
			default: 'date'
		},
		timeFormat: {
			type: String,
			default: null
		}
	},
	emits: [ 'update:modelValue' ],
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
