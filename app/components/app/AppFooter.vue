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
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "simple-icons:linkedin",
    to: "https://www.linkedin.com/in/marcelocfilho",
    class: "hover:text-primary-500",
  },
  {
    name: "SoundCloud",
    icon: "simple-icons:soundcloud",
    to: "https://soundcloud.com/marcelo-filho-32565359",
  },
]
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
      <p class="text-muted text-xs">© {{ new Date().getFullYear() }} Marcelo Caldart Filho</p>
    </template>

    <template #right>
      <UButton
        v-for="link in socialLinks"
        :key="link.name"
        size="sm"
        color="neutral"
        variant="ghost"
        :icon="link.icon"
        :to="link.to"
        target="_blank"
        :aria-label="link.name"
        :class="link.class"
      />
    </template>
  </UFooter>
</template>

