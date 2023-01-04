<template>
	<!-- eslint-disable vue/no-v-html -->
	<div
		:class="markdownClass"
		style="background-color: transparent"
		v-html="display"
	/>
	<!--eslint-enable-->
</template>

<script>
import { useBaseMarkdownComponent } from '@thzero/library_client_vue3/components/markup/baseMarkdown';
import { baseMarkdownProps } from '@thzero/library_client_vue3/components/markup/baseMarkdownProps';

export default {
	name: 'VtMarkdown',
	props: {
		...baseMarkdownProps
,	},
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
			display,
			markdownClass,
			serviceMarkup
		} = useBaseMarkdownComponent(props, context);

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
			display,
			markdownClass,
			serviceMarkup
		};
	}
};
</script>

<style scoped>
</style>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css';
	.markdown ol, ul, li {
		margin: revert;
		padding: revert; /* Padding is what gives the indentation */
	}
</style>
