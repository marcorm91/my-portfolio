// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://marcorm.vercel.app';
  const now = new Date().toISOString();

  const locales = ['es', 'en'];

  const staticPaths = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/legal',
    '/privacy',
  ];

  function getPostSlugs(locale: string) {
    const dir = path.join(process.cwd(), 'content', locale);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${site}/${locale}${page}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }

    for (const slug of getPostSlugs(locale)) {
      entries.push({
        url: `${site}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
