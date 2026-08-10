// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://marcorm.vercel.app";

const LOCALES = ["es", "en"] as const;

const STATIC_PATHS = ["", "/about", "/projects", "/legal", "/privacy"];

// Fecha estable para páginas estáticas.
const STATIC_LASTMOD = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of STATIC_PATHS) {
      entries.push({
        url: `${SITE}/${locale}${page}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
