<template>
	<div>
		<v-navigation-drawer
			v-if="filterDrawer"
			v-model="toggleDrawer"
			temporary
			:style="$vuetify.display.xs ? 'width: 100%;' : 'min-width: 450px;'"
		>
			<!-- <v-list
				density="compact"
				nav
				>
				<v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
				<v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
			</v-list> -->
			<div>
				<v-form>
					<slot :buttonClearDisabled="buttonClearDisabled" :buttonOkDisabled="buttonOkDisabled" :dirty="dirty" :filterDrawer="filterDrawer" :invalid="invalid" :isLoading="isLoading" :reset="reset" :submit="submit" />
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
		</v-navigation-drawer>
		<v-card>
			<div
				class="text-center"
			>
				dirty: {{ dirty }} invalid: {{ invalid }} <br>
				buttonCancelDisabled: {{ buttonCancelDisabled }} buttonClearDisabled: {{ buttonClearDisabled }} <br>
				buttonOkDisabled: {{ buttonOkDisabled }} <br>
				silentErrors: {{ silentErrors }}
				filterDrawer: {{ filterDrawer }} toggleDrawer: {{ toggleDrawer }}
			</div>
			<v-card-item>
				<div
					v-if="visibleFilters && !filterDrawer"
				>
					<v-form>
						<slot :buttonClearDisabled="buttonClearDisabled" :buttonOkDisabled="buttonOkDisabled" :dirty="dirty" :filterDrawer="filterDrawer" :invalid="invalid" :isLoading="isLoading" :submit="submit" :reset="reset" />
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
				<div
					v-if="visibleFilters"
					class="text-right"
				>
					<span
						class="mr-2"
					>
						<slot name="preActions" :dirty="dirty" :filterDrawer="filterDrawer" :invalid="invalid" :isLoading="isLoading" />
					</span>
					<v-btn
						v-if="filterDrawer"
						:color="buttonsForms.color.filter"
						:disabled="toggleDrawer"
						@click="handleFilter"
					>
						{{ $t('buttons.filter') }}
					</v-btn>
					<span
						class="mr-2"
					>
						<slot name="postActions" :dirty="dirty" :filterDrawer="filterDrawer" :invalid="invalid" :isLoading="isLoading" />
					</span>
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

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

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
			isSearching,
			messageCancel,
			messageClear,
			silentErrors,
			toggleDrawer,
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
			handleFilter,
			reset,
			submit
		} = useBaseFormListingControlComponent(props, context, {
			resetOnSubmit: false,
			signalOnSubmit: false
		});

		const {
			buttonsDialog,
			buttonsForms
		} = useButtonComponent(props, context);

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
			isSearching,
			messageCancel,
			messageClear,
			silentErrors,
			toggleDrawer,
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
			handleFilter,
			reset,
			submit,
			buttonsDialog,
			buttonsForms,
			internalItem
		};
	}
};
</script>

<style scoped>
</style>
