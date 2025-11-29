import type { Metadata } from "next";
import Home from "./Home";
import translations from "@/utils/language";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[locale || "en"];

  return {
    title: t.general.titles.home,
    description: t.general.descriptions.home,
  };
}

export default function Page() {
  return <Home />;
}
