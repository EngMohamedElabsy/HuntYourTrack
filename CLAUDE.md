# HuntYourTrack — Project Constitution & Operational Directives

> **Software Engineering Course Project**
> **Project Lead & Software Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))
> **Canonical Live Platform:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)
> **Sprint Project Board:** [HuntYourTrack - Graduation Sprint 1 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)

---

## 1. Product Vision & Architecture Philosophy

HuntYourTrack is an AI-assisted career navigator and opportunity aggregator designed for university students across multiple disciplines (Engineering, Science, Business & Commerce, Law, Computing & AI).

### Core Value Proposition

- **Career Roadmap Progression ("Hunt Your Track"):** When students complete a course or skill, they often ask *"What should I do next?"*. HuntYourTrack provides the answer by mapping step-by-step career tracks, skill radars, and intelligent recommendations for the next course or internship.
- **Corporate Opportunity Aggregator & Deadlines:** Organizes active internships, certified courses, and training programs with live countdown timers (`Active`, `Closing Soon`, `Past / Expired`) and direct application links.
- **Smart Resume Parser (Keyword / ATS Matching):** Future full-stack capability simulated on the frontend: extracts domain keywords from uploaded resumes (e.g., `AutoCAD/SolidWorks` for Engineering, `Biotech/PCR` for Science, `Financial Modeling` for Business, `Arbitration/IP` for Law, `React/Python` for Tech) to auto-configure student dashboards.
- **Multi-Role Journeys:**
  - **Students:** Interactive onboarding (role selection, college/major, resume upload), personalized roadmaps, and 1-click internship applications.
  - **Organizers & Corporate Partners:** Structured opportunity publishing (title, description, direct URL, timeline/deadlines, and targeted faculties).
  - **Platform Administrators:** Account oversight, email/access resolution, and organizational accreditation.

---

## 2. Technical Stack & Current Implementation Status

- **Current Phase:** 100% Client-Side Pure Frontend Prototype. No heavy server runtimes or backend database dependencies. Authentication, session states, and resume parsing are simulated client-side (`localStorage`).
- **Frontend Stack:** Semantic HTML5, CSS3 Custom Properties (Design Tokens), Modular ES6+ JavaScript, HTML5 Canvas API (Track Hunter Radar at 60fps).
- **Future Backend Stack:** Node.js / Express API, MongoDB Atlas, Cloud Document Storage, Google APIs & LinkedIn Career Integrations.
- **Privacy & Professional Standard:** Zero personal academic or contributor names inside user-facing web interfaces. The platform is presented as an authentic, production-grade SaaS product.
- **Language Classification & Linguist Hygiene:** The primary codebase is strictly JavaScript, HTML5, and CSS3. To prevent auxiliary AI skills and tooling scripts (TypeScript, Python, Shell in `.global_skills/`) from distorting GitHub's language statistics bar, `.gitattributes` configures `linguist-vendored` overrides so GitHub accurately reflects our authentic frontend stack.

### 2.1. Bilingual Input Translation & 100% English Execution Directive
- **Arabic User Prompt Ingestion:** When the lead engineer or team communicates in Arabic, Claude / Codex / Cursor MUST internally decompose and translate the requirements into structured English specifications and task plans.
- **100% English Operational Output:** All code, comments, Git commits, GitHub PR titles/descriptions, issue comments, artifacts, and user responses MUST be written strictly in professional English.
- **Session Language & Theme Persistence:** The user's active language (`hyt_lang`) and theme (`hyt_theme`) selections in `localStorage` must never be purged upon user sign-out; only role and credential keys (`user_role`, `user_email`, `user_name`, `faculty`, `department`) are cleared.

---

## 3. Team Governance & Backlog Tracking

### 3.1. Official Team Identity & AI Session Bootstrap

Whenever Claude, Codex, Cursor, or any AI assistant starts a session in this repository, it MUST execute this bootstrap procedure:

#### 👥 Official Team Developer Identity Registry

> ⚠️ **Strict Separation Directive:** The credentials below are **strictly for Claude and AI tools** to identify which engineer is running the CLI (`gh auth status`, `git config user.email`) and match them with their GitHub Issues on Project #5. **Never confuse or mix these developer identities with frontend web prototype mock data or website personas.**

- 👨‍💻 **Mohamed Yasser Elabsy (Lead Architect & Software Engineering Lead):**
  - **GitHub Username:** `@EngMohamedElabsy`
  - **Git Committer / GitHub Email:** `mohamedelabsy.biz@gmail.com`
  - **GitHub Account ID:** `111818296` (`111818296+EngMohamedElabsy@users.noreply.github.com`)
  - **Engineering Scope:** System Architecture, Core Components, Executive Admin, CI/CD DevOps Pipeline, Sprint Coordination.
- 👩‍💻 **Hager Khaled (Student Experience & Authentication Engineer):**
  - **GitHub Username:** `@hager678`
  - **GitHub Account ID:** `112729729` (`112729729+hager678@users.noreply.github.com`)
  - **Engineering Scope:** Student Landing Experience, Student Authentication UI, Onboarding Wizard, Student Dashboard & Roadmaps.
- 👨‍💻 **Abdulrahman Masoud (Employer & Opportunities Engineer):**
  - **GitHub Username:** `@abdulrhman-masoud`
  - **Git Committer / GitHub Email:** `abdulrahman.masoud.work@gmail.com`
  - **GitHub Account ID:** `122886968` (`122886968+abdulrhman-masoud@users.noreply.github.com`)
  - **Engineering Scope:** Employer Workspace, Opportunity Posting Forms & Lifecycle, Applicant Review System.

#### 🔌 Mandatory GitHub Connection & Auth Verification

Before executing any task, writing code, or running commands, Claude / Codex / Cursor MUST verify the engineer's active GitHub session:

```bash
gh auth status
```

1. **Developer Identification:**
   - Detect the logged-in GitHub account via:
     ```bash
     gh api user -q .login
     git config user.email
     ```
   - Match the login or email with the Official Team Developer Identity Registry above (`@EngMohamedElabsy`, `@hager678`, or `@abdulrhman-masoud`).
2. **Authentication Gate:**
   - If `gh auth status` fails or the user is NOT authenticated: Claude MUST halt immediately and instruct the developer:
     ```bash
     gh auth login
     ```
   - Claude will NOT proceed with code modifications or issue management until GitHub authentication is verified.
3. **Session Alignment:**
   - Once authenticated, Claude addresses the developer by their name and scope, strictly aligning all instructions, branch names, and PR assignments to their assigned user stories.

#### 📋 Automated Personal Issue Discovery (Live CLI Source of Truth)

> ⚠️ **Strict Non-Static Invariant:** The AI assistant MUST NEVER infer, assume, or read active sprint issues or backlog numbers from static text or ledger entries. The AI MUST query GitHub live via:
> ```bash
> gh issue list --assignee <current_user_login> --state open
> gh project item-list 5 --owner EngMohamedElabsy
> ```
> - The live GitHub Project #5 board is the absolute, singular source of truth.
> - Zero AI contributor names in commit trailers (`Co-authored-by: Claude` is strictly prohibited). All commits must be attributed exclusively to `@EngMohamedElabsy`, `@hager678`, or `@abdulrhman-masoud`.
> - Skills are located in `skills/` (and `.global_skills/`).

---

### 3.2. Project Board Status Lifecycle

Tasks in **[HuntYourTrack - Graduation Sprint 1 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)** transition through 3 canonical states:

- `Todo`: Scheduled tasks pending commencement.
- `toprogram` / `In Progress`: Tasks actively being developed on their dedicated feature branch (`feature/usXX-...`).
- `Done`: Fully completed tasks that have passed 100% of E2E audits and whose PRs have merged into `main`.

---

### 3.3. Mandatory Branching & Atomic Pull Request (PR) Workflow

- **Strict Atomic Rule (1 Issue = 1 Dedicated Branch & 1 PR):**
  Never bundle multiple user stories or tasks into a single branch or PR. All tasks and issues MUST be solved strictly **one by one**. Every issue gets its own branch and its own dedicated PR to eliminate merge collisions between teammates, keep reviews isolated, and allow clean rollbacks.
- **No Direct Commits to `main` for Features:**
  To guarantee that work does not collide, overwrite, or drift between teammates, **every engineer (including Mohamed @EngMohamedElabsy, Hager @hager678, and Abdulrahman @abdulrhman-masoud)** MUST create an isolated branch before beginning work on any feature or user story:
  ```bash
  git checkout -b feature/usXX-<feature-name>
  ```
- **Immediate Pull Request (PR) Creation:**
  Immediately upon creating the branch and making the initial commit, an open Pull Request MUST be created against `main`:
  ```bash
  gh pr create --title "USXX: <Title>" --body "Closes #<issue_number>" --base main
  ```

  This provides 100% transparency to the whole team in the GitHub Pull Requests tab, prevents duplicate efforts, and tracks code progress.
- **Conflict Resolution & Code Drift Protocol:**
  - Before merging, always synchronize the feature branch cleanly with the latest `main`:
    ```bash
    git fetch origin
    git merge origin/main
    ```
  - Resolve any merge conflicts cleanly, run the full test suite (`npm test`), verify the live server (`http://localhost:8080`), and only merge to `main` when all checks pass with 100% compliance.
  - Never use destructive force pushes (`--force`) to `main`.
- **Mandatory Post-Merge Branch Deletion Protocol (Zero Stale Branches):**
  - Immediately upon merging any Pull Request into `main`, the feature branch MUST be deleted both locally and on the remote repository:
    ```bash
    git checkout main
    git pull origin main
    git branch -d feature/<branch-name>
    git push origin --delete feature/<branch-name>
    ```
  - `main` is the single source of truth for the entire team. No orphan, merged, or unassigned feature branches may remain lingering on GitHub or locally, preventing branch proliferation and merge confusion.

---

### 3.4. Arabic Input Processing & Systematic Task Decomposition

When the project lead or any teammate communicates in Arabic with detailed or multi-faceted instructions:

1. **Semantic Deconstruction:** Break down the Arabic input systematically into distinct, concrete engineering goals (UI/UX, bug triage, i18n, Git hygiene, testing).
2. **Contextual Alignment:** Cross-reference goals with `CLAUDE.md` constitutional guidelines and existing user stories.
3. **Skill Activation:** Proactively activate the required design and engineering skills (`ui-ux-pro-max`, `frontend-design`, `diagram`, `test-audit`).
4. **Structured Planning & Visual Diagrams:** Formulate an explicit technical implementation plan utilizing Mermaid flowcharts and system diagrams to clearly communicate architecture and state transitions.

---

### 3.4. Issue Handover & Takeover Protocol

- **Mandatory English Comment on GitHub Issue:**
  If any team member (or assistant) needs to take over an issue originally assigned to a teammate (e.g., to assist with the sprint deadline), they MUST post a formal comment on that specific issue in clear professional English before taking any action:
  ```markdown
  Hi @<teammate>, I am taking over this task (USXX: <Title>) to assist with our sprint timeline. Please confirm if you agree with this handover so we can proceed.
  ```
- **Explicit Confirmation Required:**
  The new developer CANNOT begin work, touch files, or reassign the issue until the original assignee posts an explicit confirmation/approval comment in reply.
- **Handing Over an Issue to a Teammate:**
  When passing an issue to another team member, post a formal handover comment:
  ```markdown
  Hi @<teammate>, I am handing over this task (USXX: <Title>) to you. Please let me know if you need any context or support.
  ```
- **Zero Silent Takeovers:** Any unapproved handover or silent modification of another teammate's issue is strictly prohibited.

---

### 3.5. Automated CI/CD, Deadline Tracking & Scorecard Table

- **Deadline Field on GitHub Project #5:** Every issue must have a tracked delivery date configured in the custom `Deadline` field of Project #5 and linked to the active milestone.
- **Automated Scorecard & Velocity Table (`npm run metrics`):**
  - The script `scripts/generate-team-metrics.js` fetches live issue statuses from GitHub and updates `docs/TEAM_METRICS.md`.
  - It calculates individual team completion percentages, countdown alerts (`🟢 Delivered on Time`, `🟡 Active`, `⚪ Pending Start`), and updates the executive progress table.
- **5-Stage GitHub Actions DAG Pipeline (`.github/workflows/ci.yml`):**
  - Triggers on every push and PR to `main`.
  - Stages: (1) Architecture Standards, (2) Security Audit, (3) Playwright Browser Suite, (4) Team Velocity & Deadline Monitor, (5) Executive Quality Gate.
  - The `github-actions[bot]` automatically verifies the PR, confirms zero regressions, and renders the visual summary dashboard.

---

### 3.6. Claude's 6-Phase Systematic Engineering Workflow

Before writing any code or tackling any issue, Claude and any AI assistant MUST structure thinking as a methodical plan across these 6 sequential phases:

#### 🗺️ Phase 1: Architecture & File Mapping

- **Problem Analysis:** Clearly define the objective, requirements, and edge cases from `gh issue view <issue_number>`.
- **Target File Map:** Specify the exact files to be created, modified, or deleted (`frontend/index.html`, `frontend/js/...`, `frontend/css/...`, `tests/...`).
- **Code & Logic Specification:** Outline the specific functions, DOM structures, state models, or CSS classes that will be introduced before typing code.

#### 🧰 Phase 2: Skills & Tooling Selection

- **Mandatory Base Skill — `graphify` (Token Saving & Dependency Mapping):**
  - Claude MUST run `graphify` (e.g. `graphify path <A> <B>` or `graphify explain <Node>`) to inspect the AST coupling and file dependencies.
  - *Why?* This prevents loading huge entire files into prompt context, saves tokens from being wasted, and guarantees structural integrity without hallucinations.
- **Self-Assessment Question:** Claude must evaluate: *"Which active skills in `.global_skills/` match this specific issue?"*:
  - **If UI/Visual Template:** `open-design` (`od lint`) to eliminate AI tells (`#4F46E5`, emojis) + `ui-ux-pro-max` & `frontend-design` for distinct styling and WCAG AA contrast + `design-system` for tokens.
  - **If Domain Logic & Roadmaps:** `huntyourtrack-frontend` for multi-faculty models and simulated sessions.
  - **If Automation & QA:** `test-audit` and `playwright-cli` for E2E browser assertions.
  - **If Architecture & Docs:** `diagram` (Mermaid), `document-generate`, and `make-pdf`.

#### ⚙️ Phase 3: Step-by-Step Isolated Execution

- Create an isolated feature branch (`git checkout -b feature/usXX-<feature-name>`).
- Open an immediate draft/tracking PR against `main` (`gh pr create`).
- Implement the planned logic incrementally, one cohesive unit at a time, keeping code clean, modular, and in professional English.

#### 🐛 Phase 4: Problem Solving & Bug Triage

- Execute `npm test` locally to catch any regression.
- Inspect browser console logs, DOM mismatches, and responsive overflow.
- Resolve all identified bugs systematically before moving forward.

#### 🔒 Phase 5: Security & Privacy Audit

- **Zero Academic/Personal Names:** Verify that no real student/instructor names, emails, or personal data leak into user-facing HTML.
- **Route Guard Integrity (RBAC):** Confirm client-side authentication guards execute in `<head>` before DOM render.
- **Data Sanitization:** Ensure inputs are sanitized against XSS and sessions in `localStorage` cannot be hijacked.
- **Zero Secrets:** Confirm no private API tokens, `.env` values, or credentials are tracked in Git.

#### 🎯 Phase 6: Verification, PR Merge, & Issue Closure

- **Checklist Audit:** Verify that 100% of the acceptance criteria defined in the issue are met.
- **E2E Test Compliance:** Ensure all 5 audit test suites pass locally with 0 failures:
  1. 100% Bilingual i18n without text leakage or mixed languages.
  2. Zero UI element duplication or administrative tool leakage.
  3. 60fps Track Hunter Canvas rendering in both Dark/Light modes.
  4. Strict route guarding blocking unauthorized URLs.
  5. Responsive layout stability across 375px mobile and 1440px desktop.
- **PR Merge to `main`:**
  - Sync with `main`: `git fetch origin && git merge origin/main`.
  - Push feature branch: `git push origin feature/usXX-<feature-name>`.
  - Confirm GitHub Actions 5-stage pipeline passes green.
  - Merge the PR cleanly into `main` (`gh pr merge --squash --delete-branch` or `git merge`).
- **Complete Issue & Project Closure:**
  - Verify that GitHub automatically closes the issue (`state: CLOSED` via `Closes #<id>`).
  - Move card to `Done` in Project #5 (`HuntYourTrack - Graduation Sprint 1`).
  - Update Section 8 (Continuous Project Ledger) in `CLAUDE.md` with the completed deliverables, timestamp, and next priority.

---

## 4. Operational Commands


| Command                                           | Purpose                                                           |
| :------------------------------------------------ | :---------------------------------------------------------------- |
| `npm start`                                       | Serves`frontend/` on `http://localhost:8080`                      |
| `npm test`                                        | Runs Playwright smoke suite and deep E2E verification audit       |
| `npm run metrics`                                 | Generates team velocity metrics and updates`docs/TEAM_METRICS.md` |
| `npm run setup:skills`                            | Dynamically establishes and synchronizes`.global_skills`          |
| `gh issue list`                                   | Lists real-time sprint user stories and assignees                 |
| `gh pr list`                                      | Checks active pull requests across the repository                 |
| `gh project item-list 5 --owner EngMohamedElabsy` | Displays live board status from GitHub Project #5                 |

---

## 5. Web Platform Polish Plan (Frontend Deliverables)

1. **Information Sanitization:** Remove personal names (`Mohamed Yasser Elabsy`, personal emails, specific departmental designations) from all web interfaces (`index.html`, `auth.html`, `student.html`, `admin.html`).
2. **Multi-Faculty Expansion:** Add diverse discipline tracks and opportunities (Engineering, Science, Business, Law, Tech) to the landing page and student portal.
3. **Hero & Navigation Clarification:** Eliminate duplicate action buttons; ensure primary CTA smoothly scrolls to courses/opportunities, and secondary CTA opens authentication.
4. **Interactive Onboarding Wizard:**
   - "Continue with Google" simulation.
   - First-time role selection (Student vs. Organizer).
   - Dynamic faculty and major selection.
   - Resume (Word/PDF) upload simulation with keyword detection and personalized dashboard routing.
5. **Opportunity Organization:** Categorize listings by status (`Active Opportunities`, `Closing Soon Countdown`, `Corporate Catalog`) with faculty targeting filters.

---

## 6. Active AI Skills & Tooling Directives (`.global_skills`)

Claude and autonomous AI agents working in this repository MUST leverage the curated, verified skills located in `.global_skills/`:

### 🎨 Design & Visual Engineering Skills

- **`open-design` (CLI: `od`):**
  - **Anti-Slop Linter:** Always run `od lint <path-to-html> --json` on modified HTML templates before committing.
  - **Zero AI-Slop Rule:** Flag and eliminate generic AI tells, specifically hardcoded indigo (`#4F46E5`) and emojis used as UI icons. Use SVG icons (Heroicons/Lucide) and design tokens (`var(--color-primary)`).
  - **Palette Binding:** Reference `od tools directions` (`modern-minimal`) for accessible styling.
- **`ui-ux-pro-max` & `frontend-design`:**
  - Build distinctive, non-templated interfaces tailored specifically to university students and recruiters.
  - Enforce WCAG AA accessibility, deliberate typography hierarchies, purposeful micro-interactions, and visual harmony.
- **`design-system` & `design-review`:**
  - Strictly adhere to `design-system/huntyourtrack/MASTER.md`.
  - Maintain WCAG AA 4.5:1 minimum text contrast ratio in both Light and Dark themes (`[data-theme="dark"]`).
  - Ensure all interactive elements have `cursor: pointer` and smooth hover transitions (`150ms-300ms`).
- **`design-html`:**
  - Build semantic, modular HTML5/CSS3 without heavy third-party framework dependencies.

### 🧠 Architecture & Codebase Intelligence

- **`graphify` (CLI: `graphify`):**
  - Use `graphify path <source> <target>` or `graphify explain <module>` to inspect module couplings and AST relationships before undertaking major refactors.
- **`huntyourtrack-frontend`:**
  - Strict domain invariants: multi-faculty tracks (Engineering, Science, Business, Law, Tech), client-side session mocking, and teammate task isolation.
- **`diagram`:**
  - Render system architectures, state machines, and user journeys using standard Mermaid markdown or inline SVGs.

### 🧪 QA, Browser Verification & Autonomous Execution

- **`test-audit` & `playwright-cli`:**
  - Execute `npm test` after any frontend or logic modification.
  - Assert that all 5 critical audit dimensions pass: (1) Zero mixed languages in i18n, (2) Zero UI leaks or duplicated elements, (3) Bespoke Canvas 60fps rendering, (4) Strict route guarding, and (5) Mobile/Desktop responsive layouts.
- **`autoplan`:**
  - Decompose user stories into atomic commits adhering to the strict Single-PR rule: 1 Issue = 1 Dedicated Feature Branch + 1 PR.
- **`document-generate` & `make-pdf`:**
  - Generate structured technical documentation and export milestone reports for academic evaluation.
- **`browse`:**
  - Use headless browser lookup when researching external API schemas or design documentation.

---

## 7. Living Constitution & Continuous Learning Directive

- **Mandatory Session Initialization:** At the start of every session or task, Claude MUST read `CLAUDE.md` and inspect `.global_skills/` to ground all decisions in the project's living rules.
- **Strict 6-Phase Pipeline Adherence:** Claude must execute every single task through the 6-phase engineering workflow defined in Section 3 without skipping steps.
- **Cumulative Knowledge Growth:** Every time a new design pattern, architectural invariant, debugging edge-case, or testing protocol is established, Claude MUST append and refine `CLAUDE.md` and the relevant skill definitions.
- **Mandatory Dual-File Constitution Synchronization (`CLAUDE.md` & `AGENTS.md`):** `CLAUDE.md` and `AGENTS.md` are identical twins and form the single source of truth for the codebase. Whenever any AI assistant (Claude, Codex, Antigravity, Cursor) or team member completes any task, issue, feature, or pull request, they MUST immediately return to both `CLAUDE.md` and `AGENTS.md` to append the continuous project ledger and keep both files 100% identical and synchronized before concluding any session.
- **Zero Knowledge Loss:** **NEVER** delete, wipe, or overwrite established workflows, team protocols, or skill definitions. Project intelligence is strictly additive, continuously evolving, and permanently preserved across sessions.

---

## 8. Continuous Project Ledger & Active Changelog

> **Directive for Claude:** When closing any task or merging any PR, append an entry to this ledger with the timestamp, files touched, deliverables verified, and next priority so any new chat session immediately inherits 100% of the project's context.

### 🟢 Sprint 1 Baseline & Architectural Foundation (Completed)

- **Status:** 11 User Stories (US01–US06, US13–US17) completed, verified, and merged into `main`.
- **Core Architecture Established:**
  - Client-side single portal (`frontend/index.html`) with bilingual i18n (`frontend/js/i18n.js`).
  - High-performance Track Hunter Radar Canvas (`frontend/js/hunter-canvas.js`) at 60fps.
  - Role-based client-side access control (`frontend/js/auth.js` & `admin.js`) guarding routes before DOM paint.
  - 1-Click demo accounts for Student, Recruiter, and Admin.
  - Rigorous test suite (`npm test`) validating 5 critical dimensions with 100% pass rate.

### 🟢 Skills & Governance Harmonization (2026-10-31 19:20 UTC+2)

- **Commit:** `645aefe`
- **Deliverables:**
  - Curated and committed 15 verified, physical AI skills in `.global_skills/` (`open-design`, `ui-ux-pro-max`, `frontend-design`, `graphify`, `design-system`, `huntyourtrack-frontend`, `diagram`, `test-audit`, `playwright-cli`, `document-generate`, `design-review`, `design-html`, `autoplan`, `browse`, `make-pdf`).
  - Implemented dynamic real-time GitHub backlog tracking via `gh` CLI.
  - Re-established mandatory feature branching, immediate PR creation, and teammate handover protocol (`Hi @<teammate>...`).
  - Codified the 6-Phase Systematic Engineering Workflow into `CLAUDE.md`.
  - Upgraded `scripts/setup-skills.js` to dynamically synchronize repository skills to host environment (`npm run setup:skills`).

### 🟢 Architecture Restoration, Apple-Grade Celestial Galaxy & Brand Harmonization (2026-11-07 12:15 UTC+2)

- **Status:** Baseline restored to commit `629f6e6c5d16f26b4fc1d1ac91048fb5ffdda85b`.
- **Deliverables:**
  - Removed broken regressions from PR #115 and PR #116 (purged `app.js`, `galaxy.js`, and `.impeccable/`).
  - Implemented Apple/iOS-grade Celestial Galaxy Engine (`frontend/js/ocean-background.js`): 3-tier multi-depth starfield (micro-dust, mid-constellations, hero stars with halos and 4-point diffraction spikes), organic drifting nebulae, fluid mouse/scroll parallax, and rare graceful meteor streaks with zero spiderweb/mesh lines.
  - Harmonized HuntYourTrack precision reticle brand mark (`brand-mark` SVG + `brand-title`) across all pages (`index.html`, `auth.html`, `student.html`, `admin.html`, `employer.html`).
  - Confirmed 100% WCAG AA contrast across all 7 theme palettes (Dark, Light, Abyss, Reef, Nebula, Ember, Daylight).
  - Synchronized `CLAUDE.md` and `AGENTS.md` with zero external/hallucinated framework artifacts.
  - Pruned all 9 stale remote tracking branches on GitHub, retaining strictly `main`.
  - All 9 Playwright deep E2E audit sections passing with 100% compliance (`npm test`).
- **Active Backlog Discovery:** Strictly query live via `gh issue list` and `gh project item-list 5 --owner EngMohamedElabsy`.

### 🟢 Pure B&W Single-Click Theme Toggle, Minimal Top Bar & Earth Radar Redesign (2026-11-07 12:50 UTC+2)

- **Issues Addressed:** US33 (#108), US34 (#109), US35 (#110), US36 (#111)
- **Deliverables:**
  - **Single-Click Pure B&W Theme Toggle (US35 / Issue #110):** Transformed `#hyt-theme-btn` into an instant single-click Sun/Moon toggle button switching directly between pure Black (Dark) and White (Light) modes without color swatches. Updated `#theme-btn-icon` to dynamically display Sun icon in dark mode and Moon icon in light mode. Retained hidden accessibility/test fixtures for backwards compatibility.
  - **Minimal Navigation & Visible Search Bar (US36 / Issue #111):** Replaced redundant "Ctrl+K" trigger button with a directly visible, responsive search input bar (`.nav-search-bar`). Eliminated duplicate "دخول المنصة" and "بحث سريع (Ctrl+K)" buttons from `.hero-actions`, providing a single clear authentication CTA in the top bar. Hero actions now cleanly emphasize "استكشف المسارات التخصصية ←" (`#tracks`) and "رادار اصطياد المسار" (`#hunter-radar-section`).
  - **Track Hunter Radar Redesign (US33, US34 / Issues #108, #109):** Centered radar canvas on a high-fidelity stylized Planet Earth with atmospheric glow, spherical lighting, rotating continents, and satellite orbit. Organized track nodes across 3 harmonic elliptical orbital tiers. Eliminated connecting spiderweb lines. Nodes render strictly track titles in clean glass pill badges with zero RA/DEC clutter. Clicking any node emits a photon laser from Earth and displays syllabus roadmap details in `#hooked-track-panel`.
  - **Skills Directory:** Created project root `skills/` symlink linking to `.global_skills/`.
  - **Quality Gate:** All 9 Playwright deep E2E audit sections and US17 smoke test assertions passed with 100% compliance (`npm test`).

### 🟢 Zero-Popup Theme Toggle, Deadline Badge Positioning, Streamlined Search & Full i18n Hygiene (2026-11-07 13:15 UTC+2)

- **Deliverables:**
  - **Zero-Popup Theme Toggle:** Completely eradicated dropdown menus on `#hyt-theme-btn`. Clicking the button now directly switches between pure Dark and Light themes with dynamic Sun/Moon icons.
  - **Opportunity Deadline Badge Overlap Fixed:** Repositioned `.opp-countdown-badge` from absolute coordinates to static inline-flex inside the card meta row, fully resolving overlap on the "Details" action button.
  - **Streamlined Top Nav Search & Exit:** Replaced wrapped/broken search input with `.nav-search-pill` button (magnifying glass, localized placeholder, `ESC` pill). Enhanced command search modal with a prominent `✕` close button, footer close action, backdrop-click dismissal, and keyboard `ESC` dismissal.
  - **100% Bilingual i18n Dictionary & Zero Text Leakage:**
    - Resolved Arabic leaks in English mode (search placeholders, radar quick chips, 3D card back syllabus items).
    - Resolved English leaks in Arabic mode (radar chips, preview card company name and role title, card back career role badges).
    - Added `data-i18n-placeholder` support in `i18n.js` for dynamic input translation.
  - **Track Hunter Radar Telemetry Removal:** Eliminated rotating focus brackets, reticle HUD, and telemetry coordinates overlay on hover. Tracks remain clean, floating nodes with glass pill labels.
  - **Quality Assurance:** Both `tests/frontend-smoke-test.js` and `tests/rigorous-e2e-audit.js` updated to verify direct theme toggles; all 9 E2E audit sections pass with 100% compliance (`npm test`).

### 🟢 Admin Dark Contrast, Universal Sign-Out, Galaxy Uncoupling & Opportunity Role Guard (2026-11-07 13:45 UTC+2)

- **Feature Branch:** `feature/admin-galaxy-signout-polish`
- **Deliverables:**
  - **Admin Dashboard Dark Mode Contrast:** Replaced light-assumed colors in `admin.css` with theme-aware tokens. Fixed `.admin-tab-btn.active`, `.filter-pill.active`, `.nav-link.active`, and `.avatar` to eliminate illegible white-on-white text and controls in Dark Mode.
  - **Brand Title RTL LTR Isolation:** Added `direction: ltr !important; unicode-bidi: isolate; display: inline-flex;` to `.brand-title` across `style.css` and all portal headers (`admin.html`, `student.html`, `employer.html`, `auth.html`, `index.html`) so the brand name never reverses to "TrackYourHunt" in Arabic RTL mode.
  - **Zero GitHub External Data Leakage in Admin:** Completely eradicated external GitHub "Sprint Board" links from `admin.html` desktop navbar and mobile drawer.
  - **Universal Session Sign-Out Across All Portals:** Updated `hytSignOut()` in `i18n.js` to completely purge all authentication and session keys (`user`, `role`, `user_role`, `user_name`, `user_email`, `faculty`, `department`, `auth_token`, `hyt_auth`, `hyt_user`) while strictly preserving `hyt_lang` and `hyt_theme`. Added visible, working sign-out buttons with icons in Admin, Student, Employer, and Guest headers.
  - **Galaxy Canvas Uncoupling:** Made `drawAccretionCore()` and `drawCosmicBeams()` no-op methods in `hunter-canvas.js`. Eradicated the central sphere and connecting beam lines; all 12 discipline track nodes float independently in deep space.
  - **Interactive Multi-Selection Tray & Dismissal Chips:** In `#hooked-track-panel`, introduced an interactive selected tracks tray with a counter, active track switcher, individual `✕` dismiss buttons per track, and a "Clear All" button for fluid management.
  - **Opportunity Bookmark Ribbon Icon:** Populated the empty bookmark button in `opportunities.js` with an SVG ribbon icon and label, toggling gold fill on bookmark/save.
  - **New Post Organizer Role Guard:** Enforced authentication check in `openPublishOpportunityModal()`, routing guests and students with a notification to log in as an Employer Partner before publishing.
  - **Quality Gate:** All 9 Playwright deep E2E audit sections passed with 100% compliance (`npm test`).


### 🟢 US33: Complete Elimination of Arabic Language & 100% Unified English UI (2026-11-22 04:00 UTC+2)

- **Feature Branch:** `feature/us33-remove-arabic-unify-english`
- **Issue:** Closes #108 (US33: Remove Arabic Language & Unify 100% English UI)
- **Assignee:** `@EngMohamedElabsy`
- **Deliverables:**
  - **Eradication of Arabic Dictionaries & Engine Refactor (`frontend/js/i18n.js`):** Completely removed `HYT_TRANSLATIONS.ar`. Enforced 100% pure English LTR architecture (`lang="en"`, `dir="ltr"`). Removed `#hyt-lang-toggle` and language toggle triggers. Preserved `localStorage.getItem('hyt_theme')` and theme management.
  - **Removal of Language Toggle Buttons across all Views:** Deleted `#hyt-lang-toggle` and mobile drawer language switcher buttons across `index.html`, `pages/auth.html`, `pages/student.html`, `pages/employer.html`, and `pages/admin.html`.
  - **HTML Templates Sanitization:** Converted all templates to `<html lang="en" dir="ltr">`. Replaced all Arabic fallback text in static HTML with English equivalents.
  - **Interactive Canvas & Syllabi Cleansing (`frontend/js/hunter-canvas.js`):** Stripped all `labelAr`, `facultyAr`, `milestonesAr`, and `descAr` properties from 12 discipline track nodes and syllabi. Standardized telemetry quotes and status indicators to pure English.
  - **Opportunities Catalog & Modals Cleansing (`frontend/js/opportunities.js`, `frontend/js/components.js`):** Removed all `*Ar` properties and Arabic branches from countdown timers, discipline filters, detail modals, and application submission flows.
  - **Authentication & Administrative Scripts (`frontend/js/auth.js`, `frontend/js/admin.js`):** Purged all Arabic text, persona names, and status toasts, standardizing 100% on English terminology (`Academic Admin`, `Academic Student`, `Partner Organizer`).
  - **Installed `unslop` Skill:** Established `skills/unslop/SKILL.md` and `.global_skills/unslop/` based on `heydamir/unslop` to prevent AI-slop design tells (cliché purple gradients, emojis) and enforce human designer standards.
  - **Automated Test Suite Realignment (`tests/`):**
    - `tests/frontend-smoke-test.js`: Updated assertions to assert `dir="ltr"`, `lang="en"`, and verified the absence of `#hyt-lang-toggle`.
    - `tests/rigorous-e2e-audit.js`: Replaced Audit 1 with a strict 100% Pure English UI audit asserting zero Arabic regex `[\u0600-\u06FF]` across the entire page DOM.
    - All 9 Playwright deep E2E audit sections pass with 100% compliance (`npm test`).

### 🟢 Project #5 Backlog Deadlines Synchronization & Redundant Skills Symlink Cleanup (2026-11-22 04:25 UTC+2)

- **Feature Branch:** `chore/remove-redundant-skills-symlink`
- **Deliverables:**
  - **Project #5 Backlog Deadlines Synchronization:** Synchronized 100% of closed sprint user stories on Project #5 (`HuntYourTrack - Graduation Sprint 1`). Added missing closed cards #104, #105, #106, configured exact chronological deadlines across all issues (Sprint 1: `2026-11-01`, Sprint 2: `2026-11-08`, Sprint 3: `2026-11-15`, US33: `2026-11-22`), and confirmed all cards transitioned to `Done`.
  - **Redundant Skills Symlink Removal:** Cleanly deleted redundant root symlink `skills -> .global_skills` per project hygiene instructions, standardizing all tooling strictly on the singular source `.global_skills/`.
  - **Quality Assurance:** Re-verified test suite with 100% compliance across all 9 audit sections (`npm test`).

### 🟢 US34: Class Central & Roadmap Course Aggregator with Visual Syllabi (2026-11-23 01:25 UTC+2)

- **Feature Branch:** `feature/us34-course-aggregator`
- **Issue:** Closes #109 (US34: Class Central & Roadmap Course Aggregator with Visual Syllabi)
- **Assignee:** `@EngMohamedElabsy`
- **Deliverables:**
  - **Comprehensive Developer Roadmaps Tree (`docs/roadmaps/COMPUTERS_AND_AI_ROADMAP_TREE.md`):** Formatted canonical 4-tier syllabi for Faculty of Computers & AI tracks (AI & Deep Learning, Cybersecurity SOC, Cloud & DevOps, Full-Stack Web Development, Data Science, and Embedded Systems/IoT), mapped to global standards (`roadmap.sh`, Class Central, Coursera, and top universities).
  - **Verified Free Courses Catalog (`database/nosql/courses-catalog.json`):** Curated comprehensive dataset of verified free courses from MIT, Stanford, Harvard, Google, and IBM with duration, level, rating, certificate status, provider logos, and direct enrollment links.
  - **Relational Core Database Schema (`database/sql/01_schema_init.sql`):** Created full DDL for Microsoft SQL Server / MySQL 8.0+ covering `users`, `student_profiles`, `user_sessions`, `course_enrollments`, and `opportunity_applications` with strict RBAC constraints and foreign keys.
  - **Lightweight Native Backend API Server (`backend/server.js`):** Built standalone RESTful API server using native Node.js HTTP/fs (zero external npm packages, preserving network quota) providing endpoints for `/api/v1/health`, `/api/v1/courses`, `/api/v1/roadmaps/tree`, and `/api/v1/cv/parse-keywords`.
  - **Client API Layer with Offline Fallback (`frontend/js/api.js`):** Engineered decoupled client API service connecting to backend endpoints with automatic offline catalog fallback for seamless static deployment on GitHub Pages.
  - **Interactive Courses UI & Track Filtering (`frontend/index.html`, `frontend/css/landing.css`):** Implemented high-contrast, unslop-compliant course cards with duration badges, provider tags, and instant track filter buttons (`All`, `AI & Deep Learning`, `Cybersecurity SOC`, `Cloud & DevOps`, `Full-Stack Web`).
  - **Unslop Minimalist Icon Buttons (`frontend/js/opportunities.js`):** Streamlined opportunity cards by replacing verbose secondary button text (`Save`, `Details`) with micro-animated SVG icons featuring hover tooltips and eliminating emoji tells.
  - **Installed `.claude/skills/unslop`:** Ensured `unslop` skill is directly accessible within `.claude/skills/unslop`.
  - **Test Compliance:** All 9 Playwright audit suites and smoke tests passed with 100% compliance (`npm test`).


### 🟢 US38 & US39: Modular Backend Architecture, Hybrid Database Integration & Playwright E2E Security Audit Remediation (2026-11-23 20:30 UTC+2)

- **Issues:** #113 (US38: Modular Backend Architecture & Hybrid Database Integration) & #114 (US39: Comprehensive Playwright E2E Security & Visual Motion Audit)
- **Assignee:** `@abdulrhman-masoud` (Audited, remediated and unified by Lead Architect `@EngMohamedElabsy`)
- **Deliverables:**
  - **Modular Backend Architecture (`backend/`):**
    - Refactored backend from monolithic script into clean modular structure (`routes/`, `controllers/`, and `middleware/`) using 100% native Node.js (0 external npm dependencies).
    - `backend/server.js`: Lightweight HTTP dispatcher using WHATWG URL standards.
    - `backend/middleware/`: CORS middleware (`cors.middleware.js`), in-memory sliding-window rate limiting (`rate-limit.middleware.js`), Bearer token & RBAC validation (`auth.middleware.js`), and centralized error handling (`error.middleware.js`).
    - `backend/controllers/`: Dedicated controllers for auth/session (`auth.controller.js`), verified courses (`courses.controller.js`), opportunities & applications (`opportunities.controller.js`), and ATS keyword matching (`cv.controller.js`).
    - `backend/routes/`: Isolated routers for auth (`auth.routes.js`), courses (`courses.routes.js`), opportunities (`opportunities.routes.js`), and CV parsing (`cv.routes.js`).
  - **Modular Enterprise SQL Schemas (`database/sql/`):**
    - Modularized DDL into dedicated multi-engine ANSI SQL schemas: `001_users_rbac.sql`, `002_student_profiles.sql`, `003_sessions.sql`, `004_applications.sql`, and `005_courses_catalog.sql`.
  - **Hybrid NoSQL Catalogs (`database/nosql/`):**
    - Created domain dictionary `database/nosql/ats_keywords.json` covering 7 faculties (AI/ML, Web, DevOps, Cybersecurity, Engineering CAD, Finance, Corporate Law).
    - Created multi-faculty corporate postings `database/nosql/opportunities.json` (Vodafone, ITI, Siemens, PwC, Shalakany Law).
    - Maintained verified course syllabi `database/nosql/courses-catalog.json`.
  - **Playwright Test Runner & Spec Alignment (`tests/` & `playwright.config.ts`):**
    - Resolved syntax and runtime errors in Playwright specs (`tests/guards.spec.ts`, `tests/motion.spec.ts`, `tests/navigation.spec.ts`, `tests/responsive.spec.ts`, `tests/security.spec.ts`).
    - Added missing `@playwright/test` imports, fixed unseeded visual screenshot comparisons, and removed all non-English comments in compliance with Constitution Section 2.1.
    - Updated `playwright.config.ts` to match port 8080 and python HTTP server.
  - **Automated Verification & Git Hygiene:**
    - Created `tests/backend-modular-api.test.js` validating all 8 modular backend endpoints, CORS, routers, and database schemas with 100% compliance.
    - Added backend suite to `npm test` pipeline in `package.json`.
    - Permanently deleted stale feature branches `US38-...` and `US39-...` from remote repository.
    - Posted professional architectural reviews on GitHub Issues #113 and #114, marking both closed and transitioning to `Done` in Project #5.

### 🟢 US35: Secure Authentication Flow, Scrypt Hashing & Zero Debug Leaks (2026-11-23 23:30 UTC+2)

- **Issue:** #110 (US35: Secure Authentication Flow & Zero Debug Leaks)
- **PR:** #122 (Squashed and merged into `main`)
- **Assignee:** `@hager678` (Audited, hardened, and merged by Lead Architect `@EngMohamedElabsy`)
- **Deliverables:**
  - Removed all exposed debug quick-login persona buttons and bypass accounts from `frontend/pages/auth.html` and `frontend/js/auth.js`.
  - Upgraded authentication to enterprise cryptography: `scrypt` password hashing with random 16-byte salt, timing-safe equality verification (`crypto.timingSafeEqual`), and HMAC-SHA256 session token signing.
  - Implemented zero user enumeration with constant-time dummy password hashing on non-existent users and unified error responses (`"Invalid email or password."`).
  - Added strict payload size protection (16KB ceiling with HTTP 413) and CORS origin whitelisting.
  - Hardened `<head>` client-side route guards (`frontend/js/guard.js`) executing before DOM painting.
  - Auth test suites: 8 security test suites and 11 browser E2E flow test suites passed with 100% compliance.

### 🟢 US36: motionsites.ai Minimalist Navigation & Icon-Driven System (2026-11-24 03:55 UTC+2)

- **Issue:** #111 (US36: motionsites.ai Minimalist Navigation & Icon-Driven System)
- **PR:** #124 (Squashed and merged into `main`)
- **Assignees:** `@hager678`, `@EngMohamedElabsy`
- **Deliverables:**
  - Floating frosted glassmorphism navbar (`backdrop-filter: blur(16px)`) with subtle scroll-elevation shadow across all platform pages.
  - Pure icon-driven theme controls: Transformed theme toggles across `index.html`, `student.html`, `admin.html`, and `employer.html` into pure Sun/Moon SVG vector icons without 'Theme' or 'Appearance' text clutter or dropdown popups.
  - Micro-styled accessible tooltips with spring bezier curve `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Zero-emoji architecture: Purged makeshift emoji characters from navigation badges, table headers, and i18n dictionaries.
  - All 9 Playwright audit suites and smoke tests passed with 100% compliance.

### 🟢 US37: motionsites.ai Interactive Landing, 3D Tilt Micro-Motions & Dashboards Overhaul (2026-11-24 06:20 UTC+2)

- **Issue:** #112 (US37: motionsites.ai Interactive Landing & 3D Tilt Micro-Motions)
- **PR:** #125 (Squashed and merged into `main`)
- **Assignees:** `@hager678`, `@EngMohamedElabsy`
- **Deliverables:**
  - **motionsites.ai 60fps 3D Card Tilt Engine (`frontend/js/components.js`, `frontend/css/landing.css`):**
    - Cursor-tracking 3D rotation (`perspective(1000px) rotateX(...) rotateY(...)`) applied dynamically to career track cards, course cards, opportunity cards, and dashboard metrics.
    - Scroll reveal intersection observer with spring cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - **Student Career Hub Overhaul (`frontend/pages/student.html`):**
    - High-contrast, unslop-compliant welcome hero and 4-metric overview grid.
    - Interactive ATS Profile Assessment card with circular SVG gauge (92/100 readiness score) and domain competence breakdown.
    - Extracted ATS keywords list with market recommendations (+Kubernetes, +System Design).
    - Multi-stage recruitment pipeline tracker (Applied -> Shortlisted -> Interview -> Offer) with visual progress steps.
    - Student opportunity/postings activity summary.
  - **Admin Control Center Overhaul (`frontend/pages/admin.html`):**
    - Executive KPI cards with 3D tilt, corporate moderation queue, and user oversight.
    - Zero makeshift emojis, replaced with clean Lucide/Heroicon SVGs.
  - **Image Fallback Protection:**
    - Standardized card thumbnails with aspect ratio enforcement and `onerror` fallback to `assets/logo.png`.
  - **Full Sprint 1 Delivery:**
    - Overall Sprint 1 Completion reached **100%** (30 of 30 User Stories Done).
    - Closed all backlog issues on GitHub and moved cards to `Done` in Project #5.
    - Generated updated `docs/TEAM_METRICS.md` verifying 100% velocity across all 3 team members.

### 🟢 US39: Offline Auth Resilience, Saved Account Switcher & Catalog Flow Polish (2026-11-24 08:45 UTC+2)

- **Deliverables:**
  - **Offline & GitHub Pages Auth Resilience (`frontend/js/api.js`, `frontend/js/guard.js`):** Graceful offline simulation fallback when local backend (`localhost:3000`) is not running. Instant authentication for seeded accounts (`student@damanhour.edu.eg`, `admin@damanhour.edu.eg`, `employer@vodafone.com`) and local registered users with route guard compatibility.
  - **Saved Account Quick Switcher (`frontend/pages/auth.html`, `frontend/js/auth.js`):** Persisted logged-in emails locally in `localStorage` (`hyt_saved_emails`) with dynamic quick-select chips and `<datalist>` auto-fill on the sign-in form.
  - **Landing Page Section Hierarchy (`frontend/index.html`):** Re-ordered catalog sections so **Verified Free Courses & MOOCs** (`#courses`) appears before **Active Internships** (`#opportunities`), with synchronized navigation links.
  - **CS50 Course Visual Sanitization (`database/nosql/courses-catalog.json`, `frontend/js/api.js`):** Replaced placeholder logo with verified high-resolution AI/Python cover image.
  - **Single Primary Employer CTA (`frontend/index.html`):** Consolidated 3 redundant buttons in the employer section into a single, clean primary portal CTA.
  - **Search & Canvas Fixes (`frontend/index.html`, `frontend/js/hunter-canvas.js`):** Eliminated 'undefined' text in command search results, removed intrusive 4-track auto-hooking on search/load.
  - **Playwright Verification Suite (`tests/test-user-flow.spec.js`):** 100% test pass rate across section ordering, stats verification, search sanitization, external apply links, and offline auth simulation.

### 🟢 US40–US44: Class Central + Internships Aggregator, GradientDeck/MotionSites UI & Connected 9-Screen Journey (2026-11-27 20:40 UTC+2)

- **Issues:** #126 (US40), #127 (US41), #128 (US42), #129 (US43), #130 (US44)
- **Deliverables:**
  - **US40 — Class Central + Internships Unified Catalog (`database/nosql/courses-catalog.json`, `frontend/js/catalog-store.js`, `frontend/js/api.js`):** Expanded free MOOCs catalog to 15 verified courses across all 5 disciplines (Harvard, Stanford, DeepLearning.AI, Princeton, Helsinki, Google, Cisco, Linux Foundation, UC Irvine, TU Delft, Yale, Wharton, Johns Hopkins) with full syllabi, ratings, review counts, and unified `localStorage` state for Favorites, Course Enrollments, Notifications, and Onboarding preferences.
  - **US41 — GradientDeck & MotionSites.ai Design Layer + Splash & Onboarding (`frontend/css/screens.css`, `frontend/pages/splash.html`, `frontend/pages/onboarding.html`):** Built responsive Desktop (1440px) & Mobile (375px) design system, animated Splash Screen (Screen 1), and 3-step Interactive Onboarding Wizard (Screen 2).
  - **US42 — Class Central Explore, Faceted Search/Filter & Unified Details (`frontend/pages/explore.html`, `frontend/pages/details.html`):** Built Screen 5 & 7 (`explore.html` with discipline, provider, level, sort, and search filters across MOOCs & Internships) and Screen 6 (`details.html` with full syllabus modules, provider certificate info, ratings, favorites, and external free enrollment/apply actions).
  - **US43 — Connected 9-Screen Journey & Interactive Prototype (`frontend/pages/profile.html`, `frontend/pages/prototype.html`, `frontend/index.html`):** Built Screen 9 (`profile.html` for Favorites, Enrolled Courses, Notifications & Settings), interactive 9-Screen Prototype Journey Map (`prototype.html`), and wired Home (`index.html`) directly into Explore, Details, and Profile.
  - **US44 — Playwright E2E Verification (`tests/test-9-screens-journey.spec.js`):** Verified all screens on 1440px Desktop and 375px Mobile (0 horizontal overflow, 0 JS errors), end-to-end connected user journey, and full `npm test` compliance.

### 🟢 US45: 3-Color Contrast System, Concise Navbar, AI Search Enter-Key & Auth-Gated Persistence (2026-11-27 22:25 UTC+2)

- **Issue:** #136 (US45)
- **Deliverables:**
  - **3-Color Design & Dark Mode Contrast Fix (`frontend/css/style.css`):** Replaced `#ffffff` `--color-primary` in Dark Mode and `#4F46E5` hover slop with a clean 3-color system (60% neutral slate, 30% high-contrast ink, 10% cobalt-sky `#0284C7` / `#0EA5E9` + emerald `#059669` / `#10B981`), guaranteeing crisp white button text on colored surfaces in both themes.
  - **Unified Concise Navbar & Zero Tooltip Clutter (`index.html`, `explore.html`, `details.html`, `profile.html`, `student.html`, `employer.html`, `admin.html`):** Linked `landing.css` across all subpages, shortened nav labels (`Explore`, `Courses`, `Internships`, `Roadmaps`, `Favorites`), added dynamic `Sign In` / `Dashboard + Sign Out` header state, and removed `data-tooltip="Toggle Mode"` hover boxes.
  - **AI Command Search & Enter-Key Navigation (`frontend/index.html`):** Integrated `HYT_CATALOG.getAllCourses()` into Command Search so typing `AI` displays matching free courses immediately and pressing `Enter` navigates directly to `details.html` or `explore.html`.
  - **Auth-Gated Favorites & Per-User Persistence (`frontend/js/catalog-store.js`, `frontend/js/auth.js`):** Scoped saved favorites & enrollments per signed-in user email and redirected unauthenticated guests cleanly to `auth.html`.
  - **Rich Class Central-Style Details (`frontend/pages/details.html`):** Added Pricing, Language & Pace, Duration, Credential facts grid, and course learning outcomes.
  - **Verification:** Passed `node --check`, `test-9-screens-journey.spec.js`, `test-user-flow.spec.js`, and full `npm test`.

### 🟢 US46: Exact H+Arrow Favicon, Realistic Bow Storytelling, Guest Favorites Cache & Backend Sync (2026-11-28 12:38 UTC+2)

- **Issue:** #138 (US46)
- **Deliverables:**
  - **Exact Slanted H + Arch Crossbar & Arrow Logo (`frontend/assets/favicon.svg`, all HTML pages):** Removed legacy `frontend/assets/logo.png` and all `logo.png` references across `frontend/` so GitHub Pages and all 16 HTML pages serve `assets/favicon.svg?v=2` and the matching inline SVG.
  - **Realistic Bow & Arrow Storytelling Animation (`frontend/index.html`, `frontend/css/landing.css`, `frontend/js/story-animation.js`):** Removed the dashed aim line (`#story-arrow-trail`), anchored the student at `x=145` with connected neck, full facial features, and proper shoes, added an oscillating target (`targetBobUpDown`), 3 feathered-arrow bow shots (2 misses + bullseye on shot 3), joyful jump celebration, career transformation into shirt/tie/briefcase, and sprint through the opening `JOBS` door.
  - **Minimal Headings, Bookmark Icon & Guest Web Cache (`frontend/index.html`, `frontend/js/catalog-store.js`, `frontend/js/i18n.js`, `frontend/pages/explore.html`, `frontend/pages/details.html`, `frontend/pages/profile.html`):** Simplified section headings (`Courses`, `Internships`), replaced `"Enter Platform"` with `"Sign In"`, added the `#hyt-fav-nav-btn` bookmark icon next to `#hyt-theme-btn`, added Info (`i`) + Save (Bookmark) buttons to Home course cards, and enabled unauthenticated guests to save favorites & enroll via `_guest` `localStorage` web cache.
  - **Backend-DB-Frontend Sync & Admin Dark Mode Contrast (`frontend/js/api.js`, `frontend/js/opportunities.js`, `frontend/css/admin.css`, `frontend/pages/auth.html`):** Fixed `API_BASE_URL` -> `API_BASE` in `api.js`, added `OpportunitiesManager.syncFromBackend()` in `opportunities.js`, fixed `[data-theme="dark"] .data-table` text/email contrast in `admin.css`, and simplified `auth.html`.
  - **Verification:** Passed `node --check`, `test-9-screens-journey.spec.js`, `test-user-flow.spec.js`, and full `npm test`.

### 🟢 US47: Realistic Desk/Bow Storytelling, Strict Password Verification, Student Sidebar & Local Credentials (2026-11-28 14:15 UTC+2)

- **Issue:** #140 (US47)
- **Deliverables:**
  - **Realistic Study Desk, Two-Handed Bow & Celebration Storytelling (`frontend/index.html`, `frontend/css/landing.css`, `frontend/js/story-animation.js`):** Added side study desk with open rulebook & lamp in Scene 1, floating thought cloud with concise 2–3 word planning captions, realistic two-handed bow hold + drawing arm (`#story-right-arm-group`), removed old 3 dots (`#story-celebration-sparkles`), added confetti & popped balloons celebration + optional Web Audio sound toggle (`#story-sound-toggle`).
  - **Strict Password Verification & Local Credentials (`frontend/js/api.js`, `.gitignore`):** Fixed offline login resilience so seeded & registered accounts strictly validate passwords and unknown emails never auto-login; added `local-credentials.csv` to `.gitignore`.
  - **Student Sidebar Tab Bar, CV-Gated Setup & Profile/Avatar Editor (`frontend/pages/student.html`):** Added responsive left sidebar tabs (`Overview & Roadmap`, `CV & Skills`, `Applications & Jobs`, `Profile & Avatar`), gated the roadmap behind CV upload or academic track selection for new students, and added local avatar photo upload + name/bio editing.
  - **Verification:** Passed `node --check`, `git check-ignore`, `test-9-screens-journey.spec.js`, `test-user-flow.spec.js`, and full `npm test`.


