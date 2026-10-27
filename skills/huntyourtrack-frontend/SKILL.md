---
name: huntyourtrack-frontend
description: Maintain HuntYourTrack's static frontend, authentication UI, shared styles, and browser verification. Use for frontend changes in this repository.
---

# HuntYourTrack Frontend

## Project facts

- The implemented frontend is static HTML, CSS, and browser JavaScript under `frontend/`; React is a future plan, not the current app.
- Authentication is split across `frontend/auth.html`, `frontend/auth.css`, and `frontend/auth.js`. Shared tokens and reusable styles belong in `frontend/style.css`.
- The repository has no backend implementation. The auth UI expects same-origin JSON endpoints under `/api/auth`; do not describe authentication or session handling as end-to-end until server routes exist.
- Run the static frontend with `npm start` and the browser smoke check with `npm run test:auth` when the relevant frontend files change.
- `frontend/components.html` is the shared UI preview; `docs/specs/navigation-map.md` records planned routes and shell behavior.
- Refer to `skills/design-system/huntyourtrack/MASTER.md` for visual tokens and `docs/` for architecture artifacts. Keep those sources consistent with the implemented frontend.
- Shared auth-card and form-container dimensions must remain unchanged when switching between sign-in and registration; make the form viewport scrollable when content exceeds the fixed height.

## Authentication invariants

- Keep the desktop panels at 50% width and move each by its full own dimension using GSAP `xPercent`; use `yPercent` for the stacked small-screen layout.
- Keep panel movement aligned, preserve form focus and keyboard access, and test switching in both directions at desktop and mobile sizes.
- Keep inactive forms hidden and inert. Associate every input with a label and retain browser validation before sending a request.
- Authentication requests use JSON, same-origin credentials, and only follow redirects on the current origin.

## Backlog and GitHub issues

- Verify user-story titles and acceptance criteria against the linked GitHub issues before changing story status. The repository issue list currently calls student authentication **US08** (#46), global design system **US01** (#39), navigation architecture **US02** (#40), and component library **US03** (#41).
- If a user assigns different story numbers, preserve their requested scope while explaining the numbering mismatch. Never close or otherwise change issue state unless the user explicitly asks.
- Report UI readiness separately from backend completion and issue closure.
