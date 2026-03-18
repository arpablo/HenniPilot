<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Maps of Content', ogTitle: 'Maps of Content' })

const { data: items } = await useAsyncData('mocs-index', () =>
  queryCollection('mocs').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Maps of Content" />
    <UPageBody>
      <ul class="space-y-2">
        <li
          v-for="item in items"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="hover:underline"
          >{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
