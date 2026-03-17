<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="w-full border-b border-(--ui-border)">
    <UContainer class="pt-16 pb-8">
      <h1 class="font-display text-4xl font-bold tracking-tight">
        {{ title }}
      </h1>
    </UContainer>
  </div>
</template>
