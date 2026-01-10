import Link from "next/link";
import { Article } from "@/lib/mdxArticles";

type Props = {
  article: Article;
  locale: "es" | "en";
  isRead: boolean;
  readTimeSuffix: string;
  markRead: string;
  markUnread: string;
  readMore: string;
  readBadgeAria: string;
  toggleRead: (slug: string) => void;
};

export function ArticleCard({
  article,
  locale,
  isRead,
  toggleRead,
  readTimeSuffix,
  markRead,
  markUnread,
  readMore,
  readBadgeAria,
}: Props) {
  return (
    <article
      className={`group relative rounded-xl border h-full transition hover:border-sky-400/80 shadow-sm p-4 ${
        isRead
          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-700 ring-1 ring-emerald-200/60 dark:ring-emerald-800/60"
          : "bg-white dark:bg-white/5 border-black dark:border-white/10"
      }`}
    >
      {isRead && (
        <span
          role="img"
          aria-label={readBadgeAria}
          className="absolute -right-2 -bottom-2 inline-flex items-center justify-center text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900 rounded-full shadow-sm p-2 transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-300 group-hover:bg-sky-100 dark:group-hover:bg-sky-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
            <path d="M12 4.5c-4.97 0-9.12 3.11-10.5 7.5 1.38 4.39 5.53 7.5 10.5 7.5s9.12-3.11 10.5-7.5C21.12 7.61 16.97 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
          </svg>
        </span>
      )}

      <header className="mb-3">
        <div className="flex items-start flex-wrap justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
            {article.minutes ? (
              <span aria-label={`${article.minutes} ${readTimeSuffix}`}>
                • {article.minutes} {readTimeSuffix}
              </span>
            ) : null}
          </p>

          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-sky-500"
              checked={isRead}
              onChange={() => toggleRead(article.slug)}
              aria-label={isRead ? markUnread : markRead}
            />
            <span>{isRead ? markUnread : markRead}</span>
          </label>
        </div>

        <h3 className="text-lg font-bold mt-1">{article.title}</h3>
      </header>

      <p className="text-sm dark:text-gray-200 text-gray-900 leading-relaxed">{article.excerpt}</p>

      <Link
        href={`/${locale}/blog/${article.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sky-400 hover:underline rounded px-1 text-sm"
        aria-label={`${readMore}: ${article.title}`}
      >
        {readMore} <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
