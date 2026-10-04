<template>
	<v-overlay
		class="align-center justify-center"
		opacity="1.0"
		z-index="5"
		persistent
		:model-value="!signal"
	>
		<v-container>
			<v-row
				justify="center"
				class="mb-8"
			>
				<v-img
					src="/icons/icon.png"
					:width="imageWidth"
				/>
			</v-row>
			<v-row justify="center">
				<v-progress-circular
					indeterminate
					:size="progressSize"
				/>
			</v-row>
			<v-row justify="center">
				<span class="headline pt-8">{{ $t('messages.loading') }}</span>
			</v-row>
		</v-container>
	</v-overlay>
</template>

<script>
import { computed } from 'vue';

import { useDisplay } from 'vuetify';

import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

export default {
	name: 'VtLoadingOverlay',
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		// read through useDisplay's refs, so the sizes follow a resize; reading
		// window.innerWidth here would be evaluated once and never again
		const { height, width } = useDisplay();

		const imageWidth = computed(() => {
			return LibraryClientVueUtility.overlayImageWidth(width.value, height.value);
		});
		const progressSize = computed(() => {
			return LibraryClientVueUtility.overlayProgressSize(width.value, height.value);
		});

		return {
			imageWidth,
			progressSize
		};
	}
};
</script>

<style scoped>
</style>
