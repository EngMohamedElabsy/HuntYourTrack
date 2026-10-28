# HuntYourTrack - Software Engineering Graduation Project

## Project Overview
HuntYourTrack is a career-platform graduation project for matching students with internships and personalized learning roadmaps. This repository currently contains a static authentication frontend and project design documents; backend services, session handling, and the rest of the product UI are planned work.

## Current and Planned Stack
- **Implemented frontend:** HTML, CSS, browser JavaScript, GSAP via CDN.
- **Frontend hosting:** Static host (AWS S3 is planned; not configured here).
- **Backend status:** Backend phase is NOT started. The platform currently operates strictly as a frontend-only prototype with pure client-side JavaScript mocking for University graduation review.
- **Planned services:** Node.js/Express, MongoDB Atlas, Kubernetes, n8n, Gemini API; no backend servers or databases are active.

## Team Onboarding & Setup
1. **Cross-Platform Dynamic Resolution:**
   - Teammates on **ANY OS (Linux, Windows, macOS)** only need to run `npm run setup:skills` after cloning the repository.
   - The script automatically resolves each user's home directory across operating systems:
     - **Windows:** `C:\Users\<user>\.global_ai_skills` (created via directory `junction` without requiring Administrator privileges).
     - **Linux/macOS:** `/home/<user>/.global_ai_skills` or `/Users/<user>/.global_ai_skills` (created via POSIX `symlink`).
   - If the global directory does not exist yet, the script automatically creates it.
   - Override target via the `GLOBAL_SKILLS_PATH` environment variable if desired.
2. **Initial Setup:**
   - Clone repository.
   - Install local dev dependencies:
     ```bash
     npm install
     ```
   - Wire the global skills symlink/junction:
     ```bash
     npm run setup:skills
     ```
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
- [x] GitHub US01 (#39): Global Design System & UI Kit (`frontend/style.css`) - CLOSED (Done).
- [x] GitHub US02 (#40): Layout Architecture & Navigation Map (`docs/specs/navigation-map.md`) - CLOSED (Done).
- [x] GitHub US03 (#41): Core Component Library (`frontend/components.html`, `.css`, `.js`) - CLOSED (Done).
- [ ] GitHub US08 (#46): Student Authentication UI (`frontend/auth.html`, `.css`, `.js`) - OPEN (`toprogram`) for Hager review.
- [ ] GitHub US09 (#47): Student Dashboard Layout (`frontend/index.html`) - OPEN (`toprogram`) for Hager review.
- [ ] GitHub US04 (#42): Admin Control Panel Core UI - OPEN (`toprogram`) assigned to Mohamed.
- [ ] GitHub US05 (#43): Employer Verification Workflow UI - OPEN (`Todo`) assigned to Mohamed.
- [ ] GitHub US06 (#44): Final Design Prototype Review - OPEN (`Todo`) assigned to Mohamed.
- [ ] GitHub US07 (#45): Student Landing Page Wireframe - OPEN (`Todo`) assigned to Hager.
- [ ] GitHub US10 (#48): Employer Dashboard Main UI - OPEN (`Todo`) assigned to Abdulrahman.
- [ ] GitHub US11 (#49): Internship Posting Form UI - OPEN (`Todo`) assigned to Abdulrahman.
- [ ] GitHub US12 (#50): Applicant Review Interface - OPEN (`Todo`) assigned to Abdulrahman.
- [x] Sprint 1 Milestone established on GitHub (Deadline: Sunday Nov 1, 2026).
- [x] GitHub Project #5 created & linked: [HuntYourTrack - Graduation Sprint 1](https://github.com/users/EngMohamedElabsy/projects/5) (Board & Table Excel views with all 12 issues mapped to Todo, In Progress, Done).
- [ ] Backend implementation (Deferred: strictly frontend prototyping phase per project requirements).

### GitHub Story Number Crosswalk
- Student authentication UI is US08 (#46) in the GitHub issue list; referred to conversationally as US01.
- GitHub US01 (#39) is the global design system. GitHub US02 (#40) is the navigation map. GitHub US03 (#41) is the reusable component library.
- All current issues are verified via `gh issue list` as Frontend-only / UI/UX deliverables.

## Architecture Notes
- The application runs purely client-side without any backend build step or server dependency.
- Authentication state is simulated using browser `localStorage`:
  - `localStorage.getItem('user') === 'student'`
  - `localStorage.getItem('auth_token')`
- **Global Skills Architecture:** The local `skills/` folder is intentionally removed from the repository. All project skills, AI metadata, automation scripts, and design guidelines are now accessed exclusively through the `.global_skills` symlink mapped to the developer's host machine (`~/.global_ai_skills`). This guarantees zero repository bloat across teams while maintaining dynamic tooling access.
- **Clean Code Standard:** 
  - All code must adhere to "Clean Code" principles (meaningful naming, single responsibility, and modularity).
  - **Strict Language Policy:** No Arabic text is allowed in the code, variable names, or comments. All comments and documentation within the code MUST be written in professional English.

## Team Workflow, Role Isolation & Issue Governance Protocol

### 1. Strict Role Isolation & Anti-Collision Policy (عدم التدخل في مهام الزملاء)
- **Assigned Persona Only:** The assistant and developers must strictly focus on their own assigned tasks (Lead Architect: @EngMohamedElabsy).
- **Zero Cross-Stepping:** NEVER work on, modify, refactor, or close issues assigned to other teammates (e.g., Hager @hager678, Abdulrahman @abdulrhman-masoud) unless explicitly ordered by the Lead Architect.
- **Strict "Definition of Done" & Verification:**
  - An issue must NEVER be marked as `Closed` on GitHub or moved to `Done` in the Project until the assigned engineer finishes 100% of the deliverable without any missing requirements or regressions.
  - When inspecting a teammate's submitted work, verify strictly that they completed *only* their assigned scope and did not modify or touch another teammate's codebase or files.

### 2. GitHub Project & Workflow Synchronization
- **Mandatory Project Integration:** Every existing or newly created issue MUST be linked directly to GitHub Project #5:
  - **Project URL:** [HuntYourTrack - Graduation Sprint 1](https://github.com/users/EngMohamedElabsy/projects/5)
- **Workflow Columns & Statuses:**
  - `Todo`: Backlog items awaiting start.
  - `In Progress` / `toprogram`: Items currently actively being developed or under testing/review.
  - `Done`: 100% completed, fully tested, and verified items.
- **Deadlines & Milestones:** Every issue in the sprint must be tied to the active milestone (`Sprint 1: Graduation Prototype`) with exact deadlines determined by the Lead Developer.

### 3. Sequential Issue Numbering & User Story Standards
- **Strict Sequential Numbering:**
  - Existing stories are `US01` through `US12`.
  - Any future issues MUST follow strict sequential order: e.g., `US13: <Title>`, `US14: <Title>`, etc., regardless of how many older issues are closed.
- **Autonomous Issue Discovery:**
  - If new issues are created on GitHub without prior chat notification, the assistant must inspect the latest issue on GitHub, determine the next sequential number (`US13`, `US14`, ...), and align immediately.
- **Mandatory User Story Structure:** Every issue created on GitHub MUST strictly adhere to this standardized Agile template:
  ```markdown
  ### User Story
  As a [Role: student / employer / admin], I want [Feature / Action] so that [Benefit / Business Goal].

  ### Context & UI/UX Requirements
  • Specific screens, layout components, and interaction models.
  • Form inputs, required fields, and client-side validation rules.
  • Responsive behavior across desktop and mobile breakpoints.

  ### Acceptance Criteria
  [ ] Clear verifiable deliverable 1.
  [ ] Clear verifiable deliverable 2.
  [ ] Interaction and responsive state confirmed.
  ```
- **Issue Metadata:** Every issue must have proper labels (`must`/`should`, `UI/UX`, `Todo`/`toprogram`), the correct Assignee, the active Milestone, and be linked to Project #5.

## AI Core Directives
1. **Always Update:** After successfully implementing any new feature, fixing a bug, or modifying the architecture, you MUST automatically edit this `CLAUDE.md` file to update the "Active Changelog & Task Tracker".
2. **Context First:** Always read this file silently before executing any new tasks to ensure alignment with the project architecture and the Team Governance Protocol.
3. **Version Control & GitHub Sync:** After completing any task, adding a feature, or updating this tracking file, you MUST automatically use local `git` commands (`git add .`, `git commit -m "descriptive message"`) to commit your changes, and then immediately execute `git push origin main` to sync the work with the remote GitHub repository.
4. **Pre-Push Communication Protocol:** Before executing `git push`, the agent MUST write a detailed "Final Update Report" at the end of the `CLAUDE.md` file.
   The mandatory sequence is: `Implement` $\rightarrow$ `Update Tracker` $\rightarrow$ `Write Final Report in CLAUDE.md` $\rightarrow$ `Commit` $\rightarrow$ `Push`.
5. **Cross-Session Synchronization:** Upon starting any task, the agent MUST perform a differential analysis between the current codebase, GitHub issues, and the `Active Changelog` in `CLAUDE.md`. If discrepancies are found, the agent MUST first reconcile the state and update the tracker before proceeding.

## Project Skills and Tools
- The project has **ZERO** local skills directories (`skills/` is deleted).
- All project skills, design references, and browser helpers reside in `.global_skills/`:
  - `.global_skills/huntyourtrack-frontend/SKILL.md` (frontend conventions and layout invariants).
  - `.global_skills/design-system/huntyourtrack/MASTER.md` (color palette and design tokens).
  - `.global_skills/automation/frontend-smoke-test.js` (browser smoke test).
- Run `npm run setup:skills` to configure or refresh the `.global_skills` symlink on any machine.
- Keep code, comments, and project-maintained technical docs in English.

## Latest Updates / Team Handoff
- **Date & Timestamp:** 2026-10-28 18:45:00 UTC+3
- **Status:** Established Team Workflow & Governance Protocol, Project #5 Synchronization, Role Isolation Rules.
- **What was modified:**
  1. **Strict Role Isolation Added to Architecture & AI Directives:**
     - Mandated that developer persona operates strictly on @EngMohamedElabsy issues.
     - Enforced zero cross-stepping: never modify or close teammates' tasks (@hager678, @abdulrhman-masoud) until they finish 100% of their work without any missing requirements.
     - Verification protocol: inspect teammates' deliverables to confirm they touched only their assigned scope.
  2. **GitHub Project #5 Synchronization Protocol:**
     - Enforced mandatory linkage of every issue to [HuntYourTrack - Graduation Sprint 1 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5).
     - Defined workflow mapping across `Todo`, `In Progress` / `toprogram`, and `Done` with exact milestones and deadlines.
  3. **Sequential Story Numbering & Structured Template Standard:**
     - Enforced sequential naming (e.g., upcoming issue must be `US13: <Title>`, then `US14`, etc.).
     - Mandated strict Agile Story template (User Story, Context & UI/UX Requirements, Acceptance Criteria, Labels, Assignee).
     - Added autonomous discovery protocol for newly added GitHub issues.

- **Previous Updates (Archive):**
  - **Date & Timestamp:** 2026-10-27 22:05:00 UTC+3
  - **Status:** Complete Auth/Dashboard Flow, GSAP Offline Resilience, High-Contrast Scrollbar & Live View Active.
- **What was modified:**
  1. **Student Dashboard Implemented in `frontend/index.html`:**
     - Replaced redirect placeholder with a full-featured Student Dashboard prototype.
     - Resolved the critical infinite redirect loop (logging in now lands on the dashboard and stays there).
     - Features Damanhour University CS affiliation, student session greeting from `localStorage`, AI Track Match (94%), matched internship cards with application triggers, learning milestones progress, and a sign-out button.
  2. **GSAP Offline Resilience in `frontend/auth.js`:**
     - Wrapped all `window.gsap` calls (`from`, `set`, `timeline`, `killTweensOf`) with safe CSS fallback transitions.
     - Ensures panel sliding works smoothly offline even if CDN is inaccessible.
  3. **High-Contrast Modern Scrollbar in `frontend/auth.css`:**
     - Upgraded scrollbar thumb to prominent brand indigo (`#6366F1`) with track `#E2E8F0`.
     - Increased thumb width to 7px with 8px right padding to ensure clear visibility and avoid overlapping form inputs.
  4. **Active Live View Verification:**
     - Static HTTP server running live on port 8080 (`python3 -m http.server 8080 --directory frontend`).
     - Verified HTTP 200 responses on both `/auth.html` and `/index.html`.
  5. **Cross-Platform Dynamic Skills Architecture:**
     - Confirmed `scripts/setup-skills.js` dynamically detects Linux, Windows, or macOS home directory (`~/.global_ai_skills`) and creates symlink/junction with zero repository bloat.

- **Previous Updates (Archive):**
  - **Date & Timestamp:** 2026-10-27 21:54:00 UTC+3
  - **Task:** Auth UI Scrollbar & Spacing Polish
  - **What was modified:**
    - Custom sleek scrollbar added to `frontend/auth.css`.
    - Academic affiliation corrected to Faculty of Computers and Information, Damanhour University (CS Department).
     - Set Lead Developer to Mohamed Yasser Elabsy (@EngMohamedElabsy).
  2. **Structure & Story Mapping Cleanup:**
     - Updated project structure to accurately map `docs/` (`specs/`, `diagrams/`, `pdf_exports/`, `guidelines/`).
     - Aligned User Story table IDs cleanly without duplicate rows.
     - Documented pure static frontend execution without server dependencies.
  1. **Absolute Dependency Purge (Phase 1):**
     - Completely deleted `node_modules/` and `package-lock.json` from the repository root.
     - Cleaned `package.json` to zero dependencies and zero devDependencies; removed `playwright` and all package bloat.
     - Retained only lightweight scripts: `"setup:skills": "node scripts/setup-skills.js"` and `"start": "python3 -m http.server 8080 --directory frontend"`.
  2. **Comprehensive README.md Refactoring (Phase 2):**
     - Fully rewritten for university evaluators and teammates.
     - Highlights graduation project goals, lightweight pure HTML/CSS/JS architecture, file organization, cross-platform onboarding guide, and simulation specs.
  3. **Verification & Hygiene:**
     - Confirmed project root is clean, ultra-lightweight, and ready for immediate evaluation without running `npm install`.
  1. **Complete Local Skills Removal (Phase 1):**
     - Moved all remaining local skills (`design-system`, `huntyourtrack-frontend`) into host global directory (`~/.global_ai_skills`).
     - Deleted local `skills/` directory entirely from repository root.
     - Confirmed project root now strictly contains `.global_skills` symlink with zero local skills folders.
  2. **Memory & Architecture Documentation (Phase 2):**
     - Updated `CLAUDE.md` architecture and skills references to reflect that all skills are accessed exclusively via `.global_skills`.
  3. **Verification & Smoke Testing:**
     - Ran `npm run test:auth` successfully via `.global_skills/automation/frontend-smoke-test.js` (100% passing).
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

