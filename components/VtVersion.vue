<template>
	<span
		v-if="version !== null"
	>
		{{ $t('version.label') }} {{ $t('version.majorMinorDate', version.client) }}
		<span
			v-if="$vuetify.display.smAndUp && version.server"
		>
			&nbsp;-&nbsp;
		</span>
		<span
			v-if="$vuetify.display.xs && version.server"
		>
			<br>
		</span>
		<span
			v-if="version.server"
		>
			{{ $t('version.majorMinorDate', version.server) }}
		</span>
	</span>
</template>

<script>
import { computed } from 'vue';

import { useBaseVersionComponent } from '@thzero/library_client_vue3/components/baseVersion';

export default {
	name: 'VtVersion',
	props: {
		modelValue: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
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
			version
		} = useBaseVersionComponent(props, context);

		const innerVersion = computed(() => {
			return props.version;
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
			version
		};
	}
};
</script>

<style scoped>
</style>
