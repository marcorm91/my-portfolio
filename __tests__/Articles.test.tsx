import { render, screen, fireEvent } from "@testing-library/react";
import ArticlesSection from "@/app/[locale]/articles/Articles";

const tMock = {
  articles: {
    title: "Blog",
    description: "Desc",
    filterTitle: "Filtrar por fecha",
    filterReset: "Limpiar",
    readTimeSuffix: "min",
    markRead: "Marcar leído",
    markUnread: "Quitar leído",
    readBadge: "Leído",
    readBadgeAria: "Insignia de leído",
    readMore: "Leer más",
    loadMore: "Cargar más",
    ctaPrefix: "CTA",
    ctaLink: "Link",
  },
};

jest.mock("@/app/[locale]/TranslationsProvider", () => ({
  useTranslations: () => tMock,
}));

const articles = [
  {
    slug: "a1",
    title: "Artículo 1",
    excerpt: "Resumen 1",
    date: "2024-01-15",
    locale: "es" as const,
  },
];

describe("ArticlesSection", () => {
  it("opens and closes filter panel in mobile", () => {
    render(<ArticlesSection locale="es" initialArticles={articles as any} />);

    const panel = screen.getByRole("complementary", { name: /Filtrar por fecha/i });
    expect(panel).toHaveClass("hidden");

    fireEvent.click(screen.getAllByRole("button", { name: /filtrar por fecha/i })[0]);
    expect(panel).not.toHaveClass("hidden");

    fireEvent.click(screen.getAllByRole("button", { name: /filtrar por fecha/i })[1]);
    expect(panel).toHaveClass("hidden");
  });

  it("marks article as read and shows eye badge", () => {
    render(<ArticlesSection locale="es" initialArticles={articles as any} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(screen.getByLabelText(/quitar leído/i)).toBeChecked();
    const badge = screen.getByLabelText(/insignia de leído/i);
    expect(badge).toBeInTheDocument();
  });
});
