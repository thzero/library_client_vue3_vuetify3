<script>
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import VtAdminFormDialog from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';
import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtDateTimePickerFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtDatetimePickerFieldWithValidationTemp';
import VMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdownEditor';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'VtNewsAdminFormDialog',
	components: {
		VtAdminFormDialog,
		VtCheckboxWithValidation,
		VtDateTimePickerFieldWithValidation,
		VMarkdownEditor,
		VSelectWithValidation,
		VtTextFieldWithValidation
	},
	extends: VtAdminFormDialog,
	created() {
		this.serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	},
	methods: {
		async preComplete(correlationId) {
			delete this.innerValue.updatedTimestamp;
			let response;
			if (this.innerValue.id)
				response = await this.serviceStore.dispatcher.adminNews.updateAdminNews(correlationId, this.innerValue);
			else
				response = await this.serviceStore.dispatcher.adminNews.createAdminNews(correlationId, this.innerValue);
			this.logger.debug('VNewsAdminFormDialog', 'preComplete', 'response', response, correlationId);
			return response;
		}
	}
};
</script>
