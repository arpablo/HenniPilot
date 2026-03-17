<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Kapitel', ogTitle: 'Kapitel' })

const { data: chapters } = await useAsyncData('chapters-index', () =>
  queryCollection('chapters')
    .select('title', 'subtitle', 'path')
    .order('path', 'ASC')
    .all()
)
</script>

<template>
  <div>
    <UPageHeader title="Kapitel" />
    <UPageBody>
      <ul class="space-y-4">
        <li v-for="chapter in chapters" :key="chapter.path">
          <NuxtLink :to="chapter.path" class="block hover:underline">
            <p class="font-semibold">{{ chapter.title }}</p>
            <p v-if="chapter.subtitle" class="text-sm text-muted">{{ chapter.subtitle }}</p>
          </NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
