<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 1. App Router & Page Colocation Rules (`app/`)
- **Route Colocation Pattern**: Components, modals, types, and constants that belong **exclusively** to a specific route/page MUST be placed inside that route's private subfolder with a leading underscore `_components/` (e.g., `app/project-3d-model/_components/`, `app/project-bade/_components/`).
- **DO NOT** place page-specific sub-components in global `components/sections/`. Keep `app/` routes modular and self-contained.

## 2. Global Component Organization Rules (`components/`)
When creating or saving components in `components/`, AI MUST place them into the appropriate sub-folder based on their scope and category:
- `components/sections/`: **STRICTLY** for top-level landing page sections (e.g., `hero-section.tsx`, `about-section.tsx`, `projects-section.tsx`, `experience-section.tsx`, `certificates-section.tsx`, `contact-section.tsx`).
- `components/animations/`: For animated UI elements, visual effects, and shaders. **MUST use a dedicated subfolder per animation** containing `index.tsx` and its companion `.css` file in kebab-case (e.g., `components/animations/side-rays/index.tsx` + `side-rays.css`).
- `components/layout/`: For global structural elements (e.g., `navbar.tsx`, `footer.tsx`).
- `components/theme/`: For theme providers and theme toggles (`theme-provider.tsx`, `theme-toggle.tsx`).
- `components/ui/`: For atomic UI primitives and shadcn/ui components (e.g., `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `avatar.tsx`).

DO NOT place new components directly in the root of the `components/` folder.

## 3. Data Separation of Concerns (`data/`)
- All static datasets, lists, content collections, and mock data MUST be placed in the `data/` directory with TypeScript typing:
  - `data/projects.ts`: Project portfolio list and project category definitions.
  - `data/certificates.ts`: Certificate and credentials data.
  - `data/experiences.ts`: Career and education timeline data.
  - `data/skills.tsx`: Tech stack logos, badge icons, and skill items.
  - `data/guestbook.json`: Guestbook JSON data.
- **DO NOT** hardcode long data arrays directly inside React JSX section files. Keep UI components focused strictly on rendering and animations.

## 4. Public Directory Organization Rules (`public/`)
When adding or managing assets in the `public/` directory, AI MUST place them into the appropriate sub-folder:
- `public/images/projects/`: For project screenshots and images. If a project has many images, create a dedicated subfolder (e.g., `public/images/projects/bade/`, `public/images/projects/3d-model/`).
- `public/images/certificates/`: For certificate images and verification badges.
- `public/images/profile/`: For personal profile photos and avatars.
- `public/images/misc/`: For miscellaneous image assets.
- `public/models/`: For 3D model files (e.g., `.glb`, `.gltf`).
- `public/documents/`: For PDF documents and CV files (e.g., `.pdf`).
- `public/icons/`: For SVGs and icon files.

DO NOT place new assets directly in the root of the `public/` folder.
