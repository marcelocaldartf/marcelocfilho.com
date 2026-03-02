<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('projects').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description']
  })
})

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogImage: page.value.image
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
      class="border-none"
    >
      <template #links>
        <UButton
          v-for="(link, index) in page.links"
          :key="index"
          v-bind="link"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <NuxtImg
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        class="w-full aspect-video object-cover rounded-2xl mb-12 shadow-2xl ring-1 ring-default"
      />
      
      <div class="flex flex-wrap items-center gap-3 mb-12">
        <UBadge v-for="tag in page.tags" :key="tag" variant="subtle" color="neutral" size="md">
          {{ tag }}
        </UBadge>
        <div class="h-4 w-px bg-default mx-2" />
        <span class="text-muted text-sm font-medium flex items-center">
          <UIcon name="i-lucide-calendar" class="mr-2 size-4" />
          {{ new Date(page.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
        </span>
      </div>

      <div class="max-w-none">
        <ContentRenderer
          v-if="page"
          :value="page"
          class="prose prose-primary dark:prose-invert"
        />
      </div>
      
      <USeparator class="my-16" />
      
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template #left>
      <UPageAside class="sticky top-24 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <UContentNavigation 
          highlight 
          :navigation="navigation?.find(item => item.path === '/projects')?.children || []" 
        />
      </UPageAside>
    </template>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UPageAside class="sticky top-24 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <UContentToc :links="page.body?.toc?.links" />
      </UPageAside>
    </template>
  </UPage>
</template>
