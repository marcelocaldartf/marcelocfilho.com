export default defineAppConfig({
  rimelightComponents: {
    logos: {
      logomark: {
        black: "branding:MC_LOGOMARK_BLACK",
        white: "branding:MC_LOGOMARK_WHITE",
        color: "branding:MC_LOGOTYPE_COLOR"
      },
      logotype: {
        black: "branding:MC_LOGOTYPE_BLACK",
        white: "branding:MC_LOGOTYPE_WHITE",
        color: "branding:MC_LOGOTYPE_COLOR"
      },
      combomark_horizontal: {
        black: "branding:MC_COMBOMARK_HORIZONTAL_BLACK",
        white: "branding:MC_COMBOMARK_HORIZONTAL_WHITE",
        color: "branding:MC_COMBOMARK_HORIZONTAL_COLOR"
      },
      combomark_vertical: {
        black: "branding:MC_COMBOMARK_VERTICAL_BLACK",
        white: "branding:MC_COMBOMARK_VERTICAL_WHITE",
        color: "branding:MC_COMBOMARK_VERTICAL_COLOR"
      }
    }
  },
  ui: {
    colors: {
      primary: "sky",
      neutral: "slate"
    },
    button: {
      slots: {
        base: "frutiger-gloss rounded-full font-bold inline-flex items-center justify-center transition-all duration-300 active:scale-95",
        leadingIcon: "text-inherit shrink-0 size-5",
        trailingIcon: "text-inherit shrink-0 size-5"
      },
      variants: {
        variant: {
          solid:
            "bg-primary hover:bg-primary/90 shadow-md hover:brightness-110 hover:shadow-xl shadow-primary-950/60 text-white dark:text-white",
          outline: "ring-2 ring-primary/50 hover:bg-primary/10"
        }
      }
    },
    badge: {
      slots: {
        base: "rounded-full font-bold"
      }
    },
    icon: {
      slots: {
        base: "aero-icon shrink-0"
      }
    },
    progress: {
      slots: {
        indicator:
          "frutiger-gloss rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform duration-200 ease-out"
      }
    },
    navigationMenu: {
      slots: {
        root: "relative flex flex-col sm:flex-row",
        list: "gap-2",
        link: "rounded-full transition-all duration-300"
      },
      variants: {
        active: {
          false: {
            link: "text-neutral-950 dark:text-white hover:text-primary-500",
            linkLeadingIcon: "text-neutral-950 dark:text-white group-hover:text-primary-500"
          }
        }
      },
      compoundVariants: [
        {
          active: true,
          variant: "pill",
          class: {
            link: "frutiger-gloss text-primary font-bold bg-transparent",
            linkLeadingIcon: "text-primary"
          }
        }
      ]
    },
    selectMenu: {
      slots: {
        base: "frutiger-gloss rounded-full inline-flex items-center"
      }
    },
    accordion: {
      slots: {
        item: "border-none",
        trigger:
          "frutiger-gloss bg-primary/12 dark:bg-primary/20 hover:bg-muted/50 rounded-full px-4 py-3 mb-2 font-medium transition-all duration-300",
        content: "px-4 pt-0 pb-4"
      }
    },
    tabs: {
      slots: {
        indicator: "!absolute frutiger-gloss rounded-full bg-primary",
        trigger: "rounded-full transition-all duration-300 data-[state=active]:!text-white"
      },
      compoundVariants: [
        {
          variant: "pill",
          class: {
            indicator: "inset-y-1"
          }
        }
      ]
    },
    contentSurround: {
      slots: {
        link: "frutiger-gloss bg-primary/12 dark:bg-primary/20 rounded-2xl p-6 shadow-xl border-none transition-all duration-300 hover:-translate-y-1",
        linkLeading:
          "bg-primary/10 dark:bg-primary/30 rounded-full p-2 mb-4 group-hover:bg-primary/20",
        linkLeadingIcon: "text-primary dark:text-primary-400"
      }
    },
    contentNavigation: {
      slots: {
        link: "rounded-lg transition-all duration-300 px-3 py-2",
        itemWithChildren: "data-[state=open]:mb-2"
      },
      variants: {
        active: {
          true: {
            link: "frutiger-gloss bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-400 font-bold shadow-md"
          },
          false: {
            link: "text-neutral-950 dark:text-white hover:bg-primary/5 dark:hover:bg-primary/10"
          }
        }
      }
    }
  },
  socials: [
    {
      icon: "simple-icons:linkedin",
      label: "LinkedIn",
      to: "https://www.linkedin.com/in/marcelocfilho"
    },
    {
      icon: "simple-icons:soundcloud",
      label: "SoundCloud",
      to: "https://soundcloud.com/marcelo-filho-32565359"
    }
  ]
})
