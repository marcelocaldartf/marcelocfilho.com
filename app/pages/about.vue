<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_pages` as any;
    return queryCollection(collection).path("/about").first();
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

const global = {
  picture: {
    dark: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    light:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "My profile picture",
  },
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
    <UPageSection
      :title="page.title"
      :description="page.description"
      orientation="vertical"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <div class="flex flex-col sm:grid sm:grid-cols-3 gap-24">
        <div class="order-first sm:order-last sm:col-span-1 w-full aspect-square sm:rotate-4">
          <UColorModeAvatar
            class="w-full h-full rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
            :light="global.picture?.light!"
            :dark="global.picture?.dark!"
            :alt="global.picture?.alt!"
          />
        </div>
        <MDC :value="page.content" unwrap="p" class="order-last sm:order-first sm:col-span-2" />
      </div>
    </UPageSection>
  </UPage>
</template>
