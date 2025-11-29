"use client";

import Image from "next/image";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useCallback } from "react";
import { getValidLocale } from "@/utils/helpers/helpers";

interface LanguageSelectorProps {
  currentLocale: "es" | "en";
  isLangMenuOpen: boolean;
  setIsLangMenuOpen: (value: boolean) => void;
  handleLanguageChange: (newLocale: "es" | "en") => void;
}

export default function LanguageSelector({
  currentLocale,
  isLangMenuOpen,
  setIsLangMenuOpen,
  handleLanguageChange,
}: LanguageSelectorProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const buttonId = useId();
  const menuId = `${buttonId}-menu`;

  const containerRef = useRef<HTMLLIElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const localeFromUrl = pathname.split("/")[1];
    const validLocale = getValidLocale(localeFromUrl);
    if (validLocale && validLocale !== currentLocale) {
      handleLanguageChange(validLocale as "es" | "en");
    }
  }, [pathname, currentLocale, handleLanguageChange]);

  useEffect(() => {
    if (!isLangMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isLangMenuOpen, setIsLangMenuOpen]);

  useEffect(() => {
    if (!isLangMenuOpen) return;
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && containerRef.current?.contains(next)) return;
      setIsLangMenuOpen(false);
    };
    const node = containerRef.current;
    node?.addEventListener("focusout", onFocusOut);
    return () => node?.removeEventListener("focusout", onFocusOut);
  }, [isLangMenuOpen, setIsLangMenuOpen]);

  useEffect(() => {
    if (isLangMenuOpen) firstItemRef.current?.focus();
  }, [isLangMenuOpen]);

  const toggle = useCallback(
    () => setIsLangMenuOpen(!isLangMenuOpen),
    [isLangMenuOpen, setIsLangMenuOpen]
  );

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isLangMenuOpen) setIsLangMenuOpen(true);
    } else if (e.key === "Escape" && isLangMenuOpen) {
      e.preventDefault();
      setIsLangMenuOpen(false);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')
    );
    const idx = items.findIndex((el) => el === document.activeElement);

    if (e.key === "Tab") {
      setIsLangMenuOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (items[(idx + 1) % items.length] || items[0])?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (items[(idx - 1 + items.length) % items.length] || items[items.length - 1])?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsLangMenuOpen(false);
      buttonRef.current?.focus();
    }
  };

  const buildPathWithLocale = (newLocale: "es" | "en") => {
    const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
    return `/${newLocale}${rest || ""}`;
  };

  const selectLocale = (locale: "es" | "en") => {
    if (locale === currentLocale) {
      setIsLangMenuOpen(false);
      return;
    }
    const nextPath = buildPathWithLocale(locale);
    handleLanguageChange(locale);
    router.push(nextPath);
    setIsLangMenuOpen(false);
    buttonRef.current?.focus();
  };

  const labelCurrent = currentLocale === "es" ? t.header.es : t.header.en;

  return (
    <li
      ref={containerRef}
      className="relative mt-auto lg:mt-0"
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
        className="flex gap-2 px-2 py-2 xl:text-lg btn-custom items-center w-full lg:w-auto"
        aria-haspopup="menu"
        aria-expanded={isLangMenuOpen}
        aria-controls={menuId}
        aria-label={`Language: ${labelCurrent}`}
      >
        <Image
          src={currentLocale === "es" ? "/assets/images/es.svg" : "/assets/images/en.svg"}
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
        <span aria-live="polite">{labelCurrent}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeWidth={4} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isLangMenuOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          onKeyDown={onMenuKeyDown}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 right-0 bg-white text-gray-800 shadow-lg rounded-md mt-2 overflow-hidden z-20"
        >
          <li role="none">
            <button
              ref={firstItemRef}
              role="menuitemradio"
              aria-checked={currentLocale === "es"}
              lang="es"
              tabIndex={-1}
              onClick={() => selectLocale("es")}
              className="flex w-full gap-2 font-semibold px-4 py-2 transition-colors hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              <Image src="/assets/images/es.svg" alt="" width={20} height={20} aria-hidden="true" />
              {t.header.es}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitemradio"
              aria-checked={currentLocale === "en"}
              lang="en"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                selectLocale("en");
              }}
              className="flex w-full gap-2 font-semibold px-4 py-2 transition-colors hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              <Image src="/assets/images/en.svg" alt="" width={20} height={20} aria-hidden="true" />
              {t.header.en}
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}
