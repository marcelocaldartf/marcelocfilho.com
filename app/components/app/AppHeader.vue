<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { en, pt } from "@nuxt/ui/locale";

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const open = ref(false);

// Close slideover when route changes
watch(
  () => route.path,
  () => {
    open.value = false;
  },
);

const leftLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.navigation.home"),
    to: localePath("/"),
  },
  {
    label: t("app.navigation.projects"),
    to: localePath("/projects"),
  },
  {
    label: t("app.navigation.blog"),
    to: localePath("/blog"),
  },
  {
    label: t("app.navigation.about"),
    to: localePath("/about"),
  },
]);

const rightLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.navigation.resume"),
    to: localePath("/resume"),
  },
  {
    label: t("app.navigation.contact"),
    to: localePath("/contact"),
  },
]);

const socialLinks = [
  {
    icon: "i-simple-icons-soundcloud",
    to: "https://soundcloud.com/marcelo-filho-32565359",
    target: "_blank",
    "aria-label": "SoundCloud",
  },
  {
    icon: "i-simple-icons-linkedin",
    to: "https://www.linkedin.com/in/marcelocfilho/",
    target: "_blank",
    "aria-label": "LinkedIn",
  },
];
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-50 w-full max-w-(--ui-container) px-4"
  >
    <div
      class="flex items-center justify-between bg-muted/80 backdrop-blur-sm rounded-full px-4 py-1 border border-muted/50 shadow-lg shadow-neutral-950/5"
    >
      <!-- Left Section (Mobile Menu / Desktop Nav) -->
      <div class="flex items-center">
        <USlideover v-model:open="open" side="left" :ui="{ content: 'w-2/3' }" title="Menu">
          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            class="rounded-full my-auto sm:hidden"
            aria-label="Open Menu"
          />
          <template #body>
            <div class="flex flex-col gap-4">
              <UNavigationMenu orientation="vertical" :items="[...leftLinks, ...rightLinks]" />
              <USeparator />
              <div class="flex flex-col gap-2">
                <UButton
                  v-for="(link, index) in socialLinks"
                  :key="index"
                  v-bind="link"
                  variant="ghost"
                  color="neutral"
                  size="md"
                  class="hover:text-primary-500"
                >
                  {{ link["aria-label"] }}
                </UButton>
              </div>
            </div>
          </template>
        </USlideover>

        <div class="hidden sm:flex items-center">
          <UNavigationMenu
            :items="leftLinks"
            variant="link"
            color="neutral"
            :ui="{
              link: 'px-2 py-1',
              linkLeadingIcon: 'hidden',
            }"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex self-stretch items-stretch gap-1">
        <div class="hidden sm:flex items-center">
          <UNavigationMenu
            :items="rightLinks"
            variant="link"
            color="neutral"
            :ui="{
              link: 'px-2 py-1',
              linkLeadingIcon: 'hidden',
            }"
          />
        </div>

        <div class="hidden sm:block mx-1 my-2 w-px bg-muted/50" />

        <div class="flex items-stretch gap-1">
          <MCColorModeButton />

          <USelectMenu
            :model-value="locale"
            @update:model-value="setLocale($event as 'en' | 'pt')"
            :items="[
              { code: 'en', name: 'English' },
              { code: 'pt', name: 'Português' },
            ]"
            value-key="code"
            label-key="name"
            icon="i-lucide-languages"
            variant="ghost"
            size="sm"
            class="rounded-full shrink-0 h-full"
            :ui="{
              value: 'hidden',
              content: 'w-48',
            }"
            :aria-label="t('app.language_picker')"
          >
            <template #leading="{ modelValue }">
              <span class="text-xs font-medium">{{ modelValue === "pt" ? "PT" : "EN" }}</span>
            </template>
            <template #item-leading="{ item }">
              <span class="text-xs font-medium">{{ item.code.toUpperCase() }}</span>
            </template>
          </USelectMenu>

          <div class="hidden sm:flex items-center gap-0.5">
            <UButton
              v-for="(link, index) in socialLinks"
              :key="index"
              v-bind="link"
              variant="ghost"
              color="neutral"
              size="md"
              class="rounded-full hover:text-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
