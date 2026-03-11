<script setup lang="ts">
/* region State */
const { t, rt, locale } = useI18n()
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

const { data: posts } = await useAsyncData(
  `index-blogs-${locale.value}`,
  () => {
    const collection = `${locale.value}_blog` as any
    return queryCollection(collection).order("date", "DESC").limit(3).all()
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
      :ui="{ headline: 'flex justify-center' }"
    >
      <template #headline>
        <div class="aero-image-wrapper mx-auto size-20 rounded-full">
          <NuxtImg
            src="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Images/marcelocfilho.webp"
            alt="Marcelo Caldart Filho"
            width="80"
            height="80"
            format="webp"
            fetchpriority="high"
            loading="eager"
            preload
            class="h-full w-full object-cover"
          />
        </div>
      </template>

      <template #links>
        <div class="gap-md flex flex-col items-center">
          <UButton
            :label="t('pages.home.sections.hero.actions.talk')"
            :to="localePath('/contact')"
            color="primary"
            variant="solid"
            size="lg"
          />
        </div>
      </template>
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

    <!-- Blog Section -->
    <UPageSection
      v-if="posts"
      :title="t('pages.home.sections.blog.title')"
      :description="t('pages.home.sections.blog.description')"
      :ui="{
        root: 'py-8 sm:py-12',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left text-sm sm:text-md lg:text-sm text-muted'
      }"
    >
      <UBlogPosts orientation="vertical">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          orientation="horizontal"
          variant="naked"
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
          :to="post.path ? localePath(post.path) : undefined"
          :ui="{
            root: 'frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-3xl p-6 shadow-xl sm:p-10 mb-2 last:mb-0 group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: '!px-0',
            header: 'hidden'
          }"
        >
          <template #footer>
            <div class="mt-4 flex w-full justify-center">
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
            color="primary"
            variant="solid"
            size="lg"
          />
        </div>
      </template>
    </UPageCTA>
  </UPage>
</template>
