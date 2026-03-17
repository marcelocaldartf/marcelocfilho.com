<script setup lang="ts">
/* region State */
const { t, locale } = useI18n()
const localePath = useLocalePath()

const faqItems = computed(() => [
  {
    label: t("pages.home.sections.faq.categories[0].title"),
    value: "services",
    questions: [
      {
        label: t("pages.home.sections.faq.categories[0].questions[0].label"),
        content: t("pages.home.sections.faq.categories[0].questions[0].content")
      },
      {
        label: t("pages.home.sections.faq.categories[0].questions[1].label"),
        content: t("pages.home.sections.faq.categories[0].questions[1].content")
      }
    ]
  },
  {
    label: t("pages.home.sections.faq.categories[1].title"),
    value: "technical",
    questions: [
      {
        label: t("pages.home.sections.faq.categories[1].questions[0].label"),
        content: t("pages.home.sections.faq.categories[1].questions[0].content")
      },
      {
        label: t("pages.home.sections.faq.categories[1].questions[1].label"),
        content: t("pages.home.sections.faq.categories[1].questions[1].content")
      }
    ]
  }
])

const { data: projects } = await useAsyncData(
  `index-projects-${locale.value}`,
  () => {
    const collection = `${locale.value}_projects` as any
    return queryCollection(collection).order("date", "DESC").limit(6).all()
  },
  { watch: [locale] }
)
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.home.meta.title"),
  description: t("pages.home.meta.description")
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UPage class="pt-18 sm:pt-24 lg:pt-32">
    <!-- Hero Section -->
    <UPageHero
      :title="t('pages.home.sections.hero.title')"
      :description="t('pages.home.sections.hero.description')"
      orientation="horizontal"
      :ui="{
        container: 'lg:py-24',
        headline: 'flex justify-start'
      }"
    >
      <template #links>
        <div class="gap-md flex flex-col items-start">
          <UButton
            :label="t('pages.home.sections.hero.actions.talk')"
            :to="localePath('/contact')"
            color="neutral"
            variant="ghost"
            size="lg"
            class="hover:text-primary-500"
          />
        </div>
      </template>

      <div
        class="frutiger-gloss aspect-video overflow-hidden rounded-3xl border border-sky-200/50 bg-white/10 shadow-2xl dark:border-sky-500/30 dark:bg-sky-950/20"
      >
        <ScriptYouTubePlayer video-id="uH1Hw6SDI1M" trigger="onElementVisible" />
      </div>
    </UPageHero>

    <!-- About Section -->
    <UPageSection
      :title="t('pages.home.sections.about.title')"
      :description="t('pages.home.sections.about.description')"
      :ui="{
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-m3 text-sm sm:text-md lg:text-sm text-muted'
      }"
    />

    <!-- Projects Section -->
    <UPageSection
      v-if="projects"
      :title="t('pages.projects.sections.hero.title')"
      :description="t('pages.projects.sections.hero.description')"
      :ui="{
        root: 'py-8 sm:py-12',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left text-sm sm:text-md lg:text-sm text-muted'
      }"
    >
      <UPageGrid>
        <ULink
          v-for="project in projects"
          :key="project.title"
          :to="localePath(project.path)"
          class="group"
        >
          <UPageCard
            :title="project.title"
            :description="project.description"
            variant="naked"
            :ui="{
              root: 'frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-3xl shadow-xl overflow-hidden relative transition-all duration-300 group-hover:-translate-y-1 ring-0 group-hover:ring-0',
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
                  size="lg"
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
                  size="lg"
                  class="frutiger-gloss border-white/10 text-neutral-900 !shadow-sm dark:text-white"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <UButton
                :label="t('pages.projects.viewProject')"
                trailing-icon="lucide:arrow-right"
                variant="ghost"
                color="neutral"
                size="md"
                class="hover:text-primary-500 pointer-events-none mt-auto w-auto px-0"
              />
            </template>
          </UPageCard>
        </ULink>
      </UPageGrid>

      <div class="mt-12 flex justify-center">
        <UButton
          size="lg"
          variant="ghost"
          color="neutral"
          label="View All"
          :to="localePath('/projects')"
          class="hover:text-primary-500 min-w-48"
        >
          <template #trailing>
            <UIcon name="lucide:arrow-right" class="size-5" />
          </template>
        </UButton>
      </div>
    </UPageSection>

    <!-- FAQ Section -->
    <ClientOnly>
      <UPageSection
        :title="t('pages.home.sections.faq.title')"
        :description="t('pages.home.sections.faq.description')"
        :ui="{
          root: 'overflow-hidden px-4 md:px-0',
          container:
            'frutiger-gloss bg-primary/5 dark:bg-primary/10 rounded-3xl p-6 shadow-xl sm:p-12 gap-md sm:gap-md max-w-4xl mx-auto',
          title: 'text-center text-xl sm:text-2xl lg:text-3xl font-medium',
          description: 'text-center text-sm sm:text-md lg:text-sm text-muted'
        }"
      >
        <UTabs
          :items="faqItems"
          :default-value="faqItems[0]?.value"
          orientation="horizontal"
          variant="pill"
          class="w-full"
          :ui="{
            root: 'flex flex-col gap-md w-full',
            list: 'relative grid grid-cols-2 bg-muted/20 dark:bg-muted/10 p-1 rounded-2xl w-full items-center',
            trigger: 'justify-center py-2.5 font-medium'
          }"
        >
          <template #content="{ item }">
            <div class="mt-6">
              <LazyUAccordion
                trailing-icon="lucide:plus"
                :items="item.questions"
                :unmount-on-hide="false"
                type="multiple"
                :ui="{
                  trailingIcon:
                    'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 transition-transform duration-200'
                }"
              >
                <template #body="{ item: _item }">
                  <LazyMDC v-if="_item.content" :value="_item.content" unwrap="p" class="px-4" />
                </template>
              </LazyUAccordion>
            </div>
          </template>
        </UTabs>
      </UPageSection>
    </ClientOnly>

    <!-- Post CTA -->
    <UPageCTA
      :title="t('pages.contact.sections.form.title')"
      :description="t('pages.contact.sections.hero.description')"
      variant="naked"
      :ui="{
        root: 'py-16 sm:py-24 px-4 md:px-0',
        container:
          'frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-3xl p-8 sm:p-16 max-w-4xl mx-auto text-center shadow-xl',
        title: 'text-2xl sm:text-3xl lg:text-4xl font-medium',
        description: 'text-muted sm:text-lg'
      }"
    >
      <template #links>
        <div class="flex justify-center">
          <UButton
            :label="t('pages.home.sections.hero.actions.talk')"
            :to="localePath('/contact')"
            color="neutral"
            variant="ghost"
            size="lg"
            class="hover:text-primary-500"
          />
        </div>
      </template>
    </UPageCTA>
  </UPage>
</template>
