<script setup lang="ts">
const { t, tm, rt, locale } = useI18n();
const localePath = useLocalePath();

/* region Meta */
useSeoMeta({
  title: t("pages.index.meta.title"),
  description: t("pages.index.hero.description"),
});
/* endregion */

/* region Data */
const global = {
  meetingLink: "https://cal.com/marcelocfilho",
  email: "marcelocfilho96@gmail.com",
  available: true,
};

const faqItems = computed(() => [
  {
    label: t("pages.index.faq.categories[0].title"),
    questions: [
      {
        label: t("pages.index.faq.categories[0].questions[0].label"),
        content: t("pages.index.faq.categories[0].questions[0].content"),
      },
      {
        label: t("pages.index.faq.categories[0].questions[1].label"),
        content: t("pages.index.faq.categories[0].questions[1].content"),
      },
    ],
  },
  {
    label: t("pages.index.faq.categories[1].title"),
    questions: [
      {
        label: t("pages.index.faq.categories[1].questions[0].label"),
        content: t("pages.index.faq.categories[1].questions[0].content"),
      },
      {
        label: t("pages.index.faq.categories[1].questions[1].label"),
        content: t("pages.index.faq.categories[1].questions[1].content"),
      },
    ],
  },
]);

const { data: posts } = await useAsyncData(
  `index-blogs-${locale.value}`,
  () => {
    const collection = `${locale.value}_blog` as any;
    return queryCollection(collection).order("date", "DESC").limit(3).all();
  },
  { watch: [locale] },
);

const faqUi = {
  root: "flex items-center gap-4 w-full",
  list: "relative flex bg-transparent dark:bg-transparent gap-2 px-0",
  indicator:
    "absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60",
  trigger:
    "px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted",
  label: "truncate",
};
/* endregion */
</script>

<template>
  <UPage>
    <!-- Hero Section -->
    <UPageHero
      :title="t('pages.index.hero.title')"
      :description="t('pages.index.hero.description')"
      :ui="{ headline: 'flex justify-center' }"
    >
      <template #headline>
        <NuxtImg
          src="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Images/marcelocfilho.webp"
          alt="Marcelo Caldart Filho profile photo"
          sizes="72px"
          fetchpriority="high"
          loading="eager"
          class="size-18 ring ring-default ring-offset-3 ring-offset-bg mx-auto rounded-full"
        />
      </template>

      <template #links>
        <div class="flex flex-col items-center gap-4">
          <UButton
            :label="t('pages.index.hero.actions.talk')"
            :to="localePath('/contact')"
            color="primary"
            variant="solid"
            size="lg"
          />
        </div>
      </template>
    </UPageHero>

    <!-- About & Experience Section -->
    <UPageSection
      :title="t('pages.index.about.title')"
      :description="t('pages.index.about.description')"
      :ui="{
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-m3 text-sm sm:text-md lg:text-sm text-muted',
      }"
    />

    <!-- Blog Section -->
    <UPageSection
      v-if="posts"
      :title="t('pages.index.blog.title')"
      :description="t('pages.index.blog.description')"
      :ui="{
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted',
      }"
    >
      <UBlogPosts orientation="vertical" class="gap-4 lg:gap-y-4">
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
                  avatar: post.author.avatar?.src ? post.author.avatar : undefined,
                }
              : undefined,
          }"
          :to="post.path ? localePath(post.path) : undefined"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: '!px-0',
            header: 'hidden',
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              :label="t('pages.index.blog.readMore')"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection
      :title="t('pages.index.faq.title')"
      :description="t('pages.index.faq.description')"
      :ui="{
        container: 'px-0 !pt-0 gap-4 sm:gap-4',
        title: 'text-center text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-center mt-2 text-sm sm:text-md lg:text-sm text-muted',
      }"
    >
      <UContainer>
        <ClientOnly>
          <UTabs :items="faqItems" orientation="horizontal" :ui="faqUi">
            <template #content="{ item }">
              <UAccordion
                trailing-icon="lucide:plus"
                :items="item.questions"
                :unmount-on-hide="false"
                :ui="{
                  item: 'border-none',
                  trigger:
                    'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
                  trailingIcon:
                    'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted',
                }"
              >
                <template #body="{ item: _item }">
                  <MDC v-if="_item.content" :value="_item.content" unwrap="p" class="px-4" />
                </template>
              </UAccordion>
            </template>
          </UTabs>
        </ClientOnly>

      </UContainer>
    </UPageSection>

    <!-- Post CTA -->
    <UPageCTA
      :title="t('pages.contact.form.title')"
      :description="t('pages.contact.hero.description')"
      variant="naked"
    >
      <template #links>
        <div class="flex flex-col items-center gap-4">
          <UButton
            :label="t('pages.index.hero.actions.talk')"
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
