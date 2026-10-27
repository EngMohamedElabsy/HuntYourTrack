# HuntYourTrack - Software Engineering Graduation Project

## Project Overview
HuntYourTrack is a career-platform graduation project for matching students with internships and personalized learning roadmaps. This repository currently contains a static authentication frontend and project design documents; backend services, session handling, and the rest of the product UI are planned work.

## Current and Planned Stack
- **Implemented frontend:** HTML, CSS, browser JavaScript, GSAP via CDN.
- **Frontend hosting:** Static host (AWS S3 is planned; not configured here).
- **Implemented backend:** Node.js, Express, bcrypt, jsonwebtoken, cookie-parser, cors. In-memory user store active.
- **Planned services:** MongoDB Atlas, Kubernetes, n8n, Gemini API; no active configuration is present.

## Run and Verify
- Install dependencies: `npm install`
- Run backend server: `npm run start:backend` (serves API on port 5000 and static frontend).
- Run static frontend standalone: `npm start` (serves `frontend/` on port 8080).
- Run backend test suite: `npm run test:backend` (automated integration tests for auth and sessions).
- Run auth browser check: `npm run test:auth` (uses `skills/automation/frontend-smoke-test.js`; Playwright Chromium required).

## Active Changelog & Task Tracker
- [x] Repository initialized.
- [x] Documentation (docs/) uploaded to GitHub.
- [x] CLAUDE.md initialized for project memory.
- [x] Initialize Frontend structure.
- [x] Implement backend API and session handling (US01 completed: in-memory store, bcrypt, JWT in httpOnly cookie, cors, auth routes).
- [ ] Configure MongoDB Atlas connection.
- [ ] Integrate Gemini API.
- [ ] Setup n8n workflows.
- [x] Requested US01 authentication frontend: responsive sign-in/sign-up, validation, status feedback, and password-reset request UI.
- [x] Authentication backend: implement `/api/auth/login`, `/api/auth/register`, `/api/auth/password-reset`, `/api/auth/me`, `/api/auth/logout`, and secure session handling.
- [-] GitHub US02 (#40): navigation hierarchy and mobile shell behavior documented; actual shell screens remain unimplemented.
- [-] GitHub US03 (#41): shared frontend component classes and a preview page exist; the Figma library and full card variants remain pending.
- [ ] GitHub US01 (#39): base palette and typography match the global CSS; dark theme and shared style-guide review remain open.
- [ ] Do not change or close GitHub issues unless the user explicitly asks.

### GitHub Story Number Crosswalk
- Student authentication UI and backend is US08 (#46) in the current GitHub issue list; the user refers to authentication as US01 for this task.
- GitHub US01 (#39) is the global design system. GitHub US02 (#40) is the navigation map. GitHub US03 (#41) is the reusable component library.
- Keep user-requested names in conversation and repository notes separate from upstream issue numbers until the user confirms the intended mapping.

## Architecture Notes
- The backend is built with Express and provides JSON APIs under `/api/auth/*`.
- Authentication sessions use JWT stored in `httpOnly`, `sameSite: 'Lax'` cookies (`token`).
- Passwords are encrypted using `bcrypt` (10 salt rounds).
- Users are currently stored in a decoupled in-memory repository (`backend/models/userStore.js`) designed for easy drop-in replacement with MongoDB Atlas Mongoose models.
- The Express server also serves the static `frontend/` directory so the app can be run as a unified full-stack application or accessed via cross-origin requests from port 8080 (`cors` is enabled with `credentials: true`).
- AWS, Kubernetes, MongoDB, n8n, and Gemini references describe planned architecture, not currently connected services.
- **Clean Code Standard:** 
  - All code must adhere to "Clean Code" principles (meaningful naming, single responsibility, and modularity).
  - Code must be continuously refactored for clarity and efficiency.
  - **Strict Language Policy:** No Arabic text is allowed in the code, variable names, or comments. All comments and documentation within the code MUST be written in professional English.

## AI Core Directives
1. **Always Update:** After successfully implementing any new feature, fixing a bug, or modifying the architecture, you MUST automatically edit this `CLAUDE.md` file to update the "Active Changelog & Task Tracker".
2. **Context First:** Always read this file silently before executing any new tasks to ensure alignment with the project architecture.
3. **Version Control & GitHub Sync:** After completing any task, adding a feature, or updating this tracking file, you MUST automatically use local `git` commands (`git add .`, `git commit -m "descriptive message"`) to commit your changes, and then immediately execute `git push origin main` to sync the work with the remote GitHub repository.
4. **Pre-Push Communication Protocol:** Before executing `git push`, the agent MUST write a detailed "Final Update Report" at the end of the `CLAUDE.md` file. This report must include:
   - **What was changed/added:** A clear summary of the technical changes.
   - **Reasoning:** Why these changes were made.
   - **Impact:** How this affects other team members or project components.
   The mandatory sequence is: `Implement` $\rightarrow$ `Update Tracker` $\rightarrow$ `Write Final Report in CLAUDE.md` $\rightarrow$ `Commit` $\rightarrow$ `Push`.
5. **Cross-Session Synchronization:** Upon starting any task, the agent MUST perform a differential analysis between the current codebase and the `Active Changelog` in `CLAUDE.md`. If discrepancies are found, the agent MUST first reconcile the state and update the tracker before proceeding.

## Project Skills and Tools
- Design guidance lives in `skills/design-system/huntyourtrack/MASTER.md`.
- Browser helpers live in `skills/automation/` and the interactive navigation map lives in `skills/archify/`.
- Repository-specific Codex guidance lives in `skills/huntyourtrack-frontend/SKILL.md`.
- Project skill instructions supplement the agent's installed tools; they do not copy or replace global skills.
- Keep code, comments, and project-maintained technical docs in English.
- Do not disable Git TLS verification to work around network failures.

## Latest Updates / Team Handoff
- **Date:** October 27, 2026
- **Task:** US01 Backend Authentication & Session Integration & Root Cleanup
- **What was modified:**
  1. **Folder Isolation & Cleanup (Phase 0):**
     - Moved `.impeccable` and `.serena` metadata directories into `skills/` (`skills/.impeccable`, `skills/.serena`).
     - Added `.impeccable/`, `.serena/`, `skills/.impeccable/`, and `skills/.serena/` to `.gitignore`.
     - Removed empty `scripts/` directory; automation scripts are consolidated under `skills/automation/`.
  2. **Backend Architecture Initialized (Phase 2 & 3):**
     - `backend/server.js`: Express app with `cors` (`credentials: true`), `express.json()`, `cookieParser()`, static frontend serving, and graceful error handling.
     - `backend/config/index.js`: Configuration for port, JWT secret, cookie flags, and allowed origins.
     - `backend/models/userStore.js`: Modular in-memory user repository with normalized email indexing, query methods, and creation logic.
     - `backend/middleware/auth.js`: JWT verification middleware inspecting cookies or Authorization header.
     - `backend/controllers/authController.js`: Complete business logic for registration (validation, bcrypt hashing, conflict checking, JWT cookie generation), login (credential verification, session issuance), password reset, session identity (`/me`), and logout.
     - `backend/routes/auth.js`: Clean modular routes mounted under `/api/auth`.
  3. **Package & Script Integration (Phase 4):**
     - Installed production dependencies: `express`, `cors`, `bcrypt`, `jsonwebtoken`, `cookie-parser`.
     - Added npm scripts: `"start:backend": "node backend/server.js"`, `"test:backend": "node backend/tests/auth.test.js"`.
  4. **Verification & Testing:**
     - Created comprehensive integration test suite `backend/tests/auth.test.js` covering registration, duplicate checking, validation, login, session cookies, `/me`, and logout. All 11 tests pass.
- **Current State of US01:**
  - Both frontend UI and backend authentication services are fully functional and integrated.
  - Ready for future MongoDB Atlas migration without changing endpoint signatures or controller contracts.
- **How the Team Should Run the Backend:**
  - To start the server: `npm run start:backend` (runs on `http://localhost:5000`).
  - To run automated backend tests: `npm run test:backend`.
  - To run the standalone frontend server: `npm start` (port 8080).

