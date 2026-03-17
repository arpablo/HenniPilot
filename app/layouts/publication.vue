<script setup lang="ts">
const route = useRoute()
const { contentItems, helpPages } = useContentNav()

const { data: publication } = await useAsyncData(
  () => `pub-layout-${route.path}`,
  () => queryCollection('publications').path(route.path).first()
)

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

// Extract top-level list items (Teile) with their first chapter link
const tocParts = computed(() => {
  const body = publication.value?.body
  if (!body) return []

  const rootUl = body.children?.find((n: any) => n.tag === 'ul' || n.tag === 'ol')
  if (!rootUl) return []

  return (rootUl.children || [])
    .filter((n: any) => n.tag === 'li')
    .map((li: any) => {
      const titleNode = li.children?.find((c: any) => c.type === 'text')
      const title = titleNode?.value?.trim().replace(/\n[\s\S]*$/, '') || ''
      const subList = li.children?.find((c: any) => c.tag === 'ul' || c.tag === 'ol')
      const firstHref = subList ? findFirstHref(subList) : null
      return { title, to: firstHref }
    })
    .filter((p: any) => p.title)
})

function findFirstHref(node: any): string | null {
  if (node.tag === 'a' && node.props?.href) return node.props.href
  for (const child of (node.children || [])) {
    const found = findFirstHref(child)
    if (found) return found
  }
  return null
}
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <nav class="space-y-1">
          <p class="px-4 py-1 text-xs font-semibold uppercase tracking-wider opacity-50">
            {{ publication?.title }}
          </p>
          <template v-for="part in tocParts" :key="part.title">
            <NuxtLink
              v-if="part.to"
              :to="part.to"
              class="flex items-center gap-2 px-4 py-2 ml-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
              :class="isActive(part.to) ? 'bg-white/15 font-semibold' : ''"
            >
              <UIcon name="i-lucide-chevron-right" class="size-3 shrink-0 opacity-50" />
              {{ part.title }}
            </NuxtLink>
            <span
              v-else
              class="flex items-center gap-2 px-4 py-2 ml-2 text-sm opacity-40 cursor-default"
            >
              <UIcon name="i-lucide-chevron-right" class="size-3 shrink-0" />
              {{ part.title }}
            </span>
          </template>

          <div class="mx-4 my-3 border-t border-white/10" />

          <p class="px-4 py-1 text-xs font-semibold uppercase tracking-wider opacity-50">Materialien</p>
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
