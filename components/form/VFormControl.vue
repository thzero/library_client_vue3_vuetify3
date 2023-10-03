<template>
	<div>
		<div class="headline text-center text-h6">
			{{ label }}
		</div>
		<div
			v-if="debug"
			class="text-center"
		>
			dirty: {{ dirty }} invalid: {{ invalid }} disabled: {{ disabled }} readonly: {{ readonly }} <br>
			buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
			buttonDeleteDisabled: {{ buttonDeleteDisabled }} buttonOkDisabled: {{ buttonOkDisabled }} <br>
			silentErrors: {{ silentErrors }}
		</div>
		<div>
			<v-form>
				<slot />
				<div
					v-for="(item, index) in serverErrors"
					:key="index"
					class="red--text text--lighten-1 v-messages"
				>
					{{ item }}
				</div>
				<div>
					<slot name="before"/>
				</div>
				<div
					v-if="!autoSave"
					class="mt-4 text-right"
				>
					<div
						v-if="debug"
						class="text-center"
					>
						buttonCancel: {{ buttonCancel }} buttonClear: {{ buttonClear }}
					</div>
					<v-spacer />
					<slot name="buttons_pre"/>
					<v-btn
						v-if="!readonly && buttonCancel"
						:variant="buttonsForms.variant.cancel"
						:color="buttonsForms.color.cancel"
						class="mr-2"
						@click="handleCancel"
						:disabled="buttonCancelDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonCancelName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonDelete"
						:variant="buttonsForms.variant.delete"
						:color="buttonsForms.color.delete"
						class="mr-2"
						@click="handleDelete"
						:disabled="buttonDeleteDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonDeleteName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonClear"
						:variant="buttonsForms.variant.clear"
						:color="buttonsForms.color.clear"
						class="mr-2"
						@click="handleClear"
						:disabled="buttonClearDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonClearName) }}
					</v-btn>
					<v-btn
						v-if="buttonClose"
						:variant="buttonsForms.variant.close"
						:color="buttonsForms.color.close"
						class="mr-2"
						@click="handleClose"
						:disabled="buttonCloseDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonCloseName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonOk"
						:variant="buttonsForms.variant.ok"
						:color="buttonsForms.color.ok"
						@click="submit"
						:disabled="buttonOkDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonOkName) }}
					</v-btn>
					<slot name="buttons_post"/>
				</div>
				<div>
					<slot name="after"/>
				</div>
			</v-form>
		</div>
		<!-- <div
			v-if="!autoSave"
			class="text-right"
		>
			<v-spacer />
			<slot name="buttons_pre"/>
			<v-btn
				v-if="buttonDelete"
				:variant="buttonsForms.variant.delete"
				:color="buttonsForms.color.delete"
				@click="handleDelete"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonDeleteName) }}
			</v-btn>
			<v-btn
				v-if="buttonClear"
				:variant="buttonsForms.variant.clear"
				:color="buttonsForms.color.clear"
				@click="handleClear"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonClearName) }}
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
			<slot name="buttons_post"/>
		</div>
		<div>
			<slot name="after"/>
		</div> -->
		<v-overlay
			absolute
			:value="overlayLoading"
		>
			<v-card
				color="primary"
				dark
			>
				<v-card-text>
					Saving...
					<v-progress-linear
						indeterminate
						color="white"
						class="mb-0"
					></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-overlay>
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
			v-if="buttonClose"
			:message="messageClose"
			:signal="dialogCloseConfirmSignal.signal"
			@cancel="dialogCloseConfirmSignal.cancel()"
			@ok="handleCloseConfirmOk"
		/>
		<VConfirmationDialog
			v-if="buttonDelete"
			:signal="dialogDeleteConfirmSignal.signal"
			@cancel="dialogDeleteConfirmSignal.cancel()"
			@ok="handleDeleteConfirmOk"
		/>
	</div>
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
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

import { useBaseFormControlComponent } from '@thzero/library_client_vue3/components/form/baseFormControl';
import { baseFormControlProps } from '@thzero/library_client_vue3/components/form/baseFormControlProps';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

export default {
	name: 'VtFormControl',
	components: {
		VConfirmationDialog
	},
	props: {
		...baseFormControlProps
	},
	emits: ['cancel', 'delete', 'ok', 'reset'],
	setup(props, context) {
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
			dialogCancelConfirmSignal,
			dialogClearConfirmSignal,
			dialogCloseConfirmSignal,
			dialogDeleteConfirmSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			messageClose,
			silentErrors,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonCloseDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isClosing,
			isDeleting,
			isLoading,
			overlayLoading,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleClose,
			handleCloseConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			submit
		} = useBaseFormControlComponent(props, context);

		const {
			buttonsDialog,
			buttonsForms
		} = useButtonComponent(props, context);

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
			dialogCancelConfirmSignal,
			dialogClearConfirmSignal,
			dialogCloseConfirmSignal,
			dialogDeleteConfirmSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			messageClose,
			silentErrors,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonCloseDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isClosing,
			isDeleting,
			isLoading,
			overlayLoading,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleClose,
			handleCloseConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			submit,
			buttonsDialog,
			buttonsForms
		};
	},
}
</script>

<style scoped>
</style>
