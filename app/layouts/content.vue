<script setup lang="ts">
const route = useRoute()
const { contentItems, helpPages, publications } = useContentNav()

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <nav class="space-y-1">
          <p class="px-4 py-1 text-xs font-semibold uppercase tracking-wider opacity-50">Publikationen</p>
          <NuxtLink
            v-for="pub in publications"
            :key="pub.path"
            :to="pub.path"
            class="flex items-center gap-2 px-4 py-2 ml-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive(pub.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
          >
            <UIcon name="i-lucide-book" class="size-4 shrink-0" />
            {{ pub.title }}
          </NuxtLink>

          <p class="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider opacity-50">Materialien</p>
          <NuxtLink
            v-for="item in contentItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-4 py-2 ml-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive(item.to) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
          >
            <UIcon :name="item.icon" class="size-4 shrink-0" />
            {{ item.label }}
          </NuxtLink>

          <p class="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider opacity-50">Hilfe</p>
          <NuxtLink
            v-for="page in helpPages"
            :key="page.path"
            :to="page.path"
            class="flex items-center gap-2 px-4 py-2 ml-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive(page.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
          >
            <UIcon name="i-lucide-file-text" class="size-4 shrink-0" />
            {{ page.title }}
          </NuxtLink>
        </nav>
      </UPageAside>
    </template>

    <UContainer>
      <slot />
    </UContainer>
  </UPage>
</template>
