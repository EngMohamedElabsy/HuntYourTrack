# HuntYourTrack - Software Engineering Graduation Project

## Project Overview
HuntYourTrack is a career-platform graduation project for matching students with internships and personalized learning roadmaps. This repository currently contains a static authentication frontend and project design documents; backend services, session handling, and the rest of the product UI are planned work.

## Current and Planned Stack
- **Implemented frontend:** HTML, CSS, browser JavaScript, GSAP via CDN.
- **Frontend hosting:** Static host (AWS S3 is planned; not configured here).
- **Backend status:** Backend phase is NOT started. The platform currently operates strictly as a frontend-only prototype with pure client-side JavaScript mocking for University graduation review.
- **Planned services:** Node.js/Express, MongoDB Atlas, Kubernetes, n8n, Gemini API; no backend servers or databases are active.

## Team Onboarding & Setup
1. **Prerequisites:**
   - Ensure heavy AI tools, browser binaries, and bulky automation assets reside in your host user home directory at `~/.global_ai_skills` (or configure the `GLOBAL_SKILLS_PATH` environment variable).
2. **Initial Setup:**
   - Clone repository.
   - Install local dev dependencies:
     ```bash
     npm install
     ```
   - Wire the global skills symlink on your machine:
     ```bash
     npm run setup:skills
     ```
     This creates a `.global_skills` symlink in the project root pointing to `~/.global_ai_skills` without bloating Git.
3. **Run and Verify:**
   - Run the frontend locally:
     ```bash
     npm start
     ```
     Serves `frontend/` on `http://localhost:8080`.
   - Run the browser automation smoke test:
     ```bash
     npm run test:auth
     ```

## Active Changelog & Task Tracker
- [x] Repository initialized.
- [x] Documentation (docs/) uploaded to GitHub.
- [x] CLAUDE.md initialized for project memory.
- [x] Initialize Frontend structure.
- [x] US01 / US08 Authentication Frontend & Mock Simulation:
  - Dual-panel responsive sign-in/sign-up UI with cinematic GSAP panel sliding.
  - Pure JavaScript client-side input validation (email formatting, password length, required fields).
  - Simulated session management via `localStorage` (`user='student'`, mock token).
  - Realistic status feedback and delayed dashboard redirect simulation (`index.html`).
- [ ] Backend implementation (Deferred: strictly frontend prototyping phase per project requirements).
- [-] GitHub US02 (#40): navigation hierarchy and mobile shell behavior documented; actual shell screens remain pending.
- [-] GitHub US03 (#41): shared frontend component classes and preview page (`frontend/components.html`) exist.
- [ ] GitHub US01 (#39): global design tokens and typography defined in `frontend/style.css`.
- [ ] Do not change or close GitHub issues unless the user explicitly asks.

### GitHub Story Number Crosswalk
- Student authentication UI is US08 (#46) in the GitHub issue list; referred to conversationally as US01.
- GitHub US01 (#39) is the global design system. GitHub US02 (#40) is the navigation map. GitHub US03 (#41) is the reusable component library.
- All current issues are verified via `gh issue list` as Frontend-only / UI/UX deliverables.

## Architecture Notes
- The application runs purely client-side without any backend build step or server dependency.
- Authentication state is simulated using browser `localStorage`:
  - `localStorage.getItem('user') === 'student'`
  - `localStorage.getItem('auth_token')`
- Heavy AI tools, local caches (`.impeccable`, `.serena`), and bulky scripts are purged from the repository and accessed via the `.global_skills` host symlink.
- **Clean Code Standard:** 
  - All code must adhere to "Clean Code" principles (meaningful naming, single responsibility, and modularity).
  - **Strict Language Policy:** No Arabic text is allowed in the code, variable names, or comments. All comments and documentation within the code MUST be written in professional English.

## AI Core Directives
1. **Always Update:** After successfully implementing any new feature, fixing a bug, or modifying the architecture, you MUST automatically edit this `CLAUDE.md` file to update the "Active Changelog & Task Tracker".
2. **Context First:** Always read this file silently before executing any new tasks to ensure alignment with the project architecture.
3. **Version Control & GitHub Sync:** After completing any task, adding a feature, or updating this tracking file, you MUST automatically use local `git` commands (`git add .`, `git commit -m "descriptive message"`) to commit your changes, and then immediately execute `git push origin main` to sync the work with the remote GitHub repository.
4. **Pre-Push Communication Protocol:** Before executing `git push`, the agent MUST write a detailed "Final Update Report" at the end of the `CLAUDE.md` file.
   The mandatory sequence is: `Implement` $\rightarrow$ `Update Tracker` $\rightarrow$ `Write Final Report in CLAUDE.md` $\rightarrow$ `Commit` $\rightarrow$ `Push`.
5. **Cross-Session Synchronization:** Upon starting any task, the agent MUST perform a differential analysis between the current codebase and the `Active Changelog` in `CLAUDE.md`. If discrepancies are found, the agent MUST first reconcile the state and update the tracker before proceeding.

## Project Skills and Tools
- Lightweight project-specific skill instructions remain under `skills/`:
  - `skills/huntyourtrack-frontend/SKILL.md` (frontend conventions and layout invariants).
  - `skills/design-system/huntyourtrack/MASTER.md` (color palette and design tokens).
- Dynamic AI tools, browser automation, and navigation maps are linked through `.global_skills` via `npm run setup:skills`.
- Keep code, comments, and project-maintained technical docs in English.

## Latest Updates / Team Handoff
- **Date:** October 27, 2026
- **Task:** Transition to Global Skills Architecture & Pure Frontend Mock for US01
- **What was modified:**
  1. **Purged Heavy Local Assets & AI Metadata (Phase 1):**
     - Removed bulky directories and caches (`.impeccable`, `.serena`, local `skills/automation`, `skills/archify`).
     - Preserved only lightweight documentation context files in `skills/` (`skills/huntyourtrack-frontend/SKILL.md` and `skills/design-system/huntyourtrack/MASTER.md`).
  2. **Global Skills Dynamic Linker (Phase 2):**
     - Created `scripts/setup-skills.js`: cross-platform Node script that symlinks `.global_skills` to `~/.global_ai_skills` on the developer's host machine.
     - Added `.global_skills` and `.global_skills/*` to `.gitignore`.
     - Added `"setup:skills": "node scripts/setup-skills.js"` to `package.json`.
  3. **Backend Removal & Clean Prototyping (Phase 2 & 3):**
     - Completely deleted `backend/` directory.
     - Uninstalled backend packages (`express`, `cors`, `bcrypt`, `jsonwebtoken`, `cookie-parser`).
     - Removed backend npm scripts (`start:backend`, `test:backend`).
  4. **Frontend Mock Implementation in `frontend/auth.js` (Phase 3):**
     - Removed all network `fetch` calls to backend endpoints.
     - Implemented pure client-side validation for email formatting, password length, and required student fields.
     - Implemented simulated session persistence in `localStorage`: stores `user = 'student'`, `auth_token`, and `user_email`.
     - Added animated status feedback and simulated redirect to `index.html` via `setTimeout(..., 1500)`.
  5. **Verification & Smoke Testing:**
     - Updated `.global_skills/automation/frontend-smoke-test.js` to assert against the mock validation and `localStorage` session state.
     - Successfully ran `npm run test:auth` with 100% passing checks.
- **Current State of US01:**
  - Fully functioning as a client-side Frontend Mock ready for team and university presentation.
- **How Teammates Should Run the Project:**
  - Setup: `npm install && npm run setup:skills`
  - Preview: `npm start` (opens on `http://localhost:8080`)
  - Test: `npm run test:auth`

