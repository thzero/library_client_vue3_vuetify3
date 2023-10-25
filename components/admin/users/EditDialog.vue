<template>
	<VFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<v-layout>
			<v-flex xs6>
				<VtTextFieldWithValidation
					ref="idRef"
					v-model="id"
					vid="id"
					:label="$t('forms.id')"
					:readonly="true"
				/>
			</v-flex>
			<v-flex xs6>
				<VtTextFieldWithValidation
					ref="externalIdRef"
					v-model="externalId"
					vid="externalId"
					:label="$t('forms.externalId')"
					:readonly="true"
				/>
			</v-flex>
		</v-layout>

		<VtTextFieldWithValidation
			ref="nameRef"
			v-model="name"
			vid="name"
			:label="$t('forms.name')"
			:readonly="true"
		/>

		<VSelectWithValidation
			ref="rolesRef"
			v-model="innerValue.roles"
			vid="roles"
			:items="roles"
			:multiple="true"
			:label="$t('forms.roles')"
		/>
	</VFormDialog>
</template>

<script>
import VtUsersAdminFormDialog from '@thzero/library_client_vue3_vuetify3/components/admin/users/VtUsersAdminFormDialog';

export default {
	name: 'AdminUsersEditDialog',
	extends: VtUsersAdminFormDialog
};
</script>

<style scoped>
</style>
