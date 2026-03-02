<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui/utils/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("blog", route.path, {
    fields: ["description"],
  }),
);

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
const blogNavigation = computed(
  () => navigation.value.find((item) => item.path === "/blog")?.children || [],
);

const breadcrumb = computed(() =>
  mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value?.path)).map(
    ({ icon, ...link }) => link,
  ),
);

if (page.value.image) {
  defineOgImage({ url: page.value.image });
} else {
  defineOgImageComponent(
    "Blog",
    {
      headline: breadcrumb.value.map((item) => item.label).join(" > "),
    },
    {
      fonts: ["Geist:400", "Geist:600"],
    },
  );
}

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
});

const articleLink = computed(() => `${window?.location}`);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <UMain class="px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink to="/blog" class="text-sm flex items-center gap-1 mb-4">
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
        <UPageHeader
          :title="page.title"
          :description="page.description"
          class="border-none"
        >
          <template #headline>
            <div class="flex text-xs text-muted items-center gap-2">
              <span v-if="page.date">
                {{ formatDate(page.date) }}
              </span>
              <span v-if="page.date && page.minRead"> - </span>
              <span v-if="page.minRead"> {{ page.minRead }} MIN READ </span>
            </div>
          </template>
        </UPageHeader>

        <NuxtImg
          :src="page.image"
          :alt="page.title"
          class="rounded-lg w-full h-[300px] object-cover object-center mb-12 shadow-2xl ring-1 ring-default"
        />

        <div class="flex items-center justify-center gap-2 mb-8">
          <UUser
            orientation="horizontal"
            color="neutral"
            variant="ghost"
            class="justify-center items-center text-center"
            v-bind="page.author"
          />
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer v-if="page.body" :value="page" />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
