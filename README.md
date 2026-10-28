# HuntYourTrack 🎯
> **AI-Powered Career Matching & Personalized Learning Roadmap Platform**  
> *Software Engineering Graduation Project (2026)*  
> **Faculty of Computers and Information · Damanhour University (CS Department)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://engmohamedelabsy.github.io/HuntYourTrack/)
[![Sprint Project](https://img.shields.io/badge/Project%20Board-Sprint%201-blue?style=for-the-badge&logo=github)](https://github.com/users/EngMohamedElabsy/projects/5)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-indigo?style=for-the-badge&logo=githubactions)](https://github.com/EngMohamedElabsy/HuntYourTrack/actions)

---

## 🌐 Live Interactive Deployment
The static frontend is continuously deployed on every commit using GitHub Actions. Evaluators and teammates can preview the live system directly from any browser or mobile device:
- 🚀 **Main Portal & Student Dashboard:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)
- 🔐 **Authentication & Registration:** [https://engmohamedelabsy.github.io/HuntYourTrack/auth.html](https://engmohamedelabsy.github.io/HuntYourTrack/auth.html)
- 🧩 **UI Component Kit Preview:** [https://engmohamedelabsy.github.io/HuntYourTrack/components.html](https://engmohamedelabsy.github.io/HuntYourTrack/components.html)

---

## 📌 Project Overview
**HuntYourTrack** is a career-matching platform designed to empower university students by matching them with tailored internships and generating personalized, step-by-step learning roadmaps.

This repository hosts the **Lightweight Static Frontend Prototype** featuring interactive UI mockups, simulated client-side authentication flows (US01 / US08), reusable design tokens, an automated CI/CD pipeline, and comprehensive team accountability metrics.

---

## 🏛️ System Architecture
Built using a **Pure Client-Side Static Architecture** designed for high performance, portability, and rapid demonstration:
- **Frontend Core:** HTML5, CSS3, and ES6+ Vanilla JavaScript.
- **Motion & Visuals:** Dual-panel UI sliding transitions and state feedback powered by GSAP via CDN (with offline CSS fallback resilience).
- **Automated CI/CD:** GitHub Actions automatically package and deploy updates in ~30 seconds on every push.
- **Zero Package Bloat:** Clean repository containing **zero local `node_modules`** and zero heavy server dependencies.
- **Global Skills Architecture:** AI tools, Playwright test runners, and automation assets reside on the developer's host machine, linked dynamically via a cross-platform symlink (`.global_skills`).

---

## 🤖 Automated DevOps & Accountability Workflows

The repository features three production-grade GitHub Actions workflows:

1. **Continuous Deployment ([`deploy.yml`](.github/workflows/deploy.yml)):**
   - Triggers on every push to `main` altering `frontend/`.
   - Packages and deploys the static prototype directly to GitHub Pages.
2. **Sprint Deadline & Accountability Monitor ([`sprint-monitor.yml`](.github/workflows/sprint-monitor.yml)):**
   - Runs daily scheduled checks against the active milestone deadline (**Sunday, November 1, 2026**).
   - Automatically issues polite warning mentions to assignees with tasks due within 48 hours.
   - Alerts the Lead Architect on overdue tasks for rebalancing.
3. **Team Performance & Sprint Leaderboard ([`team-metrics.yml`](.github/workflows/team-metrics.yml)):**
   - Automatically updates [**`docs/TEAM_METRICS.md`**](docs/TEAM_METRICS.md) on issue events.
   - Displays completion velocity, assigned vs completed stories, and engineer recognition badges.
   - Run locally anytime with: `npm run metrics`.

---

## 📁 Project Structure

```text
HuntYourTrack/
├── .github/
│   └── workflows/        # Automated CI/CD & Accountability Actions
│       ├── deploy.yml    # Continuous deployment to GitHub Pages
│       ├── sprint-monitor.yml # Daily deadline checks & reminder alerts
│       └── team-metrics.yml   # Auto-generation of team performance report
├── frontend/             # Core UI, styles, and client-side simulation logic
│   ├── auth.html         # Dual-panel Student Authentication screen (Sign In / Register)
│   ├── auth.css          # High-contrast scrollbars & responsive dual-panel styling
│   ├── auth.js           # Client validation, GSAP motion & localStorage mock session
│   ├── components.html   # Reusable UI Component Library preview (Buttons, Form inputs, Modals)
│   ├── components.css    # Modular design system component styling
│   ├── style.css         # Global design tokens, color palette, and typography scales
│   └── index.html        # Student Dashboard with track metrics, internships & roadmaps
├── docs/                 # Software engineering specifications & team reports
│   ├── TEAM_METRICS.md   # Automated Team Performance & Accountability Leaderboard
│   ├── specs/            # User journey maps and navigation specs (navigation-map.md)
│   ├── diagrams/         # PlantUML diagrams (Architecture, ERD, Use Case, Components)
│   ├── pdf_exports/      # Exported documentation PDFs
│   └── guidelines/       # Software engineering project guidelines
├── scripts/              # Repository automation tools
│   ├── generate-team-metrics.js # Calculates sprint velocity & individual scorecards
│   └── setup-skills.js   # Dynamic cross-platform setup script (Linux/Windows/macOS)
├── .global_skills        # (Git-ignored) Symlink pointing to host ~/.global_ai_skills
├── CLAUDE.md             # Project memory, AI directives, and team governance protocol
├── package.json          # Lightweight manifest (Scripts only, zero runtime packages)
└── README.md             # Primary repository documentation
```

---

## 🚀 Teammate & Evaluator Onboarding Guide

### 1. Clone the Repository
```bash
git clone https://github.com/EngMohamedElabsy/HuntYourTrack.git
cd HuntYourTrack
```

### 2. Configure Cross-Platform Skills (Optional / Dev Setup)
To connect your host machine's global AI automation tools:
```bash
npm run setup:skills
```
> **Note:** This script automatically resolves user paths across Linux, macOS, and Windows (using Junctions to bypass Admin privilege requirements).

### 3. Run and Preview the UI Locally
- **Option A (Lightweight Local Server):** Run `npm start` (serves `frontend/` on `http://localhost:8080`).
- **Option B (Direct Browser Open):** Double-click `frontend/auth.html` directly in your browser.
- **Option C (Live Public URL):** Open [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/).

---

## ✨ Sprint 1 User Stories & Progress

Tracking active on [**GitHub Project #5 (Sprint 1)**](https://github.com/users/EngMohamedElabsy/projects/5):

| Story ID | GitHub Ref | Module | Description & Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- |
| **US01** | [#39](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/39) | **Global Design System** | Global tokens, colors, typography (`frontend/style.css`). | 🟢 **Closed (Done)** |
| **US02** | [#40](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/40) | **Layout & Navigation** | Navigation map & responsive shell (`docs/specs/navigation-map.md`). | 🟢 **Closed (Done)** |
| **US03** | [#41](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/41) | **Core Component Kit** | Buttons, form controls, modals previewed in `frontend/components.html`. | 🟢 **Closed (Done)** |
| **US08** | [#46](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/46) | **Student Authentication UI** | Dual-panel sliding card, validation, and session mock (`frontend/auth.html`). | 🔵 **In Progress (`toprogram`)** |
| **US09** | [#47](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/47) | **Student Dashboard** | Track match (94%), internship apply simulation, milestones (`frontend/index.html`). | 🔵 **In Progress (`toprogram`)** |
| **US04** | [#42](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/42) | **Admin Control Panel Core UI** | Admin overview metrics, user management data-table, settings. | 🔵 **In Progress (`toprogram`)** |
| **US05** | [#43](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/43) | **Employer Verification UI** | Company verification queue, document viewer, approval/rejection modal. | ⚪ **Todo (Backlog)** |
| **US06** | [#44](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/44) | **Design Prototype Review** | Final accessibility and end-to-end walkthrough verification. | ⚪ **Todo (Backlog)** |
| **US07** | [#45](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/45) | **Student Landing Page** | Hero section, How it works, and featured internships preview. | ⚪ **Todo (Backlog)** |
| **US10** | [#48](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/48) | **Employer Dashboard UI** | Main employer portal layout and active internship listing statistics. | ⚪ **Todo (Backlog)** |
| **US11** | [#49](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/49) | **Internship Posting Form** | Multi-step internship posting interface with criteria inputs. | ⚪ **Todo (Backlog)** |
| **US12** | [#50](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/50) | **Applicant Review Interface** | Applicant filtering, candidate card evaluation, status progression. | ⚪ **Todo (Backlog)** |

---

## 🔒 Session Simulation Details
To demonstrate the onboarding flow without a backend server:
- Form submissions perform real-time client-side validation.
- Valid authentication writes mock session credentials to `localStorage` (`user: "student"`, `token: "mock_jwt_session_token"`).
- Animated visual feedback triggers before redirecting to `index.html`.
- Sign out clears `localStorage` and returns to `auth.html`.

---

## 👥 Contributors & Academic Context
- **Institution:** Faculty of Computers and Information, Damanhour University (CS Department - Graduation Project 2026).
- **Project Lead & Full-Stack Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)).
- **Student Portal & Experience:** Hager Khaled ([@hager678](https://github.com/hager678)).
- **Employer Portal & Experience:** Abdulrahman Masoud ([@abdulrhman-masoud](https://github.com/abdulrhman-masoud)).

