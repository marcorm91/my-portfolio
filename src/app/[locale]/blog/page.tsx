import type { Metadata } from "next";
import Articles from "../articles/Articles";
import translations from "@/utils/language";
import { getAllArticles } from "@/lib/mdxArticles";
import { localizedAlternates } from "@/lib/site";

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
    alternates: localizedAlternates(locale, "/blog"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}) {
  const { locale } = await params;
  const initialArticles = await getAllArticles(locale || "en");

  return <Articles locale={locale || "en"} initialArticles={initialArticles} />;
}
