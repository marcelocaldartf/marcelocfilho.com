<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

/* region Props */
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const { socials } = useAppConfig()

const open = ref(false)

const leftLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.header.home"),
    to: localePath("/"),
    icon: "lucide:house"
  },
  {
    label: t("app.header.projects"),
    to: localePath("/projects"),
    icon: "lucide:folder-git-2"
  },
  {
    label: t("app.header.blog"),
    to: localePath("/blog"),
    icon: "lucide:newspaper"
  },
  {
    label: t("app.header.about"),
    to: localePath("/about"),
    icon: "lucide:user"
  }
])

const rightLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.header.resume"),
    to: localePath("/resume"),
    icon: "lucide:file-text"
  },
  {
    label: t("app.header.contact"),
    to: localePath("/contact"),
    icon: "lucide:mail"
  }
])
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <header class="px-sm fixed inset-x-0 top-2 z-50 mx-auto max-w-(--ui-container) sm:top-4">
    <div
      class="frutiger-gloss px-md py-xs flex w-full items-center justify-between rounded-full border border-sky-200/50 bg-white/70 shadow-lg shadow-sky-950/10 backdrop-blur-xl dark:border-sky-500/30 dark:bg-sky-950/60"
    >
      <!-- Left Section -->
      <div class="flex items-center">
        <USlideover
          v-model:open="open"
          side="left"
          :ui="{ content: 'w-2/3' }"
          :title="t('app.title')"
          :description="t('app.description')"
        >
          <UButton
            icon="lucide:menu"
            color="neutral"
            variant="ghost"
            class="my-auto rounded-full sm:hidden"
            aria-label="Open Menu"
          />
          <template #body>
            <div class="gap-md flex flex-col">
              <UNavigationMenu
                orientation="vertical"
                :items="[...leftLinks, ...rightLinks]"
                color="primary"
              />
              <LazyUSeparator />
              <div class="gap-sm flex flex-col">
                <UButton
                  v-for="link in socials"
                  :key="link.label"
                  v-bind="link"
                  color="neutral"
                  variant="ghost"
                  class="hover:text-primary-500"
                  :aria-label="link.label"
                />
              </div>
            </div>
          </template>
        </USlideover>

        <div class="hidden items-center sm:flex">
          <UNavigationMenu :items="leftLinks" color="primary" variant="pill" />
        </div>
      </div>

      <!-- Right Section -->
      <div class="gap-sm flex items-stretch self-stretch">
        <div class="hidden items-center sm:flex">
          <UNavigationMenu :items="rightLinks" color="primary" variant="pill" />
        </div>

        <div class="gap-xs hidden items-center sm:flex">
          <UButton
            v-for="link in socials"
            :key="link.label"
            v-bind="{ ...link, label: undefined }"
            color="neutral"
            variant="ghost"
            class="hover:text-primary-500"
            :aria-label="link.label"
          />
        </div>

        <div class="flex items-center gap-1">
          <UColorModeButton
            size="md"
            color="neutral"
            variant="ghost"
            class="hover:text-primary-500"
            aria-label="Toggle color mode"
          />

          <USelectMenu
            :model-value="locale"
            @update:model-value="setLocale($event as 'en' | 'pt')"
            :items="[
              { code: 'en', name: 'English' },
              { code: 'pt', name: 'Português' }
            ]"
            value-key="code"
            label-key="name"
            variant="ghost"
            color="neutral"
            size="md"
            icon="lucide:languages"
            class="hover:text-primary-500 shrink-0"
            :ui="{
              base: 'w-fit min-w-0 h-9',
              leading: 'ps-2.5',
              trailing: 'pe-2.5',
              leadingIcon: 'text-inherit',
              trailingIcon: 'text-inherit',
              content: 'w-48'
            }"
            :aria-label="t('app.header.languagePicker')"
          >
            <span class="text-xs leading-none font-bold">{{ locale === "pt" ? "PT" : "EN" }}</span>
            <template #item-leading="{ item }">
              <span class="text-xs font-medium">{{ item.code.toUpperCase() }}</span>
            </template>
          </USelectMenu>
        </div>
      </div>
    </div>
  </header>
</template>
