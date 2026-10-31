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

---

## 3. Team Governance & Backlog Tracking

### Teammates & Issue Status Overview
- **Lead Architect (@EngMohamedElabsy):**
  - All 11 assigned stories (US01–US06, US13–US17) are **100% Completed, Verified, and Merged into `main`**.
- **Hager Khaled (@hager678) — Status: OPEN / NOT SOLVED YET:**
  - **US07 (#45):** Student Landing Page Wireframe (`Todo`)
  - **US08 (#46):** Student Authentication UI (`toprogram`)
  - **US09 (#47):** Student Dashboard Layout (`toprogram`)
- **Abdulrahman Masoud (@abdulrhman-masoud) — Status: OPEN / NOT SOLVED YET:**
  - **US10 (#48):** Employer Dashboard Main UI (`Todo`)
  - **US11 (#49):** Internship Posting Form UI (`Todo`)
  - **US12 (#50):** Applicant Review Interface (`Todo`)

### Non-Negotiable Isolation Policy
- **Never touch or close teammates' issues** (@hager678, @abdulrhman-masoud) until they complete 100% of their deliverables.
- **Atomic Pull Requests:** 1 Issue = 1 Dedicated Feature Branch (`feature/usXX-...`) and 1 Dedicated PR.

---

## 4. Operational Commands

| Command | Purpose |
| :--- | :--- |
| `npm start` | Serves `frontend/` on `http://localhost:8080` |
| `npm test` | Runs Playwright smoke suite and deep E2E verification audit |
| `npm run metrics` | Generates team velocity metrics and updates `docs/TEAM_METRICS.md` |
| `npm run setup:skills` | Dynamically establishes `.global_skills` symlink across OSs |

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

