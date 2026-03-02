<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { en, pt } from "@nuxt/ui/locale";

const { t, locale, setLocale } = useI18n();
const localePath = useLocalePath();

const leftLinks = computed<NavigationMenuItem[]>(() => [
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
    label: t("app.navigation.blog"),
    icon: "i-lucide-file-text",
    to: localePath("/blog"),
  },
  {
    label: t("app.navigation.about"),
    icon: "i-lucide-user",
    to: localePath("/about"),
  },
]);

const rightLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.navigation.resume"),
    icon: "i-lucide-layout",
    to: localePath("/resume"),
  },
  {
    label: t("app.navigation.contact"),
    icon: "i-lucide-mail",
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
      <!-- Left Section -->
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

          <ULocaleSelect
            :model-value="locale"
            @update:model-value="setLocale($event as 'en' | 'pt')"
            :locales="[en, pt]"
            icon="i-lucide-languages"
            variant="ghost"
            size="sm"
            class="rounded-full shrink-0 h-full"
            :ui="{
              value: 'hidden',
              content: 'w-48',
            }"
            :aria-label="t('app.language_picker')"
          />

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

          <USlideover title="Menu" class="flex sm:hidden items-center">
            <UButton
              icon="i-lucide-menu"
              color="neutral"
              variant="ghost"
              class="rounded-full my-auto"
              aria-label="Open Menu"
            />
            <template #body>
              <div class="flex flex-col gap-4">
                <UNavigationMenu orientation="vertical" :items="[...leftLinks, ...rightLinks]" />
                <USeparator />
                <div class="flex items-center gap-2">
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
            </template>
          </USlideover>
        </div>
      </div>
    </div>
  </div>
</template>
