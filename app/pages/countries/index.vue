<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Länder', ogTitle: 'Länder' })

const { data: items } = await useAsyncData('countries-index', () =>
  queryCollection('countries').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Länder" />
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
