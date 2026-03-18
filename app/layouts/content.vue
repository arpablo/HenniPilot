<script setup lang="ts">
const { activeSection, selectedPublication } = useSidebarState()
const showWideSidebar = computed(() => activeSection.value === 'publikationen' && !!selectedPublication.value)
</script>

<template>
  <UPage :ui="showWideSidebar ? { left: 'lg:col-span-3', center: 'lg:col-span-7' } : undefined">
    <template #left>
      <UPageAside>
        <SidebarNav />
      </UPageAside>
    </template>

    <UContainer>
      <slot />
    </UContainer>
  </UPage>
</template>
