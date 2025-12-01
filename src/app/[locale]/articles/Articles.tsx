"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { articles } from "@/data/articles";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ArticlesSection() {
  const STORAGE_KEY = "blog_read_all";
  const params = useParams<{ locale: "es" | "en" }>();
  const locale = params?.locale ?? "en";
  const t = useTranslations();

  const localizedArticles = useMemo(
    () =>
      articles
        .filter((a) => a.locale === locale)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [locale]
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
      }),
    [locale]
  );

  const groupedByYearMonth = useMemo(() => {
    const groups: Record<
      string,
      { year: string; months: Record<string, { label: string; count: number }> }
    > = {};

    localizedArticles.forEach((article) => {
      const date = new Date(article.date);
      const year = date.getFullYear().toString();
      const monthLabel =
        dateFormatter.formatToParts(date).find((p) => p.type === "month")?.value || "";
      const monthKey = date.toISOString().slice(0, 7); // yyyy-mm

      if (!groups[year]) {
        groups[year] = { year, months: {} };
      }

      if (!groups[year].months[monthKey]) {
        groups[year].months[monthKey] = { label: `${monthLabel} ${year}`, count: 0 };
      }

      groups[year].months[monthKey].count += 1;
    });

    return Object.values(groups)
      .sort((a, b) => Number(b.year) - Number(a.year))
      .map((group) => ({
        year: group.year,
        months: Object.entries(group.months)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([key, value]) => ({ key, ...value })),
      }));
  }, [localizedArticles, dateFormatter]);

  const [selectedMonthKey, setSelectedMonthKey] = useState<string | null>(null);
  const PAGE_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [readSet, setReadSet] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setSelectedMonthKey(null);
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(readSet)));
    } catch {
      // ignore storage errors
    }
  }, [readSet]);

  const filteredArticles = useMemo(
    () =>
      selectedMonthKey
        ? localizedArticles.filter((article) => article.date.startsWith(selectedMonthKey))
        : localizedArticles,
    [localizedArticles, selectedMonthKey]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prev) =>
              Math.min(prev + PAGE_SIZE, filteredArticles.length)
            );
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredArticles.length]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedMonthKey]);

  const itemsToRender = filteredArticles.slice(0, visibleCount);
  const totalCount = filteredArticles.length;

  const toggleRead = (slug: string) => {
    setReadSet((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <>
      <section aria-labelledby="articles-title" className="min-h-dvh relative z-10">
        <header className="mb-6">
          <h2 id="articles-title" className="text-2xl md:text-3xl font-semibold">
            {t.articles.title}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
            {t.articles.description}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside
            aria-label="Filtro por fecha"
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 p-4 sticky top-21 h-fit space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{t.articles.filterTitle}</span>
              </div>
              {selectedMonthKey && (
                <button
                  onClick={() => setSelectedMonthKey(null)}
                  className="text-xs text-sky-500 hover:underline cursor-pointer"
                >
                  {t.articles.filterReset}
                </button>
              )}
            </div>

            <ul className="space-y-3">
              {groupedByYearMonth.map((group) => (
                <li key={group.year} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />
                    {group.year}
                  </p>
                  <ul className="space-y-2">
                    {group.months.map((month) => {
                      const isActive = selectedMonthKey === month.key;
                      return (
                        <li key={month.key}>
                          <button
                            onClick={() =>
                              setSelectedMonthKey(isActive ? null : month.key)
                            }
                            className={`w-full text-left text-xs rounded-md px-3 py-2 transition flex items-center justify-between ${
                              isActive
                                ? "bg-sky-500 text-white shadow-sm"
                                : "bg-white dark:bg-slate-900 hover:bg-sky-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-100 border border-transparent"
                            }`}
                            aria-pressed={isActive}
                          >
                            <span>{month.label}</span>
                            <span
                              className={`text-[11px] ${
                                isActive ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {month.count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-6">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {totalCount} {totalCount === 1 ? "post" : "posts"}{" "}
              {selectedMonthKey ? "en el mes seleccionado" : ""}
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {itemsToRender.map((article) => {
                const isRead = readSet.has(article.slug);
                return (
                  <li key={article.slug}>
                    <article
                      className={`rounded-xl border h-full transition hover:border-sky-400/80 shadow-sm p-4 ${
                        isRead
                          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-700 ring-1 ring-emerald-200/60 dark:ring-emerald-800/60"
                          : "bg-white dark:bg-white/5 border-black dark:border-white/10"
                      }`}
                    >
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
                              <span aria-label={`${article.minutes} ${t.articles.readTimeSuffix}`}>
                                • {article.minutes} {t.articles.readTimeSuffix}
                              </span>
                            ) : null}
                          </p>
                          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              className="accent-sky-500"
                              checked={isRead}
                              onChange={() => toggleRead(article.slug)}
                              aria-label={
                                isRead ? t.articles.markUnread : t.articles.markRead
                              }
                            />
                            <span>{isRead ? t.articles.markUnread : t.articles.markRead}</span>
                          </label>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <h3 className="text-lg font-bold">{article.title}</h3>
                          {isRead && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 rounded-full px-2 py-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12.75 6.75 10.5l-.75.75L9 14.25l9-9-.75-.75z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {t.articles.readBadge}
                            </span>
                          )}
                        </div>
                      </header>

                      <p className="text-sm dark:text-gray-200 text-gray-900 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {article.tags && article.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-gray-700 dark:text-gray-300">
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

                      <Link
                        href={`/${locale}/blog/${article.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-sky-400 hover:underline rounded px-1 text-sm"
                        aria-label={`${t.articles.readMore}: ${article.title}`}
                      >
                        {t.articles.readMore} <span aria-hidden="true">↗</span>
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>

            {visibleCount < filteredArticles.length && (
              <div
                ref={sentinelRef}
                className="mt-6 h-10 w-full flex items-center justify-center text-sm text-gray-500"
                aria-label="Cargando más artículos"
              >
                {t.articles.loadMore || "Cargando más..."}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
            {t.articles.ctaPrefix}{" "}
            <Link
              href="mailto:marco_antonio88_9@hotmail.com"
              className="text-sky-400 hover:underline rounded px-1"
            >
              {t.articles.ctaLink}
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="hidden md:block" aria-hidden="true">
        <div className="w-50 h-50 fixed left-16 bottom-32 rounded-full bg-gradient-to-tl from-orange-500 to-gray-500 opacity-10 motion-safe:animate-floating motion-reduce:animate-none"></div>
        <div className="w-80 h-80 fixed right-16 bottom-32 rounded-full bg-gradient-to-br from-gray-500 to-green-500 opacity-10 motion-safe:animate-floating motion-reduce:animate-none"></div>
        <div className="w-25 h-25 fixed top-16 left-0 right-128 m-auto rounded-full bg-gradient-to-r from-blue-800 to-gray-500 opacity-10 motion-safe:animate-floating motion-reduce:animate-none"></div>
      </div>
    </>
  );
}
