<template>
	<v-select
		v-model="innerValue"
		:error="errorI"
		:item-title="itemTitle"
		:item-value="itemValue"
		:items="innerItems"
		:hide-details="hideDetails"
		:multiple="multiple"
		:readonly="readonly"
		:label="$attrs.label"
      	density="compact"
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
	</v-select>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtSelectWithValidation',
	props: {
		...useBaseControlEditProps,
		items: {
			type: [Object, Array],
			default: null
		},
		itemTitle: {
			type: String,
			default: 'name'
		},
		itemValue: {
			type: String,
			default: 'id'
		},
		multiple: {
			type: Boolean,
			default: false
		},
		vidOverride: {
			type: String,
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
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context, {
			vidOverride: props.vidOverride
		});

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
			innerItems,
			text
		};
	}
};
</script>

<style scoped>
</style>
