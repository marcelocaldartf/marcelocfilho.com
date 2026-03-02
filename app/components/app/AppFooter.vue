<script setup lang="ts">
const currentYear = new Date().getFullYear();

const links = [
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
  <footer
    class="mx-auto w-full max-w-(--ui-container) px-4 py-8 mb-4 text-muted text-xs flex flex-col-reverse sm:flex-row items-center justify-between gap-4"
  >
    <div>© {{ currentYear }} Marcelo Caldart Filho</div>

    <div class="flex items-center gap-1">
      <UButton
        v-for="(link, index) of links"
        :key="index"
        v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
        class="hover:text-primary-500"
      />
    </div>
  </footer>
</template>
