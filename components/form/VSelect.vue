<template>
	<v-select
		v-model="innerValue"
		:items="innerItems"
		:item-text="text"
		item-value="id"
		:menu-props="innerProps"
		:hide-details="hideDetails"
		:readonly="readonly"
		:label="$attrs.label"
		:flat="flat"
		density="compact"
		:solo-inverted="soloInverted"
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtSelect',
	props: {
		...useBaseControlEditProps,
		flat: {
			type: Boolean,
			default: false
		},
		items: {
			type: [Object, Array],
			default: null
		},
		soloInverted: {
			type: Boolean,
			default: false
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
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context);

		const innerProps = ref({ zIndex: 1000 });
		const innerItems = ref([]);

		const text = (item) => {
			return item.displayName ? item.displayName : item.name;
		};

		watch(() => props.items,
			(value) => {
				innerItems.value = value;
			}
		);

		onMounted(async () => {
			if (props.items)
				innerItems.value = props.items;
			initValue(props.modelValue);
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
			innerProps,
			innerItems,
			text
		};
	}
};
</script>

<style scoped>
</style>
