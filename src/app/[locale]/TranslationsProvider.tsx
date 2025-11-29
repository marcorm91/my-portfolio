"use client";

import React from "react";
import translations from "@/utils/language/index";

const TranslationsContext = React.createContext<typeof translations["en"] | null>(null);

export const TranslationsProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const t = translations[locale as keyof typeof translations];
  return (
    <TranslationsContext.Provider value={t}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => {
  const context = React.useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations debe usarse dentro de TranslationsProvider");
  }
  return context;
};