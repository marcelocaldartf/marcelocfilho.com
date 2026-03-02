<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData("projects", () => {
  return queryCollection("projects").order("date", "DESC").all();
});

const global = {
  meetingLink: 'https://cal.com/',
  email: 'hello@marcelocfilho.com',
};

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <UPageGrid>
        <UPageCard
          v-for="(project, index) in projects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :to="project.path"
          variant="naked"
          class="group"
          :ui="{
            root: 'ring ring-default hover:ring-2 hover:ring-primary-500 transition-all duration-300 rounded-xl overflow-hidden',
            header: 'p-0 h-48 relative',
            body: 'p-6',
            footer: 'p-6 pt-0 mt-auto'
          }"
        >
          <template #header>
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              label="View Project" 
              icon="i-lucide-arrow-right" 
              trailing 
              variant="link" 
              class="p-0 hover:text-primary" 
              :to="project.path" 
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
