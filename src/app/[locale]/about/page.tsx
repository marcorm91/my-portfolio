import type { Metadata } from "next";
import About from "./About";
import translations from "@/utils/language";

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
  };
}

export default function Page() {
  return <About />;
}
