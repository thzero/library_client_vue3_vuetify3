<template>
	<v-text-field
		v-model="innerValue"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		:hide-details="hideDetails"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		:counter="maxcount"
		density="compact"
		@blur="blur"
		@update:modelValue="innerValueUpdate"
	>
		<template v-slot:append>
			<span :class="countClass">{{ count }}</span>
		</template>
		<!-- <template v-slot:details>
			<div
				v-if="errorsI && errorsI.length > 0"
			>
				<div
					v-if="validation"
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
import { computed } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifyTextInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputTextProps';

export default {
	name: 'VtTextFieldWithValidation',
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
			hideDetails,
			innerValue,
			innerValueUpdate,
			initValue
		} = useBaseControlEditComponent(props, context);

		const count = computed(() => {
			return props.maxcount ? '(' + (innerValue .value? innerValue.value.length : 0) + ')' : '';
		});
		const countClass = computed(() => {
			return (props.maxcount && !String.isNullOrEmpty(innerValu.value) ? innerValue.value.length > props.maxcount ? 'negative ' : '' : '') + 'title-body2';
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
			count,
			countClass
		};
	}
};
</script>

<style scoped>
</style>
