<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import VAdminFormDialog from '@thzero/library_client_vue3_vuetify3/components/admin/VAdminFormDialog';
import VCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VCheckboxWithValidation';
import VDateTimeFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VDateTimeFieldWithValidation';
import VMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdownEditor';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'VNewsAdminFormDialog',
	components: {
		VAdminFormDialog,
		VCheckboxWithValidation,
		VDateTimeFieldWithValidation,
		VMarkdownEditor,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	created() {
		this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
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
