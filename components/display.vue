<script>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import LibraryClientVuetifyUtility from '@thzero/library_client_vue3_vuetify3/utility/index';

import { useBaseEditComponent } from '@/library_vue/components/baseEdit';

export function useDisplayComponent(props, context, options) {
	const {
	} = useBaseEditComponent(props, context, options);

	const useDisplayI = useDisplay();

	const isFullscreen = computed(() => {
		return LibraryClientVuetifyUtility.fullscreen(useDisplayI);
	});

	return {
		isFullscreen
	};
};
</script>
