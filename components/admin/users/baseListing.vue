<script>
import baseListing from '@thzero/library_client_vue3/components/admin/users/baseListing';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'VueBaseAdminUsersListing',
	components: {
		VConfirmationDialog,
		VMarkdown
	},
	extends: baseListing
};
</script>
