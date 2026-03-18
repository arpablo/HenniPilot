<script setup lang="ts">
definePageMeta({ layout: 'publication' })
const route = useRoute()

const { data: publication } = await useAsyncData(route.path, () =>
  queryCollection('publications').path(route.path).first()
)

if (!publication.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { publicationTocs } = useContentNav()

const toc = computed(() =>
  publicationTocs.value?.[route.path] || []
)

useSeoMeta({
  title: publication.value.title,
  ogTitle: publication.value.title,
  description: publication.value.subtitle,
  ogDescription: publication.value.subtitle
})
</script>

<template>
  <div v-if="publication">
    <UPageHeader
      :title="publication.title"
      :description="publication.subtitle"
    />
    <UPageBody>
      <div class="space-y-6">
        <div
          v-for="part in toc"
          :key="part.title"
        >
          <h3 class="text-base font-semibold mb-2">
            {{ part.title }}
          </h3>
          <ul class="space-y-1 pl-4">
            <li
              v-for="ch in part.chapters"
              :key="ch.title"
            >
              <NuxtLink
                v-if="ch.to"
                :to="ch.to"
                class="text-sm hover:underline"
              >
                {{ ch.title }}
              </NuxtLink>
              <span
                v-else
                class="text-sm opacity-40"
              >
                {{ ch.title }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </UPageBody>
  </div>
</template>
