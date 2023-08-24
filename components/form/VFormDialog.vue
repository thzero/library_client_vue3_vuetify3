<template>
	<div>
		<v-dialog
			v-model="dialogSignal"
			persistent
			:fullscreen="isFullscreen"
		>
		<!--
			v-resize="onResize"
			:scrollable="scrollableI"
			:max-width="maxWidth" -->
			<v-card
				:style="!isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			>
				<div
					v-if="debug"
					class="text-center"
				>
					dirty: {{ dirty }} invalid: {{ invalid }} <br>
					buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
					buttonDeleteDisabled: {{ buttonDeleteDisabled }} buttonOkDisabled: {{ buttonOkDisabled }} <br>
					silentErrors: {{ silentErrors }}
				</div>
				<v-card-title class="headline">
					<v-sheet 
						color="primary" 
						rounded
						class="pl-4 pr-4 pt-2 pb-2"
					>
					{{ label }}
					</v-sheet>
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
						:variant="buttonsForms.variant.delete"
						:color="buttonsForms.color.delete"
						@click="handleDelete"
						:disabled="buttonDeleteDisabled"
						:loading="isDeleting || isLoading"
					>
						{{ $t(buttonDeleteName) }}
					</v-btn>
					<v-btn
						v-if="buttonClear"
						:variant="buttonsForms.variant.clear"
						:color="buttonsForms.color.clear"
						@click="handleClear"
						:disabled="buttonClearDisabled"
						:loading="isClearing || isLoading"
					>
						{{ $t(buttonClearName) }}
					</v-btn>
					<v-btn
						v-if="buttonCancel"
						:variant="buttonsForms.variant.cancel"
						:color="buttonsForms.color.cancel"
						@click="handleCancel"
						:disabled="buttonCancelDisabled"
						:loading="isCanceling || isLoading"
					>
						{{ $t(buttonCancelName) }}
					</v-btn>
					<v-btn
						v-if="buttonOk"
						:variant="buttonsForms.variant.ok"
						:color="buttonsForms.color.ok"
						@click="submit"
						:disabled="buttonOkDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonOkName) }}
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
		@ok="handleClearConfirmOk"
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

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

export default {
	name: 'VtFormDialog',
	components: {
		VConfirmationDialog
	},
	props: {
		...baseFormDialogControlProps
	},
	emits: ['close', 'delete', 'error', 'ok', 'open', 'reset'],
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
			silentErrors,
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
			submit
		} = useBaseFormDialogControlComponent(props, context);

		const {
			buttonsDialog,
			buttonsForms
		} = useButtonComponent(props, context);

		const display = useDisplayComponent();

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
			silentErrors,
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
			submit,
			isFullscreen,
			buttonsDialog,
			buttonsForms
		};
	}
};
</script>

<style scoped>
</style>
