<script setup lang="ts">
definePageMeta({ layout: 'content' })
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('cities').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title
})

const marker = computed(() => {
  if (!page.value?.location || page.value.location.length < 2) return null
  const lat = parseFloat(page.value.location[0])
  const lng = parseFloat(page.value.location[1])
  if (isNaN(lat) || isNaN(lng)) return null
  return [{ lat, lng, title: page.value.title }]
})
</script>

<template>
  <div v-if="page">
    <UPageHeader :title="page.title" />
    <UPageBody>
      <GeoMap v-if="marker" :markers="marker" height="250px" :zoom="7" class="mb-6" />
      <ContentRenderer :value="page" />
    </UPageBody>
  </div>
</template>
