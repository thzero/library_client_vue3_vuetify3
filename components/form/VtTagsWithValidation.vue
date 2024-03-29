<template>
	<v-combobox
		v-model="select"
		:hide-details="hide-details"
		:readonly="readonly"
		:disabled="disabled"
		:error="errorI"
		:label="$attrs.label"
		:hint="hint"
		class="tag-input"
		multiple
		chips
		deletable-chips
	/>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

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

		const items = ref([]);
		const select = ref(props.modelValue ? props.modelValue : []);
		const search = ref('');

		const hint = computed((item) => {
			return LibraryClientUtility.$trans.t('errors.tagLine.max', { max: props.max });
		});

		const paste = () => {
			this.$nextTick(() => {
				if (String.isNullOrEmpty(search.value))
					return;
				select.value.push(...search.value.split(','));
				nextTick(() => {
					// context.emit('input', this.search)
					search.value = '';
				});
			});
		};
		const updateTags = () => {
			nextTick(() => {
				context.emit('input', select.value);
			});
		};

		watch(() => select,
			(value) => {
				if (value.length <= props.max)
					return;
				// TODO: Check last entry to see if fits the rules...
				nextTick(() => select.value.pop());
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
			hint,
			items,
			paste,
			search,
			select,
			text,
			updateTags
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
