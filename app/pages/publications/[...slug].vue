<script setup lang="ts">
definePageMeta({ layout: 'publication' })
const route = useRoute()

const { data: publication } = await useAsyncData(route.path, () =>
  queryCollection('publications').path(route.path).first()
)

if (!publication.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Extract the very first chapter link from the publication body AST
function findFirstHref(node: any): string | null {
  if (node?.tag === 'a' && node.props?.href) return node.props.href
  for (const child of (node?.children || [])) {
    const found = findFirstHref(child)
    if (found) return found
  }
  return null
}

const firstChapterPath = findFirstHref(publication.value.body)

const { data: chapter } = await useAsyncData(
  `pub-first-chapter-${route.path}`,
  () => firstChapterPath
    ? queryCollection('chapters').path(firstChapterPath).first()
    : null
)

useSeoMeta({
  title: chapter.value?.title ?? publication.value.title,
  ogTitle: chapter.value?.title ?? publication.value.title
})
</script>

<template>
  <div v-if="publication">
    <UPageHeader
      :title="chapter?.title ?? publication.title"
      :description="!chapter ? publication.subtitle : undefined"
    />
    <UPageBody>
      <ContentRenderer v-if="chapter" :value="chapter" />
    </UPageBody>
  </div>
</template>
