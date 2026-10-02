<template>
	<v-btn
		v-model="innerValue"
		depressed
		large
		style="min-width: 0px"
		@click="click(!innerValue)"
		@update:modelValue="innerValueUpdate"
	>
		<v-icon
			v-if="!innerValue"
		>
			mdi-arrow-up
		</v-icon>
		<v-icon
			v-if="innerValue"
		>
			mdi-arrow-down
		</v-icon>
	</v-btn>
</template>

<script>
import { watch } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';

export default {
	name: 'VtDirectionButton',
	props: {
		label: {
			type: String,
			default: null
		},
		// must be included in props
		modelValue: {
			type: null,
			default: null
		}
	},
	emits: ['click', 'update:modelValue'],
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

		const click = (value) => {
			// console.log('click', value);
			//innerValue = value
			update(value);
			context.emit('click');
		};
		// one debounce per instance; a new one per click debounced nothing
		const debounced = LibraryCommonUtility.debounce((value) => {
			innerValue.value = value;
		}, 500);
		const update = (value) => {
			debounced(value);
		};

		watch(() => innerValue.value,
			(value) => {
				context.emit('update:modelValue', value);
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
			click,
			update
		};
	},
};
</script>

<style scoped>
</style>
