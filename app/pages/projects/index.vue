<script setup lang="ts">
const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_pages` as any;
    return queryCollection(collection).path("/projects").first();
  },
  { watch: [locale] },
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData(
  `projects-${locale.value}`,
  async () => {
    const collection = `${locale.value}_projects` as any;
    return queryCollection(collection).order("date", "DESC").all();
  },
  { watch: [locale] },
);

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageSection
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <UPageGrid>
        <UPageCard
          v-for="(project, index) in projects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :to="localePath(project.path)"
          variant="naked"
          class="group"
          :ui="{
            root: 'ring ring-default hover:ring-2 hover:ring-primary-500 transition-all duration-300 rounded-xl overflow-hidden',
            header: 'p-0 h-48 w-full relative overflow-hidden',
            body: 'p-6',
            footer: 'p-6 pt-0 mt-auto',
          }"
        >
          <template #header>
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="w-full h-full block object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute top-4 left-4">
              <UBadge variant="subtle" color="neutral" size="sm">
                {{ new Date(project.date).getFullYear() }}
              </UBadge>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap gap-1.5 pt-4 border-t border-default mb-4">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                variant="soft"
                color="neutral"
                size="xs"
              >
                {{ tag }}
              </UBadge>
            </div>
            <UButton
              :label="t('pages.projects.viewProject')"
              icon="i-lucide-arrow-right"
              trailing
              variant="link"
              class="p-0 hover:text-primary"
              :to="localePath(project.path)"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
