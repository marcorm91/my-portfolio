# My Portfolio

Personal portfolio built with Next.js (App Router) in English/Spanish, with light/dark mode, smooth animations, and reusable components.

## Key features
- Locale routing `/en` and `/es` using `TranslationsProvider` and copy in `src/utils/language`.
- Home, About, and Blog with centralized data in `src/data/profile.ts` and `src/data/articles.ts`.
- Blog sidebar filter by year/month, infinite scroll, and persistent “read” state in `localStorage`.
- Language and theme switch in `Header`, powered by `ThemeProvider` and `ThemeSwitch`.
- Responsive UI with Tailwind CSS 4 and motion-safe transitions.
- Accessibility focus (roles, aria-labels, live regions, and optimized `Image` usage).
- Consistent layout in `src/app/[locale]/layout.tsx` with IBM Plex fonts via `next/font`.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript.
- Tailwind CSS 4 with global styles in `src/styles/globals.css`.
- Data/helpers in `src/data` and `src/utils`.

## Quick structure
- `src/app/[locale]/page.tsx`: home page mounting `Home.tsx`.
- `src/app/[locale]/about/page.tsx`: profile/experience section.
- `src/app/[locale]/blog/page.tsx`: blog/notes.
- `src/components/`: header, footer, menus, cards, and timelines.
- `src/utils/language/en.ts` and `src/utils/language/es.ts`: translations.
- `public/assets/`: images and icons used in the UI.

## Content configuration
- Edit personal data and timeline in `src/data/profile.ts`.
- Update articles in `src/data/articles.ts`, which aggregates entries from `src/data/articles/{es,en}/*.ts` and exposes `articlesByLocale`.
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

## Deployment
- Run `npm run build` to validate the build.
- Deploy on Vercel or any hosting compatible with Next.js 15 (including static routes `/en` and `/es`).
