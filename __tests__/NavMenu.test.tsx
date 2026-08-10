import { render, screen } from "@testing-library/react";
import NavMenu from "@/components/NavMenu";

jest.mock("next/navigation", () => {
  return {
    usePathname: () => "/es/about",
    useParams: () => ({ locale: "es" }),
  };
});

jest.mock("@/app/[locale]/TranslationsProvider", () => ({
  useTranslations: () => ({
    header: {
      home: "Inicio",
      about: "Sobre mí",
    },
  }),
}));

describe("NavMenu", () => {
  it("marks About as active on the about page", () => {
    render(<NavMenu pathname="/es/about" />);

    const aboutLink = screen.getByRole("link", { name: "Sobre mí" });
    expect(aboutLink).toHaveAttribute("aria-current", "page");
    expect(aboutLink).toHaveClass("active");
  });
});
