<script>
import baseListing from '@thzero/library_client_vue3/components/admin/baseListing';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

export default {
	name: 'VueBaseAdminList',
	components: {
		VConfirmationDialog
	},
	extends: baseListing,
};
</script>
