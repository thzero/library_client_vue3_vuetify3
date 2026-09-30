<template>
	<v-dialog
		v-model="display"
		:width="dialogWidth"
	>
		<template #activator="{ props: activatorProps }">
			<v-text-field
				v-bind="mergeProps(activatorProps, $attrs, textFieldProps ?? {})"
				:disabled="disabled"
				:loading="loading"
				:label="label"
				:model-value="formattedDateTime"
				readonly
			/>
		</template>

		<v-card>
			<v-card-text class="px-0 py-0">
				<v-tabs
					v-model="activeTab"
					grow
				>
					<v-tab value="calendar">
						<slot name="dateIcon">
							<v-icon>mdi-calendar</v-icon>
						</slot>
					</v-tab>
					<v-tab
						value="timer"
						:disabled="!date"
					>
						<slot name="timeIcon">
							<v-icon>mdi-clock-outline</v-icon>
						</slot>
					</v-tab>
				</v-tabs>
				<v-window v-model="activeTab">
					<v-window-item value="calendar">
						<v-date-picker
							v-model="date"
							v-bind="datePickerProps ?? {}"
							width="100%"
							@update:model-value="showTimePicker"
						/>
					</v-window-item>
					<v-window-item value="timer">
						<!-- a native time input: v-time-picker is not in core Vuetify for every 3.x release -->
						<v-text-field
							v-model="time"
							v-bind="timePickerProps ?? {}"
							class="pa-4"
							type="time"
							hide-details
						/>
					</v-window-item>
				</v-window>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<slot
					name="actions"
					:cancel="cancelHandler"
					:clear="clearHandler"
					:ok="okHandler"
				>
					<v-btn
						color="primary"
						variant="text"
						@click="clearHandler"
					>
						{{ clearText }}
					</v-btn>
					<v-btn
						color="primary"
						variant="text"
						@click="cancelHandler"
					>
						{{ cancelText }}
					</v-btn>
					<v-btn
						color="green-darken-1"
						variant="text"
						@click="okHandler"
					>
						{{ okText }}
					</v-btn>
				</slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { computed, mergeProps, ref, watch } from 'vue';

const DEFAULT_CANCEL_TEXT = 'CANCEL';
const DEFAULT_CLEAR_TEXT = 'CLEAR';
const DEFAULT_DIALOG_WIDTH = 340;
const DEFAULT_OK_TEXT = 'OK';
const DEFAULT_TIME = '00:00';
const OUTPUT_TYPE_DATE = 'date';
const OUTPUT_TYPE_TIMESTAMP = 'timestamp';

const pad = (n) => String(n).padStart(2, '0');

// The date library is supplied by the component that wraps this one
// (VtDateTimePickerField for dayjs, VtDateTimePickerFieldFns for date-fns) as
// an adapter:
//   dateFormat, timeFormat    default display patterns in that library's syntax
//   format(date, pattern)     Date -> string
//   parse(value, pattern)     string -> Date (an invalid Date when it cannot)
export default {
	name: 'VtDateTimePickerBase',
	// attributes (error, messages, density, hint...) go to the text field, not the dialog
	inheritAttrs: false,
	props: {
		adapter: {
			type: Object,
			required: true
		},
		cancelText: {
			type: String,
			default: DEFAULT_CANCEL_TEXT
		},
		change: {
			type: Function,
			default: () => {}
		},
		clearText: {
			type: String,
			default: DEFAULT_CLEAR_TEXT
		},
		dateFormat: {
			type: String,
			default: null
		},
		datePickerProps: {
			type: Object,
			default: null
		},
		dialogWidth: {
			type: Number,
			default: DEFAULT_DIALOG_WIDTH
		},
		disabled: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		},
		// must be included in props
		modelValue: {
			type: [Date, String, Number],
			default: null
		},
		okText: {
			type: String,
			default: DEFAULT_OK_TEXT
		},
		// 'date' emits the formatted string, 'timestamp' emits epoch milliseconds
		outputType: {
			type: String,
			default: OUTPUT_TYPE_DATE,
			validator: (val) => [ OUTPUT_TYPE_DATE, OUTPUT_TYPE_TIMESTAMP ].includes(val)
		},
		textFieldProps: {
			type: Object,
			default: null
		},
		timeFormat: {
			type: String,
			default: null
		},
		timePickerProps: {
			type: Object,
			default: null
		}
	},
	emits: [ 'update:modelValue' ],
	setup (props, context) {
		const activeTab = ref('calendar');
		const date = ref(null);
		const display = ref(false);
		const time = ref(DEFAULT_TIME);

		const dateTimeFormat = computed(() => {
			return (props.dateFormat ?? props.adapter.dateFormat) + ' ' + (props.timeFormat ?? props.adapter.timeFormat);
		});
		const selectedDateTime = computed(() => {
			if (!date.value)
				return null;

			const [ hours, minutes ] = (time.value || DEFAULT_TIME).split(':').map(Number);
			const value = new Date(date.value);
			value.setHours(hours || 0, minutes || 0, 0, 0);
			return value;
		});
		const formattedDateTime = computed(() => {
			return selectedDateTime.value ? props.adapter.format(selectedDateTime.value, dateTimeFormat.value) : '';
		});

		const toDate = (value) => {
			if (value === null || value === undefined || value === '')
				return null;
			if (value instanceof Date)
				return value;
			if (typeof value === 'number')
				return new Date(value);
			if (typeof value === 'string')
				return props.adapter.parse(value, dateTimeFormat.value);
			return null;
		};
		const init = (value) => {
			const initDateTime = toDate(value);
			if (!initDateTime || isNaN(initDateTime.getTime())) {
				date.value = null;
				time.value = DEFAULT_TIME;
				return;
			}

			date.value = new Date(initDateTime.getFullYear(), initDateTime.getMonth(), initDateTime.getDate());
			time.value = pad(initDateTime.getHours()) + ':' + pad(initDateTime.getMinutes());
		};
		const output = (value) => {
			if (!value)
				return null;
			return props.outputType === OUTPUT_TYPE_TIMESTAMP ? value.getTime() : props.adapter.format(value, dateTimeFormat.value);
		};
		const update = (value) => {
			if (props.change)
				props.change(value);
			context.emit('update:modelValue', value);
		};
		const resetPicker = () => {
			display.value = false;
			activeTab.value = 'calendar';
		};

		const cancelHandler = () => {
			// discard the unsaved selection
			init(props.modelValue);
			resetPicker();
		};
		const clearHandler = () => {
			date.value = null;
			time.value = DEFAULT_TIME;
			update(null);
			resetPicker();
		};
		const okHandler = () => {
			update(output(selectedDateTime.value));
			resetPicker();
		};
		const showTimePicker = () => {
			activeTab.value = 'timer';
		};

		watch(() => props.modelValue, (value) => init(value), { immediate: true });

		return {
			activeTab,
			date,
			display,
			formattedDateTime,
			time,
			cancelHandler,
			clearHandler,
			mergeProps,
			okHandler,
			showTimePicker
		};
	}
};
</script>

<style scoped>
</style>
