import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import translations from "@/utils/language";
import ShareButtons from "@/components/ShareButtons";
import { getArticle } from "@/lib/mdxArticles";

type Params = { locale: "es" | "en"; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(locale || "en", slug);
  const t = translations[locale || "en"];

  if (!article) {
    return {
      title: t.general.titles.articles,
      description: t.general.descriptions.articles,
    };
  }

  return {
    title: `${article.title} | ${t.general.name}`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle(locale || "en", slug);
  const t = translations[locale || "en"];

  if (!article) notFound();

  const dateLabel = new Date(article.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <article>
      <div className="sticky top-21 z-10 mb-4">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-sky-500 no-underline bg-white/90 dark:bg-gray-900/80 px-3 py-2 rounded-lg border border-sky-100 dark:border-sky-900 shadow-sm"
        >
          <span aria-hidden="true">←</span> {t.articles.back}
        </Link>
      </div>

      <div
        className="hidden md:block mt-4 mb-6 h-56 w-full rounded-2xl bg-gradient-to-br overflow-hidden"
        aria-label={article.coverAlt || article.title}
        role="img"
      >
        <span className="sr-only">{article.coverAlt || article.title}</span>
        {article.coverImage ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          />
        ) : (
          <div
            className={`h-full w-full rounded-2xl bg-gradient-to-br ${article.coverGradient || "from-sky-500 via-indigo-500 to-blue-700"} opacity-90`}
          />
        )}
      </div>

      <header className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={article.date}>{dateLabel}</time>
          {article.minutes ? ` · ${article.minutes} min` : ""}
        </p>
        <h1 className="text-3xl font-bold mt-2">{article.title}</h1>

        {article.collaborator && (
          <div className="mt-3 flex items-center gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-300">
            {article.collaborator.avatar ? (
              <Image
                src={article.collaborator.avatar}
                alt={`${article.collaborator.name} avatar`}
                width={48}
                height={48}
                className="rounded-full border border-white/20 bg-white/10"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full border border-white/20 bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{t.articles.collaborator}</span>
              <span>{article.collaborator.name}</span>
              {article.collaborator.linkedin && (
                <a
                  href={article.collaborator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-500 hover:underline"
                  aria-label={`${t.articles.linkedin}: ${article.collaborator.name}`}
                >
                  {t.articles.linkedin} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700 dark:text-gray-300">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-black dark:bg-white/10 px-2 py-1 text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.html || "" }} />
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />
      <ShareButtons title={article.title} />
    </article>
  );
}
