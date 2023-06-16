<script>
import { unref } from 'vue';

import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import LibraryClientVuetifyUtility from '@thzero/library_client_vue3_vuetify3/utility/index';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

export function useDisplayComponent(props, context, options) {
	const {
	} = useBaseEditComponent(props, context, options);

	const useDisplayI = useDisplay();

	const height = computed(() => {
		return unref(unref(useDisplayI).height);
	});
	const isFullscreen = computed(() => {
		return LibraryClientVuetifyUtility.fullscreen(useDisplayI);
	});
	const isMd = computed(() => {
		return unref(unref(useDisplayI).md);
	});
	const isLg = computed(() => {
		return unref(unref(useDisplayI).lg);
	});
	const isSm = computed(() => {
		return unref(unref(useDisplayI).sm);
	});
	const isXl = computed(() => {
		return unref(unref(useDisplayI).xl);
	});
	const isXs = computed(() => {
		return unref(unref(useDisplayI).xs);
	});
	const isXxl = computed(() => {
		return unref(unref(useDisplayI).xxl);
	});
	const lgAndDown = computed(() => {
		return unref(unref(useDisplayI).lgAndDown);
	});
	const lgAndUp = computed(() => {
		return unref(unref(useDisplayI).lgAndUp);
	});
	const mdAndDown = computed(() => {
		return unref(unref(useDisplayI).mdAndDown);
	});
	const mdAndUp = computed(() => {
		return unref(unref(useDisplayI).mdAndUp);
	});
	const name = computed(() => {
		return unref(unref(useDisplayI).name);
	});
	const smAndDown = computed(() => {
		return unref(unref(useDisplayI).smAndDown);
	});
	const smAndUp = computed(() => {
		return unref(unref(useDisplayI).smAndUp);
	});
	const xlndDown = computed(() => {
		return unref(unref(useDisplayI).xlndDown);
	});
	const xlndUp = computed(() => {
		return unref(unref(useDisplayI).xlndUp);
	});
	const width = computed(() => {
		return unref(unref(useDisplayI).width);
	});

	return {
		height,
		isFullscreen,
		isMd,
		isLg,
		isSm,
		isXl,
		isXs,
		isXxl,
		lgAndDown,
		lgAndUp,
		mdAndDown,
		mdAndUp,
		name,
		smAndDown,
		smAndUp,
		xlndDown,
		xlndUp,
		width
	};
};
</script>
