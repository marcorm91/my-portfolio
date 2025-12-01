import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShareButtons from "@/components/ShareButtons";

const writeTextMock = jest.fn();
const shareMock = jest.fn();

jest.mock("@/app/[locale]/TranslationsProvider", () => ({
  useTranslations: () => ({
    articles: {
      copyLink: "Copy link",
      copied: "Link copied",
      share: "Share",
      shareTwitter: "Share on X",
      shareLinkedin: "Share on LinkedIn",
    },
  }),
}));

describe("ShareButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(global.navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    Object.defineProperty(global.navigator, "share", {
      value: undefined, // force copy fallback
      configurable: true,
    });
  });

  it("copies link when clicking the main button", async () => {
    Object.defineProperty(window, "location", {
      value: { href: "http://localhost/post" },
      writable: true,
      configurable: true,
    });

    render(<ShareButtons title="My post" />);

    fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
    await waitFor(() =>
      expect(writeTextMock).toHaveBeenCalledWith("http://localhost/post")
    );
  });
});
