export default defineAppConfig({
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
        link: "frutiger-gloss rounded-full transition-all duration-300 before:rounded-full"
      },
      variants: {
        active: {
          true: {
            link: "text-primary font-bold bg-transparent",
            linkLeadingIcon: "text-primary"
          },
          false: {
            link: "text-neutral-950 dark:text-white hover:text-primary",
            linkLeadingIcon: "text-neutral-950 dark:text-white group-hover:text-primary"
          }
        }
      },
      compoundVariants: []
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
    },
    slideover: {
      slots: {
        root: "backdrop-blur-sm",
        overlay: "bg-neutral-950/50 dark:bg-neutral-950/70",
        content: "bg-white/40 dark:bg-sky-950/30 backdrop-blur-2xl rounded-r-2xl",
        close: "rounded-full size-9 shrink-0"
      },
      variants: {
        side: {
          left: {
            content: "max-w-2/3"
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
