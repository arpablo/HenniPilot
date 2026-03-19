<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Bücher', ogTitle: 'Bücher' })

const { data: items } = await useAsyncData('books-index', () =>
  queryCollection('books')
    .select('title', 'path', 'published', 'authors')
    .order('title', 'ASC')
    .all()
)
</script>

<template>
  <div>
    <UPageHeader title="Bücher" />
    <UPageBody>
      <ul class="space-y-2">
        <li
          v-for="item in items"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="hover:underline"
          >
            <span
              v-if="item.published"
              class="text-sm text-muted mr-2"
            >{{ item.published }}</span>{{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
