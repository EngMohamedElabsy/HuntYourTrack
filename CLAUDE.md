# HuntYourTrack — Project Constitution & Operational Directives

> **Software Engineering Course Project**  
> **Project Lead & Software Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **Canonical Live Platform:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)  
> **Sprint Project Board:** [HuntYourTrack Sprint 1 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)

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

---

## 3. Team Governance & Backlog Tracking

### Dynamic Real-Time GitHub Backlog Tracking (No Hardcoded Issues)
- **Zero Static Stale Data:** Never hardcode static issue numbers, statuses, or teammate backlogs into this constitution.
- **Dynamic Inspection Required:** Claude and AI assistants MUST inspect the real-time project state using the GitHub CLI:
  ```bash
  # Check active sprint items on Project #5
  gh project item-list 5 --owner EngMohamedElabsy

  # Check sprint user stories and assignees
  gh issue list --state open

  # View detailed specifications of a specific issue
  gh issue view <issue_number>

  # Inspect active pull requests
  gh pr list
  ```
- **Live Decision Rule:** If an issue is already marked `Closed` or `Done` on GitHub, treat it as completed. If it is `open`, inspect its assignee before touching any related code.

---

### Mandatory Branching & Atomic Pull Request (PR) Workflow (قاعدة الـ PR المستقل لكل إيشو لمنع التداخل وحماية الكود)
- **Strict Atomic Rule (1 Issue = 1 Dedicated Branch & 1 PR):**
  Never bundle multiple user stories or tasks into a single branch or PR. All tasks and issues MUST be solved strictly **one by one** (`واحدة بواحدة`). Every issue gets its own branch and its own dedicated PR to eliminate merge collisions between teammates, keep reviews isolated, and allow clean rollbacks.
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

---

### Issue Handover & Takeover Protocol (بروتوكول تفويض واستلام مهام الزملاء)
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

### Automated CI/CD, Deadline Tracking & Scorecard Table (إدارة المواعيد وبوت الـ GitHub Actions)
- **Deadline Field on GitHub Project #5:** Every issue must have a tracked delivery date configured in the custom `Deadline` field of Project #5 and linked to the active milestone.
- **Automated Scorecard & Velocity Table (`npm run metrics`):**
  - The script `scripts/generate-team-metrics.js` fetches live issue statuses from GitHub and updates `docs/TEAM_METRICS.md`.
  - It calculates individual team completion percentages, countdown alerts (`🟢 Delivered on Time`, `🟡 Active`, `⚪ Pending Start`), and updates the executive progress table.
- **5-Stage GitHub Actions DAG Pipeline (`.github/workflows/ci.yml`):**
  - Triggers on every push and PR to `main`.
  - Stages: (1) Architecture Standards, (2) Security Audit, (3) Playwright Browser Suite, (4) Team Velocity & Deadline Monitor, (5) Executive Quality Gate.
  - The `github-actions[bot]` automatically verifies the PR, confirms zero regressions, and renders the visual summary dashboard.

---

### Claude's 6-Phase Systematic Engineering Workflow (خريطة التفكير وحل أي Task / Issue)

Before writing any code or tackling any issue, Claude MUST structure thinking as a methodical plan across these 6 sequential phases:

#### 🗺️ Phase 1: Architecture & File Mapping (الخطة وهنعمل إيه؟ وهنستخدم فايلات إيه؟ ونكتب كود إيه؟)
- **Problem Analysis:** Clearly define the objective, requirements, and edge cases from `gh issue view <issue_number>`.
- **Target File Map:** Specify the exact files to be created, modified, or deleted (`frontend/index.html`, `frontend/js/...`, `frontend/css/...`, `tests/...`).
- **Code & Logic Specification:** Outline the specific functions, DOM structures, state models, or CSS classes that will be introduced before typing code.

#### 🧰 Phase 2: Skills & Tooling Selection (هنستخدم Skills وإيه الأدوات والـ Plugins اللي هتساعدنا؟)
- Identify and select the exact active skills from `.global_skills/` needed for the task:
  - **`open-design` (`od lint`):** Anti-slop HTML linter for eliminating AI default colors (`#4F46E5`) and emojis.
  - **`ui-ux-pro-max` & `frontend-design`:** For distinctive, non-templated layouts, micro-interactions, and WCAG AA contrast.
  - **`design-system`:** For strict adherence to `MASTER.md` color tokens, typography, and density dials.
  - **`graphify`:** For understanding module coupling and AST relations before refactoring.
  - **`huntyourtrack-frontend`:** For multi-faculty domain invariants and client-side session mocking.
  - **`test-audit` & `playwright-cli`:** For browser automation and verification.
  - **`diagram`:** For Mermaid flow mapping when documenting architecture.

#### ⚙️ Phase 3: Step-by-Step Isolated Execution (تنفيذ الخطوات Step by Step)
- Create an isolated feature branch (`git checkout -b feature/usXX-<feature-name>`).
- Open an immediate draft/tracking PR against `main` (`gh pr create`).
- Implement the planned logic incrementally, one cohesive unit at a time, keeping code clean, modular, and in professional English.

#### 🐛 Phase 4: Problem Solving & Bug Triage (حل المشاكل وإصلاح الأخطاء)
- Execute `npm test` locally to catch any regression.
- Inspect browser console logs, DOM mismatches, and responsive overflow.
- Resolve all identified bugs systematically before moving forward.

#### 🔒 Phase 5: Security & Privacy Audit (فحص الأمان والخصوصية وحماية البيانات)
- **Zero Academic/Personal Names:** Verify that no real student/instructor names, emails, or personal data leak into user-facing HTML.
- **Route Guard Integrity (RBAC):** Confirm client-side authentication guards execute in `<head>` before DOM render.
- **Data Sanitization:** Ensure inputs are sanitized against XSS and sessions in `localStorage` cannot be hijacked.
- **Zero Secrets:** Confirm no private API tokens, `.env` values, or credentials are tracked in Git.

#### 🎯 Phase 6: Verification & Definition of Done (التأكد هل حلينا المطلوب ولا لأ؟)
- **Checklist Audit:** Verify that 100% of the acceptance criteria defined in the issue are met.
- **E2E Test Compliance:** Ensure all 5 audit test suites pass with 0 failures:
  1. 100% Bilingual i18n without text leakage or mixed languages.
  2. Zero UI element duplication or administrative tool leakage.
  3. 60fps Track Hunter Canvas rendering in both Dark/Light modes.
  4. Strict route guarding blocking unauthorized URLs.
  5. Responsive layout stability across 375px mobile and 1440px desktop.
- **Clean Merge:** Synchronize with `main`, ensure clean tree, and merge cleanly.

---

## 4. Operational Commands

| Command | Purpose |
| :--- | :--- |
| `npm start` | Serves `frontend/` on `http://localhost:8080` |
| `npm test` | Runs Playwright smoke suite and deep E2E verification audit |
| `npm run metrics` | Generates team velocity metrics and updates `docs/TEAM_METRICS.md` |
| `npm run setup:skills` | Dynamically establishes and synchronizes `.global_skills` |
| `gh issue list` | Lists real-time sprint user stories and assignees |
| `gh pr list` | Checks active pull requests across the repository |
| `gh project item-list 5 --owner EngMohamedElabsy` | Displays live board status from GitHub Project #5 |

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

## 7. Living Constitution & Continuous Learning Directive (عقل متطور وذاكرة مستمرة)

- **Mandatory Session Initialization:** At the start of every session or task, Claude MUST read `CLAUDE.md` and inspect `.global_skills/` to ground all decisions in the project's living rules.
- **Strict 6-Phase Pipeline Adherence:** Claude must execute every single task through the 6-phase engineering workflow defined in Section 3 without skipping steps.
- **Cumulative Knowledge Growth:** Every time a new design pattern, architectural invariant, debugging edge-case, or testing protocol is established, Claude MUST append and refine `CLAUDE.md` and the relevant skill definitions.
- **Mandatory End-of-Task Handoff Update:** At the conclusion of every completed issue, feature, or pull request, Claude MUST update `CLAUDE.md` (specifically Section 8: Continuous Project Ledger) and any relevant skills before concluding the session.
- **Zero Knowledge Loss:** **NEVER** delete, wipe, or overwrite established workflows, team protocols, or skill definitions. Project intelligence is strictly additive, continuously evolving, and permanently preserved across sessions.

---

## 8. Continuous Project Ledger & Active Changelog (سجل التحديثات الحية وموقف المشروع)

> **Directive for Claude:** When closing any task or merging any PR, append an entry to this ledger with the timestamp, files touched, deliverables verified, and next priority so any new chat session immediately inherits 100% of the project's context.

### 🟢 Sprint 1 Baseline & Architectural Foundation (Completed)
- **Status:** 11 User Stories (US01–US06, US13–US17) completed, verified, and merged into `main`.
- **Core Architecture Established:**
  - Client-side single portal (`frontend/index.html`) with bilingual i18n (`frontend/js/i18n.js`).
  - High-performance Track Hunter Radar Canvas (`frontend/js/hunter-canvas.js`) at 60fps.
  - Role-based client-side access control (`frontend/js/auth.js` & `admin.js`) guarding routes before DOM paint.
  - 1-Click demo accounts for Student, Recruiter, and Admin.
  - Rigorous test suite (`npm test`) validating 5 critical dimensions with 100% pass rate.

### 🟢 Skills & Governance Harmonization (Latest Update: 2026-10-31 19:20 UTC+2)
- **Commit:** `645aefe`
- **Deliverables:**
  - Curated and committed 15 verified, physical AI skills in `.global_skills/` (`open-design`, `ui-ux-pro-max`, `frontend-design`, `graphify`, `design-system`, `huntyourtrack-frontend`, `diagram`, `test-audit`, `playwright-cli`, `document-generate`, `design-review`, `design-html`, `autoplan`, `browse`, `make-pdf`).
  - Implemented dynamic real-time GitHub backlog tracking via `gh` CLI.
  - Re-established mandatory feature branching, immediate PR creation, and teammate handover protocol (`Hi @<teammate>...`).
  - Codified the 6-Phase Systematic Engineering Workflow into `CLAUDE.md`.
  - Upgraded `scripts/setup-skills.js` to dynamically synchronize repository skills to host environment (`npm run setup:skills`).
- **Next Immediate Priority:**
  - **Sprint 2 Execution:** Implement US18 (#63), US19 (#64), and US20 (#65) on dedicated feature branches:
    1. US18: Universal Multi-Faculty Roadmaps & Production SaaS Sanitization.
    2. US19: Interactive Role-Based Onboarding & Intelligent Resume Keyword Parser.
    3. US20: Comprehensive Opportunity Organization, Deadlines & Publishing Lifecycle.



