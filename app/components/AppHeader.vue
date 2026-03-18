<script setup lang="ts">
import type { SectionKey } from '~/composables/useSidebarState'

const { header } = useAppConfig()
const { activeSection, setSection } = useSidebarState()

const tabs: Array<{ key: SectionKey, label: string, icon: string }> = [
  { key: 'publikationen', label: 'Publikationen', icon: 'i-lucide-book' },
  { key: 'materialien', label: 'Materialien', icon: 'i-lucide-archive' },
  { key: 'hilfe', label: 'Hilfe', icon: 'i-lucide-help-circle' },
]
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="header?.to || '/'"
  >
    <!-- Default slot = center area: Search only -->
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

      <!-- Desktop tabs -->
      <nav class="hidden lg:flex items-center gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
          :class="activeSection === tab.key ? 'bg-white/15 font-semibold' : 'hover:bg-white/10 opacity-70 hover:opacity-100'"
          @click="setSection(tab.key)"
        >
          <UIcon :name="tab.icon" class="size-4 text-primary" />
          {{ tab.label }}
        </button>
      </nav>

      <UColorModeButton v-if="header?.colorMode" />
    </template>

    <!-- Mobile: Tabs + Sidebar content in hamburger menu -->
    <template #body>
      <div class="flex gap-1 pb-3 border-b border-white/10 mb-3">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer"
          :class="activeSection === tab.key ? 'bg-white/15 font-semibold' : 'hover:bg-white/10 opacity-70 hover:opacity-100'"
          @click="setSection(tab.key)"
        >
          <UIcon :name="tab.icon" class="size-4 text-primary" />
          {{ tab.label }}
        </button>
      </div>
      <SidebarNav variant="mobile" />
    </template>
  </UHeader>
</template>
