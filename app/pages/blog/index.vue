<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"
/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data: page } = await useAsyncData(
  withoutTrailingSlash(route.path),
  async () => {
    const collection = `${locale.value}_pages` as any
    return queryCollection(collection).path(withoutTrailingSlash(route.path)).first()
  },
  { watch: [locale] }
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true
  })
}
const { data: posts } = await useAsyncData(
  `blogs-${locale.value}`,
  async () => {
    const collection = `${locale.value}_blog` as any
    return queryCollection(collection).order("date", "DESC").all()
  },
  { watch: [locale] }
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true
  })
}

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image })
}

useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.blog.meta.title"),
  description: t("pages.blog.sections.hero.description"),
  ...page.value?.seo
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UPage v-if="page" class="pt-18 sm:pt-24 lg:pt-32">
    <UPageSection
      :title="t('pages.blog.sections.hero.title')"
      :description="t('pages.blog.sections.hero.description')"
      :links="page.links"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <UBlogPosts orientation="vertical">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          variant="naked"
          orientation="horizontal"
          :to="post.path ? localePath(post.path) : undefined"
          v-bind="{
            ...post,
            image: post.image || undefined,
            author: post.author
              ? {
                  ...post.author,
                  avatar: post.author.avatar?.src ? post.author.avatar : undefined
                }
              : undefined
          }"
          :ui="{
            root: 'frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-3xl p-6 shadow-xl sm:p-10 mb-2 last:mb-0 group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: '!px-0',
            header: 'hidden'
          }"
        >
          <template #footer>
            <div class="mt-4 flex w-full justify-center lg:justify-start">
              <UButton
                size="md"
                variant="solid"
                color="primary"
                :label="t('pages.home.sections.blog.readMore')"
                class="min-w-32"
              >
                <template #trailing>
                  <UIcon name="lucide:arrow-right" class="size-4" />
                </template>
              </UButton>
            </div>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
