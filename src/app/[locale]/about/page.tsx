import type { Metadata } from "next";
import About from "./About";
import translations from "@/utils/language";
import { localizedAlternates } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale || "en"];

  return {
    title: t.general.titles.about,
    description: t.general.descriptions.about,
    alternates: localizedAlternates(locale, "/about"),
  };
}

export default function Page() {
  return <About />;
}
