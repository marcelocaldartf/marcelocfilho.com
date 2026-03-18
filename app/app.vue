<script setup lang="ts">
import * as locales from "@nuxt/ui/locale"

/* region Props */
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const { t, locale } = useI18n()
const localePath = useLocalePath()

const lang = computed(() => (locales as any)[locale.value]?.code || "en")
const dir = computed(() => (locales as any)[locale.value]?.dir || "ltr")

const searchLinks = computed(() => [
  {
    label: t("app.header.home"),
    icon: "lucide:home",
    to: localePath("/")
  },
  {
    label: t("app.header.projects"),
    icon: "lucide:folder",
    to: localePath("/projects")
  },
  {
    label: t("app.header.blog"),
    icon: "lucide:file-text",
    to: localePath("/blog")
  },
  {
    label: t("app.header.about"),
    icon: "lucide:user",
    to: localePath("/about")
  },
  {
    label: t("app.header.resume"),
    icon: "lucide:layout",
    to: localePath("/resume")
  },
  {
    label: t("app.header.contact"),
    icon: "lucide:mail",
    to: localePath("/contact")
  }
])

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    `navigation-${locale.value}`,
    async () => {
      const blogCollection = `${locale.value}_blog` as any
      const projectsCollection = `${locale.value}_projects` as any
      const [blogNavRaw, projectsNavRaw] = await Promise.all([
        queryCollectionNavigation(blogCollection),
        queryCollectionNavigation(projectsCollection)
      ])

      const blogNav = blogNavRaw?.[0]?.path === "/blog" ? blogNavRaw[0].children : blogNavRaw
      const projectsNav =
        projectsNavRaw?.[0]?.path === "/projects" ? projectsNavRaw[0].children : projectsNavRaw

      return [
        {
          path: localePath("/blog"),
          title: t("app.header.blog"),
          children: blogNav
        },
        {
          path: localePath("/projects"),
          title: t("app.header.projects"),
          children: projectsNav
        }
      ]
    },
    { watch: [locale] }
  ),
  useLazyAsyncData(
    `search-${locale.value}`,
    () => {
      const collection = `${locale.value}_blog` as any
      return queryCollectionSearchSections(collection)
    },
    {
      server: false,
      watch: [locale]
    }
  )
])

provide("navigation", navigation)
/* endregion */

/* region Meta */
useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
const { isMobile } = useDevice()

const targetX = ref(10)
const targetY = ref(50)
const currentX = ref(10)
const currentY = ref(50)
let animationId: number | null = null

const updatePosition = () => {
  // Smoothly interpolate current position towards target
  currentX.value += (targetX.value - currentX.value) * 0.08
  currentY.value += (targetY.value - currentY.value) * 0.08

  document.documentElement.style.setProperty("--mouse-x", `${currentX.value}%`)
  document.documentElement.style.setProperty("--mouse-y", `${currentY.value}%`)

  animationId = requestAnimationFrame(updatePosition)
}

const handleMouseMove = (e: MouseEvent) => {
  if (isMobile) return
  targetX.value = (e.clientX / window.innerWidth) * 100
  targetY.value = (e.clientY / window.innerHeight) * 100
}

onMounted(() => {
  if (!isMobile) {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    updatePosition()
  }
})

onUnmounted(() => {
  if (!isMobile) {
    window.removeEventListener("mousemove", handleMouseMove)
    if (animationId) cancelAnimationFrame(animationId)
  }
})
/* endregion */
</script>

<template>
  <UApp :locale="(locales as any)[locale]">
    <NuxtRouteAnnouncer />
    <NuxtAnnouncer />
    <NuxtLoadingIndicator color="#0064d7" />
    <NuxtLayout>
      <MCAppHeader />
      <UMain>
        <NuxtPage />
      </UMain>
      <MCAppFooter />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="searchLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
