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

#### 📋 Automated Personal Issue Discovery

When any teammate asks *"What are my assigned issues?"* or *"What should I work on?"*:
The AI MUST query GitHub live:

```bash
gh issue list --assignee <current_user_login> --state open
gh project item-list 5 --owner EngMohamedElabsy
```

- The AI presents the list of open issues clearly with their issue number, title, and current column (`Todo` or `toprogram`).
- The AI guides the engineer to select and solve **EXACTLY ONE issue at a time**.

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
- **Next Immediate Priority:**
  - **Sprint 2 Execution:** Implement US18 (#63), US19 (#64), and US20 (#65) on dedicated feature branches:
    1. US18: Universal Multi-Faculty Roadmaps & Production SaaS Sanitization.
    2. US19: Interactive Role-Based Onboarding & Intelligent Resume Keyword Parser.
    3. US20: Comprehensive Opportunity Organization, Deadlines & Publishing Lifecycle.

