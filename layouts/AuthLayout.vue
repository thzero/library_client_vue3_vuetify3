<template>
	<v-app id="root">
		<v-app-bar
			app
			color="primary"
			density="compact"
		>
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
				>
				</v-app-bar-nav-icon>
			</template>
			<v-app-bar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>
		</v-app-bar>
		<v-main>
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>
		<v-footer
			app
		>
			<VLayoutFooter />
		</v-footer>
	</v-app>
</template>

<script>
// import baseLayout from '@thzero/library_client_vue3/layouts/baseLayout';
import { useBaseLayout } from '@thzero/library_client_vue3/layouts/baseLayout';

import VLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VLayoutFooter';

export default {
	name: 'AuthLayout',
	components: {
		VLayoutFooter,
		// VVersion
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
			features
		} = useBaseLayout(props, context);

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
			features
		}
	}
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
