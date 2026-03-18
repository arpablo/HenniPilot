<script setup lang="ts">
definePageMeta({ layout: 'content' })
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('mocs').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title
})
</script>

<template>
  <div v-if="page">
    <UPageHeader :title="page.title" />
    <UPageBody>
      <ContentRenderer :value="page" />
    </UPageBody>
  </div>
</template>
