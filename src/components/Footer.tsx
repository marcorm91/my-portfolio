"use client";

import { useTranslations } from "@/app/[locale]/TranslationsProvider";

const Footer: React.FC = () => {
    const t = useTranslations();

    return (
        <footer className="bg-gray-800 dark:bg-gray-800/60 text-white text-center py-4 w-full min-h-15 transition-all duration-200">
            <p className="m-0 text-sm">© {new Date().getFullYear()} Marco Romero. {t.footer.copyright}</p>
        </footer>
    );
};

export default Footer;