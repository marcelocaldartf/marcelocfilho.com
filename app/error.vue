<script setup lang="ts">
import type { NuxtError } from "#app";
import { navLinks } from "~/utils/links";

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData("navigation", () => {
    return queryCollectionNavigation("blog");
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
</script>

<template>
  <div>
    <MCAppHeader :links="navLinks" />

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
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
