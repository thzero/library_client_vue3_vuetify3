<template>
	<v-btn
		ref="btnOpenRef"
		:color="innerValue"
		@click="open"
		style="width:100%;"
	>
		<div class="text-subtitle-1" style="width:100%;">{{ label }}</div>
		<v-overlay
			v-model="dialogSignal"
			@keydown.esc="close"
        	scroll-strategy="reposition"
		>
			<v-card>
				<v-card-title class="headline">
					{{ label }}
				</v-card-title>
				<v-card-text>
					<v-color-picker
						v-model="innerValue"
						:disabled="disabled"
						show-swatches
						swatches-max-height="20vh"
						@update:modelValue="innerValueUpdate"
					/>
					<div
						class="text-right mt-2"
						style="margin-left: auto; margin-right: 0px;"
					>
						<v-btn
							@click="close"
						>
							Select
						</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-overlay>
	</v-btn>
</template>

<script>
import { computed, ref } from 'vue';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtColorWithValidation',
	props: {
		...useBaseControlEditProps,
		label: {
			type: String,
			default: null
		},
		maxWidth: {
			type: String,
			default: '300px'
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

		const dialogSignal = ref(false);

		const buttonColor = computed(() => {
			return innerValue.value;
		});

		const open = () => {
			dialogSignal.value = true;
		}
		const close = (value) => {
			dialogSignal.value = false;
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
			buttonColor,
			close,
			dialogSignal,
			open
		};
	}
};
</script>

<style scoped>
</style>
