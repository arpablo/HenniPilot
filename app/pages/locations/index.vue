<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Orte', ogTitle: 'Orte' })

const { data: items } = await useAsyncData('locations-index', () =>
  queryCollection('locations').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Orte" />
    <UPageBody>
      <ul class="space-y-2">
        <li v-for="item in items" :key="item.path">
          <NuxtLink :to="item.path" class="hover:underline">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
