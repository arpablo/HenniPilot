<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const { selectedPublication } = useSidebarState()
const { openPreview } = useLinkPreview()

const isInternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('/')
})

const isInPublication = computed(() => !!selectedPublication.value)

const linkClass = 'text-primary underline underline-offset-3 decoration-primary/30 hover:decoration-primary transition-colors'

function handlePreview(e: MouseEvent) {
  if (!props.href) return
  // Allow Cmd/Ctrl+Click to open in new tab
  if (e.metaKey || e.ctrlKey) return
  e.preventDefault()
  openPreview(props.href)
}
</script>

<template>
  <!-- Internal link in publication context: open in slideover -->
  <a
    v-if="isInternal && isInPublication"
    :href="href"
    :class="linkClass"
    @click.prevent="handlePreview"
  >
    <slot />
  </a>

  <!-- Internal link outside publication: normal navigation -->
  <NuxtLink
    v-else-if="isInternal"
    :to="href"
    :target="target"
    :class="linkClass"
  >
    <slot />
  </NuxtLink>

  <!-- External link -->
  <a
    v-else
    :href="href"
    :target="target || '_blank'"
    :class="linkClass"
  >
    <slot />
  </a>
</template>
