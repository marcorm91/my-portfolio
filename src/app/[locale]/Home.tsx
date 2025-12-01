"use client";

import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import Image from "next/image";

export default function HomeClient() {
  const t = useTranslations();

  return (
    <>
     <section
        className="flex flex-col items-center justify-center h-full text-center px-5 relative z-10 max-w-4xl m-auto"
        role="region"
        aria-label="Sección principal de presentación"
      >
        <article className="flex justify-center items-center flex-col gap-6 pb-[15vh]">
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
            role="status"
            aria-live="polite"
          >
            <span className="text-white dark:text-black pr-2" aria-hidden="true">
              C:\Users\marco&gt;
            </span>
            <span className="sr-only">Command: make directory my-portfolio</span>
            <span className="typing-effect text-white dark:text-black w-[135px] md:w-[185px]" aria-hidden="true">
              mkdir my-portfolio
            </span>
          </div>

          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/marcorm91/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-custom px-3 py-1 text-sm md:text-xl min-h-12"
              aria-label="Abrir perfil de LinkedIn de Marco en una nueva pestaña"
            >
              <Image src="/assets/images/linkedin.svg" alt="" width={20} height={20} aria-hidden="true" />
              <span className="flex-1">LinkedIn</span>
            </a>
            <a
              href="mailto:marco_antonio88_9@hotmail.com"
              className="btn-custom px-3 py-1 text-sm md:text-xl min-h-12"
              aria-label="Enviar correo electrónico a Marco"
            >
              <Image src="/assets/images/email.svg" alt="" width={20} height={20} aria-hidden="true" />
              <span className="flex-1">{t.home.hero.contactButton}</span>
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
