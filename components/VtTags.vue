<template>
	<v-combobox
		v-model="innerValue"
		:label="label"
		:delimiters="[',']"
		class="tag-input"
		multiple
		chips
		closable-chips
		@update:modelValue="innerValueUpdate"
	/>
</template>

<script>
import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';

export default {
	name: 'VtTags',
	props: {
		label: {
			type: [Object, String],
			default: ''
		},
		// must be included in props
		modelValue: {
			type: null,
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
			// the combobox needs an array, never null
			convertValueI: (value) => {
				return value ?? [];
			}
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
			innerValueUpdate
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
