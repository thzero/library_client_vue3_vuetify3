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
			<VtLayoutFooter />
		</v-footer>
	</v-app>
</template>

<script>
import { useBaseLayout } from '@thzero/library_client_vue3/layouts/baseLayout';

import VtLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VtLayoutFooter';

export default {
	name: 'AuthLayout',
	components: {
		VtLayoutFooter
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
