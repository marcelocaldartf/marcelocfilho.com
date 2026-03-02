<script setup lang="ts">
import { navLinks } from "~/utils/links";

const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#020618" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s - Nuxt Portfolio Template",
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterCard: "summary_large_image",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData("navigation", async () => {
    const [blogNav, projectsNav] = await Promise.all([
      queryCollectionNavigation("blog"),
      queryCollectionNavigation("projects"),
    ]);

    return [
      {
        path: "/blog",
        title: "Blog",
        children: blogNav,
      },
      {
        path: "/projects",
        title: "Projects",
        children: projectsNav,
      },
    ];
  }),
  useLazyAsyncData(
    "search",
    () => {
      return queryCollectionSearchSections("blog");
    },
    {
      server: false,
    },
  ),
]);

provide("navigation", navigation);
</script>

<template>
  <UApp>
    <NuxtLayout>
      <MCAppHeader :links="navLinks" />
      <UContainer>
        <UMain class="relative pt-20">
          <NuxtPage />
        </UMain>
      </UContainer>
      <MCAppFooter />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
:root {
  --ui-header-height: 5rem;
}
</style>
