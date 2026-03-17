<script setup lang="ts">
/* region Props */
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const { socials } = useAppConfig()
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UFooter>
    <template #left>
      <div
        class="frutiger-gloss bg-primary/20 dark:bg-primary/20 rounded-full px-4 py-1.5 shadow-lg"
      >
        <p class="text-xs font-medium text-neutral-950 dark:text-white">
          © {{ new Date().getFullYear() }} Marcelo Caldart Filho
        </p>
      </div>
    </template>

    <template #right>
      <UButton
        v-for="link in socials"
        :key="link.label"
        v-bind="{ ...link, label: undefined }"
        size="md"
        color="neutral"
        variant="ghost"
        class="hover:text-primary-500"
        :aria-label="link.label"
      />
    </template>
  </UFooter>
</template>
