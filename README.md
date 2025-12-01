# My Portfolio

Personal portfolio built with Next.js (App Router) in English/Spanish, with light/dark mode, smooth animations, and reusable components.

## Key features
- Locale routing `/en` and `/es` via `TranslationsProvider` and copy in `src/utils/language`.
- Home, About, and Blog; profile data in `src/data/profile.ts`.
- Blog powered by MDX content in `content/{en,es}` (loader in `src/lib/mdxArticles.ts`), with sidebar filter by year/month, infinite scroll, and persistent read state in `localStorage`.
- Article detail renders collaborator info, share buttons with toast, hero cover, and rich prose styling.
- Language and theme switch in Header (`ThemeProvider` + `ThemeSwitch`).
- Responsive UI with Tailwind CSS 4 and motion-respectful animations (floating gradients, typing, etc.).
- Accessibility focus (roles, aria-labels, focus styles, optimized `Image` usage).
- Tests with Jest + React Testing Library for NavMenu and ShareButtons.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript.
- Tailwind CSS 4 with global styles in `src/styles/globals.css`.
- MDX + `gray-matter` + `remark-html` for articles.
- Jest + @testing-library/react for component tests.

## Quick structure
- `src/app/[locale]/page.tsx`: home page mounting `Home.tsx`.
- `src/app/[locale]/about/page.tsx`: profile/experience section.
- `src/app/[locale]/blog/page.tsx`: blog index (uses `Articles.tsx`).
- `src/app/[locale]/articles/[slug]/page.tsx`: article detail (MDX HTML).
- `src/components/`: header, footer, menus, cards, timelines, share buttons/toast.
- `src/utils/language/en.ts` and `src/utils/language/es.ts`: translations.
- `src/lib/mdxArticles.ts`: MDX loader/helpers.
- `content/{en,es}/`: MDX articles.
- `public/assets/`: images and icons used in the UI.

## Content configuration
- Edit personal data and timeline in `src/data/profile.ts`.
- Add or edit articles by creating MDX files under `content/en` or `content/es`; `mdxArticles.ts` ingests them.
- Change copy/labels in `src/utils/language/{en,es}.ts`.
- Replace images in `public/assets/images/` for avatar and social icons.

## Requirements
- Node.js 20+ and npm.

## Scripts
- `npm install`: install dependencies.
- `npm run dev`: start development (Turbopack) at `http://localhost:3000`.
- `npm run build`: create production build.
- `npm run start`: serve the built app.
- `npm run lint`: run Next/TypeScript linting.
- `npm run test`: run Jest + RTL tests.

## Deployment
- Run `npm run build` to validate the build.
- Deploy on Vercel or any hosting compatible with Next.js 15 (including static routes `/en` and `/es`).
