<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Organisationen', ogTitle: 'Organisationen' })

const { data: items } = await useAsyncData('organizations-index', () =>
  queryCollection('organizations').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Organisationen" />
    <UPageBody>
      <ul class="space-y-2">
        <li v-for="item in items" :key="item.path">
          <NuxtLink :to="item.path" class="hover:underline">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
