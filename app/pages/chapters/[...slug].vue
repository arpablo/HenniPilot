<script setup lang="ts">
definePageMeta({ layout: 'content' })
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('chapters').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.subtitle,
  ogDescription: page.value.subtitle
})
</script>

<template>
  <div v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.subtitle"
      />
      <UPageBody>
        <ContentRenderer :value="page" />
      </UPageBody>
    </div>
</template>
