import { permanentRedirect } from "next/navigation";

type Params = { locale: "es" | "en"; slug: string };

export default async function LegacyArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  permanentRedirect(`/${locale}/blog/${slug}`);
}
