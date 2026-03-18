<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'desktop' | 'mobile'
}>(), {
  variant: 'desktop'
})

const route = useRoute()
const { contentItems, helpPages, publications, publicationTocs } = useContentNav()
const { activeSection, selectedPublication, selectPublication, backToList } = useSidebarState()

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

const selectedPub = computed(() =>
  publications.value?.find(p => p.path === selectedPublication.value)
)

const currentToc = computed(() =>
  selectedPublication.value ? publicationTocs.value?.[selectedPublication.value] || [] : []
)

const px = computed(() => props.variant === 'mobile' ? 'px-3' : 'px-4')
const ml = computed(() => props.variant === 'mobile' ? '' : 'ml-2')

// Track which TOC parts are expanded (by index)
const expandedParts = ref<Set<number>>(new Set())

// Auto-expand the part containing the active chapter
watch([() => route.path, currentToc], () => {
  for (let i = 0; i < currentToc.value.length; i++) {
    const part = currentToc.value[i]!
    if (part.chapters.some(ch => ch.to && isActive(ch.to))) {
      expandedParts.value.add(i)
    }
  }
}, { immediate: true })

function togglePart(index: number) {
  if (expandedParts.value.has(index)) {
    expandedParts.value.delete(index)
  } else {
    expandedParts.value.add(index)
  }
}
</script>

<template>
  <nav
    class="space-y-1"
    :class="variant === 'mobile' ? 'pb-4' : ''"
  >
    <!-- Publikationen: Liste -->
    <template v-if="activeSection === 'publikationen' && !selectedPublication">
      <p :class="[px, 'py-1 text-xs font-semibold uppercase tracking-wider opacity-50']">
        Publikationen
      </p>
      <NuxtLink
        v-for="pub in publications"
        :key="pub.path"
        :to="pub.path"
        class="flex items-center gap-2 py-2 rounded-md text-sm font-medium transition-colors"
        :class="[px, ml, isActive(pub.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10']"
        @click="selectPublication(pub.path)"
      >
        <UIcon
          name="i-lucide-book"
          class="size-4 shrink-0"
        />
        {{ pub.title }}
      </NuxtLink>
    </template>

    <!-- Publikationen: TOC -->
    <template v-else-if="activeSection === 'publikationen' && selectedPublication">
      <button
        :class="[px, 'py-2 w-full flex items-center gap-1 text-xs font-medium opacity-60 hover:opacity-100 cursor-pointer transition-opacity']"
        @click="backToList()"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-3"
        />
        Publikationen
      </button>

      <p :class="[px, 'py-1 text-sm font-semibold']">
        {{ selectedPub?.title }}
      </p>

      <div
        v-for="(part, partIndex) in currentToc"
        :key="part.title"
        class="mt-2"
      >
        <button
          v-if="part.chapters.length"
          :class="[px, 'py-1.5 w-full flex items-center gap-1.5 text-xs font-semibold opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-left']"
          @click="togglePart(partIndex)"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-3 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-90': expandedParts.has(partIndex) }"
          />
          <span>{{ part.title }}</span>
        </button>
        <p
          v-else
          :class="[px, 'py-1.5 text-xs font-semibold opacity-60 text-left']"
        >
          {{ part.title }}
        </p>

        <template v-if="expandedParts.has(partIndex)">
          <template
            v-for="ch in part.chapters"
            :key="ch.title"
          >
            <NuxtLink
              v-if="ch.to"
              :to="ch.to"
              class="flex items-center gap-2 py-1.5 pl-8 pr-2 rounded-md text-xs font-medium transition-colors"
              :class="[isActive(ch.to) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10 opacity-80']"
            >
              {{ ch.title }}
            </NuxtLink>
            <span
              v-else
              class="flex items-center gap-2 py-1.5 pl-8 pr-2 text-xs opacity-35 cursor-default"
            >
              {{ ch.title }}
            </span>
          </template>
        </template>
      </div>
    </template>

    <!-- Materialien -->
    <template v-else-if="activeSection === 'materialien'">
      <p :class="[px, 'py-1 text-xs font-semibold uppercase tracking-wider opacity-50']">
        Materialien
      </p>
      <NuxtLink
        v-for="item in contentItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-2 py-2 rounded-md text-sm font-medium transition-colors"
        :class="[px, ml, isActive(item.to) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10']"
      >
        <UIcon
          :name="item.icon"
          class="size-4 shrink-0"
        />
        {{ item.label }}
      </NuxtLink>
    </template>

    <!-- Hilfe -->
    <template v-else-if="activeSection === 'hilfe'">
      <p :class="[px, 'py-1 text-xs font-semibold uppercase tracking-wider opacity-50']">
        Hilfe
      </p>
      <NuxtLink
        v-for="page in helpPages"
        :key="page.path"
        :to="page.path"
        class="flex items-center gap-2 py-2 rounded-md text-sm font-medium transition-colors"
        :class="[px, ml, isActive(page.path) ? 'bg-white/15 font-semibold' : 'hover:bg-white/10']"
      >
        <UIcon
          name="i-lucide-file-text"
          class="size-4 shrink-0"
        />
        {{ page.title }}
      </NuxtLink>
    </template>
  </nav>
</template>
