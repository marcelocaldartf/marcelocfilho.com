<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const { data: page } = await useAsyncData(
  withoutTrailingSlash(route.path),
  async () => {
    const collection = `${locale.value}_about` as any
    return queryCollection(collection).first()
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

if (page.value?.ogImage?.component || page.value?.ogImage?.url) {
  defineOgImage(page.value.ogImage)
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image })
}
useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.about.meta.title"),
  description: t("pages.about.sections.hero.description"),
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
      :title="t('pages.about.sections.hero.title')"
      :description="t('pages.about.sections.hero.description')"
      orientation="vertical"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <div class="flex flex-col gap-24 sm:grid sm:grid-cols-3">
        <div
          class="aero-image-wrapper order-first aspect-square w-full rounded-xl sm:order-last sm:col-span-1 sm:rotate-4"
        >
          <NuxtImg
            src="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Images/marcelocfilho.webp"
            alt="Marcelo Caldart Filho"
            width="512"
            height="512"
            format="webp"
            fetchpriority="high"
            loading="eager"
            preload
            class="h-full w-full object-cover"
          />
        </div>
        <MDC :value="page.content" unwrap="p" class="order-last sm:order-first sm:col-span-2" />
      </div>
    </UPageSection>
  </UPage>
</template>
