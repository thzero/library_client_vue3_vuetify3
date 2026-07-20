<script>
import { computed, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

// Composition-API port of the former VtAdminFormDialog (which extended VFormDialog in Vue2).
// Consumers now render <VtFormDialog :pre-complete-ok="preComplete"> and use this composable in
// setup() for the admin business logic (innerValue, gameSystemId, preComplete, resetDialog).
// Per-domain create/update/reset hooks are supplied via options callbacks:
//   options.preCompleteI(correlationId, value)
//   options.preCompleteSubmitCreate(correlationId, dispatcher, value)
//   options.preCompleteSubmitUpdate(correlationId, dispatcher, value)
//   options.resetDialogI(correlationId, value)
export function useVtAdminFormDialogComponent(props, context, options) {
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

	const dateFormat = ref(DEFAULT_DATE_FORMAT);
	const dateTimeFormat = ref(DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT);
	const timeFormat = ref(DEFAULT_TIME_FORMAT);
	const editorOptions = ref({
		hideModeSwitch: true
	});
	const randomKey = ref(-1);
	const innerValue = ref({});
	const gameSystemId = ref(null);

	const outputType = computed(() => {
		return 'timestamp';
	});

	const cancel = async () => {
		context.emit('cancel');
	};
	const ok = async () => {
		context.emit('ok');
		return true;
	};
	const cleanup = (correlationIdI, value, isCreate) => {
		delete value.timestamp;
		if (isCreate)
			delete value.updatedTimestamp;

		if (value.description) {
			value.description = value.description.replace(/’/g, '\'');
			value.description = value.description.replace(/“/g, '"');
			value.description = value.description.replace(/”/g, '"');
			value.description = value.description.replace(/–/g, '-');
		}
		if (value.name) {
			value.name = value.name.replace(/’/g, '\'');
			value.name = value.name.replace(/“/g, '"');
			value.name = value.name.replace(/”/g, '"');
			value.name = value.name.replace(/–/g, '-');
		}
	};
	const preCompleteI = (correlationIdI, value) => {
		if (options && LibraryCommonUtility.isFunction(options.preCompleteI))
			return options.preCompleteI(correlationIdI, value);
	};
	const preCompleteSubmitCreate = async (correlationIdI, dispatcher, value) => {
		if (options && LibraryCommonUtility.isFunction(options.preCompleteSubmitCreate))
			return await options.preCompleteSubmitCreate(correlationIdI, dispatcher, value);
		notImplementedError();
	};
	const preCompleteSubmitUpdate = async (correlationIdI, dispatcher, value) => {
		if (options && LibraryCommonUtility.isFunction(options.preCompleteSubmitUpdate))
			return await options.preCompleteSubmitUpdate(correlationIdI, dispatcher, value);
		notImplementedError();
	};
	const preComplete = async (correlationIdI) => {
		const value = innerValue.value;
		delete value._id;
		value.gameSystemId = gameSystemId.value;
		preCompleteI(correlationIdI, value);
		const isUpdate = innerValue.value.id ? true : false;
		cleanup(correlationIdI, value, !isUpdate);
		const response = isUpdate ?
			await preCompleteSubmitUpdate(correlationIdI, LibraryClientUtility.$store.dispatcher, value) :
			await preCompleteSubmitCreate(correlationIdI, LibraryClientUtility.$store.dispatcher, value);
		logger.debug('useVtAdminFormDialogComponent', 'preComplete', 'response', response, correlationIdI);
		return response;
	};
	const resetDialogI = async (correlationIdI, value) => {
		if (options && LibraryCommonUtility.isFunction(options.resetDialogI))
			return await options.resetDialogI(correlationIdI, value);
	};
	const resetDialog = async (correlationIdI, value) => {
		// forces random key gen so that the editor gets reset for each new item
		randomKey.value = LibraryCommonUtility.randomKeyGen();
		if (value) {
			const temp = LibraryCommonUtility.cloneDeep(value);
			temp.timestamp = temp.timestamp ? LibraryMomentUtility.convertTimestampToLocal(temp.timestamp).valueOf() : LibraryMomentUtility.getTimestampLocal().valueOf();
			temp.updatedTimestamp = temp.updatedTimestamp ? temp.updatedTimestamp : LibraryMomentUtility.getTimestamp();
			gameSystemId.value = temp.gameSystemId;
			await resetDialogI(correlationIdI, temp);
			innerValue.value = temp;
			return;
		}

		innerValue.value = null;
	};

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		dateFormat,
		dateTimeFormat,
		timeFormat,
		editorOptions,
		randomKey,
		innerValue,
		gameSystemId,
		outputType,
		cancel,
		ok,
		cleanup,
		preComplete,
		preCompleteI,
		preCompleteSubmitCreate,
		preCompleteSubmitUpdate,
		resetDialog,
		resetDialogI
	};
};
</script>
