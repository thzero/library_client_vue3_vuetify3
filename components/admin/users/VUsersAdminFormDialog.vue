<script>
import LibraryClientUtility from '@thzero/library_client/utility/index';

import VAdminFormDialog from '@thzero/library_client_vue3_vuetify3/components/admin/VAdminFormDialog';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'VUsersAdminFormDialog',
	components: {
		VAdminFormDialog,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
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
			this.logger.debug('VUsersAdminFormDialog', 'preComplete', 'response', response, correlationId);
			return response;
		}
	}
};
</script>
