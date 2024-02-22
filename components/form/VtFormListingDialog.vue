<template>
	<div>
		<v-dialog
			v-model="dialogSignal"
			persistent
			:fullscreen="isFullscreen"
		>
			<v-card
				:style="!isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			>
				<div
					v-if="debug"
					class="text-center"
				>
					isFullscreen: {{ isFullscreen }} maxWidth: {{ maxWidth }} width: {{ width }} style {{ !isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {} }} <br>
					dirty: {{ dirty }} invalid: {{ invalid }} <br>
					buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
					buttonOkDisabled: {{ buttonOkDisabled }} <br>
					silentErrors: {{ silentErrors }}
				</div>
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
			<!-- </v-card>
			<v-card
				class="mt-4"
				:style="!isFullscreen ? { maxWidth: maxWidth, width: width, margin: 'auto', } : {}"
			> -->
				<v-card-text style="overflow-y: auto;" class="scroll">
					<slot name="listing"/>
				</v-card-text>

				<v-card-actions align="right">
					<v-spacer />
					<slot name="preActions" :buttonClearDisabled="buttonClearDisabled" :buttonOkDisabled="buttonOkDisabled" :dirty="dirty" :invalid="invalid" :isLoading="isLoading" />
					<v-btn
						:variant="buttonsForms.variant.cancel"
						:color="buttonsForms.color.cancel"
						@click="handleCancel"
					>
						{{ $t(buttonCloseName) }}
					</v-btn>
					<slot name="postActions" :buttonClearDisabled="buttonClearDisabled" :buttonOkDisabled="buttonOkDisabled" :dirty="dirty" :invalid="invalid" :isLoading="isLoading" />
				</v-card-actions>
			</v-card>
		</v-dialog>
		<VtConfirmationDialog
			v-if="buttonClear"
			:message="messageClear"
			:signal="dialogClearConfirmSignal.signal"
			@cancel="dialogClearConfirmSignal.cancel()"
			@ok="handleClearConfirmOk"
		/>
		<VtConfirmationDialog
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

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

import { useBaseFormDialogControlComponent } from '@thzero/library_client_vue3/components/form/baseFormDialogControl';
import { baseFormDialogControlProps } from '@thzero/library_client_vue3/components/form/baseFormDialogControlProps';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

export default {
	name: 'VtFormListingDialog',
	components: {
		VtConfirmationDialog
	},
	props: {
		...baseFormDialogControlProps
	},
	emits: ['close', 'error', 'ok', 'open'],
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
			innerValue,
			innerValueOrig,
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
		} = useBaseFormDialogControlComponent(props, context, {
			notifySaved: false,
			resetOnSubmit: false,
			signalOnSubmit: false
		});

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
			innerValue,
			innerValueOrig,
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
			buttonsDialog,
			buttonsForms,
			isFullscreen
		};
	}
};
</script>

<style scoped>
</style>
