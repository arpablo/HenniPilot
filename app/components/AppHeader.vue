<script setup lang="ts">
const { header } = useAppConfig()
const route = useRoute()
const { contentItems, helpPages, publications } = useContentNav()

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="header?.to || '/'"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title" class="font-semibold tracking-tight">
        <span class="text-(--ui-text)">Schwarzes </span><span class="text-primary">Gold</span><span class="text-(--ui-text)">.</span>
      </span>
    </template>

    <template
      v-else
      #left
    >
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <nav class="space-y-1 pb-4">
        <p class="px-3 py-1 text-xs font-semibold uppercase tracking-wider opacity-50">Publikationen</p>
        <NuxtLink
          v-for="pub in publications"
          :key="pub.path"
          :to="pub.path"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          :class="isActive(pub.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
        >
          <UIcon name="i-lucide-book" class="size-4 shrink-0" />
          {{ pub.title }}
        </NuxtLink>

        <p class="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider opacity-50">Materialien</p>
        <NuxtLink
          v-for="item in contentItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          :class="isActive(item.to) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
        >
          <UIcon :name="item.icon" class="size-4 shrink-0" />
          {{ item.label }}
        </NuxtLink>

        <p class="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider opacity-50">Hilfe</p>
        <NuxtLink
          v-for="page in helpPages"
          :key="page.path"
          :to="page.path"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          :class="isActive(page.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'"
        >
          <UIcon name="i-lucide-file-text" class="size-4 shrink-0" />
          {{ page.title }}
        </NuxtLink>
      </nav>
    </template>
  </UHeader>
</template>
