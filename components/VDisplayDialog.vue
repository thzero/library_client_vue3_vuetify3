<template>
	<v-dialog
		v-model="dialogSignal"
		persistent
		:scrollable="scrollableI"
		:max-width="maxWidth"
		@keydown.esc="dialogCancel()"
	>
		<v-card>
			<v-card-title class="headline">
				{{ label }}
			</v-card-title>
			<v-card-text
				:style="scrollableHeightI"
			>
				<slot />

				<!-- eslint-disable vue/no-v-html -->
				<div
					class="markdown-body"
					style="vertical-align: top;"
					v-html="markup"
				/>
				<!--eslint-enable-->
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="primary"
					text
					@click.stop="dialogCancel()"
				>
					{{ $t('buttons.cancel') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { useDisplay } from 'vuetify';

import LibraryClientVuetifyUtility from '@thzero/library_client_vue3_vuetify3/utility/index';

import { useDisplayDialogBaseComponent } from '@thzero/library_client_vue3/components/baseDisplayDialog';
import { baseDisplayDialogBaseProps } from '@thzero/library_client_vue3/components/baseDisplayDialogProps';

export default {
	name: 'VtDisplayDialog',
	props: {
		...baseDisplayDialogBaseProps
	},
	setup(props, context) {
		const useDisplayI = useDisplay();

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
			dialogCancel,
			dialogOk,
			dialogSignal,
			fullscreenInternal,
			markup,
			internalItem,
			serviceMarkup,
			scrollableI,
			scrollableHeightI
		} = useDisplayDialogBaseComponent(props, context, {
			fullscreenInternal: LibraryClientVuetifyUtility.fullscreen(useDisplayI)
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
			dialogCancel,
			dialogOk,
			dialogSignal,
			fullscreenInternal,
			markup,
			internalItem,
			serviceMarkup,
			scrollableI,
			scrollableHeightI
		};
	}
};
</script>
