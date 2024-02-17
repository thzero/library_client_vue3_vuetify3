<script>
import { ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useButtonComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse
	} = useBaseComponent(props, context, options);

	const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);

    let components = serviceConfig.get('components');
    components = components ?? {
        dialogs: null,
        forms: null
    };
    components.dialogs = components.dialogs ?? { color: {}, variant: {} };
    components.forms = components.forms ?? { color: {}, variant: {} };
    const defaultDialog = {
        color: {
            default: 'primary lighten-1',
            add: 'primary lighten-1',
            cancel: 'secondary lighten-1',
            clear: 'secondary lighten-1',
            close: 'primary lighten-1',
            copy: 'primary lighten-1',
            delete: 'error lighten-1',
            edit: 'primary lighten-1',
            filter: 'primary lighten-1',
            error: 'error lighten-1',
            ok: 'green darken-1'
        },
        variant: {
            default: 'flat',
            add: 'flat',
            cancel: 'flat',
            clear: 'flat',
            close: 'flat',
            copy: 'flat',
            delete: 'flat',
            edit: 'flat',
            error: 'flat',
            filter: 'flat',
            ok: 'flat',
        }
    };
    // components.dialogs = Object.assign(components.dialogs, defaultDialog);
    components.dialogs = LibraryCommonUtility.merge2(defaultDialog, components.dialogs);

    const defaultForms = {
        color: {
            default: 'primary',
            add: 'green-lighten-1',
            cancel: 'secondary',
            clear: 'secondary ',
            close: 'primary',
            copy: 'primary',
            delete: 'error',
            edit: 'primary',
            error: 'error',
            filter: 'primary',
            ok: 'primary'
        },
        variant: {
            default: 'flat',
            add: 'flat',
            cancel: 'flat',
            clear: 'flat',
            close: 'flat',
            copy: 'flat',
            delete: 'flat',
            edit: 'flat',
            error: 'flat',
            filter: 'flat',
            ok: 'flat',
        }
    };
    // components.forms = Object.assign(components.forms, defaultForms);
    components.forms = LibraryCommonUtility.merge2(defaultForms, components.forms);

	const buttonsDialog = ref(components.dialogs);
	const buttonsForms = ref(components.forms);

	return {
		buttonsDialog,
        buttonsForms
	};
};
</script>
