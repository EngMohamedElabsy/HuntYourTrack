# HuntYourTrack — Project Constitution & Operational Directives

> **Software Engineering Graduation Project (2025–2026)**  
> **Faculty of Computers and Information · Damanhour University (CS Department)**  
> **Project Lead & Software Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **Canonical Live Platform:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)  
> **Sprint Project Board:** [HuntYourTrack Sprint 1 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)

---

## 1. Project Mission & Technical Stack

HuntYourTrack is an AI-assisted career guidance and internship matching platform designed for Egyptian university students. This repository houses the unified, lightweight static frontend prototype.

- **Stack:** Semantic HTML5, CSS3 Custom Properties (Design Tokens), and ES6+ Vanilla JavaScript.
- **Visuals & Motion:** HTML5 Canvas API for interactive radar charts, GSAP via CDN (with offline CSS transition fallbacks).
- **Execution Mode:** 100% Client-Side. Authentication and role sessions are simulated through `localStorage` with zero server/database runtime requirements during this prototyping phase.
- **Quality Gate:** Automated headless browser testing via Playwright (`npm test`) on both CI and local environments.

---

## 2. Core Architectural Standards

1. **Single-Portal Entry Point (`frontend/index.html`):**
   - The root domain is an open public Product Landing Page showcasing tracks, internships, and methodology.
   - Visitors are **never** forced into authentication unless accessing restricted student or administrative workflows.

2. **Strict Route Guarding (RBAC):**
   - Protected views (e.g. `admin.html`) execute role authorization guards immediately upon DOM initialization.
   - Unauthorized access attempts automatically redirect to `auth.html` with appropriate feedback.

3. **Bilingual Localization (i18n):**
   - Native support for Arabic (`dir="rtl"`) and English (`dir="ltr"`).
   - Handled dynamically via `frontend/js/i18n.js` with `data-i18n` attributes.
   - **Zero-Mixing Standard:** Switching languages must translate 100% of visible DOM elements, select options, and dynamic data without text leakage.

4. **Universal Design Token & Theming Engine:**
   - All colors, surfaces, borders, and typography MUST reference CSS custom properties defined in `frontend/css/style.css`.
   - Never hardcode background colors (`#fff`, `#ffffff`) or text colors in component stylesheets.
   - Dark theme (`[data-theme="dark"]`) must render dark surfaces (`--color-card: #131B2E`) with high-contrast text and zero white flashes.

---

## 3. Team Governance & Anti-Collision Policy

### Strict Teammate Isolation (Non-Negotiable)
- **Assigned Scope Only:** The assistant and Lead Developer operate strictly on tasks assigned to `@EngMohamedElabsy`.
- **Zero Cross-Stepping:** **NEVER** edit, refactor, commit to, or close issues assigned to teammates:
  - `@hager678` (Student Experience: US07, US08, US09)
  - `@abdulrhman-masoud` (Employer Portal: US10, US11, US12)
- **Definition of Done:** An issue is marked `Closed` on GitHub and moved to `Done` in Project #5 ONLY after 100% verification with passing tests.

### Atomic Branching & Pull Request Workflow
- **1 Story = 1 Dedicated Branch & PR:** Never combine multiple user stories into one pull request.
- **Workflow:**
  1. `git checkout -b feature/usXX-<short-name>`
  2. Implement feature adhering to clean code standards.
  3. Verify locally with `npm test`.
  4. Open PR via `gh pr create --title "USXX: <Title>" --body "Closes #<id>" --base main`.
  5. Merge to `main` upon verification.

### Language & Documentation Integrity
- **Codebase:** English ONLY for code, variables, functions, CSS classes, comments, commit messages, and PR descriptions.
- **User Communication:** Clear, professional Arabic in chat conversations with the Lead Engineer.

---

## 4. Standard Operational Commands

| Command | Purpose |
| :--- | :--- |
| `npm start` | Launches local HTTP server on `http://localhost:8080` |
| `npm test` | Runs Playwright smoke suite and deep E2E verification audit |
| `npm run metrics` | Generates team velocity metrics and updates `docs/TEAM_METRICS.md` |
| `gh pr list` | Checks active pull requests across the repository |
| `gh issue list` | Lists sprint user stories and current assignments |

---

## 5. Sprint 1 Deliverables Summary

All stories are tracked on [GitHub Project #5](https://github.com/users/EngMohamedElabsy/projects/5):

| Issue | Title & Module | Assignee | Status |
| :--- | :--- | :--- | :--- |
| **US01 (#39)** | Global Design System & UI Kit Tokens | @EngMohamedElabsy | 🟢 Done |
| **US02 (#40)** | Layout Architecture & Navigation Map | @EngMohamedElabsy | 🟢 Done |
| **US03 (#41)** | Core Reusable Component Library | @EngMohamedElabsy | 🟢 Done |
| **US04 (#42)** | Admin Executive Control Panel | @EngMohamedElabsy | 🟢 Done |
| **US05 (#43)** | Employer Verification Workflow UI | @EngMohamedElabsy | 🟢 Done |
| **US06 (#44)** | Design Prototype Review & Accessibility | @EngMohamedElabsy | 🟢 Done |
| **US13 (#53)** | Unified Single Deployment & Product Landing Page | @EngMohamedElabsy | 🟢 Done |
| **US14 (#54)** | Secure Authentication Architecture & RBAC Guards | @EngMohamedElabsy | 🟢 Done |
| **US15 (#55)** | Multi-Device Responsive Breakpoint Optimization | @EngMohamedElabsy | 🟢 Done |
| **US16 (#56)** | UI/UX Interaction Polish, Toast System & Micro-Interactions | @EngMohamedElabsy | 🟢 Done |
| **US17 (#61)** | Architectural Overhaul: Single-Portal & Custom Canvas Identity | @EngMohamedElabsy | 🟢 Done |
| **US07 (#45)** | Student Landing Page Wireframe | @hager678 | ⚪ Todo (Assigned to Hager) |
| **US08 (#46)** | Student Authentication UI | @hager678 | 🔵 In Progress (Assigned to Hager) |
| **US09 (#47)** | Student Dashboard Layout | @hager678 | 🔵 In Progress (Assigned to Hager) |
| **US10 (#48)** | Employer Dashboard Main UI | @abdulrhman-masoud | ⚪ Todo (Assigned to Abdulrahman) |
| **US11 (#49)** | Internship Posting Form UI | @abdulrhman-masoud | ⚪ Todo (Assigned to Abdulrahman) |
| **US12 (#50)** | Applicant Review Interface | @abdulrhman-masoud | ⚪ Todo (Assigned to Abdulrahman) |
