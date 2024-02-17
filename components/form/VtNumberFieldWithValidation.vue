<template>
	<v-text-field
		v-model="innerValue"
		type="number"
		:min="min" 
		:max="max"
		ondrop="return false;" 
		:onpaste="validateNumericField" 
		:onkeypress="validateNumericField"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		:hide-details="hideDetails"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		:class="displayClass"
		density="compact"
		v-bind="$attrs"
		@blur="blur"
		@update:modelValue="innerValueUpdate"
	>
		<!-- <template v-slot:details>
			<div
				v-if="errorsI && errorsI.length > 0"
			>
				<div
					v-for="error of errorsI"
					:key="error.$uid"
				>
					<strong>{{ error.$message }}</strong>
				</div>
			</div>
		</template> -->
	</v-text-field>
</template>

<script>
import { computed, watch } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifyNumberInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputNumberProps';

export default {
	name: 'VtNumberFieldWithValidation',
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
			initValue,
			innerValueUpdate,
			validateNumericField,
			validateNumericFieldMinMax
		} = useBaseControlEditComponent(props, context);

		const displayClass = computed(() => {
			return props.negativeColor ? (innerValue.value < 0 ? 'text-negative' : null) : null;
		});

		watch(() => innerValue.value,
			(value) => {
				validateNumericFieldMinMax(value);
			}
		);

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
			validateNumericField,
			validateNumericFieldMinMax,
			displayClass
		};
	}
};
</script>

<style scoped>
</style>
