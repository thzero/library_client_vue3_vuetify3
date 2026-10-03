<template>
	<v-autocomplete
		v-model="innerValue"
		v-model:search="search"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		:loading="loading"
		:items="innerItems"
		:item-title="itemTitle"
		:item-value="itemValue"
		hide-details="auto"
		no-filter
		:readonly="readonly"
		:disabled="disabled"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:hint="$attrs.hint"
		:label="$attrs.label"
		density="compact"
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { ref, watch } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';

// Items come from querySelection(search) as the user types. It used Vuetify 2's
// :search-input.sync, so the search never reached the watcher and no items ever loaded.
export default {
	name: 'VtAutoCompleteWithValidation',
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		itemTitle: {
			type: String,
			default: 'name'
		},
		itemValue: {
			type: String,
			default: 'id'
		},
		querySelection: {
			type: Function,
			default: null
		}
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

		const innerItems = ref([]);
		const loading = ref(false);
		const search = ref(null);

		// one debounce per instance
		const executeQuery = LibraryCommonUtility.debounce(async (value) => {
			loading.value = true;
			try {
				innerItems.value = props.querySelection ? (await props.querySelection(value) ?? []) : [];
			}
			finally {
				loading.value = false;
			}
		}, 50);

		watch(() => search.value,
			(value) => {
				if (value && (value !== innerValue.value))
					executeQuery(value);
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
			loading,
			search
		};
	}
};
</script>

<style scoped>
</style>
