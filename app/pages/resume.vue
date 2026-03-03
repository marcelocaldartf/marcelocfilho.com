<script setup lang="ts">
import { differenceInYears } from "date-fns";
import type { ButtonProps } from "@nuxt/ui";

/* region State */
const { t, tm, rt } = useI18n();
const localePath = useLocalePath();

const age = differenceInYears(new Date(), new Date(1996, 3, 17));

const portugueseProgress = ref(100);
const englishProgress = ref(65);

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: t("pages.resume.hero.actions.hire"),
    to: localePath("/contact"),
    color: "primary",
    variant: "solid",
    class: "pdf-exclude",
  },
  {
    label: t("pages.resume.hero.actions.downloadCv"),
    icon: "lucide:download",
    onClick: downloadPDF,
    color: "primary",
    variant: "outline",
    class: "pdf-exclude",
  },
]);

const languages = computed(() => [
  {
    name: t("pages.resume.languages.items.portuguese"),
    level: t("pages.resume.languages.levels.native"),
    progress: portugueseProgress.value,
  },
  {
    name: t("pages.resume.languages.items.english"),
    level: t("pages.resume.languages.levels.professional"),
    progress: englishProgress.value,
  },
]);

const volunteeringItems = computed(() => [
  {
    role: t("pages.resume.sections.volunteering.items[0].role"),
    organization: t("pages.resume.sections.volunteering.items[0].organization"),
    period: t("pages.resume.sections.volunteering.items[0].period"),
    field: t("pages.resume.sections.volunteering.items[0].field"),
  },
]);

const educationItems = computed(() => [
  {
    degree: t("pages.resume.sections.education.items[0].degree"),
    school: t("pages.resume.sections.education.items[0].school"),
    period: t("pages.resume.sections.education.items[0].period"),
  },
]);

const certificationItems = computed(() => [
  {
    name: t("pages.resume.sections.certifications.items[0].name"),
    issuer: t("pages.resume.sections.certifications.items[0].issuer"),
    date: t("pages.resume.sections.certifications.items[0].date"),
  },
  {
    name: t("pages.resume.sections.certifications.items[1].name"),
    issuer: t("pages.resume.sections.certifications.items[1].issuer"),
    date: t("pages.resume.sections.certifications.items[1].date"),
  },
]);

const experienceItems = computed(() => [
  {
    role: t("pages.resume.sections.experience.items[0].role"),
    company: t("pages.resume.sections.experience.items[0].company"),
    period: t("pages.resume.sections.experience.items[0].period"),
    bullets: [
      t("pages.resume.sections.experience.items[0].bullets[0]"),
      t("pages.resume.sections.experience.items[0].bullets[1]"),
      t("pages.resume.sections.experience.items[0].bullets[2]"),
    ],
  },
  {
    role: t("pages.resume.sections.experience.items[1].role"),
    company: t("pages.resume.sections.experience.items[1].company"),
    period: t("pages.resume.sections.experience.items[1].period"),
    bullets: [
      t("pages.resume.sections.experience.items[1].bullets[0]"),
      t("pages.resume.sections.experience.items[1].bullets[1]"),
    ],
  },
  {
    role: t("pages.resume.sections.experience.items[2].role"),
    company: t("pages.resume.sections.experience.items[2].company"),
    period: t("pages.resume.sections.experience.items[2].period"),
    bullets: [
      t("pages.resume.sections.experience.items[2].bullets[0]"),
      t("pages.resume.sections.experience.items[2].bullets[1]"),
    ],
  },
  {
    role: t("pages.resume.sections.experience.items[3].role"),
    company: t("pages.resume.sections.experience.items[3].company"),
    period: t("pages.resume.sections.experience.items[3].period"),
    bullets: [
      t("pages.resume.sections.experience.items[3].bullets[0]"),
      t("pages.resume.sections.experience.items[3].bullets[1]"),
    ],
  },
]);
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.resume.meta.title"),
  description: t("pages.resume.hero.description"),
});
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = "https://cdn.marcelocfilho.com/Resume/Resume_Marcelo_C_Filho.pdf";
  link.setAttribute("download", "Resume_Marcelo_C_Filho.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/* endregion */
</script>

<template>
  <UContainer>
  <UPage>
    <UPageHero
      :title="t('pages.resume.hero.title')"
      :description="t('pages.resume.hero.description')"
      orientation="horizontal"
      :links="heroLinks"
      :ui="{
        title: 'text-highlighted',
        description: 'text-muted',
        container: 'py-8 sm:py-8 lg:py-8',
      }"
    >
        <NuxtImg
          src="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Images/marcelocfilho.webp"
          alt="Marcelo C. Filho"
          class="w-full object-cover"
        />
      </UPageHero>

      <UPageSection
        :title="t('pages.resume.sections.skills.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <!-- Empty for now -->
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.tech.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <div class="grid grid-cols-2 gap-lg">
          <div class="flex flex-col gap-md">
            <h5 class="text-highlighted">{{ t("pages.resume.sections.tech.categories.audio") }}</h5>
            <ul class="flex flex-col gap-xs">
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="fad:logo-reaper"
                  to="https://www.reaper.fm/"
                  target="_blank"
                  class="justify-start hover:text-primary-500"
                >
                  Reaper
                </UButton>
              </li>
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:protools"
                  to="https://www.avid.com/pro-tools"
                  target="_blank"
                  class="justify-start hover:text-primary-500"
                >
                  Pro Tools
                </UButton>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-md">
            <h5 class="text-highlighted">{{ t("pages.resume.sections.tech.categories.video") }}</h5>
            <ul class="flex flex-col gap-xs">
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:davinciresolve"
                  to="https://www.blackmagicdesign.com/products/davinciresolve"
                  target="_blank"
                  class="justify-start hover:text-primary-500"
                >
                  DaVinci Resolve
                </UButton>
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.education.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <div v-for="(item, index) in educationItems" :key="index">
          <div class="flex flex-col gap-xs">
            <h3 class="text-highlighted">{{ rt(item.degree) }}</h3>
            <span class="text-sm text-muted">{{ rt(item.school) }}</span>
            <span class="text-xs text-muted/80">{{ rt(item.period) }}</span>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        v-if="certificationItems.length"
        :title="t('pages.resume.sections.certifications.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <div v-for="(item, index) in certificationItems" :key="index">
          <div class="flex flex-col gap-xs">
            <h3 class="text-highlighted">{{ rt(item.name) }}</h3>
            <span class="text-sm text-muted">{{ rt(item.issuer) }}</span>
            <span class="text-xs text-muted/80">{{ rt(item.date) }}</span>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        v-if="volunteeringItems.length"
        :title="t('pages.resume.sections.volunteering.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <div v-for="(item, index) in volunteeringItems" :key="index">
          <div class="flex flex-col gap-xs">
            <h3 class="text-highlighted">{{ rt(item.role) }}</h3>
            <span class="text-sm text-muted">{{ rt(item.organization) }}</span>
            <span class="text-xs text-muted/80">{{ rt(item.period) }}</span>
            <span v-if="item.field" class="text-xs text-muted/60 italic">{{ rt(item.field) }}</span>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.experience.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8',
        }"
      >
        <div v-for="(item, index) in experienceItems" :key="index">
          <div class="flex flex-col gap-xs">
            <h3 class="text-highlighted">{{ rt(item.role) }}</h3>
            <span class="text-sm text-muted">{{ rt(item.company) }}</span>
            <span class="text-xs text-muted/80">{{ rt(item.period) }}</span>
            <ul
              v-if="item.bullets && Array.isArray(item.bullets)"
              class="list-inside list-disc text-highlighted"
            >
              <li v-for="(bullet, bIndex) in item.bullets" :key="bIndex">
                <span class="text-highlighted">{{ rt(bullet) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <template #left>
        <UPageAside>
          <div class="flex flex-col gap-lg">
            <div class="flex flex-col items-center justify-center gap-sm">
              <NuxtImg
                src="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Images/marcelocfilho.webp"
                alt="Marcelo C. Filho"
                class="h-24 w-24 rounded-full"
              />
              <h3 class="text-center font-bold text-highlighted">Marcelo Caldart Filho</h3>
              <UFieldGroup class="gap-xs pdf-exclude">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-simple-icons-linkedin"
                  to="https://www.linkedin.com/in/marcelocfilho/"
                  target="_blank"
                  class="hover:text-primary-500"
                />
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-simple-icons-soundcloud"
                  to="https://soundcloud.com/marcelo-filho-32565359"
                  target="_blank"
                  class="hover:text-primary-500"
                />
              </UFieldGroup>
              <UButton
                variant="ghost"
                color="neutral"
                icon="lucide:map-pin"
                to="https://en.wikipedia.org/wiki/Curitiba"
                class="hover:text-primary-500"
              >
                {{ t("pages.resume.sidebar.location") }}
              </UButton>
              <UButton
                block
                color="success"
                variant="ghost"
                :to="localePath('/contact')"
                class="gap-2 h-auto text-left pdf-exclude"
                :label="t('pages.resume.sidebar.availability')"
                :ui="{ label: 'whitespace-normal text-balance' }"
              >
                <template #leading>
                  <span class="relative flex size-2">
                    <span
                      class="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75"
                    />
                    <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
                  </span>
                </template>
              </UButton>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="flex flex-row items-center gap-md">
                <UIcon name="lucide:user" size="xs" />
                <h5 class="text-highlighted">{{ t("pages.resume.about.title") }}</h5>
              </div>
              <USeparator />
              <ul class="text-neutral-900 dark:text-neutral-100">
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.about.fields.name") }}</strong>
                    {{ t("pages.resume.about.fields.nameValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.about.fields.gender") }}</strong>
                    {{ t("pages.resume.about.fields.genderValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.about.fields.pronouns") }}</strong>
                    {{ t("pages.resume.about.fields.pronounsValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.about.fields.nationality") }}</strong>
                    {{ t("pages.resume.about.fields.nationalityValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.about.fields.age") }}</strong> {{ age }}</span
                  >
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="flex flex-row items-center gap-md">
                <UIcon name="lucide:languages" size="xs" />
                <h5 class="text-highlighted">{{ t("pages.resume.languages.title") }}</h5>
              </div>
              <USeparator />
              <ul class="flex flex-col gap-md">
                <li v-for="lang in languages" :key="lang.name">
                  <div class="flex flex-col gap-xs">
                    <div class="flex w-full flex-row justify-between">
                      <h6 class="text-sm text-highlighted">{{ lang.name }}</h6>
                      <span class="text-xs text-muted">{{ lang.level }}</span>
                    </div>
                    <UProgress :model-value="lang.progress" size="sm" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped></style>
