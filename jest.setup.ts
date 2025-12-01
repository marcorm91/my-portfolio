import "@testing-library/jest-dom";

// Basic mocks for Next.js components/hooks
jest.mock("next/image", () => {
  return function NextImageMock(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return require("react").createElement("img", {
      ...props,
      alt: props?.alt || "",
    });
  };
});

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    usePathname: () => "/",
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useParams: () => ({}),
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("min-width: 1024px") ? true : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
