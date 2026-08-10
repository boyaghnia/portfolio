<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Component Organization Rules
When creating or saving new components in the `components/` directory, AI MUST place them into the appropriate sub-folder based on their category:
- `components/sections/`: For main page sections (e.g., about, contact, hero, projects).
- `components/layout/`: For page layout and navigation elements (e.g., navbar, footer).
- `components/animations/`: For animated UI elements, visual effects, React Bits components, and their CSS files.
- `components/theme/`: For theme providers and theme toggles.
- `components/ui/`: For standard UI components (e.g., shadcn/ui elements).
DO NOT place new components directly in the root of the `components/` folder unless explicitly requested by the user.

## Public Directory Organization Rules
When adding or managing assets in the `public/` directory, AI MUST place them into the appropriate sub-folder to maintain a clean structure:
- `public/images/projects/`: For project screenshots and images. If a project has many images, create a subfolder (e.g., `public/images/projects/bade/`).
- `public/images/profile/`: For personal profile photos.
- `public/images/misc/`: For miscellaneous image assets.
- `public/models/`: For 3D models (e.g., `.glb`, `.gltf`).
- `public/documents/`: For documents (e.g., `.pdf`).
- `public/icons/`: For SVGs and icon files.
DO NOT place new assets directly in the root of the `public/` folder unless explicitly requested by the user.
