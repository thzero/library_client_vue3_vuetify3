<template>
	<v-dialog
		v-model="dialogSignal"
		persistent
		max-width="500px"
		@keydown.esc="dialogCancel()"
	>
		<v-card>
			<v-card-title class="headline">
				{{ $attrs.label }}
			</v-card-title>
			<v-card-text>
				<div v-if="messageRaw" v-html="internalMessage"></div>
				<div v v-if="!messageRaw">{{ internalMessage }}</div>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="primary"
					text
					@click.stop="dialogCancel()"
				>
					{{ $t('buttons.cancel') }}
				</v-btn>
				<v-btn
					color="primary"
					text
					:disabled="buttonOkDisabled"
					@click.stop="dialogOk()"
				>
					{{ $t('buttons.ok') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { computed } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseConfirmationDialogComponent } from '@thzero/library_client_vue3/components/baseConfirmationDialogComponent';
import { baseConfirmationDialogProps } from '@thzero/library_client_vue3/components/baseConfirmationDialogProps';

export default {
	name: 'VtConfirmationDialog',
	props: {
		...baseConfirmationDialogProps
	},
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
			buttonOkDisabled,
			dialogCancel,
			dialogOk,
			dialogSignal,
			handleError,
			internalItem,
			invalid
		} = useBaseConfirmationDialogComponent(props, context);

		const internalMessage = computed(() => {
			return props.message ? props.message : props.nonRecoverable ? LibraryClientUtility.$trans.t('questions.areYouSureNonRecoverable') : LibraryClientUtility.$trans.t('questions.areYouSure')
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
			buttonOkDisabled,
			dialogCancel,
			dialogOk,
			dialogSignal,
			handleError,
			internalItem,
			internalMessage,
			invalid
		};
	}
};
</script>
