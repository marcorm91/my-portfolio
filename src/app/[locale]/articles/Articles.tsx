"use client";

import Link from "next/link";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import { Article } from "@/lib/mdxArticles";

type ArticlesProps = {
  locale: "es" | "en";
  initialArticles: Article[];
};

export default function ArticlesSection({ locale, initialArticles }: ArticlesProps) {
  const STORAGE_KEY = "blog_read_all";
  const t = useTranslations();

  const localizedArticles = useMemo(() => {
    return [...initialArticles].sort((a, b) => b.date.localeCompare(a.date));
  }, [initialArticles]);

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    setIsFilterOpen(false);
  }, [locale]);

  // Lock body scroll on mobile when filter panel is open
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    if (isFilterOpen && window.innerWidth < 1024) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = originalOverflow;
      };
    }
    body.style.overflow = originalOverflow;
    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isFilterOpen]);

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
        <header className="mb-0 sticky top-20 z-20 pb-3 md:pb-6 mb-md-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur lg:static lg:top-auto lg:z-auto lg:bg-transparent lg:backdrop-blur-0">
          <div className="flex items-center md:items-start justify-between gap-3">
            <div>
              <h2 id="articles-title" className="text-2xl md:text-3xl font-semibold">
                {t.articles.title}
              </h2>
              <p className="mt-2 text-gray-600 hidden md:block dark:text-gray-300 max-w-2xl">
                {t.articles.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFilterOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center bg-white dark:bg-slate-900 p-2 dark:text-sky-100"
              aria-expanded={isFilterOpen}
              aria-controls="filters-panel"
              aria-label={t.articles.filterTitle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-14 5.5h11.5m-9 5h6.5" />
              </svg>
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside
            aria-label="Filtro por fecha"
            id="filters-panel"
            className={`rounded-2xl bg-white dark:bg-gray-900 p-4 space-y-4 shadow-lg z-30 transition duration-200 lg:sticky lg:top-21 lg:h-fit lg:max-h-[80vh] lg:overflow-y-auto ${
              isFilterOpen
                ? "fixed inset-0 top-[90px] max-h-[calc(100vh-90px)] overflow-y-auto opacity-100 translate-y-0 px-4"
                : "hidden opacity-0 -translate-y-2"
            } lg:static lg:block lg:opacity-100 lg:translate-y-0 lg:border lg:border-black/10 lg:dark:border-white/10`}
          >
            <div className="flex items-center justify-between gap-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{t.articles.filterTitle}</span>
              </div>
              <div className="flex items-center gap-3">
                {selectedMonthKey && (
                  <button
                    onClick={() => setSelectedMonthKey(null)}
                    className="text-xs text-sky-500 hover:underline cursor-pointer"
                  >
                    {t.articles.filterReset}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden inline-flex items-center justify-center rounded-md bg-transparent px-2 py-1 text-sm text-slate-700 dark:text-slate-100"
                  aria-label={t.articles.filterTitle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
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
                            onClick={() => {
                              setSelectedMonthKey(isActive ? null : month.key);
                            }}
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
                      className={`group relative rounded-xl border h-full transition hover:border-sky-400/80 shadow-sm p-4 ${
                        isRead
                          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-700 ring-1 ring-emerald-200/60 dark:ring-emerald-800/60"
                          : "bg-white dark:bg-white/5 border-black dark:border-white/10"
                      }`}
                    >
                      {isRead && (
                        <span
                          role="img"
                          aria-label={`${t.articles.readBadge} badge`}
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
                        <h3 className="text-lg font-bold mt-1">{article.title}</h3>
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
        <div className="w-50 h-50 fixed left-16 bottom-32 rounded-full bg-gradient-to-tl from-orange-500 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
        <div className="w-80 h-80 fixed right-16 bottom-32 rounded-full bg-gradient-to-br from-gray-500 to-green-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
        <div className="w-25 h-25 fixed top-16 left-0 right-128 m-auto rounded-full bg-gradient-to-r from-blue-800 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
      </div>
    </>
  );
}
