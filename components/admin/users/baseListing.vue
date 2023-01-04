<script>
import baseListing from '@thzero/library_client_vue3/components/admin/users/baseListing';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'VueBaseAdminUsersListing',
	components: {
		VConfirmationDialog,
		VMarkdown
	},
	extends: baseListing
};
</script>
