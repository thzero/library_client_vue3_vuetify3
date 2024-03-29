<script>
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import VFormDialog from '../form/VFormDialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

export default {
	name: 'VtAdminFormDialog',
	components: {
		VFormDialog
	},
	extends: VFormDialog,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		dateFormat: DEFAULT_DATE_FORMAT,
		dateTimeFormat: DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT,
		editorOptions: {
			hideModeSwitch: true
		},
		randomKey: -1,
		innerValue: {},
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		outputType() {
			return 'timestamp';
		}
	},
	created() {
		this.serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
		this.initializeServices();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		cleanup(correlationId, value, isCreate) {
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
		},
		initializeServices() {
		},
		// eslint-disable-next-line
		async ok() {
			this.$emit('ok');
			return true;
		},
		async preComplete(correlationId) {
			const value = this.innerValue;
			delete value._id;
			value.gameSystemId = this.gameSystemId;
			this.preCompleteI(correlationId, value);
			const isUpdate = this.innerValue.id ? true : false;
			this.cleanup(correlationId, value, !isUpdate);
			const response = isUpdate ?
				await this.preCompleteSubmitUpdate(correlationId, this.serviceStore.dispatcher, value) :
				await this.preCompleteSubmitCreate(correlationId, this.serviceStore.dispatcher, value);
			this.logger.debug('VtAdminFormDialog', 'preComplete', 'response', response, correlationId);
			return response;
		},
		// eslint-disable-next-line
		preCompleteI(correlationId, value) {
		},
		// eslint-disable-next-line
		async preCompleteSubmitCreate(correlationId, dispatcher, value) {
			throw new NotImplementedError();
		},
		// eslint-disable-next-line
		async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
			throw new NotImplementedError();
		},
		async resetDialog(correlationId, value) {
			// forces random key gen so that the editor gets reset for each new item
			this.randomKey = LIbraryCommonUtility.randomKeyGen();
			if (value) {
				const temp = this.clone(value);
				temp.timestamp = temp.timestamp ? LibraryMomentUtility.convertTimestampToLocal(temp.timestamp).valueOf() : LibraryMomentUtility.getTimestampLocal().valueOf();
				temp.updatedTimestamp = temp.updatedTimestamp ? temp.updatedTimestamp : LibraryMomentUtility.getTimestamp();
				this.gameSystemId = temp.gameSystemId;
				await this.resetDialogI(correlationId, temp);
				this.innerValue = temp;
				return;
			}

			this.innerValue = null;
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId, value) {
		}
	}
};
</script>
