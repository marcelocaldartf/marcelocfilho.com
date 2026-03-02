<script setup lang="ts">
const { t, tm, rt } = useI18n()

/* region Meta */
useSeoMeta({
  title: t('pages.index.meta.title'),
});
/* endregion */

/* region Data */
const global = {
  picture: {
    dark: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    light:
      'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Marcelo C. Filho',
  },
  meetingLink: 'https://cal.com/marcelocfilho',
  email: 'hello@marcelocfilho.com',
  available: true,
};

const landingHeroImages = [
  { src: '/hero/random-1.avif', alt: 'Random Image 1' },
  { src: '/hero/random-2.avif', alt: 'Random Image 2' },
  { src: '/hero/random-3.avif', alt: 'Random Image 3' },
  { src: '/hero/random-4.avif', alt: 'Random Image 4' },
  { src: '/hero/random-5.avif', alt: 'Random Image 5' },
  { src: '/hero/random-6.avif', alt: 'Random Image 6' },
  { src: '/hero/random-7.avif', alt: 'Random Image 7' },
  { src: '/hero/random-8.avif', alt: 'Random Image 8' },
  { src: '/hero/random-9.avif', alt: 'Random Image 9' },
];

const experienceItems = computed<any[]>(() => {
  return tm('pages.index.experience.items') as any
})

const testimonialItems = computed<any[]>(() => {
  return tm('pages.index.testimonials.items') as any
})

const faqItems = computed(() => {
  const categories = tm('pages.index.faq.categories')
  return Array.isArray(categories) ? categories.map((cat: any) => ({
    label: rt(cat.title),
    questions: Array.isArray(cat.questions) ? cat.questions.map((q: any) => ({
      label: rt(q.label),
      content: rt(q.content)
    })) : []
  })) : []
})

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
);

const faqUi = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator:
    'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger:
    'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'truncate',
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
        <UColorModeAvatar
          class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg) mx-auto"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </template>

      <template #links>
        <div class="flex flex-col items-center gap-4">
          <UButton :label="t('pages.index.hero.actions.talk')" to="/contact" color="primary" variant="solid" size="lg" />
        </div>
      </template>

      <UMarquee pause-on-hover class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]">
        <NuxtImg
          v-for="(img, index) in landingHeroImages"
          :key="index"
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </UMarquee>
    </UPageHero>

    <!-- About & Experience Section -->
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8',
      }"
    >
      <!-- About -->
      <UPageSection
        :title="t('pages.index.about.title')"
        :description="t('pages.index.about.description')"
        :ui="{
          container: '!p-0',
          title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
          description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted',
        }"
      />

      <!-- Work Experience -->
      <UPageSection
        :title="t('pages.index.experience.title')"
        :ui="{
          container: '!p-0 gap-4 sm:gap-4',
          title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
          description: 'mt-2',
        }"
      >
        <template #description>
          <div class="flex flex-col gap-2">
            <div
              v-for="(experience, index) in experienceItems"
              :key="index"
              class="text-muted flex items-center text-nowrap gap-2"
            >
              <p class="text-sm">
                {{ rt(experience.date) }}
              </p>
              <USeparator />
              <ULink class="flex items-center gap-1" :to="rt(experience.company.url)" target="_blank">
                <span class="text-sm">
                  {{ rt(experience.position) }}
                </span>
                <div
                  class="inline-flex items-center gap-1"
                  :style="{ color: rt(experience.company.color) }"
                >
                  <span class="font-medium">{{ rt(experience.company.name) }}</span>
                  <UIcon :name="rt(experience.company.logo)" />
                </div>
              </ULink>
            </div>
          </div>
        </template>
      </UPageSection>
    </UPageSection>

    <!-- Blog Section -->
    <UPageSection
      v-if="posts"
      :title="t('pages.index.blog.title')"
      :description="t('pages.index.blog.description')"
      :ui="{
        container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted',
      }"
    >
      <UBlogPosts orientation="vertical" class="gap-4 lg:gap-y-4">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          orientation="horizontal"
          variant="naked"
          v-bind="post"
          :to="post.path"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: '!px-0',
            header: 'hidden',
          }"
        >
          <template #footer>
            <UButton size="xs" variant="link" class="px-0 gap-0" :label="t('pages.index.blog.readMore')">
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

    <!-- Testimonials Section -->
    <UPageSection
      v-if="testimonialItems.length"
      :ui="{
        container: 'px-0 !pt-0',
      }"
    >
      <UCarousel
        v-slot="{ item }"
        :items="testimonialItems"
        :autoplay="{ delay: 4000 }"
        loop
        dots
        :ui="{
          viewport: '-mx-4 sm:-mx-12 lg:-mx-16 max-w-(--ui-container)',
        }"
      >
        <UPageCTA
          variant="naked"
          class="rounded-none w-full"
          :ui="{
            container: 'sm:py-12 lg:py-12 sm:gap-10',
          }"
        >
          <template #description>
            <div class="flex flex-col items-center gap-4 text-center">
              <UIcon name="i-lucide-quote" class="size-8 text-dimmed rotate-180" />
              <p class="!text-xl text-balance italic font-serif text-highlighted">
                {{ rt(item.quote) }}
              </p>
              <UIcon name="i-lucide-quote" class="size-8 text-dimmed" />
            </div>
          </template>
          <UUser
            v-if="item && item.author"
            :name="rt(item.author.name)"
            :description="rt(item.author.description)"
            size="xl"
            class="justify-center"
          />
        </UPageCTA>
      </UCarousel>
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
    </UPageSection>

    <!-- Post CTA -->
    <UPageCTA
      :title="t('pages.contact.form.title')"
      :description="t('pages.contact.hero.description')"
      align="center"
      variant="naked"
    >
      <template #links>
        <div class="flex flex-col items-center gap-4">
          <UButton :label="t('pages.index.hero.actions.talk')" to="/contact" color="primary" variant="solid" size="lg" />
        </div>
      </template>
    </UPageCTA>
  </UPage>
</template>
