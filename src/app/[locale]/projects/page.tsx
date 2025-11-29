import type { Metadata } from "next";
import Projects from "./Projects";
import translations from "@/utils/language";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale || "en"];

  return {
    title: t.general.titles.projects,
    description: t.general.descriptions.projects,
  };
}

export default function Page() {
  return <Projects />;
}
