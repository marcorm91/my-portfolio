export type Project = {
  typeId: string;
  projectId: string;
  period?: string;
  tags?: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    typeId: "pharma",
    projectId: "liferay_migration",
    period: "2019 - Actualidad",
    tags: ["Liferay", "JSP/JSTL", "A11y", "WCAG 2.2"],
    link: "https://www.bidafarma.es",
  },
  {
    typeId: "wood",
    projectId: "corporate_catalog",
    period: "2019 - Actualidad",
    tags: ["HTML/CSS/JS", "Gulp"],
    link: "https://www.finsa.com/es/",
  },
  {
    typeId: "retail",
    projectId: "recommerce_ui",
    period: "2025",
    tags: ["React", "Storybook", "A11y"],
    link: "https://www.zara.com/es/es/preowned-resell/products/Mujer-l700/NEW-IN--l2250",
  },
  {
    typeId: "regulatory",
    projectId: "intranet_portal",
    period: "2025",
    tags: ["Angular", "Tailwind"],
  },
  {
    typeId: "tourism",
    projectId: "usability_reservations",
    period: "2024",
    tags: ["Astro", "Liferay", "Accesibilidad", "Design Tokens"],
    link: "https://www.mundiplan.es/",
  },
  {
    typeId: "university",
    projectId: "campus_ui_refactor",
    period: "2023 - 2024",
    tags: ["HTML/CSS/JS"],
    link: "https://www.uned.es/universidad/inicio/",
  },
  {
    typeId: "insurance",
    projectId: "forms_accessible",
    period: "2023 - 2024",
    tags: ["Liferay", "React"],
    link: "https://www.axa.es/",
  },
  {
    typeId: "transport",
    projectId: "traveller_info",
    period: "2020",
    tags: ["HTML/CSS/JS", "Liferay"],
    link: "https://www.tmb.cat/es/home",
  },
  {
    typeId: "media",
    projectId: "bitban_eldiario",
    period: "2020 - 2021",
    tags: ["HTML/CSS/JS", "Gulp", "Accesibilidad", "Rediseño"],
    link: "https://www.eldiario.es/",
  },
];
