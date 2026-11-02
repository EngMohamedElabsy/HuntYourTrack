# HuntYourTrack

> **Career Roadmap & Verified Internship Matching Platform**  
> Graduation Project 2026 · Faculty of Computers and Information, Damanhour University (Computer Science Department)

[![Frontend CI](https://github.com/EngMohamedElabsy/HuntYourTrack/actions/workflows/ci.yml/badge.svg)](https://github.com/EngMohamedElabsy/HuntYourTrack/actions/workflows/ci.yml)
[![GitHub Pages Deployment](https://github.com/EngMohamedElabsy/HuntYourTrack/actions/workflows/deploy.yml/badge.svg)](https://github.com/EngMohamedElabsy/HuntYourTrack/actions/workflows/deploy.yml)
[![Sprint Project](https://img.shields.io/badge/Project%20Board-Sprint%201-6366F1?style=flat&logo=github)](https://github.com/users/EngMohamedElabsy/projects/5)

---

## Live Platform
The static frontend prototype is continuously deployed to GitHub Pages on every commit:

🔗 **[https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)**

---

## Project Overview
**HuntYourTrack** is a career guidance and internship matching platform created for Egyptian university students. It bridges academic curricula and labor market expectations by providing structured learning roadmaps, skill assessment radar visualizations, and verified internship listings with corporate partners.

### Key Capabilities
- **Product Landing Page:** An open public showcase detailing specialized technology tracks (Full-Stack, AI/ML, Mobile, Cybersecurity, DevOps, Data Science) and live internship opportunities.
- **Student Career Hub:** Personalized dashboard featuring skill radar analytics, milestone progress tracking, and 1-click internship applications.
- **Enterprise Admin Console:** Executive KPI overview, user management with role filtering, and partner organization verification queues.
- **Bilingual Support (i18n):** Complete native support for Arabic (RTL) and English (LTR) with instant language switching and zero interface mixing.
- **Theme Engine:** Integrated Light and Dark mode using custom CSS design tokens across all views and interactive components.
- **Client-Side RBAC Guard:** Role-based access control protecting administrative routes from unauthorized access.

---

---

## 🎓 Academic Evaluation Deliverables (لجنة التقييم الأكاديمي)

This repository satisfies all formal graduation project evaluation requirements:

| Deliverable | Description | Direct Repository Link |
| :--- | :--- | :--- |
| **📑 Concept & Tools** | فكرة المشروع، المشكلة، الحل، الجمهور المستهدف، وحزمة التقنيات بالتفصيل | **[CONCEPT_AND_TOOLS.md](CONCEPT_AND_TOOLS.md)** |
| **📋 Requirements (SRS)** | توثيق متطلبات المشروع الوظيفية وغير الوظيفية ومصفوفة تتبع الـ Issues | **[docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)** |
| **📐 Software Designs & UML** | مخططات هندسة البرمجيات (Use Case, Class, State, Component, Sequence) | **[docs/DESIGNS.md](docs/DESIGNS.md)** |
| **🎨 UI & UX Specifications** | التصاميم والـ Wireframes والـ Mockups ونظام التصميم وأكواد التوكنز | **[docs/UI_UX_DESIGN.md](docs/UI_UX_DESIGN.md)** |
| **🔗 Figma Design File** | ملف تصاميم فيجما التفاعلي المباشر (Wireframes & High-Fidelity) | **[Figma Design File](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)** |
| **🔗 FigJam Architecture Board**| لوحة فيجام التفاعلية لمخططات النظام ودورة حياة البيانات | **[FigJam Diagrams Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)** |
| **📊 Project Backlog Board** | لوحة متابعة المهام وتوزيع قصص المستخدم (Agile Kanban) | **[GitHub Project #5](https://github.com/users/EngMohamedElabsy/projects/5)** |

---

## Technical Architecture

```
HuntYourTrack/
├── CONCEPT_AND_TOOLS.md      # Project vision, problem statement, solution & tech stack
├── frontend/
│   ├── index.html            # Public Product Landing Entry Point
│   ├── assets/               # Brand imagery & official logo
│   │   └── logo.png
│   ├── pages/                # Modular HTML workspaces & secondary portals
│   │   ├── student.html      # Student Career Hub & roadmap progression
│   │   ├── employer.html     # Unified Employer Portal (Dashboard, Posting, Review)
│   │   ├── employer-dashboard.html # Postings KPI monitor
│   │   ├── post-internship.html    # Interactive internship publisher form
│   │   ├── applicants-review.html  # Split-pane candidate ATS review matrix
│   │   ├── admin.html        # Executive administration & accreditation
│   │   ├── auth.html         # Multi-faculty authentication & registration
│   │   ├── workflow.html     # Interactive platform architecture flow
│   │   └── components.html   # Shared design system & UI component library
│   ├── css/                  # Shared design tokens, typography, and dark theme
│   │   ├── style.css         # Global variables, button semantics, and layouts
│   │   ├── landing.css       # Landing page hero, tracks grid, and cards
│   │   ├── auth.css          # Split-panel responsive authentication styling
│   │   ├── admin.css         # Admin data tables and review modals
│   │   ├── workflow.css      # Visual pipeline graph and YAML studio
│   │   └── components.css    # Reusable component kit styling
│   └── js/                   # Modular ES6+ client-side logic
│       ├── auth.js           # Session simulation, form validation & role guards
│       ├── admin.js          # Authorization guards & verification actions
│       ├── opportunities.js  # Pre-seeded internship catalog & countdown timers
│       ├── hunter-canvas.js  # HTML5 Canvas skill constellation & radar graphics
│       ├── i18n.js           # Bilingual localization engine & theme persistence
│       └── components.js     # Shared modal and toast notification helpers
├── tests/
│   ├── frontend-smoke-test.js # Playwright automated smoke suite across all views
│   └── rigorous-e2e-audit.js  # Deep E2E audit: i18n leaks, RBAC & contrast checks
├── docs/                     # Specifications, requirements, diagrams, and scorecards
│   ├── REQUIREMENTS.md       # Software Requirements Specification (SRS) & traceability
│   ├── DESIGNS.md            # UML diagrams, Use Cases, Class & State models
│   ├── UI_UX_DESIGN.md       # Figma links, wireframes, and design token specs
│   ├── TEAM_METRICS.md       # Automated sprint velocity & deadline tracker
│   └── diagrams/             # Version-controlled PlantUML source files (.puml)
├── scripts/                  # CI/CD metric generation and environment utilities
└── .github/workflows/        # Automated 5-stage testing, deployment, and sprint tracking
```

### Technology Stack
- **Frontend Core:** Semantic HTML5, CSS3 Custom Properties (Design Tokens), and Modular ES6+ JavaScript.
- **Graphics & Motion:** HTML5 Canvas API for interactive radar charts, GSAP (with CSS transition fallback resilience).
- **Testing & Quality Assurance:** Automated end-to-end browser testing with Playwright (`npm test`).
- **CI/CD Pipeline:** GitHub Actions for automated regression testing, GitHub Pages deployment, and milestone tracking.
- **Design Principles:** Mobile-first responsive layouts, WCAG 2.1 AA color contrast compliance, and pure client-side portability without heavy server dependencies.

---

## Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended for running tests).

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone https://github.com/EngMohamedElabsy/HuntYourTrack.git
   cd HuntYourTrack
   ```

2. **Launch the local preview server:**
   ```bash
   npm start
   ```
   Open `http://localhost:8080` in your browser.

3. **Run the automated test suite:**
   ```bash
   npm test
   ```
   Executes headless Playwright smoke tests and the comprehensive E2E audit (language consistency, route guards, dark mode).

---

## Team & Academic Affiliation

- **Institution:** Faculty of Computers and Information, Damanhour University
- **Academic Year:** 2025 – 2026 (Graduation Project)
- **Department:** Computer Science (CS)

### Contributors
- **Mohamed Yasser Elabsy (محمد ياسر العبسي)** ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)) – *Project Lead & Software Architect*
- **Hager Khaled (هاجر خالد)** ([@hager678](https://github.com/hager678)) – *Student Experience & Portal*
- **Abdulrahman Masoud (عبد الرحمن مسعود)** ([@abdulrhman-masoud](https://github.com/abdulrhman-masoud)) – *Employer Experience & Verification*

---

## License & Academic Notice
This project is developed for educational and academic evaluation purposes as part of the graduation requirements at Damanhour University.
