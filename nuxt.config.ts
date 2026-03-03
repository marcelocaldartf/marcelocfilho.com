export default defineNuxtConfig({
  compatibilityDate: "2026-02-13",
  future: {
    compatibilityVersion: 5,
  },
  experimental: {
    viteEnvironmentApi: false,
    typescriptPlugin: true,
    nitroAutoImports: true,
    componentIslands: {
      selectiveClient: true,
    },
  },

  modules: [
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
    "nuxt-llms",
    "nuxt-og-image",
    "nuxt-studio",
  ],

  $development: {
    devtools: { enabled: true },
    // Change to true in case the issue gets resolved: https://github.com/fi3ework/vite-plugin-checker/issues/557
    typescript: { typeCheck: false },
    a11y: {
      enabled: true,
      defaultHighlight: false,
      logIssues: false,
    },
    site: { indexable: false },
  },

  $test: {
    devtools: { enabled: true },
  },

  $production: {
    devtools: { enabled: false },
    typescript: { typeCheck: false },
    nitro: {
      prerender: {
        routes: ["/"],
        crawlLinks: true,
      },
    },
    // Switch to true on release
    site: { url: "https://marcelocfilho.com", indexable: false },
    robots: {
      blockAiBots: true,
      blockNonSeoBots: true,
      disallow: ["/dashboard"],
    },
    a11y: {
      enabled: false,
    },
    content: {
      database: {
        type: "d1",
        bindingName: "DB",
      },
    },
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
      {
        code: "pt",
        name: "Português",
        language: "pt-BR",
        file: "pt.json",
      },
    ],
  },

  css: ["~/assets/css/main.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
      prefix: "MC",
    },
    {
      path: "~/pages",
      pattern: "**/components/**",
      pathPrefix: false,
      prefix: "MC",
    },
  ],

  image: {
    format: ["webp"],
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://cdn.marcelocfilho.com",
    },
  },

  icon: {
    class: "icon",
    size: "24px",
    customCollections: [
      {
        prefix: "first-party",
        dir: "./app/assets/icons/first-party",
        normalizeIconName: false,
      },
      {
        prefix: "logos",
        dir: "./app/assets/icons/first-party/logos",
        normalizeIconName: false,
      },
      {
        prefix: "third-party",
        dir: "./app/assets/icons/third-party",
        normalizeIconName: false,
      },
    ],
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
      },
    },
  },

  studio: {
    i18n: {
      defaultLocale: "en",
    },
    route: "/studio",
    repository: {
      provider: "github",
      owner: "marcelocaldartf",
      repo: "marcelocfilho.com",
    },
  },

  llms: {
    domain: "https://marcelocfilho.com",
    title: "Marcelo Caldart Filho",
    description: "My personal portfolio website.",
  },
});
