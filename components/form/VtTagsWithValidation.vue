<template>
	<v-combobox
		v-model="innerValue"
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		hide-details="auto"
		:readonly="readonly"
		:variant="variantOverride ? variantOverride : readonly ? 'underlined' : 'filled'"
		:disabled="disabled"
		:hint="hint"
		:label="$attrs.label"
		:delimiters="[',']"
		class="tag-input"
		density="compact"
		multiple
		chips
		closable-chips
		@update:modelValue="update"
	/>
</template>

<script>
import { computed } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';
import { useVuetifyInputProps } from '@thzero/library_client_vue3_vuetify3/components/form/inputProps';

export default {
	name: 'VtTagsWithValidation',
	props: {
		...useBaseControlEditProps,
		...useVuetifyInputProps,
		max: {
			type: [Number],
			default: 5
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
			// the combobox needs an array, never null
			convertValueI: (value) => {
				return value ?? [];
			}
		});

		const hint = computed(() => {
			return LibraryClientUtility.$trans.t('errors.tagLine.max', { max: props.max });
		});

		// the combobox splits pasted or typed text on commas (delimiters), so the
		// only rule left to enforce here is the maximum number of tags
		const update = (value) => {
			let tags = value ?? [];
			if (tags.length > props.max) {
				tags = tags.slice(0, props.max);
				innerValue.value = tags;
			}
			innerValueUpdate(tags);
		};

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
			hint,
			update
		};
	}
};
</script>

<style scoped>
.tag-input span.chip {
	background-color: #1976d2;
	color: #fff;
	font-size: 1em;
}

.tag-input span.v-chip {
	background-color: #1976d2;
	color: #fff;
	font-size:1em;
	padding-left:7px;
}

.tag-input span.v-chip::before {
		content: "label";
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 20px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
}
</style>
