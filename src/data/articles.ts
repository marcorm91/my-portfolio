import dialogHtmlEs from "./articles/es/dialog-html";
import dialogHtmlEn from "./articles/en/dialog-html";

export type ArticleContent =
  | { kind: "p"; text: string }
  | { kind: "code"; text: string; language?: string }
  | { kind: "list"; items: string[] }
  | { kind: "note"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  minutes?: number;
  locale: "es" | "en";
  content: ArticleContent[];
  collaborator?: {
    name: string;
    linkedin?: string;
    avatar?: string;
  };
  coverImage?: string;
  coverGradient?: string;
  coverAlt?: string;
  link?: string;
};

export const articlesByLocale: Record<"es" | "en", Article[]> = {
  es: [dialogHtmlEs],
  en: [dialogHtmlEn],
};

export const articles: Article[] = [...articlesByLocale.es, ...articlesByLocale.en];
