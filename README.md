# HuntYourTrack 🎯
> **AI-Powered Career Matching & Personalized Learning Roadmap Platform**  
> *Software Engineering Graduation Project (2026)*

---

## 📌 Project Overview
**HuntYourTrack** is a career-matching platform designed to empower university students by matching them with tailored internships and generating personalized, step-by-step learning roadmaps.

This repository hosts the **Lightweight Static Frontend Prototype** featuring interactive UI mockups, simulated client-side authentication flows (US01 / US08), reusable design tokens, and comprehensive architectural documentation.

---

## 🏛️ System Architecture
Built using a **Pure Client-Side Static Architecture** designed for high performance, portability, and rapid demonstration:
- **Frontend Core:** HTML5, CSS3, and ES6+ Vanilla JavaScript.
- **Motion & Visuals:** Dual-panel UI sliding transitions and state feedback powered by GSAP via CDN.
- **Zero Package Bloat:** Clean repository containing **zero local `node_modules`** and zero heavy server dependencies.
- **Global Skills Architecture:** AI tools, Playwright test runners, and automation assets reside on the developer's host machine, linked dynamically via a cross-platform symlink (`.global_skills`).

---

## 📁 Project Structure

```text
HuntYourTrack/
├── frontend/             # Core UI, styles, and client-side simulation logic
│   ├── auth.html         # Dual-panel Student Authentication screen (Sign In / Register)
│   ├── auth.css          # Responsive dual-panel styling & layout rules
│   ├── auth.js           # Input validation, GSAP motion & localStorage mock session
│   ├── components.html   # Reusable UI Component Library preview (Buttons, Form inputs, Modals)
│   ├── components.css    # Modular design system component styling
│   ├── style.css         # Global design tokens, color palette, and typography scales
│   └── index.html        # Main landing entry & dashboard redirect shell
├── docs/                 # Software engineering specifications & diagrams
│   ├── specs/            # User journey maps, sitemaps, and navigation specs (navigation-map.md)
│   ├── diagrams/         # PlantUML diagrams (Architecture, ERD, Use Case, Components)
│   ├── pdf_exports/      # Exported documentation PDFs
│   └── guidelines/       # Software engineering project guidelines
├── scripts/              # Repository automation tools
│   └── setup-skills.js   # Dynamic cross-platform setup script (Linux/Windows/macOS)
├── .global_skills        # (Git-ignored) Symlink pointing to host ~/.global_ai_skills
├── CLAUDE.md             # Project memory, AI directives, and team handoff tracking
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

### 3. Run and Preview the UI
You can open the project in either of two ways:
- **Option A (Direct Browser Open):** Double-click `frontend/auth.html` or open it directly in Zen Browser / Chrome.
- **Option B (Local Static Server):** Use any lightweight CLI server (e.g., `python3 -m http.server 8080 --directory frontend` or VS Code Live Server) from the project root.

---

## ✨ Implemented User Stories

| Story ID | GitHub Ref | Module | Description & Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- |
| **US01** | [#39](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/39) / [#46](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/46) | **Student Auth & Onboarding** | Dual-panel sliding auth card, email validation, password rules, GSAP animations, and localStorage session mock. | **Completed (Mocked)** |
| **US02** | [#40](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/40) | **Layout & Navigation** | Responsive shell hierarchy, sitemap, and navigation map documented in `docs/specs/navigation-map.md`. | **Documented** |
| **US03** | [#41](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/41) | **Core UI Component Library** | Standardized design tokens, buttons, form controls, and modals previewed in `frontend/components.html`. | **Completed (Preview)** |

---

## 🔒 Session Simulation Details (US01)
To demonstrate the onboarding flow without a backend server:
- Form submissions perform real-time synchronous validation.
- Valid authentication writes mock session credentials to `localStorage` (`user: "student"`, `token: "mock_jwt_session_token"`).
- Animated GSAP visual feedback triggers before executing a simulated redirect to `index.html`.

---

## 👥 Contributors & Academic Context
- **Department:** Computer Science (CS) — Faculty of Computers and Information, Damanhour University.
- **Project Lead & Full-Stack Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)).
