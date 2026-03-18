<template>
  <UPage :ui="{ left: 'lg:col-span-3', center: 'lg:col-span-7' }">
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
