'use client';

import Image from "next/image";
import { useTheme } from "@/app/[locale]/ThemeProvider";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import { useCallback } from "react";

const ThemeSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const t = useTranslations();

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode]);

  const label = isDarkMode ? (t.header.mode_light) : (t.header.mode_dark);

  return (
    <li className="self-end">
      <button
        type="button"
        onClick={toggleTheme}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTheme();
          }
        }}
        role="switch"
        aria-checked={isDarkMode}
        aria-label={label}
        className="relative box-custom w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-500 p-1 transition-colors duration-300 rounded-full cursor-pointer"
      >
        <span
          className={`w-7 h-7 flex items-center justify-center transform transition-transform duration-300 ${
            isDarkMode ? "translate-x-7" : "translate-x-0"
          }`}
        >
          {isDarkMode ? (
            <Image
              src="/assets/images/moon.svg"
              alt={t.header.icon_dark}
              width={25}
              height={25}
              aria-hidden="true"
            />
          ) : (
            <Image
              src="/assets/images/sun.svg"
              alt={t.header.icon_light}
              width={25}
              height={25}
              aria-hidden="true"
            />
          )}
        </span>
      </button>
    </li>
  );
};

export default ThemeSwitch;
