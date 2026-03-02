<script setup lang="ts">
import { differenceInYears } from "date-fns"
import type { ButtonProps } from '@nuxt/ui'

/* region State */
const { t, tm, rt } = useI18n()

const age = differenceInYears(new Date(), new Date(1996, 3, 17))

const resumeUrl = "https://cdn.marcelocfilho.com/Resume/Resume_Marcelo_C_Filho.pdf"

const portugueseProgress = ref(100)
const englishProgress = ref(65)

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: t('pages.resume.hero.actions.hire'),
    to: '/contact',
    color: 'primary',
    variant: 'solid',
    class: 'pdf-exclude'
  },
  {
    label: t('pages.resume.hero.actions.downloadCv'),
    icon: 'lucide:download',
    onClick: downloadPDF,
    color: 'primary',
    variant: 'outline',
    class: 'pdf-exclude'
  }
])

const languages = computed(() => [
  {
    name: t('pages.resume.languages.items.portuguese'),
    level: t('pages.resume.languages.levels.native'),
    progress: portugueseProgress.value
  },
  {
    name: t('pages.resume.languages.items.english'),
    level: t('pages.resume.languages.levels.professional'),
    progress: englishProgress.value
  }
])

const volunteeringItems = computed(() => {
  return tm('pages.resume.sections.volunteering.items') as any
})

const educationItems = computed(() => {
  return tm('pages.resume.sections.education.items') as any
})

const certificationItems = computed(() => {
  return tm('pages.resume.sections.certifications.items') as any
})

const experienceItems = computed(() => {
  return tm('pages.resume.sections.experience.items') as any
})
/* endregion */

/* region Meta */
useHead({
  title: t('pages.resume.meta.title')
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
const downloadPDF = () => {
  const link = document.createElement('a')
  link.href = resumeUrl
  link.setAttribute('download', 'Resume_Marcelo_C_Filho.pdf')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
/* endregion */
</script>

<template>
  <UContainer>
    <div ref="pageRef">
      <UPage>
        <template #left>
          <div class="py-16 flex flex-col gap-lg p-lg">
            <div class="flex flex-col items-center justify-center gap-sm">
              <NuxtImg
                src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Marcelo C. Filho"
                class="h-24 w-24 rounded-full"
              />
              <h3 class="text-center text-white font-bold">Marcelo Caldart Filho</h3>
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
              >
                {{ t('pages.resume.sidebar.location') }}
              </UButton>
              <UButton
                block
                color="success"
                variant="ghost"
                to="/contact"
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
                <h5 class="text-white">{{ t('pages.resume.about.title') }}</h5>
              </div>
              <USeparator />
              <ul class="text-white">
                <li>
                  <span class="text-sm text-white"><strong>{{ t('pages.resume.about.fields.name') }}</strong> {{ t('pages.resume.about.fields.nameValue') }}</span>
                </li>
                <li>
                  <span class="text-sm text-white"><strong>{{ t('pages.resume.about.fields.gender') }}</strong> {{ t('pages.resume.about.fields.genderValue') }}</span>
                </li>
                <li>
                  <span class="text-sm text-white"><strong>{{ t('pages.resume.about.fields.pronouns') }}</strong> {{ t('pages.resume.about.fields.pronounsValue') }}</span>
                </li>
                <li>
                  <span class="text-sm text-white"><strong>{{ t('pages.resume.about.fields.nationality') }}</strong> {{ t('pages.resume.about.fields.nationalityValue') }}</span>
                </li>
                <li>
                  <span class="text-sm text-white"><strong>{{ t('pages.resume.about.fields.age') }}</strong> {{ age }}</span>
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="flex flex-row items-center gap-md">
                <UIcon name="lucide:languages" size="xs" />
                <h5 class="text-white">{{ t('pages.resume.languages.title') }}</h5>
              </div>
              <USeparator />
              <ul class="flex flex-col gap-md">
                <li v-for="lang in languages" :key="lang.name">
                  <div class="flex flex-col gap-xs">
                    <div class="flex w-full flex-row justify-between">
                      <h6 class="text-sm text-white">{{ lang.name }}</h6>
                      <span class="text-xs text-white">{{ lang.level }}</span>
                    </div>
                    <UProgress :model-value="lang.progress" size="sm" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <UPageHero
          :title="t('pages.resume.hero.title')"
          :description="t('pages.resume.hero.description')"
          orientation="horizontal"
          :links="heroLinks"
          :ui="{
            title: 'text-white',
            description: 'text-neutral-400',
            container: 'py-16 sm:py-16 lg:py-16'
          }"
        >
          <NuxtImg
            src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Marcelo C. Filho"
            class="w-full object-cover"
          />
        </UPageHero>

        <UPageSection
          :title="t('pages.resume.sections.skills.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <!-- Empty for now -->
        </UPageSection>

        <UPageSection
          :title="t('pages.resume.sections.tech.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <div class="grid grid-cols-2 gap-lg">
            <div class="flex flex-col gap-md">
              <h5>{{ t('pages.resume.sections.tech.categories.audio') }}</h5>
              <ul class="flex flex-col gap-xs">
                <li>
                  <UButton block variant="ghost" color="neutral" icon="fad:logo-reaper" to="https://www.reaper.fm/" target="_blank" class="justify-start">
                    Reaper
                  </UButton>
                </li>
                <li>
                  <UButton block variant="ghost" color="neutral" icon="simple-icons:protools" to="https://www.avid.com/pro-tools" target="_blank" class="justify-start">
                    Pro Tools
                  </UButton>
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-md">
              <h5>{{ t('pages.resume.sections.tech.categories.video') }}</h5>
              <ul class="flex flex-col gap-xs">
                <li>
                  <UButton block variant="ghost" color="neutral" icon="simple-icons:davinciresolve" to="https://www.blackmagicdesign.com/products/davinciresolve" target="_blank" class="justify-start">
                    DaVinci Resolve
                  </UButton>
                </li>
              </ul>
            </div>
          </div>
        </UPageSection>

        <UPageSection
          :title="t('pages.resume.sections.education.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <div v-for="(item, index) in educationItems" :key="index">
            <div class="flex flex-col gap-xs">
              <h3 class="text-white">{{ rt(item.degree) }}</h3>
              <span class="text-sm text-neutral-300">{{ rt(item.school) }}</span>
              <span class="text-xs text-neutral-400">{{ rt(item.period) }}</span>
            </div>
          </div>
        </UPageSection>

        <UPageSection
          v-if="certificationItems.length"
          :title="t('pages.resume.sections.certifications.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <div v-for="(item, index) in certificationItems" :key="index">
            <div class="flex flex-col gap-xs">
              <h3 class="text-white">{{ rt(item.name) }}</h3>
              <span class="text-sm text-neutral-300">{{ rt(item.issuer) }}</span>
              <span class="text-xs text-neutral-400">{{ rt(item.date) }}</span>
            </div>
          </div>
        </UPageSection>

        <UPageSection
          v-if="volunteeringItems.length"
          :title="t('pages.resume.sections.volunteering.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <div v-for="(item, index) in volunteeringItems" :key="index">
            <div class="flex flex-col gap-xs">
              <h3 class="text-white">{{ rt(item.role) }}</h3>
              <span class="text-sm text-neutral-300">{{ rt(item.organization) }}</span>
              <span class="text-xs text-neutral-400">{{ rt(item.period) }}</span>
              <span v-if="item.field" class="text-xs text-neutral-500 italic">{{ rt(item.field) }}</span>
            </div>
          </div>
        </UPageSection>

        <UPageSection
          :title="t('pages.resume.sections.experience.title')"
          :ui="{ title: 'text-left text-xl sm:text-2xl lg:text-3xl', container: 'gap-md sm:gap-md py-4 sm:py-6 lg:py-8' }"
        >
          <div v-for="(item, index) in experienceItems" :key="index">
            <div class="flex flex-col gap-xs">
              <h3 class="text-white">{{ rt(item.role) }}</h3>
              <span class="text-sm text-neutral-300">{{ rt(item.company) }}</span>
              <span class="text-xs text-neutral-400">{{ rt(item.period) }}</span>
              <ul v-if="item.bullets && Array.isArray(item.bullets)" class="list-inside list-disc text-white">
                <li v-for="(bullet, bIndex) in item.bullets" :key="bIndex">
                  <span class="text-white">{{ rt(bullet) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </UPageSection>
      </UPage>
    </div>
  </UContainer>
</template>

<style scoped></style>
