<template>
	<v-textarea
		v-model="innerValue"
		:error="errorI"
		v-bind="$attrs"
		auto-grow
		:hide-details="hideDetails"
		:readonly="readonly"
		:disabled="disabled"
		:clearable="clearable"
		:hint="$attrs.hint"
		:label="$attrs.label"
		:counter="maxcount"
		@blur="blur"
		@update:modelValue="change"
	>
		<template v-slot:append>
			<span :class="countClass">{{ count }}</span>
		</template>
		<template v-slot:details>
			<div
				v-if="validation"
				v-for="error of errorsI"
				:key="error.$uid"
			>
				<strong>{{ error.$message }}</strong>
				<!--<small> on </small>
				<strong>{{ error.$property }}</strong>-->
			</div>
		</template>
	</v-textarea>
</template>

<script>
import { computed } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtTextAreaWithValidation',
	props: {
		...useBaseControlEditProps,
		blur: {
			type: Function,
			default: () => {}
		},
		maxcount: {
			type: Number,
			default: null
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

		const count = computed(() => {
			return props.maxcount ? '(' + (innerValue.value ? innerValue.value.length : 0) + ')' : '';
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
			innerValueUpdate,
			initValue,
			count,
			countClass
		};
	}
};
</script>

<style scoped>
</style>
