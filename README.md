# HuntYourTrack

HuntYourTrack is a career platform prototype for matching students with internships and learning roadmaps. The checked-in application currently contains a static authentication frontend. Backend authentication, sessions, database connections, and dashboards are not implemented in this checkout.

## Project layout

| Path | Purpose |
| --- | --- |
| `frontend/` | Static HTML pages, shared styles, and page-specific CSS/JavaScript |
| `skills/design-system/` | Visual tokens and component guidance |
| `skills/automation/` | Browser smoke checks and Zen automation helpers |
| `skills/archify/` | Interactive navigation diagram and its candidate specification |
| `skills/huntyourtrack-frontend/` | Repository-specific Codex instructions; global Codex skills stay in the user's Codex installation |
| `docs/` | Architecture diagrams, exports, and project guidelines |
| `CLAUDE.md` | Project context, backlog notes, and implementation reports |

The authentication page is split into `frontend/auth.html`, `frontend/auth.css`, and `frontend/auth.js`. `frontend/style.css` contains shared styles.

Open `frontend/components.html` directly to preview the shared buttons, form states, cards, dialog, and tooltip. The planned route hierarchy and responsive shell rules are documented in `docs/specs/navigation-map.md`, alongside the [interactive navigation map](skills/archify/workflow-platform-navigation-20261026/platform-navigation.html). These shell destinations remain planned screens.

## Run locally

Requirements: Node.js 20 or later, Python 3, and the Playwright Chromium browser for the smoke check.

```sh
npm install
npm start
```

Open <http://localhost:8080>. Run the browser check with:

```sh
npm run test:auth
```

The smoke check uses Playwright with a deterministic GSAP test double. It checks desktop and mobile panel endpoints, the one-second tween configuration, identical sign-in and registration card/form dimensions, native validation, auth request payloads and error states, redirect safety, and shared component interactions. It does not claim to test a live backend or the CDN-delivered GSAP animation frames.

## Authentication API seam

The frontend expects same-origin JSON POST endpoints:

| Route | Payload fields |
| --- | --- |
| `/api/auth/login` | `email`, `password` |
| `/api/auth/register` | `name`, `email`, `faculty`, `password` |
| `/api/auth/password-reset` | `email` |

Responses can include a user-facing `message` and an optional same-origin `redirectTo`. The server still needs to validate all fields, authenticate/create users, issue and manage secure session cookies, and implement password-reset delivery. No credentials or session tokens are stored in browser storage.

## Backlog numbering

The requested work calls authentication **US01**. In the current GitHub issue list, the student authentication UI is **US08 (#46)**; GitHub **US01 (#39)** means the global design system, **US02 (#40)** means the navigation map, and **US03 (#41)** means the reusable component library. The Figma design criterion remains pending because no Figma integration is connected. No issue is closed by this repository workflow.
