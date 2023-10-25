<template>
	<v-container pa-0>
		<v-row>
			<v-col
				cols="6"
				class="pa-0"
			>
				<VtTextAreaWithValidation
					ref="markdownRef"
					v-model="innerValue"
					:vid="vid"
				/>
			</v-col>
			<v-col
				cols="6"
				class="pa-0"
			>
				<!-- eslint-disable vue/no-v-html -->
				<div
					class="markdown-body mt-3 ml-2"
					v-html="preview"
				/>
				<!--eslint-enable-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import baseMarkdownEditor from '@thzero/library_client_vue3/components/markup/baseMarkdownEditor';
import VtTextAreaWithValidation from '../form/VtTextAreaWithValidation';

export default {
	name: 'VtMarkdownEditor',
	components: {
		VtTextAreaWithValidation
	},
	extends: baseMarkdownEditor
};
</script>

<style scoped>
</style>
