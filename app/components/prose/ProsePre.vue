<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}>()

const mermaidId = `mermaid-${Math.random().toString(36).slice(2)}`
const svg = ref('')

onMounted(async () => {
  if (props.language !== 'mermaid' || !props.code) return
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
    const { svg: rendered } = await mermaid.render(mermaidId, props.code)
    svg.value = rendered
  } catch (e) {
    console.error('Mermaid render error:', e)
  }
})
</script>

<template>
  <ClientOnly v-if="language === 'mermaid'">
    <div class="my-6 overflow-x-auto" v-html="svg" />
  </ClientOnly>
  <pre v-else :class="props.class"><slot /></pre>
</template>
