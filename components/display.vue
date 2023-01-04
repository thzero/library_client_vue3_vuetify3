<script>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import VueUtility from '@thzero/library_client_vue3_vuetify3/utility/index';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

export function useDisplayComponent(props, context, options) {
	const {
	} = useBaseEditComponent(props, context, options);

	const useDisplayI = useDisplay();

	const isFullscreen = computed(() => {
		return VueUtility.fullscreenDisplay(useDisplayI);
	});

	return {
		isFullscreen
	};
};
</script>
