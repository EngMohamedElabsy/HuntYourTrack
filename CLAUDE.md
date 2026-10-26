# HuntYourTrack - Software Engineering Graduation Project

## Project Overview
HuntYourTrack is a career-platform graduation project for matching students with internships and personalized learning roadmaps. This repository currently contains a static authentication frontend and project design documents; backend services, session handling, and the rest of the product UI are planned work.

## Current and Planned Stack
- **Implemented frontend:** HTML, CSS, browser JavaScript, GSAP via CDN.
- **Frontend hosting:** Static host (AWS S3 is planned; not configured here).
- **Planned backend:** Node.js or Python; no backend source is currently present.
- **Planned services:** MongoDB Atlas, Kubernetes, n8n, Gemini API; no active configuration is present.

## Run and Verify
- Install browser tooling: `npm install`
- Run static frontend: `npm start` (serves `frontend/` on port 8080).
- Run auth browser check: `npm run test:auth` (Playwright Chromium required).
- There is no build command or backend start command yet.

## Active Changelog & Task Tracker
- [x] Repository initialized.
- [x] Documentation (docs/) uploaded to GitHub.
- [x] CLAUDE.md initialized for project memory.
- [x] Initialize Frontend structure.
- [ ] Implement backend API and session handling (no backend source exists yet).
- [ ] Configure MongoDB Atlas connection.
- [ ] Integrate Gemini API.
- [ ] Setup n8n workflows.
- [x] Requested US01 authentication frontend: responsive sign-in/sign-up, validation, status feedback, and password-reset request UI.
- [ ] Authentication backend: implement `/api/auth/login`, `/api/auth/register`, `/api/auth/password-reset`, and secure session handling.
- [-] GitHub US02 (#40): navigation hierarchy and mobile shell behavior documented; actual shell screens remain unimplemented.
- [-] GitHub US03 (#41): shared frontend component classes and a preview page exist; the Figma library and full card variants remain pending.
- [ ] GitHub US01 (#39): base palette and typography match the global CSS; dark theme and shared style-guide review remain open.
- [ ] Do not change or close GitHub issues unless the user explicitly asks.

### GitHub Story Number Crosswalk
- Student authentication UI is US08 (#46) in the current GitHub issue list; the user refers to login as US01 for this task.
- GitHub US01 (#39) is the global design system. GitHub US02 (#40) is the navigation map. GitHub US03 (#41) is the reusable component library.
- Keep user-requested names in conversation and repository notes separate from upstream issue numbers until the user confirms the intended mapping.

## Architecture Notes
- The current frontend is static and runs without a build step.
- The auth page sends same-origin JSON requests to `/api/auth/*`; the endpoint contract and cookie/session implementation remain backend work.
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
- Repository-specific Codex guidance lives in `skills/huntyourtrack-frontend/SKILL.md`.
- Project skill instructions supplement the agent's installed tools; they do not copy or replace global skills.
- Keep code, comments, and project-maintained technical docs in English.
- Do not disable Git TLS verification to work around network failures.

## Final Update Report — Authentication and Repository Organization
- **What changed:** Split the auth page into HTML/CSS/JS files; added responsive desktop/mobile panel switching, student faculty signup validation, accessible status states, password-reset request UI, same-origin API handling, and a Playwright smoke check. Added shared component classes and a preview page, the planned navigation map, project run/test commands, a repository map, and project-specific frontend skill guidance.
- **Reasoning:** The earlier panel animation used half-panel travel and was disabled at tablet sizes. Project documentation also claimed an implemented React frontend and backend despite the repository containing only a static page. GitHub story IDs differ from the user's requested numbering, so the mapping is documented without changing issue states.
- **Impact:** The UI and test setup can be reviewed and run locally. The backend still must implement authentication, secure cookies/sessions, and reset delivery. GitHub issues remain open.
