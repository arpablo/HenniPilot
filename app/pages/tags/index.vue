<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Tags', ogTitle: 'Tags' })

const collections = [
  'publications', 'chapters', 'events', 'essays', 'people',
  'organizations', 'locations', 'countries', 'cities',
  'notes', 'terms', 'mocs', 'books'
] as const

interface TaggedItem {
  title: string
  path: string
  tags?: string[]
}

const { data: allItems } = await useAsyncData('tags-all', async () => {
  const results = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collections.map(c => queryCollection(c as any).select('title', 'path', 'tags').all())
  )
  return results.flat() as TaggedItem[]
})

const tagMap = computed(() => {
  const map: Record<string, TaggedItem[]> = {}
  for (const item of allItems.value || []) {
    for (const tag of item.tags || []) {
      if (!map[tag]) map[tag] = []
      map[tag].push(item)
    }
  }
  return map
})

const sortedTags = computed(() =>
  Object.entries(tagMap.value)
    .sort(([a], [b]) => a.localeCompare(b))
)

const maxCount = computed(() =>
  Math.max(...sortedTags.value.map(([, items]) => items.length), 1)
)

function fontSize(count: number): string {
  const min = 0.75
  const max = 2.5
  const size = min + ((count - 1) / Math.max(maxCount.value - 1, 1)) * (max - min)
  return `${size}rem`
}

const router = useRouter()
const selectedTag = ref<string | null>(null)

function selectTag(tag: string, items: TaggedItem[]) {
  if (items.length === 1) {
    router.push(items[0]!.path)
  } else {
    selectedTag.value = selectedTag.value === tag ? null : tag
  }
}
</script>

<template>
  <div>
    <UPageHeader title="Tags" />
    <UPageBody>
      <div class="flex flex-wrap gap-3 items-baseline">
        <button
          v-for="[tag, items] in sortedTags"
          :key="tag"
          :style="{ fontSize: fontSize(items.length) }"
          class="hover:text-[var(--color-link-hover)] transition-colors cursor-pointer"
          :class="selectedTag === tag ? 'text-[var(--color-link)] font-semibold' : 'text-[var(--ui-text-muted)]'"
          @click="selectTag(tag, items)"
        >
          {{ tag }}
          <sup class="text-xs opacity-50">{{ items.length }}</sup>
        </button>
      </div>

      <div v-if="selectedTag && tagMap[selectedTag]" class="mt-8">
        <h2 class="text-lg font-semibold mb-4">
          {{ selectedTag }}
        </h2>
        <ul class="space-y-2">
          <li v-for="item in tagMap[selectedTag]" :key="item.path">
            <NuxtLink :to="item.path" class="hover:underline">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </UPageBody>
  </div>
</template>
