"use client";

import Link from "next/link";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import { Article } from "@/lib/mdxArticles";

import { FiltersPanel } from "@/components/FiltersPanel";
import { ArticleCard } from "@/components/ArticleCard";
import { FloatingOrbs } from "@/components/FloatingOrbs";

type ArticlesProps = {
  locale: "es" | "en";
  initialArticles: Article[];
};

type MonthGroup = {
  year: string;
  months: { key: string; label: string; count: number }[];
};

export default function ArticlesSection({ locale, initialArticles }: ArticlesProps) {
  const STORAGE_KEY = "blog_read_all";
  const t = useTranslations();

  const PAGE_SIZE = 6;

  const [selectedMonthKey, setSelectedMonthKey] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search
  const [query, setQuery] = useState("");

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const [readSet, setReadSet] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

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

  const groupedByYearMonth: MonthGroup[] = useMemo(() => {
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

  // Reset state when locale changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setSelectedMonthKey(null);
    setIsFilterOpen(false);
    setQuery("");
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

  // Persist read posts
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(readSet)));
    } catch {
      // ignore storage errors
    }
  }, [readSet]);

  const filteredArticles = useMemo(() => {
    const q = normalize(query);

    return localizedArticles.filter((article) => {
      const matchesMonth = selectedMonthKey
        ? article.date.startsWith(selectedMonthKey)
        : true;

      if (!matchesMonth) return false;
      if (!q) return true;

      const haystack = normalize([article.title, article.excerpt].join(" "));
      return haystack.includes(q);
    });
  }, [localizedArticles, selectedMonthKey, query]);

  const itemsToRender = useMemo(
    () => filteredArticles.slice(0, visibleCount),
    [filteredArticles, visibleCount]
  );

  const totalCount = filteredArticles.length;

  const resultsKey = useMemo(() => {
    const isSingular = totalCount === 1;

    if (selectedMonthKey && query) {
      return isSingular
        ? "articles.results.monthAndSearchSingular"
        : "articles.results.monthAndSearch";
    }

    if (selectedMonthKey) {
      return isSingular ? "articles.results.monthSingular" : "articles.results.month";
    }

    if (query) {
      return isSingular ? "articles.results.searchSingular" : "articles.results.search";
    }

    return isSingular ? "articles.results.baseSingular" : "articles.results.base";
  }, [totalCount, selectedMonthKey, query]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredArticles.length));
          }
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredArticles.length]);

  // Reset pagination on filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedMonthKey]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query]);

  const toggleRead = (slug: string) => {
    setReadSet((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const openFilter = () => setIsFilterOpen((v) => !v);

  return (
    <>
      <section aria-labelledby="articles-title" className="min-h-dvh relative z-10">
        <header
          className="mb-0 sticky top-20 z-20 pb-3 md:pb-6 mb-md-6
         bg-white/90 dark:bg-gray-900/90 xl:static xl:top-auto xl:z-auto xl:bg-transparent dark:xl:bg-transparent"
        >
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
              onClick={openFilter}
              className="lg:hidden inline-flex items-center justify-center bg-white dark:bg-slate-900 p-2 dark:text-sky-100"
              aria-expanded={isFilterOpen}
              aria-controls="filters-panel"
              aria-label={t.articles.filterTitle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-14 5.5h11.5m-9 5h6.5"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <FiltersPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filterTitle={t.articles.filterTitle}
            searchTitle={t.articles.searchTitle}
            searchPlaceholder={t.articles.searchPlaceholder}
            clearSearch={t.articles.clearSearch}
            filterReset={t.articles.filterReset}
            selectedMonthKey={selectedMonthKey}
            onSelectMonth={setSelectedMonthKey}
            query={query}
            onQueryChange={setQuery}
            groupedByYearMonth={groupedByYearMonth}
          />

          <div className="space-y-6">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {t.articles.results[resultsKey as keyof typeof t.articles.results]?.replace("{count}", totalCount.toString())}
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {itemsToRender.map((article) => (
                <li key={article.slug}>
                  <ArticleCard
                    article={article}
                    locale={locale}
                    isRead={readSet.has(article.slug)}
                    toggleRead={toggleRead}
                    readTimeSuffix={t.articles.readTimeSuffix}
                    markRead={t.articles.markRead}
                    markUnread={t.articles.markUnread}
                    readMore={t.articles.readMore}
                    readBadgeAria={t.articles.readBadgeAria}
                  />
                </li>
              ))}
            </ul>

            {visibleCount < filteredArticles.length && (
              <div
                ref={sentinelRef}
                className="mt-6 h-10 w-full flex items-center justify-center text-sm text-gray-500"
                aria-label={t.articles.loadMore}
              >
                {t.articles.loadMore}
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

      <FloatingOrbs />
    </>
  );
}
