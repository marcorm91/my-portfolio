import type { Metadata } from "next";
import Articles from "../articles/Articles";
import translations from "@/utils/language";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale || "en"];

  return {
    title: t.general.titles.articles,
    description: t.general.descriptions.articles,
  };
}

export default function Page() {
  return <Articles />;
}
