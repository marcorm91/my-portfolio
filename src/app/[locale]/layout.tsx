import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { getValidLocale } from "@/utils/helpers/helpers";
import { TranslationsProvider } from "@/app/[locale]/TranslationsProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../styles/globals.css";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Marco Romero - Desarrollador Web",
  description: "Portafolio personal y blog de desarrollo front-end y accesibilidad.",
  other: {
    "google-site-verification": "PJfgRUWQfk3wBcLg_HOoyQv5sxGaTuj2egCpsKub098",
  },
};

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale) as "en" | "es";

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} dark:bg-gray-900 bg-white dark:text-white text-gray-800 transition-all duration-200`}>
        <TranslationsProvider locale={validLocale}>
          <ThemeProvider>
            <Header />
            <main id="main" className="mx-auto mt-25 lg:mt-30 mb-4 max-w-7xl px-4 pb-16">{children}</main>
            <Footer />
          </ThemeProvider>
        </TranslationsProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}