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
	<VtConfirmationDialog
		v-if="buttonCancel"
		:message="messageCancel"
		:signal="dialogCancelConfirmSignal.signal"
		@cancel="dialogCancelConfirmSignal.cancel()"
		@ok="handleCancelConfirmOk"
	/>
	<VtConfirmationDialog
		v-if="buttonClear"
		:message="messageClear"
		:signal="dialogClearConfirmSignal.signal"
		@cancel="dialogClearConfirmSignal.cancel()"
		@ok="handleClearConfirmOk"
	/>
	<VtConfirmationDialog
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

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

import { useBaseFormDialogControlComponent } from '@thzero/library_client_vue3/components/form/baseFormDialogControl';
import { baseFormDialogControlProps } from '@thzero/library_client_vue3/components/form/baseFormDialogControlProps';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

export default {
	name: 'VtFormDialog',
	components: {
		VtConfirmationDialog
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

<!-- <script>
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import VFormDialog from '../form/VFormDialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

export default {
	name: 'VtAdminFormDialog',
	components: {
		VFormDialog
	},
	extends: VFormDialog,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		dateFormat: DEFAULT_DATE_FORMAT,
		dateTimeFormat: DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT,
		editorOptions: {
			hideModeSwitch: true
		},
		randomKey: -1,
		innerValue: {},
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		outputType() {
			return 'timestamp';
		}
	},
	created() {
		this.serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
		this.initializeServices();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		cleanup(correlationId, value, isCreate) {
			delete value.timestamp;
			if (isCreate)
				delete value.updatedTimestamp;

			if (value.description) {
				value.description = value.description.replace(/’/g, '\'');
				value.description = value.description.replace(/“/g, '"');
				value.description = value.description.replace(/”/g, '"');
				value.description = value.description.replace(/–/g, '-');
			}
			if (value.name) {
				value.name = value.name.replace(/’/g, '\'');
				value.name = value.name.replace(/“/g, '"');
				value.name = value.name.replace(/”/g, '"');
				value.name = value.name.replace(/–/g, '-');
			}
		},
		initializeServices() {
		},
		// eslint-disable-next-line
		async ok() {
			this.$emit('ok');
			return true;
		},
		async preComplete(correlationId) {
			const value = this.innerValue;
			delete value._id;
			value.gameSystemId = this.gameSystemId;
			this.preCompleteI(correlationId, value);
			const isUpdate = this.innerValue.id ? true : false;
			this.cleanup(correlationId, value, !isUpdate);
			const response = isUpdate ?
				await this.preCompleteSubmitUpdate(correlationId, this.serviceStore.dispatcher, value) :
				await this.preCompleteSubmitCreate(correlationId, this.serviceStore.dispatcher, value);
			this.logger.debug('VtAdminFormDialog', 'preComplete', 'response', response, correlationId);
			return response;
		},
		// eslint-disable-next-line
		preCompleteI(correlationId, value) {
		},
		// eslint-disable-next-line
		async preCompleteSubmitCreate(correlationId, dispatcher, value) {
			throw new NotImplementedError();
		},
		// eslint-disable-next-line
		async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
			throw new NotImplementedError();
		},
		async resetDialog(correlationId, value) {
			// forces random key gen so that the editor gets reset for each new item
			this.randomKey = LIbraryCommonUtility.randomKeyGen();
			if (value) {
				const temp = this.clone(value);
				temp.timestamp = temp.timestamp ? LibraryMomentUtility.convertTimestampToLocal(temp.timestamp).valueOf() : LibraryMomentUtility.getTimestampLocal().valueOf();
				temp.updatedTimestamp = temp.updatedTimestamp ? temp.updatedTimestamp : LibraryMomentUtility.getTimestamp();
				this.gameSystemId = temp.gameSystemId;
				await this.resetDialogI(correlationId, temp);
				this.innerValue = temp;
				return;
			}

			this.innerValue = null;
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId, value) {
		}
	}
};
</script> -->
