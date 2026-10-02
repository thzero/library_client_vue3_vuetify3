<template>
	<v-btn
		:disabled="disabled"
		variant="flat"
		size="large"
		style="min-width: 0px"
		@click="click(!innerValue)"
	>
		<v-icon
			v-if="!innerValue"
			color="blue"
		>
			mdi-star-outline
		</v-icon>
		<v-icon
			v-if="innerValue"
			color="blue"
		>
			mdi-star
		</v-icon>
	</v-btn>
</template>

<script>
import { watch } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';

export default {
	name: 'VtFavoriteButton',
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		// must be included in props
		modelValue: {
			type: null,
			default: null
		}
	},
	emits: [ 'click', 'update:modelValue' ],
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
			innerValueUpdate
		} = useBaseControlEditComponent(props, context);

		// one debounce per instance: in methods it was shared by every favorite
		// button, so two clicked within 500 ms dropped the first
		const debounced = LibraryCommonUtility.debounce((value) => {
			innerValue.value = value;
		}, 500);
		const update = (value) => {
			debounced(value);
		};
		const click = (value) => {
			update(value);
			context.emit('click');
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
			click,
			update
		};
	}
};
</script>

<style scoped>
</style>
