// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://marcorm.vercel.app";

const LOCALES = ["es", "en"] as const;

const STATIC_PATHS = ["", "/about", "/projects", "/blog", "/legal", "/privacy"];

// Fecha estable para páginas “estáticas” (cámbiala cuando realmente actualices esas páginas)
const STATIC_LASTMOD = new Date("2025-01-01");

// Extrae `date: "YYYY-MM-DD"` del frontmatter (suficiente para tu caso)
function readFrontmatterDate(filePath: string): Date | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");

    // Solo miramos el bloque inicial ---
    if (!raw.startsWith("---")) return null;
    const end = raw.indexOf("\n---", 3);
    if (end === -1) return null;

    const frontmatter = raw.slice(3, end);
    const match = frontmatter.match(/^\s*date:\s*["']?(.+?)["']?\s*$/m);

    if (!match) return null;

    const d = new Date(match[1]);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function getPostEntries(locale: string): Array<{ slug: string; lastmod: Date }> {
  const dir = path.join(process.cwd(), "content", locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);

    // 1) Fecha del frontmatter si existe
    const fmDate = readFrontmatterDate(filePath);

    // 2) Si no hay date, usa la fecha real del archivo (mtime)
    const stat = fs.statSync(filePath);
    const lastmod = fmDate ?? stat.mtime;

    return { slug, lastmod };
  });
}

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

    for (const { slug, lastmod } of getPostEntries(locale)) {
      entries.push({
        url: `${SITE}/${locale}/blog/${slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
