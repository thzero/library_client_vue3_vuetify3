<script>
import { computed, ref } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useVtAdminFormDialogComponent } from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';

// The admin users edit dialog's logic. Only the roles change; the rest is shown
// read-only. options.getRoles() supplies the roles an app knows, as an array or as
// an object whose values are the roles. It was an Options component whose imports
// did not exist, and iterated {} with for...of, which throws.
export function useVtUsersAdminFormDialogComponent(props, context, options) {
	const userRoles = ref([]);

	const admin = useVtAdminFormDialogComponent(props, context, {
		preCompleteSubmitUpdate: async (correlationId, dispatcher, value) => {
			const item = {
				id: value.id,
				roles: userRoles.value,
				updatedTimestamp: value.updatedTimestamp
			};
			return await dispatcher.adminUsers.updateAdminUser(correlationId, item);
		},
		resetDialogI: async (correlationId, value) => {
			userRoles.value = value && value.roles ? [ ...value.roles ] : [];
		},
		...options
	});
	const innerValue = admin.innerValue;

	const id = computed(() => {
		return innerValue.value ? innerValue.value.id : '';
	});
	const externalId = computed(() => {
		return innerValue.value && innerValue.value.external ? innerValue.value.external.id : '';
	});
	const name = computed(() => {
		return innerValue.value && innerValue.value.external ? innerValue.value.external.name : '';
	});
	const roles = computed(() => {
		const known = options && LibraryCommonUtility.isFunction(options.getRoles) ? options.getRoles() : null;
		if (!known)
			return [];
		return Array.isArray(known) ? known.slice(0) : Object.values(known);
	});

	return {
		...admin,
		externalId,
		id,
		name,
		roles,
		userRoles
	};
};
</script>
