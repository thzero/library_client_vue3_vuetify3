<template>
    <!-- <Datepicker
		v-model="innerValue"
		:enable-time-picker="false"
		:dark="dark"
		@update:modelValue="innerValueUpdate"
	/>
	<div
		v-if="validation"
		v-for="error of errorsI"
		:key="error.$uid"
		style="border-bottom-color: red; border-top-width: 24px; border-top-style:solid;"
	>
		<small><strong>{{ error.$message }}</strong></small>
	</div> -->
	<v-input
		:error="errorI"
		:messages="(errorsI ?? []).map(l => l.$message)"
		hide-details="auto"
		:readonly="readonly"
		:disabled="disabled"
		:hint="$attrs.hint"
		:label="$attrs.label"
		density="compact"
	>
		<Datepicker
			v-model="innerValue"
			:enable-time-picker="time"
			model-type="timestamp"
			:range="range"
			:dark="dark"
			@update:modelValue="innerValueUpdate"
			style="width: 100%;"
			:teleport="true"
		/>
		<!-- <template v-slot:details>
			<div
				v-if="errorsI && errorsI.length > 0"
				style="border-top-color: red; border-top-width: 1px; border-top-style:solid;padding-top: 8px;"
			>
				<div
					v-if="validation"
					v-for="error of errorsI"
					:key="error.$uid"
				>
					<strong>{{ error.$message }}</strong>
				</div>
			</div>
		</template> -->
	</v-input>
</template>

<script>
import { computed} from 'vue';
import { useTheme } from 'vuetify';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'VtDateTimePickerFieldWithValidationTemp',
    components: {
		Datepicker
	},
	props: {
		...useBaseControlEditProps,
		defaultDate: {
			type: Boolean,
			default: true
		},
		range: {
			type: Boolean,
			default: false
		},
		time: {
			type: Boolean,
			default: false
		}
	},
	setup (props, context) {
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context, {
			convertValueI: (value) => {
				return value ? value : props.defaultDate === true ? Date() : null;
			}}
		);

		const theme = useTheme();

		const dark = computed(() => {
			return theme.current.value.dark;
		});

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
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate,
			dark,
			theme
		};
	}
};
</script>

<style scoped>
</style>
