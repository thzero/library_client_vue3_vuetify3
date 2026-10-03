<script>
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useAdminUsersBaseListingComponent } from '@thzero/library_client_vue3/components/admin/users/baseListing';

// The Vuetify admin users listing, without its template: the app renders a
// v-data-table over users with these headers, EditDialog for edits, and a
// VtConfirmationDialog for deletes.
export function useVtAdminUsersBaseListingComponent(props, context, options) {
	return useAdminUsersBaseListingComponent(props, context, {
		// Vuetify 3 v-data-table headers: title and key, not text and value
		initializeHeaders: () => {
			return [
				{ title: LibraryClientUtility.$trans.t('users.name'), align: 'start', key: 'external.name' },
				{ title: LibraryClientUtility.$trans.t('users.id'), align: 'start', key: 'external.id' },
				{ title: LibraryClientUtility.$trans.t('users.externalId'), align: 'start', key: 'external.externalId' },
				{ title: LibraryClientUtility.$trans.t('users.roles'), align: 'start', key: 'roles' },
				{ title: LibraryClientUtility.$trans.t('users.actions'), align: 'end', key: 'action', sortable: false }
			];
		},
		...options
	});
};
</script>
