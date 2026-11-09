<template>
	<div>
		<div
			v-for="(item, index) in value"
			:key="index"
			class="text-error v-messages"
		>
			{{ item }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'VtListing',
	props: {
		// must be included in props
		value: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style scoped>
</style>
