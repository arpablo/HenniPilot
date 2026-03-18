<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  class?: string
}>()

const isLarge = computed(() => props.class?.includes('large'))
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :class="isLarge ? 'max-w-full h-auto rounded-lg' : 'max-w-[220px] h-auto rounded-lg'"
  >
</template>
