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
    "@nuxtjs/seo",
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "nuxt-llms",
    "nuxt-security",
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
      experimental: {
        websocket: true,
        tasks: true,
      },
      compressPublicAssets: true,
      minify: true,
      preset: "cloudflare-module",
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
      },
      prerender: {
        routes: ["/"],
        crawlLinks: true,
      },
    },
    site: {
      url: "https://marcelocfilho-dot-com.marcelocaldartfilho.workers.dev/",
      indexable: true,
    },
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

  vite: {
    clearScreen: false,
    server: {
      strictPort: true,
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
      },
    },
  },

  ssr: true,

  app: {
    baseURL: "/",
    head: {
      title: "Marcelo Caldart Filho",
      titleTemplate: "%s | Marcelo Caldart Filho",
      meta: [
        {
          name: "description",
          content: "My personal portfolio.",
        },
        {
          name: "author",
          content: "Marcelo Caldart Filho",
        },
        {
          name: "creator",
          content: "Marcelo Caldart Filho",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
    viewTransition: true,
  },

  security: {
    ssg: {
      meta: false,
      exportToPresets: false,
    },
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "https://marcelocfilho-dot-com.marcelocaldartfilho.workers.dev/",
          "https://placehold.co",
        ],
        "script-src": ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
        "script-src-attr": ["'none'"],
        "connect-src": [
          "'self'",
          "https://marcelocfilho-dot-com.marcelocaldartfilho.workers.dev/",
          "https://api.iconify.design",
          "https://api.unisvg.com",
          "https://api.simplesvg.com",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "frame-ancestors": ["'self'"],
        "form-action": ["'self'"],
        "require-trusted-types-for": "'script'",
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      crossOriginOpenerPolicy: "same-origin",
      referrerPolicy: "strict-origin-when-cross-origin",
      xFrameOptions: "SAMEORIGIN",
      xContentTypeOptions: "nosniff",
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

  pages: {
    pattern: ["**/*.vue", "!**/components/**"],
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
  },

  fonts: {
    defaults: {
      weights: [
        // Thin
        100,
        // ExtraLight
        200,
        // Light
        300,
        // Regular
        400,
        // Medium
        500,
        // SemiBold
        600,
        // Bold
        700,
        // Extra Bold
        800,
      ],
      styles: ["normal", "italic"],
    },
    families: [],
  },

  icon: {
    class: "icon",
    size: "24px",
    customCollections: [],
  },

  image: {
    format: ["webp"],
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://marcelocfilho-dot-com.marcelocaldartfilho.workers.dev/",
    },
  },

  ogImage: {
    zeroRuntime: true,
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

  ui: {
    prefix: "U",
    mdc: true,
    content: true,
    theme: {
      colors: [
        "neutral",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "commentary",
        "ideation",
        "source",
      ],
    },
  },
});
