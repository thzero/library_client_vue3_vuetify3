<template>
	<v-btn
		variant="flat"
		style="min-width: 0px"
		@click="click(!innerValue)"
	>
		<span
			v-if="smAndUp"
		>
			{{ label }}
		</span>
		<v-icon
			v-if="!innerValue"
		>
			mdi-chevron-up
		</v-icon>
		<v-icon
			v-if="innerValue"
		>
			mdi-chevron-down
		</v-icon>
	</v-btn>
</template>

<script>
import { watch } from 'vue';
import { useDisplay } from 'vuetify';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';

export default {
	name: 'VtCollapseButton',
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

		const { smAndUp } = useDisplay();

		// one debounce per instance
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
			smAndUp,
			click,
			update
		};
	}
};
</script>

<style scoped>
</style>
