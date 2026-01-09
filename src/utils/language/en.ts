const en = {
  general: {
    project_name: "Marco Romero - Portfolio",
    name: "Marco Romero",
    titles: {
      home: "Home - Marco Romero",
      articles: "Blog - Marco Romero",
      about: "About me - Marco Romero",
    },
    descriptions: {
      home: "Marco Romero's portfolio, a UI developer specialized in accessibility and front-end.",
      articles: "Read Marco Romero's blog about accessibility, UI systems and front-end.",
      about: "Get to know Marco Romero, a UI developer specialized in accessibility and front-end.",
    },
  },
  header: {
    home: "Home",
    articles: "Blog",
    about: "About me",
    es: "Spanish",
    en: "English",
    language: "Language",
    skipToContent: "Skip to main content",
    nav: "Navigation menu",
    index_img: "Home - Marco Romero - Portfolio",
    open_nav: "Open menu",
    close_nav: "Close menu",
    mode_dark: "Enable dark mode",
    mode_light: "Enable light mode",
    icon_dark: "Dark mode icon",
    icon_light: "Light mode icon",
  },
  footer: {
    copyright: "All rights reserved.",
  },
  home: {
    welcome: "Welcome to my portfolio",
    image: "Marco placeholder image",
    aria: {
      introSection: "Main introduction section",
      openCvNewTab: "Open Marco's CV in a new tab",
      openLinkedinNewTab: "Open Marco's LinkedIn profile in a new tab",
      sendEmail: "Send an email to Marco",
    },
    hero: {
      greeting: "Hi! I'm",
      description:
        "UI developer passionate about building accessible, intuitive and people-centered digital experiences.",
      currentJob: "Currently working at",
      company: "Knowmad mood",
      role: "UI Frontend Developer",
      projectsButton: "View articles",
      contactButton: "Contact me",
      cvButton: "View CV",
    },
    projects: {
      title: "Projects",
      featuredId: "pomodoro",
      items: {
        pomodoro: {
          category: "Productivity",
          title: "Focus Mode - Pomodoro",
          description:
            "A Pomodoro app designed to maximize real focus, featuring customizable sessions, progress tracking, and a carefully crafted interface focused on mindful productivity.",
          imageAlt: "Focus Mode Pomodoro app screenshot",
          cta: {
            label: "Try demo",
            href: "https://focus-mode-pomodoro.vercel.app/",
          },
          tags: ["Next.js", "Tailwind", "TypeScript", "Supabase"],
          imageSrc: "/pomodoro-hero.png",
          badge: "Live",
        },
        fintrack: {
          category: "Desktop app",
          title: "Fintrack",
          description:
            "Desktop app to track personal finances (monthly/yearly + history) with charts and sortable tables. Import data from CSV or by pasting text. Everything is stored locally in a SQLite database.",
          imageAlt: "Fintrack app screenshot",
          cta: {
            label: "View on GitHub",
            href: "https://github.com/marcorm91/fintrack-app",
          },
          tags: ["React", "Vite", "TypeScript", "Tailwind", "Tauri", "SQLite", "Chart.js"],
          imageSrc: "/fintrack-hero.png",
        },
      },
    },
  },
  articles: {
    title: "Blog & notes",
    description: "Short reads about accessibility, UI systems and front-end.",
    readTimeSuffix: "min read",
    readMore: "Open post",
    back: "Back to blog",
    noLink: "Link coming soon",
    loadMore: "Loading more posts...",
    collaborator: "Contributor",
    linkedin: "LinkedIn",
    readBadge: "Read",
    markRead: "Mark as read",
    markUnread: "Mark as unread",
    readBadgeAria: "Read badge",
    filterTitle: "Filter by date",
    filterReset: "Clear",
    share: "Share",
    shareTwitter: "Share on X",
    shareLinkedin: "Share on LinkedIn",
    copyLink: "Copy link",
    copied: "Link copied",
    ctaPrefix: "Want to publish new posts or collaborate?",
    ctaLink: "Contact me",
  },
  profile: {
    title: "About me",
    work_experience: "Work experience",
    studies: "Education",
    ui: {
      present: "Present",
      view_site: "View site",
    },
    summary: {
      short: "UI developer with 9+ years of experience, focused on accessibility, performance and UX.",
      long:
        "With more than 9 years of experience in the industry, I’ve adapted to a wide range of technologies. I specialize in creating intuitive and attractive user interfaces, with a focus on user experience (UX) and performance. I’ve worked with frontend technologies such as React, Vue and Angular, as well as platforms like Liferay, which allows me to deliver end-to-end, scalable solutions. My approach is always innovation and high-quality delivery, ensuring an excellent user experience in any tech environment.",
    },
    roles: {
      ui_senior_specialist: "UI Senior Specialist Developer",
      ui_mid_integration: "UI Mid Developer & Integration",
      ui_junior_integration: "UI Junior Developer & Integration",
      it_tech_support: "IT Technician / Support",
    },
    companies: {
      knowmadmood: "Knowmad mood",
      digitalwolves: "Digital Wolves",
      atsistemas: "atSistemas",
      hospitaluniversitario: "University Hospital of Puerto Real, Cádiz",
      pymesadip: "Pymes ADIP",
    },
    centers: {
      ies_mar_de_cadiz: "IES Mar de Cádiz",
    },
    studiesLabels: {
      fp_wad: "Higher Vocational Training in Web Application Development",
      fp_sar: "Higher Vocational Training in Network Systems Administration",
      fp_smr: "Intermediate Vocational Training in IT Systems",
    },
    bullets: {
      knowmadmood_bullets: [
        "Coordination and supervision of the UI team to ensure high-quality deliveries aligned with client goals.",
        "Assessing UI development needs and producing detailed estimates for presales and project proposals.",
        "Participating in the selection and technical evaluation of new UI developers.",
        "Mentoring and supporting interns, helping their learning and integration into real projects.",
      ],
      digitalwolves_bullets: [
        "Development of responsive web and mobile interfaces using HTML, CSS, JavaScript and modern frameworks like React, Angular and Vue.js.",
        "Implementation of advanced frontend solutions with a focus on accessibility, performance and maintainability.",
        "Ensuring cross-platform and cross-device compatibility across multiple projects and clients.",
        "Creating and maintaining reusable UI component libraries with Storybook to standardize design systems and speed up development.",
      ],
      atsistemas_bullets: [
        "Development and implementation of responsive web and mobile interfaces using HTML5, CSS3 and JavaScript.",
        "Collaboration with the UX/UI and Integration department to create consistent and accessible user experiences.",
        "Contributing to frontend integration tasks, ensuring design fidelity and technical performance across projects.",
      ],
      hospitaluniversitario_bullets: [
        "Technical support and maintenance of IT systems in a hospital environment.",
        "Installation, configuration and troubleshooting of hardware and software issues.",
        "User support and basic training in the use of IT tools.",
      ],
      pymesadip_bullets: [
        "Administration and maintenance of computer equipment and local networks across different companies.",
        "Installation, configuration and securing of network and hardware infrastructures.",
        "Consulting and post-sales support for business management systems, including technical guidance and IT environment optimization.",
      ],
    },
    studiesDescriptions: {
      fp_wad:
        "Training in web application development, focused on building dynamic interfaces, server management, service integration and full-stack development with database connectivity.",
      fp_sar:
        "Training in server administration, network services management, database implementation, telecom infrastructure integration and hardware performance evaluation.",
      fp_smr:
        "Training in installation and maintenance of network and internet services, managing IT systems in single-user and multi-user environments, and small business administration.",
    },
  },
  about: {
    other_studies: {
      title: "Other studies",
      english_b1: {
        title: "B2 English - Official Language School (EOI)",
        description: "Preparation and certification of B2 level at the Official Language School.",
        items: [
          "Speaking mock exams with structured feedback (B2 First).",
          "Weekly listening practice with podcasts and graded transcripts.",
          "Reading practice with adapted texts and exam-style questions.",
          "Writing practice with B2 templates (informal email, opinion essay, short story).",
        ],
      },
    },
  },
};

export default en;
