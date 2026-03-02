<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { en, pt } from "@nuxt/ui/locale";

const props = defineProps<{
  links: NavigationMenuItem[];
}>();

const { t, locale } = useI18n();

const leftLinks = computed(() => props.links.filter(link => 
  ['/', '/projects', '/blog', '/about'].includes(link.to as string)
));

const rightLinks = computed(() => props.links.filter(link => 
  ['/resume', '/contact'].includes(link.to as string)
));

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
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-50 w-full max-w-(--ui-container) px-4">
    <div class="flex items-center justify-between bg-muted/80 backdrop-blur-sm rounded-full px-4 py-1 border border-muted/50 shadow-lg shadow-neutral-950/5">
      <!-- Left Section -->
      <UNavigationMenu
        :items="leftLinks"
        variant="link"
        color="neutral"
        :ui="{
          link: 'px-2 py-1',
          linkLeadingIcon: 'hidden',
        }"
      />

      <!-- Right Section -->
      <div class="flex items-center gap-1">
        <UNavigationMenu
          :items="rightLinks"
          variant="link"
          color="neutral"
          :ui="{
            link: 'px-2 py-1',
            linkLeadingIcon: 'hidden',
          }"
        />

        <div class="mx-1 h-4 w-px bg-muted/50" />

        <div class="flex items-center gap-1">
          <MCColorModeButton />

          <ULocaleSelect
            v-model="locale"
            :locales="[en, pt]"
            icon="i-lucide-languages"
            variant="ghost"
            size="sm"
            class="rounded-full shrink-0"
            :ui="{ value: 'hidden' }"
            :aria-label="t('app.language_picker')"
          />

          <div class="flex items-center gap-0.5">
            <UButton
              v-for="(link, index) in socialLinks"
              :key="index"
              v-bind="link"
              variant="ghost"
              color="neutral"
              size="sm"
              class="rounded-full hover:text-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
