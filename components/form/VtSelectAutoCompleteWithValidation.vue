<template>
	<v-autocomplete
		v-model="innerValue"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		:item-title="text"
		:item-value="itemValue"
		:items="innerItems"
		:menu-props="innerProps"
		hide-details="auto"
		:multiple="multiple"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:label="$attrs.label"
		density="compact"
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifySelectInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputSelectProps';

// VtSelectWithValidation with typing to filter the list. It extended an unimported
// baseControlEdit, so it never loaded, and it rendered a v-select.
export default {
	name: 'VtSelectAutoCompleteWithValidation',
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		...useVuetifySelectInputProps
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
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context, {
			vidOverride: props.vidOverride
		});

		const innerProps = ref({ zIndex: 1000 });
		const innerItems = ref([]);

		// displayName when an item has one, else the itemTitle field
		const text = (item) => {
			if (!item)
				return '';
			return item.displayName ? item.displayName : item[props.itemTitle];
		};

		onMounted(async () => {
			if (props.items)
				innerItems.value = props.items;
			initValue(props.modelValue);
		});

		watch(() => props.items,
			(value) => {
				innerItems.value = value;
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
			innerProps,
			innerItems,
			text
		};
	}
};
</script>

<style scoped>
</style>
