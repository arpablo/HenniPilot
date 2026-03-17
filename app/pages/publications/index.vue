<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Publikationen', ogTitle: 'Publikationen' })

const { data: items } = await useAsyncData('publications-index', () =>
  queryCollection('publications').select('title', 'path', 'subtitle').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Publikationen" />
    <UPageBody>
      <ul class="space-y-4">
        <li v-for="item in items" :key="item.path">
          <NuxtLink :to="item.path" class="group">
            <p class="font-semibold group-hover:underline">{{ item.title }}</p>
            <p v-if="item.subtitle" class="text-sm text-[var(--ui-text-muted)]">{{ item.subtitle }}</p>
          </NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
