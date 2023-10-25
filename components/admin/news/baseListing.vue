<script>
import baseListing from '@thzero/library_client_vue3/components/admin/news/baseListing';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'VueBaseAdminNewsListing',
	components: {
		VtConfirmationDialog,
		VMarkdown
	},
	extends: baseListing
};
</script>
