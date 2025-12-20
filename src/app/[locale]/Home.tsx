"use client";

import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function HomeClient() {
  const t = useTranslations();
  const params = useParams<{ locale?: "es" | "en" }>();
  const currentLocale = params?.locale === "en" ? "en" : "es";
  const cvHref = currentLocale === "en" ? "/cv/english_cv.pdf" : "/cv/spanish_cv.pdf";

  return (
    <>
     <section
        className="flex flex-col items-center justify-center h-full text-center px-5 relative z-10 max-w-4xl m-auto"
        role="region"
        aria-label={t.home.aria.introSection}
      >
        <article className="flex justify-center items-center flex-col gap-6 mb-8">
          <Image
            src="/assets/images/profile.png"
            alt={t.home.image}
            width={200}
            height={200}
            className="rounded-full motion-safe:animate-fade-in motion-reduce:animate-none"
            priority
          />
          <h2 className="text-4xl md:text-7xl font-bold mb-4 motion-safe:animate-fade-in motion-reduce:animate-none">
            {t.home.hero.greeting} <span className="text-blue-500">Marco</span>
          </h2>
          <p className="text-base md:text-2xl mb-4 motion-safe:animate-fade-in-delay motion-reduce:animate-none">
            {t.home.hero.description}
          </p>

          <div
            className="bg-black dark:bg-white py-2 px-4 rounded-sm shadow-lg motion-safe:animate-fade-in-delay motion-reduce:animate-none mb-6 min-w-72 md:min-w-96 flex justify-start text-xs md:text-base"
            aria-hidden="true"
          >
            <span className="text-white dark:text-black pr-2">
              C:\Users\marco&gt;
            </span>
            <span className="sr-only">Command: make directory my-portfolio</span>
            <span className="typing-effect text-white dark:text-black w-[135px] md:w-[185px]">
              mkdir my-portfolio
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <a
              href={cvHref}
              rel="noopener noreferrer"
              className="btn-custom px-3 py-1 text-sm md:text-xl min-h-12"
              aria-label={t.home.aria.openCvNewTab}
              download
            >
              <Image src="/assets/images/cv.svg" alt="" width={22} height={22} aria-hidden="true" />
              <span className="flex-1">{t.home.hero.cvButton}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/marcorm91/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-custom px-3 py-1 text-sm md:text-xl min-h-12"
              aria-label={t.home.aria.openLinkedinNewTab}
            >
              <Image src="/assets/images/linkedin.svg" alt="" width={20} height={20} aria-hidden="true" />
              <span className="flex-1">LinkedIn</span>
            </a>
            <a
              href="mailto:marco_antonio88_9@hotmail.com"
              className="btn-custom px-3 py-1 text-sm md:text-xl min-h-12"
              aria-label={t.home.aria.sendEmail}
            >
              <Image src="/assets/images/email.svg" alt="" width={20} height={20} aria-hidden="true" />
              <span className="flex-1">{t.home.hero.contactButton}</span>
            </a>
          </div>
        </article>
      </section>
      <section className="w-full max-w-5xl mx-auto mt-6 md:mt-12 px-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">{t.home.featured.title}</h3>
            <span className="text-xs md:text-sm px-2 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-100">
              {t.home.featured.badge}
            </span>
          </div>
          <article className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-5 md:p-6 flex flex-col md:flex-row gap-5 md:gap-8">
            <div className="flex-1 space-y-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t.home.featured.category}
              </p>
              <h4 className="text-2xl font-bold">Focus Mode - Pomodoro</h4>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                {t.home.featured.description}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] md:text-xs text-gray-700 dark:text-gray-200">
                {["Next.js", "Tailwind", "TypeScript", "Supabase"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-black text-white dark:bg-white/10 dark:text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[240px]">
              <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-slate-800 shadow-sm aspect-[4/3]">
                <Image
                  src="/pomodoro-hero.png"
                  alt={t.home.featured.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                  priority
                />
              </div>
              <a
                className="btn-custom px-3 py-2 text-sm md:text-base flex items-center justify-center"
                href="https://focus-mode-pomodoro.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.home.featured.ctaLive}
              </a>
            </div>
          </article>
      </section>

      <div className="hidden md:block" aria-hidden="true">
      <div className="w-50 h-50 fixed left-16 bottom-32 rounded-full bg-gradient-to-tl from-orange-500 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
      <div className="w-80 h-80 fixed right-16 bottom-32 rounded-full bg-gradient-to-br from-gray-500 to-green-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
      <div className="w-25 h-25 fixed top-16 left-0 right-128 m-auto rounded-full bg-gradient-to-r from-blue-800 to-gray-500 opacity-10 animate-floating motion-reduce:animate-none"></div>
      </div>
    </>
  );
}
