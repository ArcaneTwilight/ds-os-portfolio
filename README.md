# DS OS - Portfolio Workstation

DS OS is an interactive, single-screen portfolio for Deevann Shrestha, presented as a browser-based desktop environment. Visitors can open draggable app windows to explore profile information, projects, career history, skills, files, and a resume.

## Current features

- Desktop workspace with icons, a system menu, quick app shortcuts, and a dock
- Movable, resizable, minimizable, and maximizable app windows
- About, Projects, Experience, Tech Stack, Files, Resume, Terminal, and Settings apps
- Desktop customization for wallpaper, theme, blur, contrast, particles, grid, and ambient audio
- Settings persisted in browser local storage; no account or backend required
- Static portfolio and assets served from the `public/` directory

## Built with

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React icons and Motion

## Development

### Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite serves the app at http://localhost:3000.

Available checks and build commands:

```bash
npm run lint     # TypeScript type check
npm run build    # Production build in dist/
npm run preview  # Preview the production build at localhost:4173
```

## Deploy to Vercel

This is a static Vite app. The included `vercel.json` configures the SPA fallback and immutable caching for generated assets.

1. Push the project to a Git repository and import that repository in Vercel.
2. Select the Vite framework preset, or use these project settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install` (Vercel can also use the committed lockfile automatically)
3. Deploy. No environment variables are required for the current app.

Do not commit local environment files or credentials. `.env.example` is a safe template; real `.env` files are ignored by Git.

## Project layout

```text
public/                 Static assets, including audio and the resume PDF
src/
  components/apps/      Portfolio app windows
  components/desktop/   Desktop shell, menu, dock, and icons
  components/window/    Window frame and controls
  data/                 Portfolio content
  types/                Shared TypeScript types
  utils/                Browser utilities, including audio
index.html              Vite entry document and page metadata
vercel.json             Vercel SPA rewrite and asset cache headers
vite.config.ts          Vite and Tailwind configuration
```
