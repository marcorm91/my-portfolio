import { render, screen } from "@testing-library/react";
import NavMenu from "@/components/NavMenu";

jest.mock("next/navigation", () => {
  return {
    usePathname: () => "/es/blog/some-article",
    useParams: () => ({ locale: "es" }),
  };
});

jest.mock("@/app/[locale]/TranslationsProvider", () => ({
  useTranslations: () => ({
    header: {
      home: "Inicio",
      articles: "Blog",
      about: "Sobre mí",
    },
  }),
}));

describe("NavMenu", () => {
  it("marks Blog as active when on a blog detail page", () => {
    render(<NavMenu pathname="/es/blog/some-article" />);

    const blogLink = screen.getByRole("link", { name: "Blog" });
    expect(blogLink).toHaveAttribute("aria-current", "page");
    expect(blogLink).toHaveClass("active");
  });
});
