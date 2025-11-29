"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/[locale]/ThemeProvider";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import NavMenu from "./NavMenu";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitch from "./ThemeSwitch";
import { getNewPathWithLocale } from "@/utils/helpers/helpers";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const t = useTranslations();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null); // primer foco dentro del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: "es" | "en") => {
    const newPath = getNewPathWithLocale(pathname, newLocale);
    router.push(newPath);
    closeMenu();
  };

  function openMenu() {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    setIsMenuOpen(true);
    // evita scroll del body (Safari/Firefox)
    document.documentElement.style.overflow = "hidden";
    // foco inicial
    setTimeout(() => firstFocusRef.current?.focus(), 0);
  }

  function closeMenu() {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    setIsMenuOpen(false);
    setIsLangMenuOpen(false);
    document.documentElement.style.overflow = "";
  }

  // Sincroniza al cerrar por ESC o clic en backdrop
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIsMenuOpen(false);
      setIsLangMenuOpen(false);
      document.documentElement.style.overflow = "";
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <h1 className="sr-only">Marco Romero - Portfolio</h1>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-24 focus-visible:left-1/2 focus-visible:-translate-x-1/2 focus-visible:z-[9999] focus-visible:px-3 focus-visible:py-2 focus-visible:bg-black/80 focus-visible:text-white focus-visible:rounded-lg"
        onClick={() => setTimeout(() => document.getElementById("main")?.focus(), 0)}
      >
        {t.header.skipToContent}
      </a>

      <header className="p-5 flex justify-between items-center fixed inset-x-0 top-0 h-20 bg-white/85 dark:bg-gray-800/60 backdrop-blur-[5px] z-20 transition-all duration-200">
        <Link href="/" aria-label={t.header.index_img} className="inline-flex items-center">
          <Image
            src={isDarkMode ? "/assets/images/MR-white.png" : "/assets/images/MR-dark.png"}
            alt=""
            width={64}
            height={64}
          />
        </Link>
        <nav aria-label={t.header.nav} className="flex items-center">
          <button
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg"
            aria-controls="primary-nav-dialog"
            aria-expanded={isMenuOpen}
            aria-label={t.header.open_nav}
            onClick={openMenu}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M4 6h16M4 12h16m-7 6h7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
            <NavMenu pathname={pathname} />
            <LanguageSelector
              currentLocale={pathname.split("/")[1] as "es" | "en"}
              isLangMenuOpen={isLangMenuOpen}
              setIsLangMenuOpen={setIsLangMenuOpen}
              handleLanguageChange={handleLanguageChange}
            />
            <ThemeSwitch />
          </ul>

          <dialog
            ref={dialogRef}
            id="primary-nav-dialog"
            aria-labelledby="nav-title"
            aria-modal="true"
            className="m-0 p-0 w-screen max-w-none h-screen bg-transparent backdrop:bg-black/50"
          >
            <div className="fixed inset-y-0 right-0 w-3/4 max-w-[22rem] bg-gray-800 text-white border-l-4 p-6 overflow-y-auto">
              <div className="flex items-center justify-end mb-6">
                <h2 id="nav-title" className="sr-only">{t.header.nav}</h2>
                <button
                  ref={firstFocusRef}
                  onClick={closeMenu}
                  className="inline-flex h-11 w-11 items-center justify-center"
                  aria-label={t.header.close_nav}
                >
                  <svg aria-hidden="true" viewBox="0 0 512 512" width="36" height="36" fill="currentColor">
                    <path d="M284.3,256l100.7-100.7c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L239,210.7 138.3,110c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3L193.7,256 93,356.7c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0L239,301.3l100.7,100.7c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3L284.3,256z"/>
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col gap-8">
                <NavMenu pathname={pathname} closeMenu={closeMenu} />
                <LanguageSelector
                  currentLocale={pathname.split("/")[1] as "es" | "en"}
                  isLangMenuOpen={isLangMenuOpen}
                  setIsLangMenuOpen={setIsLangMenuOpen}
                  handleLanguageChange={handleLanguageChange}
                />
                <ThemeSwitch />
              </ul>
            </div>
          </dialog>
        </nav>
      </header>
    </>
  );
}
