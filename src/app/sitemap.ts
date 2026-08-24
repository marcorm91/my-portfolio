import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdxArticles";
import { absoluteUrl } from "@/lib/site";

const LOCALES = ["es", "en"] as const;
const STATIC_PATHS = ["", "/about", "/blog"] as const;

const languageAlternates = (path: string) => ({
  languages: {
    es: absoluteUrl(`/es${path}`),
    en: absoluteUrl(`/en${path}`),
    "x-default": absoluteUrl(`/es${path}`),
  },
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: languageAlternates(path),
      });
    }

    const articles = await getAllArticles(locale);

    for (const article of articles) {
      const path = `/blog/${article.slug}`;

      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(path),
      });
    }
  }

  return entries;
}
