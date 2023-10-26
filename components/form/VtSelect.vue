<template>
	<v-select
		v-model="innerValue"
		:error="errorI"
		:item-title="itemTitle"
		:item-value="itemValue"
		:item-props="itemProps"
		:items="innerItems"
		:menu-props="innerProps"
		:hide-details="hideDetails"
		:multiple="multiple"
		:chips="multiple"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:label="$attrs.label"
      	density="compact"
		@update:modelValue="innerValueUpdate"
	>
	</v-select>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifySelectInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputSelectProps';

export default {
	name: 'VtSelect',
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		...useVuetifySelectInputProps
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
			innerValueUpdate
		} = useBaseControlEditComponent(props, context, {
			vidOverride: props.vidOverride
		});

		const innerProps = ref({ zIndex: 9000 });
		const innerItems = ref([]);

		const text = (item) => {
			return item.displayName ? item.displayName : item.name;
		}

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
