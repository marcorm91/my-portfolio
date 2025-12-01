import Link from "next/link";
import { useTranslations } from "@/app/[locale]/TranslationsProvider";

interface NavMenuProps {
  pathname: string;
  closeMenu?: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ pathname, closeMenu }) => {
  const t = useTranslations();
  const currentLocale = pathname.split("/")[1] || "en";

  // Construye el path completo localizado
  const buildLocalizedPath = (path: string) =>
    path === "/" ? `/${currentLocale}` : `/${currentLocale}${path}`;

  // Lista de enlaces
  const navItems = [
    { path: "/", label: t.header.home },
    { path: "/blog", label: t.header.articles },
    { path: "/about", label: t.header.about },
  ];

  return (
    <>
      {navItems.map(({ path, label }) => {
        const fullPath = buildLocalizedPath(path);
        const isActive =
          path === "/"
            ? pathname === fullPath
            : pathname === fullPath || pathname.startsWith(`${fullPath}/`);

        return (
          <li key={path} onClick={closeMenu}>
            <Link
              href={fullPath}
              aria-current={isActive ? "page" : undefined}
              tabIndex={isActive ? -1 : 0}
              className={`inline-block btn-custom px-4 py-2 xl:text-lg no-underline ${
                isActive
                  ? "pointer-events-none text-blue-500 font-semibold border-b-2 border-blue-500 active"
                  : "hover:text-blue-500 transition-colors"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavMenu;
