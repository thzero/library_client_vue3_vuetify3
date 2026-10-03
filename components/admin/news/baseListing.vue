<script>
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useAdminNewsBaseListingComponent } from '@thzero/library_client_vue3/components/admin/news/baseListing';

// The Vuetify admin news listing, without its template: the app renders a
// v-data-table over news with these headers, VMarkdown for the article, and a
// VtConfirmationDialog for deletes.
export function useVtAdminNewsBaseListingComponent(props, context, options) {
	return useAdminNewsBaseListingComponent(props, context, {
		// Vuetify 3 v-data-table headers: title and key, not text and value
		initializeHeaders: () => {
			return [
				{ title: LibraryClientUtility.$trans.t('news.name'), align: 'start', key: 'title' },
				{ title: LibraryClientUtility.$trans.t('news.article'), align: 'start', sortable: false, key: 'article' },
				{ title: LibraryClientUtility.$trans.t('news.sticky'), align: 'start', key: 'sticky' },
				{ title: LibraryClientUtility.$trans.t('news.requiresAuth'), align: 'start', key: 'requiresAuth' },
				{ title: LibraryClientUtility.$trans.t('news.publishDate'), align: 'start', key: 'timestamp' },
				{ title: LibraryClientUtility.$trans.t('news.statusName'), align: 'start', key: 'status' },
				{ title: LibraryClientUtility.$trans.t('news.actions'), align: 'end', key: 'action', sortable: false }
			];
		},
		...options
	});
};
</script>
