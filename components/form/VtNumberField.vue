<template>
	<v-text-field
		v-model="innerValue"
		type="number"
		:class="displayClass"
		:hide-details="hideDetails"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		density="compact"
		v-bind="$attrs"
		@blur="blur"
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { computed } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifyNumberInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputNumberProps';

export default {
	name: 'VtNumberField',
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		...useVuetifyNumberInputProps
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

		const displayClass = computed(() => {
			return props.negativeColor ? (innerValue.value < 0 ? 'text-negative' : null) : null;
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
			innerValueUpdate,
			initValue,
			displayClass
		};
	}
};
</script>

<style>
	.text-negative input{
		color: red !important;
	}
</style>
