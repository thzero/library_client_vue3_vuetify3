<template>
	<div>
		<v-dialog
			v-model="dialogSignal"
			persistent
			:fullscreen="isFullscreen"
			@keydown.esc="handleClose"
		>
		<!--
			v-resize="onResize"
			:scrollable="scrollableI"
			:max-width="maxWidth" -->
			<v-card
				:style="!isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			>
				<!-- <div class="text-center">
					dirty: {{ dirty }} invalid: {{ invalid }} buttonOkDisabled: {{ buttonOkDisabled }}
				</div> -->
				<v-card-title class="headline">
					{{ label }}
				</v-card-title>
				<v-card-item
					:style="scrollableHeightI"
				>
					<v-form>
						<slot />
						<div
							v-for="(item, index) in serverErrors"
							:key="index"
							class="red--text text--lighten-1 v-messages"
						>
							{{ item }}
						</div>
					</v-form>
				</v-card-item>
				<v-card-actions>
					<v-spacer />
					<v-btn
						v-if="buttonDelete"
						color="error lighten-1"
						text
						@click="handleDelete"
						:loading="loading"
					>
						{{ $t('buttons.delete') }}
					</v-btn>
					<v-btn
						v-if="buttonClear"
						color="primary lighten-1"
						text
						@click="handleClear"
						:loading="loading"
					>
						{{ $t('buttons.clear') }}
					</v-btn>
					<v-btn
						v-if="buttonCancel"
						color="primary lighten-1"
						text
						@click="handleClose"
						:loading="loading"
					>
						{{ $t('buttons.cancel') }}
					</v-btn>
					<v-btn
						v-if="buttonOk"
						:disabled="buttonOkDisabled || (invalidOverride != null ? invalidOverride : false)"
						color="green darken-1"
						text
						@click="submit"
						:loading="loading"
					>
						{{ $t('buttons.ok') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
	<VConfirmationDialog
		v-if="buttonCancel"
		:message="messageCancel"
		:signal="dialogCancelConfirmSignal.signal"
		@cancel="dialogCancelConfirmSignal.cancel()"
		@ok="handleCancelConfirmOk"
	/>
	<VConfirmationDialog
		v-if="buttonClear"
		:message="messageClear"
		:signal="dialogClearConfirmSignal.signal"
		@cancel="dialogClearConfirmSignal.cancel()"
	/>
	<VConfirmationDialog
		v-if="buttonDelete"
		:signal="dialogDeleteConfirmSignal.signal"
		@cancel="dialogDeleteConfirmSignal.cancel()"
		@ok="handleDeleteConfirmOk"
	/>
	<v-snackbar
		ref="notifyRef"
		v-model="notifySignal"
		:color="notifyColor"
		:timeout="notifyTimeout"
	>
		{{ notifyMessage }}
	</v-snackbar>
</template>

<script>
import { computed, ref } from 'vue';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

import { useBaseFormDialogControlComponent } from '@thzero/library_client_vue3/components/form/baseFormDialogControl';
import { baseFormDialogControlProps } from '@thzero/library_client_vue3/components/form/baseFormDialogControlProps';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';

export default {
	name: 'VtFormDialog',
	components: {
		VConfirmationDialog
	},
	props: {
		...baseFormDialogControlProps
	},
	emits: ['close', 'ok', 'open'],
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogHeightI,
			dialogCancelConfirmSignal,
			dialogClearConfirmSignal,
			dialogCloseConfirmSignal,
			dialogDeleteConfirmSignal,
			dialogSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			messageClose,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isDeleting,
			isLoading,
			overlayLoading,
			scrollableI,
			scrollableHeightI,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleClose,
			handleDelete,
			handleDeleteConfirmOk,
			onResize,
			reset,
			resetDialog,
			submit
		} = useBaseFormDialogControlComponent(props, context);

		const display = useDisplayComponent();

		const internalItem = ref(null);

		const isFullscreen = computed(() => {
			return display.isFullscreen.value;
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogHeightI,
			dialogCancelConfirmSignal,
			dialogClearConfirmSignal,
			dialogCloseConfirmSignal,
			dialogDeleteConfirmSignal,
			dialogSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			messageClose,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isDeleting,
			isLoading,
			overlayLoading,
			scrollableI,
			scrollableHeightI,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleClose,
			handleDelete,
			handleDeleteConfirmOk,
			onResize,
			reset,
			resetDialog,
			submit,
			internalItem,
			isFullscreen
		};
	}
};
</script>

<style scoped>
</style>
