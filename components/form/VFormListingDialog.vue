<template>
	<div>
		<v-dialog
			v-model="dialogSignal"
			persistent
			:fullscreen="isFullscreen"
			@keydown.esc="handleCancel"
		>
			<v-card
				:style="!isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			>
				<!-- <div class="text-center">
					dirty: {{ dirty }} invalid: {{ invalid }} <br>
					buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
					buttonOkDisabled: {{ buttonOkDisabled }}
				</div> -->
				<v-card-item>
					<div class="text-center text-h5">{{ label }}</div>
					<v-form>
						<slot :buttonClearDisabled="buttonClearDisabled" :buttonOkDisabled="buttonOkDisabled" :dirty="dirty" :invalid="invalid" :isLoading="isLoading" />
						<div
							v-for="(item, index) in serverErrors"
							:key="index"
							class="red--text text--lighten-1 v-messages"
						>
							{{ item }}
						</div>
					</v-form>
					<v-snackbar
						ref="notifyRef"
						v-model="notifySignal"
						:color="notifyColor"
						:timeout="notifyTimeout"
					>
						{{ notifyMessage }}
					</v-snackbar>
				</v-card-item>

				<v-card-text style="overflow-y: auto;" class="scroll">
					<slot name="listing"/>
				</v-card-text>

				<v-card-actions align="right">
					<v-spacer />
					<v-btn
						variant="flat"
						color="primary"
						@click="handleCancel"
					>
						{{ $t(buttonCloseName) }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<VConfirmationDialog
			v-if="buttonClear"
			:message="messageClear"
			:signal="dialogClearConfirmSignal.signal"
			@cancel="dialogClearConfirmSignal.cancel()"
			@ok="handleClearConfirmOk"
		/>
		<VConfirmationDialog
			v-if="buttonCancel"
			:message="messageCancel"
			:signal="dialogCancelConfirmSignal.signal"
			@cancel="dialogCancelConfirmSignal.cancel()"
			@ok="handleCancelConfirmOk"
		/>
	</div>
</template>

<script>
import { computed, ref } from 'vue';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

import { useBaseFormDialogControlComponent } from '@thzero/library_client_vue3/components/form/baseFormDialogControl';
import { baseFormDialogControlProps } from '@thzero/library_client_vue3/components/form/baseFormDialogControlProps';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';

export default {
	name: 'VtFormListingDialog',
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
			dialogDeleteConfirmSignal,
			dialogSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCanceling,
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
			handleDelete,
			handleDeleteConfirmOk,
			onResize,
			reset,
			resetDialog,
			submit
		} = useBaseFormDialogControlComponent(props, context, {
			resetOnSubmit: false,
			signalOnSubmit: false
		});

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
			dialogDeleteConfirmSignal,
			dialogSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCanceling,
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
			handleDelete,
			handleDeleteConfirmOk,
			onResize,
			reset,
			resetDialog,
			submit,
			isFullscreen,
			internalItem
		};
	}
};
</script>

<style scoped>
</style>
