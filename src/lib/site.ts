export type SupportedLocale = "es" | "en";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://marcorm.vercel.app";

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export const localizedAlternates = (
  locale: SupportedLocale,
  path = ""
) => ({
  canonical: absoluteUrl(`/${locale}${path}`),
  languages: {
    es: absoluteUrl(`/es${path}`),
    en: absoluteUrl(`/en${path}`),
    "x-default": absoluteUrl(`/es${path}`),
  },
});
