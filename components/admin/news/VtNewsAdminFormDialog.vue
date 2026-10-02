<script>
import { useVtAdminFormDialogComponent } from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';

// The admin news edit dialog's logic, without its template: the app renders a
// VtFormDialog with :pre-complete-ok="preComplete" and binds its fields to innerValue.
// It was an Options component whose imports did not exist, so it never loaded.
//
// updatedTimestamp stays on an update: the server's _checkUpdatedTimestamp rejects
// an update without it. The base removes it on a create.
export function useVtNewsAdminFormDialogComponent(props, context, options) {
	return useVtAdminFormDialogComponent(props, context, {
		preCompleteSubmitCreate: async (correlationId, dispatcher, value) => {
			return await dispatcher.adminNews.createAdminNews(correlationId, value);
		},
		preCompleteSubmitUpdate: async (correlationId, dispatcher, value) => {
			return await dispatcher.adminNews.updateAdminNews(correlationId, value);
		},
		...options
	});
};
</script>
