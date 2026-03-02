<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#020618" : "white"));

const { t, locale } = useI18n();
const localePath = useLocalePath();

const lang = computed(() => (locales as any)[locale.value]?.code || "en");
const dir = computed(() => (locales as any)[locale.value]?.dir || "ltr");

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang,
    dir,
  },
});

useSeoMeta({
  titleTemplate: t("app.seoTitleTemplate"),
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png",
  twitterCard: "summary_large_image",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    `navigation-${locale.value}`,
    async () => {
      const blogCollection = `${locale.value}_blog` as any;
      const projectsCollection = `${locale.value}_projects` as any;
      const [blogNavRaw, projectsNavRaw] = await Promise.all([
        queryCollectionNavigation(blogCollection),
        queryCollectionNavigation(projectsCollection),
      ]);

      const blogPath = localePath("/blog");
      const projectsPath = localePath("/projects");

      const blogNav = blogNavRaw?.[0]?.path === "/blog" ? blogNavRaw[0].children : blogNavRaw;
      const projectsNav =
        projectsNavRaw?.[0]?.path === "/projects" ? projectsNavRaw[0].children : projectsNavRaw;

      return [
        {
          path: localePath("/blog"),
          title: t("app.navigation.blog"),
          children: blogNav,
        },
        {
          path: localePath("/projects"),
          title: t("app.navigation.projects"),
          children: projectsNav,
        },
      ];
    },
    { watch: [locale] },
  ),
  useLazyAsyncData(
    `search-${locale.value}`,
    () => {
      const collection = `${locale.value}_blog` as any;
      return queryCollectionSearchSections(collection);
    },
    {
      server: false,
      watch: [locale],
    },
  ),
]);

const searchLinks = computed(() => [
  {
    label: t("app.navigation.home"),
    icon: "i-lucide-home",
    to: localePath("/"),
  },
  {
    label: t("app.navigation.projects"),
    icon: "i-lucide-folder",
    to: localePath("/projects"),
  },
  {
    label: t("app.navigation.resume"),
    icon: "i-lucide-layout",
    to: localePath("/resume"),
  },
  {
    label: t("app.navigation.blog"),
    icon: "i-lucide-file-text",
    to: localePath("/blog"),
  },
  {
    label: t("app.navigation.about"),
    icon: "i-lucide-user",
    to: localePath("/about"),
  },
  {
    label: t("app.navigation.contact"),
    icon: "i-lucide-mail",
    to: localePath("/contact"),
  },
]);

provide("navigation", navigation);
</script>

<template>
  <UApp :locale="(locales as any)[locale]">
    <NuxtLayout>
      <MCAppHeader />
      <UMain class="relative pt-20">
        <NuxtPage />
      </UMain>
      <MCAppFooter />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="searchLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
