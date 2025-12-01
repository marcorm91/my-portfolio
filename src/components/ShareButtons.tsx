"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";
import Toast from "./Toast";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const t = useTranslations();
  const [url, setUrl] = useState<string>("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share && url) {
      try {
        await navigator.share({ title, url });
      } catch {
        // ignore cancel/share errors
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setToastMessage(t.articles.copied);
    } catch {
      setToastMessage("");
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1 rounded-md border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 text-sky-700 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition"
        >
          <span aria-hidden="true">📋</span> {t.articles.copyLink}
        </button>

        <a
          href={
            url
              ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
              : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center no-underline gap-1 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label={t.articles.shareTwitter}
        >
          X
        </a>

        <a
          href={
            url
              ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
              : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center no-underline gap-1 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label={t.articles.shareLinkedin}
        >
          in
        </a>
      </div>
      <Toast message={toastMessage} />
    </>
  );
}
