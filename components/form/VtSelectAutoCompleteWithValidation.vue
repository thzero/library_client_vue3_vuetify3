<template>
	<v-select
		v-model="innerValue"
		:error="errorI"
		hide-details="auto"
		:items="innerItems"
		:success="valid"
		item-text="name"
		item-value="id"
		:menu-props="innerProps"
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
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';
import { useVuetifySelectInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputSelectProps';

export default {
	name: 'VtSelectAutoCompleteWithValidation',
	extends: baseControlEdit,
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
		} = useBaseControlEditComponent(props, context);

		const innerProps = ref({ zIndex: 1000 });
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
