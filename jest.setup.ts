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
