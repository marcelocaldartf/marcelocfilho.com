<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

const { t, locale } = useI18n();
const localePath = useLocalePath();

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

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    `navigation-${locale.value}`,
    () => {
      const collection = `${locale.value}_blog` as any;
      return queryCollectionNavigation(collection);
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
</script>

<template>
  <div>
    <MCAppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <MCAppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="searchLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
