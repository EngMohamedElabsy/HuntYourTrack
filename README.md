# HuntYourTrack 🎯
> **AI-Powered Career Matching & Personalized Learning Roadmap Platform**  
> *Software Engineering Graduation Project (2026)*

---

## 📌 Project Overview
**HuntYourTrack** is a career platform designed to empower university students by matching them with tailored internships and generating personalized, step-by-step learning roadmaps. 

This repository hosts the **Lightweight Static Frontend Prototype** featuring interactive user interface mockups, simulated client-side authentication flows (US01 / US08), and comprehensive architectural specifications.

---

## 🏛️ System Architecture
The project is built using a **Pure Client-Side Static Architecture** designed for maximum portability, high performance, and rapid UI/UX demonstration:

- **Frontend Core:** Pure HTML5, CSS3, and modern browser JavaScript (ES6+).
- **Visual & Motion System:** Cinematic UI transitions and responsive panel animations powered by **GSAP** (via CDN).
- **Zero Package Bloat:** The repository contains **zero local `node_modules`** and zero heavy server dependencies.
- **Global Skills Architecture:** Bulky AI metadata, browser automation tools, and large local caches reside outside the repository on the developer's host machine, mapped dynamically through a cross-platform symlink (`.global_skills`).

---

## 📁 Project Structure

```
HuntYourTrack/
├── frontend/             # Core UI, styles, and client-side simulation logic
│   ├── auth.html         # Dual-panel Student Authentication screen (Sign In / Register)
│   ├── auth.css          # Responsive dual-panel styling & layout rules
│   ├── auth.js           # Client-side input validation, GSAP motion & localStorage mock
│   ├── components.html   # Reusable UI Component Library preview (Buttons, Inputs, Modals)
│   ├── components.css    # Modular design system component styling
│   ├── style.css         # Global design tokens, typography, and palette definitions
│   └── index.html        # Main platform shell redirect / landing entry
├── docs/                 # Software engineering specifications & diagrams
│   ├── specs/            # User journey maps, sitemaps, and navigation hierarchy
│   ├── database/         # Database schemas and entity-relationship models
│   └── system-design/    # Microservices architecture & deployment blueprints
├── scripts/              # Lightweight repository utilities
│   └── setup-skills.js   # Dynamic cross-platform setup script (Linux/Windows/macOS)
├── .global_skills        # (Git-ignored) Symlink pointing to host ~/.global_ai_skills
├── CLAUDE.md             # Project memory, AI directives, and team handoff tracking
└── package.json          # Lightweight project manifest with zero runtime dependencies
```

---

## 🚀 Teammate & Evaluator Onboarding Guide

Follow these quick steps to set up and explore the platform locally on **any operating system** (Windows, macOS, or Linux):

### 1. Clone the Repository
```bash
git clone https://github.com/EngMohamedElabsy/HuntYourTrack.git
cd HuntYourTrack
```

### 2. Configure Cross-Platform Skills (Optional / Dev Setup)
Run the automated dynamic setup script:
```bash
npm run setup:skills
```
*This automatically detects your OS and establishes a symlink or Windows directory junction to `~/.global_ai_skills` without requiring Administrator privileges.*

### 3. Run and Preview the UI
You can run the project in either of two straightforward ways:

- **Option A (Direct Browser Open):**  
  Open `frontend/auth.html` directly in your preferred web browser (Zen, Chrome, Edge, Firefox).

- **Option B (Local Web Server):**  
  ```bash
  npm start
  ```
  Then navigate to `http://localhost:8080/auth.html`.

---

## ✨ Implemented User Stories

| Story ID | GitHub Ref | Module | Description & Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- |
| **US01** | [#46 (US08)](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/46) | **Student Auth & Onboarding** | Dual-panel sliding auth card, university email validation, password requirements, accessible states, and `localStorage` mock session. | **Completed (Mocked)** |
| **US02** | [#40 (US02)](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/40) | **Layout & Navigation** | Navigation map, responsive shell hierarchy, and mobile navigation strategy documented in `docs/specs/navigation-map.md`. | **Documented** |
| **US03** | [#41 (US03)](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/41) | **Core Component Library** | Standardized buttons, form inputs, modal dialogs, and tooltips previewed in `frontend/components.html`. | **Completed (Preview)** |
| **US01** | [#39 (US01)](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/39) | **Design System & UI Kit** | Global palette, typography scales, spacing tokens, and CSS variables established in `frontend/style.css`. | **Completed** |

---

## 🔒 Simulation & Session Storage Details (US01)
To allow thorough testing of user onboarding without spinning up a live backend server:
- Form submissions perform synchronous input validation.
- Valid authentication saves mock session credentials to `localStorage` (`user: 'student'`, `auth_token: 'mock_jwt_session_token'`).
- Visual status feedback is rendered with animated GSAP transitions before triggering a simulated redirect to the student dashboard.

---

## 👥 Contributors & Team
- **Software Engineering Department** — Faculty of Engineering, Alexandria University.
- Project Lead & Full-Stack Architect: **Mohamed Elabsy** ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)).
