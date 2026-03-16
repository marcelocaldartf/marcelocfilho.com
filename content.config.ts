import { defineCollection, defineContentConfig, property } from "@nuxt/content"
import { object, string, optional, picklist, array, number, date, pipe, minLength } from "valibot"

export const createButtonSchema = () =>
  object({
    label: string(),
    icon: optional(string()),
    to: optional(string()),
    color: optional(picklist(["primary", "neutral", "success", "warning", "error", "info"])),
    size: optional(picklist(["xs", "sm", "md", "lg", "xl"])),
    variant: optional(picklist(["solid", "outline", "subtle", "soft", "ghost", "link"])),
    target: optional(picklist(["_blank", "_self"]))
  })

const createImageSchema = () =>
  object({
    src: property(string()).editor({ input: "media" }),
    alt: string()
  })

const createAuthorSchema = () =>
  object({
    name: string(),
    description: optional(string()),
    username: optional(string()),
    twitter: optional(string()),
    to: optional(string()),
    avatar: optional(createImageSchema())
  })

const commonSchema = object({
  title: string(),
  description: optional(string()),
  links: optional(array(createButtonSchema())),
  content: optional(string()),
  images: optional(array(createImageSchema()))
})

const contactSchema = object({
  ...commonSchema.entries,
  contactItems: optional(
    array(
      object({
        icon: optional(string()),
        label: optional(string()),
        value: optional(string())
      })
    )
  ),
  recipientEmail: optional(string())
})

const blogSchema = object({
  ...commonSchema.entries,
  minRead: number(),
  date: date(),
  image: optional(property(string()).editor({ input: "media" })),
  author: createAuthorSchema()
})

const projectSchema = object({
  ...commonSchema.entries,
  title: pipe(string(), minLength(1)),
  description: pipe(string(), minLength(1)),
  image: optional(property(string()).editor({ input: "media" })),
  tags: array(string()),
  date: date()
})

const resumeSchema = object({
  ...commonSchema.entries,
  sidebar: optional(
    object({
      image: optional(property(string()).editor({ input: "media" })),
      location: optional(string()),
      locationLink: optional(string()),
      availability: optional(string()),
      dateOfBirth: optional(string()),
      about: optional(
        object({
          title: optional(string()),
          fields: array(
            object({
              label: string(),
              value: string()
            })
          )
        })
      ),
      languages: optional(
        array(
          object({
            name: string(),
            progress: number()
          })
        )
      )
    })
  ),
  hero: optional(
    object({
      title: optional(string()),
      description: optional(string()),
      image: optional(property(string()).editor({ input: "media" })),
      links: optional(array(createButtonSchema()))
    })
  ),
  skills: optional(property(string()).editor({ input: "markdown" })),
  tech: optional(
    array(
      object({
        title: string(),
        items: array(createButtonSchema())
      })
    )
  ),
  education: optional(
    array(
      object({
        degree: string(),
        school: string(),
        period: string()
      })
    )
  ),
  experience: optional(
    array(
      object({
        role: string(),
        company: string(),
        period: string(),
        bullets: array(string())
      })
    )
  ),
  certifications: optional(
    array(
      object({
        name: string(),
        issuer: string(),
        date: string()
      })
    )
  ),
  volunteering: optional(
    array(
      object({
        role: string(),
        organization: string(),
        period: string(),
        field: optional(string())
      })
    )
  )
})

export default defineContentConfig({
  collections: {
    en_blog: defineCollection({
      type: "page",
      source: { include: "en/blog/**", prefix: "/blog" },
      schema: blogSchema
    }),
    en_projects: defineCollection({
      type: "page",
      source: { include: "en/projects/**", prefix: "/projects" },
      schema: projectSchema
    }),
    en_about: defineCollection({
      type: "page",
      source: { include: "en/*about.{yml,md}", prefix: "/" },
      schema: commonSchema
    }),
    en_contact: defineCollection({
      type: "page",
      source: { include: "en/*contact.{yml,md}", prefix: "/" },
      schema: contactSchema
    }),
    en_resume: defineCollection({
      type: "page",
      source: { include: "en/*resume.{yml,md}", prefix: "/" },
      schema: resumeSchema
    }),
    en_pages: defineCollection({
      type: "page",
      source: { include: "en/*{blog,projects}.{yml,md}", prefix: "/" },
      schema: commonSchema
    }),

    pt_blog: defineCollection({
      type: "page",
      source: { include: "pt/blog/**", prefix: "/pt/blog" },
      schema: blogSchema
    }),
    pt_projects: defineCollection({
      type: "page",
      source: { include: "pt/projects/**", prefix: "/pt/projects" },
      schema: projectSchema
    }),
    pt_about: defineCollection({
      type: "page",
      source: { include: "pt/*about.{yml,md}", prefix: "/pt" },
      schema: commonSchema
    }),
    pt_contact: defineCollection({
      type: "page",
      source: { include: "pt/*contact.{yml,md}", prefix: "/pt" },
      schema: contactSchema
    }),
    pt_resume: defineCollection({
      type: "page",
      source: { include: "pt/*resume.{yml,md}", prefix: "/pt" },
      schema: resumeSchema
    }),
    pt_pages: defineCollection({
      type: "page",
      source: { include: "pt/*{blog,projects}.{yml,md}", prefix: "/pt" },
      schema: commonSchema
    })
  }
})
