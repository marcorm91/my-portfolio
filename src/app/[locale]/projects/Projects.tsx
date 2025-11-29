"use client";

import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import Link from "next/link";

export default function ProjectsSection({
  items = projects,
}: { title?: string; items?: Project[] }) {
  const latestProjects = items.slice(0, 10);
  const t = useTranslations();

  return (
    <>
      <section aria-labelledby="projects-title" className="min-h-dvh">
        <h2
          id="projects-title"
          className="mb-6 text-2xl md:text-3xl font-semibold"
        >
          {t.projects.title}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {latestProjects.map((p, i) => (
            <li key={i}>
              <article className="rounded-xl border border-black dark:border-white/10 bg-white/5 p-4 shadow-sm h-full transition hover:border-sky-400/80">
                <header className="mb-1">
                  <h3 className="text-base font-bold">{t.projects.types[p.typeId as keyof typeof t.projects.types]}</h3>
                </header>

                <p className="text-sm dark:text-gray-300 text-gray-900">{t.projects.projects[p.projectId as keyof typeof t.projects.projects]}</p>

                <div className="mt-3 flex flex-col gap-3 text-xs dark:text-gray-400 text-gray-500">
                  {p.period && <time>{p.period}</time>}
                  {p.tags && p.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map((t, idx) => (
                        <li
                          key={idx}
                          className="rounded bg-black dark:bg-white/10 px-2 py-0.5 text-white"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sky-400 hover:underline rounded px-1"
                    aria-label={`Ver ejemplo para ${t.projects.types[p.typeId as keyof typeof t.projects.types]}`}

                  >
                    {t.projects.exampleLink} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="mt-3 inline-block text-xs text-gray-500">
                      {t.projects.noLink}
                  </span>
                )}
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm md:text-base">
              {t.projects.ctaPrefix}{" "}
            <Link
              href="mailto:marco_antonio88_9@hotmail.com"
              className="text-sky-400 hover:underline rounded px-1"
            >
              {t.projects.ctaLink}
            </Link>.
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
