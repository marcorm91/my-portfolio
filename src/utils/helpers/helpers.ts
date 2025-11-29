/**
 * Determines if the provided locale is valid and returns it.
 * If the locale is not valid, it returns the default locale.
 *
 * @param locale - The locale string to validate.
 * @returns The valid locale if found in the list of valid locales, otherwise the default locale.
 */
export function getValidLocale(locale: string | undefined): string {
  const validLocales = ["en", "es"];
  return validLocales.includes(locale || "") ? locale! : "es";
}

/**
 * Sets the theme by updating the `data-theme` attribute on the <html> element.
 *
 * @param theme - The theme to set ("light" or "dark").
 */
export function setTheme(theme: "light" | "dark"): void {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
}

/**
 * Gets the stored theme from localStorage.
 *
 * @returns "dark" if set to dark, otherwise "light".
 */
export function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
}

/**
 * Generates a new path with the updated locale.
 *
 * @param pathname - The current pathname.
 * @param newLocale - The new locale to set ("es" or "en").
 * @returns The updated path with the new locale.
 */
export function getNewPathWithLocale(pathname: string, newLocale: "es" | "en"): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = newLocale;
  return `/${segments.join("/")}`;
}

/**
 * Formats a time period given a start and optional end date in "YYYY-MM" format.
 * If no end date is provided (null or undefined), it uses the provided `presentLabel`
 * to represent an ongoing period (e.g. “May 2023 – Present”).
 *
 * @param startYM - Start date in "YYYY-MM" format.
 * @param endYM - End date in "YYYY-MM" format, or null/undefined if ongoing.
 * @param locale - Locale string (e.g., "en-US", "es-ES") used for month/year formatting.
 * @param presentLabel - Label to display when the period is ongoing (e.g. "Present", "Actualidad").
 * @returns A formatted string like "May 2023 – November 2025" or "May 2023 – Present".
 */
export function formatPeriod(
  startYM: string,
  endYM: string | null | undefined,
  locale: string,
  presentLabel: string
) {
  const fmt = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const [sy, sm] = startYM.split("-").map(Number);
  const start = new Date(sy, (sm || 1) - 1, 1);
  const startTxt = fmt.format(start);
  if (!endYM) return `${startTxt} – ${presentLabel}`;
  const [ey, em] = endYM.split("-").map(Number);
  const end = new Date(ey, (em || 1) - 1, 1);
  const endTxt = fmt.format(end);
  return `${startTxt} – ${endTxt}`;
}
