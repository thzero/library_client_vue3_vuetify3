<template>
	<div>
		<v-card>
			<div
				v-if="debug"
				class="text-center"
			>
				dirty: {{ dirty }} invalid: {{ invalid }} <br>
				buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
				buttonOkDisabled: {{ buttonOkDisabled }} <br>
				silentErrors: {{ silentErrors }}
			</div>
			<v-card-item>
				<div
					v-if="visibleFilters"
				>
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
				</div>
			</v-card-item>
		</v-card>
		<v-card
			class="mt-4"
		>
			<v-card-text 
				v-if="visibleListing"
			>
				<slot name="listing"/>
			</v-card-text>
		</v-card>
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
import { ref } from 'vue';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

import { useBaseFormListingControlComponent } from '@thzero/library_client_vue3/components/form/baseFormListingControl';
import { baseFormListingControlProps } from '@thzero/library_client_vue3/components/form/baseFormListingControlProps';

export default {
	name: 'VtFormListing',
	components: {
		VConfirmationDialog
	},
	props: {
		...baseFormListingControlProps
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
			dialogCancelConfirmSignal,
			dialogClearConfirmSignal,
			dialogDeleteConfirmSignal,
			dirty,
			invalid,
			silentErrors,
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
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			submit,
		} = useBaseFormListingControlComponent(props, context, {
			resetOnSubmit: false,
			signalOnSubmit: false
		});

		const internalItem = ref(null);

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
			silentErrors,
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
			handleCancel,
			handleCancelConfirmOk,
			handleClear,
			handleClearConfirmOk,
			handleDelete,
			handleDeleteConfirmOk,
			reset,
			submit,
			internalItem
		};
	}
};
</script>

<style scoped>
</style>
