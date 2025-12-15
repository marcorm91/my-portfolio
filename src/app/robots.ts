// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://marcorm.vercel.app';
  const isProd = process.env.VERCEL_ENV === 'production';

  return {
    rules: isProd
      ? [
          { userAgent: '*', allow: '/' },
        ]
      : [
          // En previews / dev, bloquea indexación
          { userAgent: '*', disallow: '/' },
        ],
    sitemap: `${site}/sitemap.xml`,
    host: site.replace(/^https?:\/\//, ''),
  };
}
