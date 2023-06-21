<template>
	<div>
		<div class="headline text-center text-h6">
			{{ label }}
		</div>
		<div class="text-center">
			dirty: {{ dirty }} invalid: {{ invalid }} disabled: {{ disabled }} <br>
			buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
			buttonDeleteDisabled: {{ buttonDeleteDisabled }} buttonOkDisabled: {{ buttonOkDisabled }}
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
					<v-spacer />
					<slot name="buttons_pre"/>
					<v-btn
						v-if="!readonly && buttonCancel"
						class="mr-2"
						text
						@click="handleCancel"
						color="primary lighten-1"
						:disabled="buttonCancelDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonCancelName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonDelete"
						class="mr-2"
						color="primary lighten-1"
						text
						@click="handleDelete"
						:disabled="buttonDeleteDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonDeleteName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonClear"
						class="mr-2"
						color="primary lighten-1"
						text
						@click="handleClear"
						:disabled="buttonClearDisabled"
						:loading="isLoading"
					>
						{{ $t(buttonClearName) }}
					</v-btn>
					<v-btn
						v-if="!readonly && buttonOk"
						color="green darken-1"
						text
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
				color="primary lighten-1"
				text
				@click="handleDelete"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonDeleteName) }}
			</v-btn>
			<v-btn
				v-if="buttonClear"
				color="primary lighten-1"
				text
				@click="handleClear"
				class="mr-2"
				:loading="isLoading"
			>
				{{ $t(buttonClearName) }}
			</v-btn>
			<v-btn
				v-if="buttonOk"
				:disabled="buttonOkDisabled"
				color="green darken-1"
				text
				@click="submit"
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
			dialogDeleteConfirmSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isDeleting,
			isLoading,
			overlayLoading,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			resetForm,
			submit
		} = useBaseFormControlComponent(props, context);

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
			dialogDeleteConfirmSignal,
			dirty,
			invalid,
			messageCancel,
			messageClear,
			buttonCancelDisabled,
			buttonClearDisabled,
			buttonDeleteDisabled,
			buttonOkDisabled,
			isCancelling,
			isClearing,
			isDeleting,
			isLoading,
			overlayLoading,
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			resetForm,
			submit
		};
	},
}
</script>

<style scoped>
</style>
