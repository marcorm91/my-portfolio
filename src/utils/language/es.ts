const es = {
  general: {
    project_name: "Marco Romero - Portfolio",
    name: "Marco Romero",
    titles: {
      home: "Inicio - Marco Romero",
      articles: "Blog - Marco Romero",
      about: "Sobre mí - Marco Romero",
    },
    descriptions: {
      home: "Portfolio de Marco Romero, UI developer especializado en accesibilidad y front-end.",
      articles: "Lee el blog de Marco Romero sobre accesibilidad, sistemas de UI y front-end.",
      about: "Conoce a Marco Romero, UI developer especializado en accesibilidad y front-end.",
    },
  },
  header: {
    home: "Inicio",
    articles: "Blog",
    about: "Sobre mí",
    es: "Español",
    en: "Inglés",
    language: "Idioma",
    skipToContent: "Saltar al contenido principal",
    nav: "Menú de navegación",
    index_img: "Inicio - Marco Romero - Portfolio",
    open_nav: "Abrir menú",
    close_nav: "Cerrar menú",
    mode_dark: "Activar modo oscuro",
    mode_light: "Activar modo claro",
    icon_dark: "Icono de modo oscuro",
    icon_light: "Icono de modo claro",
  },
  footer: {
    copyright: "Todos los derechos reservados.",
  },
  home: {
    welcome: "Bienvenido a mi portafolio",
    image: "Imagen ficticia Marco",
    aria: {
      introSection: "Sección principal de presentación",
      openCvNewTab: "Abrir el currículum vitae de Marco en una nueva pestaña",
      openLinkedinNewTab: "Abrir perfil de LinkedIn de Marco en una nueva pestaña",
      sendEmail: "Enviar correo electrónico a Marco",
    },
    hero: {
      greeting: "¡Hola! Soy",
      description:
        "Desarrollador UI apasionado por crear experiencias digitales accesibles, intuitivas y centradas en las personas.",
      currentJob: "Actualmente trabajo en",
      company: "Knowmad mood",
      role: "UI Frontend Developer",
      projectsButton: "Ver artículos",
      contactButton: "Contáctame",
      cvButton: "Ver CV"
    },
    projects: {
      title: "Proyectos",
      featuredId: "pomodoro",
      items: {
        pomodoro: {
          category: "Productividad",
          title: "Focus Mode - Pomodoro",
          description:
            "Aplicación Pomodoro diseñada para maximizar el foco real, con sesiones personalizables, seguimiento del progreso y una interfaz cuidada orientada a la productividad consciente.",
          imageAlt: "Captura de la app Focus Mode Pomodoro",
          cta: {
            label: "Probar demo",
            href: "https://focus-mode.app",
          },
          tags: ["Next.js", "Tailwind", "TypeScript", "Supabase"],
          imageSrc: "/pomodoro-hero.png",
          badge: "Live",
        },
        fintrack: {
          category: "App de escritorio",
          title: "Fintrack",
          description:
            "Aplicación de escritorio para controlar finanzas personales (vista mensual/anual + histórico) con gráficas y tablas ordenables. Permite importar datos desde CSV o pegando texto. Todo se guarda en local en una base de datos SQLite.",
          imageAlt: "Captura de la app Fintrack",
          cta: {
            label: "Ver en GitHub",
            href: "https://github.com/marcorm91/fintrack-app",
          },
          tags: ["React", "Vite", "TypeScript", "Tailwind", "Tauri", "SQLite", "Chart.js"],
          imageSrc: "/assets/images/fintrack-app.png",
        },
      },
    },
  },
  articles: {
    title: "Blog y notas",
    description: "Lecturas breves sobre accesibilidad, sistemas de UI y front-end.",
    readTimeSuffix: "min de lectura",
    readMore: "Abrir entrada",
    back: "Volver al blog",
    noLink: "Enlace en camino",
    loadMore: "Cargando más entradas...",
    collaborator: "Colaborador",
    linkedin: "LinkedIn",
    readBadge: "Leído",
    markRead: "Marcar como leído",
    markUnread: "Quitar leído",
    readBadgeAria: "Insignia de leído",
    filterTitle: "Filtrar por fecha",
    filterReset: "Limpiar",
    share: "Compartir",
    shareTwitter: "Compartir en X",
    shareLinkedin: "Compartir en LinkedIn",
    copyLink: "Copiar enlace",
    copied: "Enlace copiado",
    ctaPrefix: "¿Quieres publicar nuevas entradas o colaborar?",
    ctaLink: "Escríbeme",
    searchTitle: "Buscar título o descripción",
    searchPlaceholder: "Buscar...",
    clearSearch: "Limpiar búsqueda",
    results: {
      base: "{count} entradas",
      baseSingular: "{count} entrada",
      month: "{count} entradas en el mes seleccionado",
      monthSingular: "{count} entrada en el mes seleccionado",
      search: "{count} entradas filtradas por búsqueda",
      searchSingular: "{count} entrada filtrada por búsqueda",
      monthAndSearch:
        "{count} entradas en el mes seleccionado (filtradas por búsqueda)",
      monthAndSearchSingular:
        "{count} entrada en el mes seleccionado (filtrada por búsqueda)",
    }
  },
  profile: {
    title: "Sobre mí",
    work_experience: "Experiencia laboral",
    studies: "Formación académica",
    ui: {
      present: "Actualidad",
      view_site: "Ver sitio",
    },
    summary: {
      short: "Desarrollador UI con 9+ años, foco en accesibilidad, rendimiento y UX.",
      long: "Con más de 9 años de experiencia en el sector, adaptándome a una amplia variedad de tecnologías. Especializado en la creación de interfaces de usuario intuitivas y atractivas, con un enfoque en la experiencia del usuario (UX) y el rendimiento. Tengo experiencia trabajando con tecnologías frontend como React, Vue y Angular, además de con plataformas como Liferay, lo que me permite ofrecer soluciones integrales y escalables. Mi enfoque es siempre la innovación y la entrega de productos de alta calidad, asegurando una excelente experiencia para el usuario en cualquier entorno tecnológico.",
    },
    roles: {
      ui_senior_specialist: "UI Senior Specialist Developer",
      ui_mid_integration: "UI Mid Developer & Integration",
      ui_junior_integration: "UI Junior Developer & Integration",
      it_tech_support: "Técnico de IT / Soporte",
    },
    companies: {
      knowmadmood: "Knowmad mood",
      digitalwolves: "Digital Wolves",
      atsistemas: "atSistemas",
      hospitaluniversitario: "Hospital Universitario de Puerto Real, Cádiz",
      pymesadip: "Pymes ADIP",
    },
    centers: {
      ies_mar_de_cadiz: "IES Mar de Cádiz",
    },
    studiesLabels: {
      fp_wad: "CFGS en Desarrollo de Aplicaciones Web",
      fp_sar: "CFGS en Administración de Sistemas Informáticos en Red",
      fp_smr: "CFGM en Sistemas Informáticos",
    },
    bullets: {
      knowmadmood_bullets: [
        "Coordinación y supervisión del equipo UI para garantizar entregas de alta calidad y alineadas con los objetivos del cliente.",
        "Evaluación de necesidades de desarrollo UI y elaboración de estimaciones detalladas para preventa y propuestas de proyecto.",
        "Participación en la selección y evaluación técnica de nuevos desarrolladores UI.",
        "Mentoría y acompañamiento a estudiantes en prácticas, favoreciendo su aprendizaje e integración en proyectos reales.",
      ],
      digitalwolves_bullets: [
        "Desarrollo de interfaces web y móviles responsive utilizando HTML, CSS, JavaScript y frameworks modernos como React, Angular y Vue.js.",
        "Implementación de soluciones frontend avanzadas con foco en accesibilidad, rendimiento y mantenibilidad.",
        "Garantía de compatibilidad multiplataforma y multidispositivo en diversos proyectos y clientes.",
        "Creación y mantenimiento de librerías de componentes UI reutilizables con Storybook para estandarizar sistemas de diseño y optimizar el desarrollo.",
      ],
      atsistemas_bullets: [
        "Desarrollo e implementación de interfaces web y móviles responsive utilizando HTML5, CSS3 y JavaScript.",
        "Colaboración en el departamento de UX/UI e Integración para crear experiencias de usuario coherentes y accesibles.",
        "Contribución en tareas de integración frontend, asegurando la fidelidad del diseño y el rendimiento técnico en los proyectos.",
      ],
      hospitaluniversitario_bullets: [
        "Soporte técnico y mantenimiento de sistemas informáticos en el entorno hospitalario.",
        "Instalación, configuración y resolución de incidencias en hardware y software.",
        "Atención a usuarios y formación básica en el uso de herramientas informáticas.",
      ],
      pymesadip_bullets: [
        "Administración y mantenimiento de equipos informáticos y redes locales en distintas empresas.",
        "Instalación, configuración y aseguramiento de infraestructuras de red y hardware.",
        "Consultoría y soporte postventa en sistemas de gestión empresarial, incluyendo asesoramiento técnico y optimización de entornos IT.",
      ],
    },
    studiesDescriptions: {
      fp_wad:
        "Formación en desarrollo de aplicaciones web, centrada en la creación de interfaces dinámicas, gestión de servidores, integración de servicios y desarrollo full-stack con conexión a bases de datos.",
      fp_sar:
        "Formación en administración de servidores, gestión de servicios de red, implementación de bases de datos, integración de infraestructuras de telecomunicaciones y evaluación del rendimiento del hardware.",
      fp_smr:
        "Formación en instalación y mantenimiento de servicios de red e internet, gestión de sistemas informáticos en entornos monousuario y multiusuario, y administración de pequeños negocios.",
    },
  },
  about: {
    other_studies: {
      title: "Otros estudios",
      english_b1: {
        title: "Inglés B2 - EOI",
        description: "Preparación y certificación de nivel B2 en la Escuela Oficial de Idiomas.",
        items: [
          "Simulacros de speaking con feedback estructurado (B2 First).",
          "Listening semanal con podcasts y transcripciones graduadas.",
          "Reading con lecturas adaptadas y preguntas tipo examen.",
          "Writing con plantillas B2 (email informal, opinión, historia breve).",
        ],
      },
    },
  },
};

export default es;
