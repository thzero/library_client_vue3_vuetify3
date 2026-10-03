<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		:validation="validation"
		max-width="750px"
		@close="close"
		@ok="ok"
	>
		<v-row dense>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="idRef"
					:model-value="id"
					vid="id"
					:label="$t('forms.id')"
					:readonly="true"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="externalIdRef"
					:model-value="externalId"
					vid="externalId"
					:label="$t('forms.externalId')"
					:readonly="true"
				/>
			</v-col>
		</v-row>

		<VtTextFieldWithValidation
			ref="nameRef"
			:model-value="name"
			vid="name"
			:label="$t('forms.name')"
			:readonly="true"
		/>

		<VtSelectWithValidation
			ref="rolesRef"
			v-model="userRoles"
			vid="userRoles"
			:items="roleItems"
			:multiple="true"
			:label="$t('forms.roles')"
			:validation="validation"
		/>
	</VtFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import { useVtUsersAdminFormDialogComponent } from '@thzero/library_client_vue3_vuetify3/components/admin/users/VtUsersAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

// The admin user edit dialog. The listing calls reset(correlationId, user) through
// its template ref before opening it; roles lists the roles the app knows. It was
// built on VFormDialog, v-layout and v-flex, none of which exist in Vue 3 Vuetify.
export default {
	name: 'EditDialog',
	components: {
		VtFormDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		roles: {
			type: Array,
			default: () => []
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: [ 'cancel', 'ok' ],
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
			innerValue,
			externalId,
			id,
			name,
			roles: roleItems,
			userRoles,
			cancel,
			ok,
			preComplete,
			resetDialog
		} = useVtUsersAdminFormDialogComponent(props, context, {
			getRoles: () => props.roles
		});

		// VtFormDialog closes itself; the parent's signal is reset through cancel
		const close = async () => {
			await cancel();
		};

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
			innerValue,
			externalId,
			id,
			name,
			// not roles: that name is the prop
			roleItems,
			userRoles,
			close,
			ok,
			preComplete,
			// what the listing calls through its template ref
			reset: resetDialog,
			validation: useVuelidate({ $scope: 'AdminUsersEditDialog' })
		};
	},
	validations () {
		return {
			userRoles: { $autoDirty: true }
		};
	}
};
</script>

<style scoped>
</style>
