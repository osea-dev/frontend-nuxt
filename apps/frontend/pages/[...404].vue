<template>
	<div class="error-page">
		<p class="error-page__text" v-text="'Page not found'" />
	</div>
</template>

<script lang="ts" setup>
useHead({
	title: '404',
})
</script>