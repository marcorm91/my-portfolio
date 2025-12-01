import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cache } from "react";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  minutes?: number;
  locale: "es" | "en";
  collaborator?: {
    name: string;
    linkedin?: string;
    avatar?: string;
  };
  coverImage?: string;
  coverGradient?: string;
  coverAlt?: string;
  link?: string;
  html?: string;
};

const contentRoot = path.join(process.cwd(), "content");

const getFiles = (locale: "es" | "en") => {
  const localeDir = path.join(contentRoot, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs.readdirSync(localeDir).filter((file) => file.endsWith(".mdx"));
};

const parseFile = async (locale: "es" | "en", file: string): Promise<Article> => {
  const fullPath = path.join(contentRoot, locale, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  const slug = data.slug || file.replace(/\.mdx$/, "");
  const excerpt =
    data.excerpt ||
    content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);

  return {
    slug,
    title: data.title || slug,
    excerpt,
    date: data.date || new Date().toISOString().slice(0, 10),
    tags: data.tags || [],
    minutes: data.minutes,
    locale,
    collaborator: data.collaborator,
    coverImage: data.coverImage,
    coverGradient: data.coverGradient,
    coverAlt: data.coverAlt,
    link: data.link,
    html: htmlContent,
  };
};

export const getAllArticles = cache(async (locale: "es" | "en") => {
  const files = getFiles(locale);
  const articles = await Promise.all(files.map((file) => parseFile(locale, file)));
  return articles.sort((a, b) => b.date.localeCompare(a.date));
});

export const getAllArticlesAllLocales = cache(async () => {
  const [es, en] = await Promise.all([getAllArticles("es"), getAllArticles("en")]);
  return [...es, ...en];
});

export const getArticle = cache(async (locale: "es" | "en", slug: string) => {
  const articles = await getAllArticles(locale);
  return articles.find((article) => article.slug === slug) || null;
});
