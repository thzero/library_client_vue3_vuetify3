<template>
	<v-checkbox
		v-model="innerValue"
		:hide-details="hideDetailsOverride"
		v-bind="$attrs"
		density="compact"
		:readonly="readonly"
		@update:modelValue="innerValueUpdate"
	>
		<template v-slot:details>
			<div
				v-for="error of errorsI"
				:key="error.$uid"
			>
				<strong>{{ error.$message }}</strong>
				<!--<small> on </small>
				<strong>{{ error.$property }}</strong>-->
			</div>
		</template>
	</v-checkbox>
</template>

<script>
import { computed } from 'vue';

import { useBaseControlEditComponent } from '@/library_vue/components/baseControlEdit';
import { useBaseControlEditProps } from '@/library_vue/components/baseControlEditProps';

export default {
	name: 'VtCheckboxWithValidation',
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
		} = useBaseControlEditComponent(props, context);

		const hideDetailsOverride = computed(() => {
			return !hideDetails.value ? hideDetails.value : true
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
			hideDetailsOverride,
			innerValue,
			innerValueUpdate,
			initValue
		};
	}
};
</script>

<style scoped>
</style>
