<template>
	<v-app id="root">
		<v-main>
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
// import baseLayout from '@thzero/library_client_vue3/layouts/baseLayout';
import { useBaseLayout } from '@thzero/library_client_vue3/layouts/baseLayout';

export default {
	name: 'BlankLayout',
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
