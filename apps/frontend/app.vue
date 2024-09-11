<script setup lang="ts">
const layout = computed(() => {
  const { meta } = useRoute()

  return defineAsyncComponent(
    () => import(`./layouts/${meta.layout ?? 'default'}.vue`)
  )
})
</script>

<template>
  <component :is="layout">
    <nuxt-page />
  </component>
</template>
