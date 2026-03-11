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

const { data: projects } = await useAsyncData(
  `projects-${locale.value}`,
  async () => {
    const collection = `${locale.value}_projects` as any
    return queryCollection(collection).order("date", "DESC").all()
  },
  { watch: [locale] }
)

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image })
}

useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.projects.meta.title"),
  description: t("pages.projects.sections.hero.description"),
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
      :title="t('pages.projects.sections.hero.title')"
      :description="t('pages.projects.sections.hero.description')"
      :links="page.links"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <UPageGrid>
        <UPageCard
          v-for="project in projects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :to="localePath(project.path)"
          variant="naked"
          class="group"
          :ui="{
            root: 'frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-3xl shadow-xl overflow-hidden group relative transition-all duration-300 hover:-translate-y-1 ring-0 hover:ring-0',
            header: 'p-0 h-48 w-full relative overflow-hidden',
            body: 'p-6',
            footer: 'p-6 pt-0 mt-auto'
          }"
        >
          <template #header>
            <LazyNuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute top-4 left-4">
              <UBadge
                variant="subtle"
                color="primary"
                size="xl"
                class="frutiger-gloss border-white/20 text-neutral-900 !shadow-lg dark:text-white"
              >
                {{ project.date ? new Date(project.date).getUTCFullYear() : "" }}
              </UBadge>
            </div>
          </template>

          <template #footer>
            <div class="mb-4 flex flex-wrap gap-2 pt-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                variant="subtle"
                color="primary"
                size="xl"
                class="frutiger-gloss border-white/10 text-neutral-900 !shadow-sm dark:text-white"
              >
                {{ tag }}
              </UBadge>
            </div>
            <UButton
              :label="t('pages.projects.viewProject')"
              icon="i-lucide-arrow-right"
              trailing
              variant="solid"
              color="primary"
              size="md"
              class="w-auto px-6"
              :to="localePath(project.path)"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
