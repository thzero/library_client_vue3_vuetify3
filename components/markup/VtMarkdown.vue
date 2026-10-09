<template>
	<!-- eslint-disable vue/no-v-html -->
	<div
		v-if="tag==='div'"
		:class="markdownClass"
		style="background-color: transparent"
		v-html="display"
	/>
	<span
		v-if="tag==='span'"
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
		successResponse,
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
		successResponse,
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
	/* bundled, not @imported from cdnjs: when that request failed (an ad
	   blocker, a proxy, an outage), the whole route's chunk failed to load */
	@import 'github-markdown-css/github-markdown.css';
	.markdown ol, ul, li {
		margin: revert;
		padding: revert; /* Padding is what gives the indentation */
	}
	.markdown h1 {
		text-align: left;
		margin-bottom: 24px;
		text-align: center;
	}
	.markdown h2 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown h3 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown p {
		text-align: left;
		margin-bottom: 24px;
	}
</style>
