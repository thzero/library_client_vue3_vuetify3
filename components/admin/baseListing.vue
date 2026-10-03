<script>
import { useAdminBaseListingComponent } from '@thzero/library_client_vue3/components/admin/baseListing';

// The Vuetify admin listing, without its template: the app's listing renders a
// v-data-table with these headers and a VtConfirmationDialog for deletes. It was an
// Options component extending a module with no default export, so it never mounted.
export function useVtAdminBaseListingComponent(props, context, options) {
	return useAdminBaseListingComponent(props, context, options);
};
</script>
