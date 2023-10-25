<script>
import LibraryClientUtility from '@thzero/library_client/utility/index';

import VtAdminFormDialog from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'VtUsersAdminFormDialog',
	components: {
		VtAdminFormDialog,
		VSelectWithValidation,
		VtTextFieldWithValidation
	},
	extends: VtAdminFormDialog,
	computed: {
		id() {
			return this.innerValue ? this.innerValue.id : '';
		},
		externalId() {
			return this.innerValue && this.innerValue.external ? this.innerValue.external.id : '';
		},
		name() {
			return this.innerValue && this.innerValue.external ? this.innerValue.external.name : '';
		},
		roles() {
			const roles = [];
			for (const prop of this.getRoles())
				roles.push(prop);
			return roles;
		}
	},
	methods: {
		getRoles() {
			return {};
		},
		async preComplete(correlationId) {
			const item = {
				id: this.innerValue.id,
				roles: this.innerValue.roles,
				updatedTimestamp: this.innerValue.updatedTimestamp
			};
			const response = await LibraryClientUtility.$store.dispatcher.adminUsers.updateAdminUser(correlationId, item);
			this.logger.debug('VtUsersAdminFormDialog', 'preComplete', 'response', response, correlationId);
			return response;
		}
	}
};
</script>
