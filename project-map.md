# DS OS Project Map

Use this file as a fast orientation guide before opening source. It reflects the current implementation of the portfolio and acts as a quick reference for both structure and visual direction.

## Project Overview

DS OS is a client-side, single-viewport portfolio for Deevann Shrestha presented as a desktop workstation. It combines portfolio storytelling, interactive app windows, a virtual file system, and a personalized desktop shell with no backend. Portfolio content is stored in local TypeScript data, and appearance preferences persist in browser `localStorage`.

The app opens with the About window active and supports app launching from desktop icons, the search menu, quick links, and the dock. Windows can be focused, dragged, resized, minimized, maximized, restored, and closed.

## Design Style / Visual Language

The portfolio uses a polished "glass OS" aesthetic adapted for a digital portfolio:

- Dark graphite and midnight surfaces with subtle blue, cyan, emerald, violet, and rose accents.
- Layered translucency and blur: windows, cards, menus, and overlays use frosted glass with soft transparency and glow.
- Ambient wallpaper treatment with gradients, soft light blooms, and subtle particle movement for depth.
- High-contrast typography and structured panels to keep the interface readable while preserving the futuristic desktop feel.
- Smooth motion language: soft scale/translation transitions for windows, cards, menus, and loading states.
- Modular UI patterns: dock, top bar, desktop icons, app cards, and floating panels all reuse the same glassmorphism language.

The overall visual intent is "premium developer workstation" rather than a literal operating system: functional, immersive, and highly stylized without sacrificing usability.

## Entry Points And Ownership

- [index.html](index.html): document metadata, font loading, global root element, and Vite module entry.
- [src/main.tsx](src/main.tsx): mounts the React `App` and imports global styles.
- [src/App.tsx](src/App.tsx): application composition and primary state owner. Defines app metadata, default window sizes, desktop icon registry, settings defaults, window lifecycle logic, z-index ordering, and shell-level event wiring.
- [src/types/os.ts](src/types/os.ts): shared data contracts for app IDs, window state, desktop items, system settings, portfolio item structures, and appearance option unions.
- [src/data/portfolioData.ts](src/data/portfolioData.ts): central portfolio content for profile, projects, experience, tech stack, resume, and virtual files.
- [src/utils/audio.ts](src/utils/audio.ts): singleton `soundManager` for UI sounds and ambient music playback.
- [src/index.css](src/index.css): Tailwind import, animations, custom glassmorphism and motion styles, and global theme treatment.

## UI Structure

### Desktop Shell

- [src/components/desktop/DesktopBackground.tsx](src/components/desktop/DesktopBackground.tsx): wallpaper rendering, optional grid, contrast adjustments, and background particle effects.
- [src/components/desktop/TopBar.tsx](src/components/desktop/TopBar.tsx): system menu access, app shortcuts, ambient-audio toggle, settings shortcut, and time/date display.
- [src/components/desktop/SpatialMenu.tsx](src/components/desktop/SpatialMenu.tsx): searchable app launcher, utility shortcuts, and external links.
- [src/components/desktop/DesktopIcon.tsx](src/components/desktop/DesktopIcon.tsx): desktop icon behavior and single click/double click open logic.
- [src/components/desktop/Dock.tsx](src/components/desktop/Dock.tsx): persistent dock for key apps and dynamic state for open/minimized windows.
- [src/components/loading/LoadingScreen.tsx](src/components/loading/LoadingScreen.tsx): studio-style initial loading transition used before the desktop shell becomes interactive.
- [src/components/ui/ExternalLinkModal.tsx](src/components/ui/ExternalLinkModal.tsx): confirmation modal before opening external URLs.

### Window Manager

- [src/components/window/WindowFrame.tsx](src/components/window/WindowFrame.tsx): shared draggable/resizable window shell for titlebar, controls, animation, focus behavior, minimize/maximize state, and visual styling.
- [src/App.tsx](src/App.tsx): owns the `Record<AppId, WindowState>` registry and z-index ordering. Each app instance is mounted into a `WindowFrame` and managed from the main state container.

### Apps

| App | Source | Main behavior and content |
| --- | --- | --- |
| About | [src/components/apps/AboutApp.tsx](src/components/apps/AboutApp.tsx) | Intro profile, summary, environment details, and profile links. |
| Projects | [src/components/apps/ProjectsApp.tsx](src/components/apps/ProjectsApp.tsx) | Search/category filtering, project cards, and a detail inspector. |
| Experience | [src/components/apps/ExperienceApp.tsx](src/components/apps/ExperienceApp.tsx) | Career timeline with search and expandable entries. |
| Tech Stack | [src/components/apps/TechStackApp.tsx](src/components/apps/TechStackApp.tsx) | Filterable engineering inventory and skill stacks. |
| Files | [src/components/apps/FilesApp.tsx](src/components/apps/FilesApp.tsx) | Virtual file browser; clicking or opening items routes to destination app windows. |
| Resume | [src/components/apps/ResumeApp.tsx](src/components/apps/ResumeApp.tsx) | PDF preview, zoom controls, and download handling. |
| Terminal | [src/components/apps/TerminalApp.tsx](src/components/apps/TerminalApp.tsx) | Simulated in-browser terminal with command parsing and history. |
| Settings / Customizer | [src/components/apps/CustomizerApp.tsx](src/components/apps/CustomizerApp.tsx) | Wallpaper, theme, blur, contrast, particles, audio, and grid controls. |
| Personal | [src/components/apps/PersonalApp.tsx](src/components/apps/PersonalApp.tsx) | Personal side of the portfolio, interests, art/music, and profile context beyond work. |
| Walkthrough | [src/components/apps/WalkthroughApp.tsx](src/components/apps/WalkthroughApp.tsx) | Guided narrative / onboarding experience summarizing the portfolio and career path. |

## Current App Registry

The active desktop environment is driven by app metadata in [src/App.tsx](src/App.tsx):

- `about`
- `projects`
- `experience`
- `tech-stack`
- `files`
- `resume`
- `terminal`
- `customizer`
- `personal`
- `walkthrough`

These app IDs also define the desktop icon configuration, default window geometry, and the registry used for focusing, opening, minimizing, restoring, and closing windows.

## Key Functions

- [src/App.tsx](src/App.tsx): manages default settings, storage persistence, window state initialization, open/restore/focus handling, close/minimize/maximize logic, geometry updates, and dock interaction.
- [src/components/window/WindowFrame.tsx](src/components/window/WindowFrame.tsx): handles drag-to-move and drag-to-resize behavior and applies the active blur/theme styling to the window chrome.
- [src/components/apps/TerminalApp.tsx](src/components/apps/TerminalApp.tsx): dispatches the simulated command set and supports command history navigation.
- [src/components/apps/ResumeApp.tsx](src/components/apps/ResumeApp.tsx): scales document preview and handles PDF download confirmation.
- [src/utils/audio.ts](src/utils/audio.ts): exposes the ambient and UI sound manager used across the system.

## Important Behavior And Constraints

- Settings use storage key `ds_os_settings_v3`; legacy key `ds_os_settings_v2` is still read for migration compatibility.
- Appearance options are centralized in [src/types/os.ts](src/types/os.ts) and then consumed by the customizer and wallpaper rendering logic.
- The app is a static Vite frontend. The desktop shell is a visual fiction, not a real operating system or backend service.
- Terminal commands are simulated in-browser and not a production shell; command coverage is intentionally limited to the app experience.
- Audio is browser-managed and is not tied to a server or remote platform.

## Stack And Commands

- React 19 + TypeScript; Vite 8; Tailwind CSS 4 via the Vite plugin; Lucide React icons.
- `npm run dev`: Vite development server on port 3000.
- `npm run lint`: TypeScript check (`tsc --noEmit`).
- `npm run build`: production bundle in `dist/`.
- `npm run preview`: production preview on port 4173.
- Vite alias `@` points to the repository root in [vite.config.ts](vite.config.ts).

## Static Assets And Deployment

- [public/](public/): static content including resume PDF, SVG branding assets, and audio assets.
- [vercel.json](vercel.json): SPA fallback to `index.html` and cache rules for `/assets/*`.
- [README.md](README.md): setup and deployment instructions.

## Change Routing

- Edit portfolio content in [src/data/portfolioData.ts](src/data/portfolioData.ts) and, when needed, corresponding interfaces in [src/types/os.ts](src/types/os.ts).
- Add or change an app by updating the `AppId` union, adding the component under [src/components/apps](src/components/apps), then registering it in [src/App.tsx](src/App.tsx), desktop icons, and any menu/dock entry points.
- Change window lifecycle logic in [src/App.tsx](src/App.tsx) and interaction behavior in [src/components/window/WindowFrame.tsx](src/components/window/WindowFrame.tsx).
- Change visual preferences in [src/components/apps/CustomizerApp.tsx](src/components/apps/CustomizerApp.tsx), state defaults in [src/App.tsx](src/App.tsx), and rendering in [src/components/desktop/DesktopBackground.tsx](src/components/desktop/DesktopBackground.tsx) or [src/index.css](src/index.css).
- Change audio behavior in [src/utils/audio.ts](src/utils/audio.ts); callers include the app shell and customizer.

## Quick Reference For The Design Theme
- [CHANGELOG.md](CHANGELOG.md): versioned record of notable project changes.

## Changelog And Versioning

- Record project changes in [CHANGELOG.md](CHANGELOG.md).
- Update the changelog in the same commit as every code, content, or documentation change. Add one concise entry per commit under the current version; use an `Unreleased` section when a release version has not been assigned.
- Group entries under `Added`, `Changed`, `Fixed`, `Removed`, or `Documentation` as appropriate. Preserve existing release entries.
- For a release, move accumulated `Unreleased` entries into a dated version heading.
- Follow `MAJOR.MINOR.PATCH` versioning: increment MAJOR for breaking changes, MINOR for backward-compatible features, and PATCH for backward-compatible fixes.
- The initial baseline is `1.0.0`; the current portfolio and desktop updates are recorded as `1.1.0`.

## Quick Reference For The Design Theme

If you need to preserve the original design intent while modifying the app, keep these constraints in mind:

- Foundation: dark OS environment with glass/panel layering.
- Accent palette: blue/cyan for hero and active states, emerald for success/energy, violet for settings, rose for personal emphasis.
- Texture: slight blur, transparency, subtle glow, and soft noise-like gradients.
- Interaction: polished and gentle animation with low-friction transitions.
- Personality: futuristic but professional, with enough warmth to feel personal rather than corporate.

This is the design baseline for the portfolio: a premium personal workstation interface, not a generic SaaS dashboard.
