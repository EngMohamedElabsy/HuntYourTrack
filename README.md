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

## Technical Architecture

```
HuntYourTrack/
├── frontend/
│   ├── index.html            # Public Product Landing Page
│   ├── auth.html             # Multi-role authentication & registration
│   ├── student.html          # Student Career Hub & roadmap progression
│   ├── admin.html            # Executive administration & company verification
│   ├── workflow.html         # Interactive platform architecture flow
│   ├── components.html       # Shared design system & UI component library
│   ├── css/
│   │   ├── style.css         # Global design tokens, typography, and dark theme
│   │   ├── landing.css       # Landing page hero, tracks grid, and internship cards
│   │   ├── auth.css          # Split-panel responsive authentication styling
│   │   ├── admin.css         # Admin data tables, metrics cards, and review modals
│   │   ├── workflow.css      # Visual pipeline graph and YAML studio
│   │   └── components.css    # Reusable component kit styling
│   └── js/
│       ├── i18n.js           # Bilingual localization engine & theme persistence
│       ├── hunter-canvas.js  # HTML5 Canvas skill constellation & radar graphics
│       ├── opportunities.js  # Pre-seeded internship catalog & countdown timers
│       ├── auth.js           # Session simulation, form validation & jury tools
│       ├── admin.js          # Authorization guards & verification actions
│       └── components.js     # Shared modal and toast notification helpers
├── tests/
│   ├── frontend-smoke-test.js # Playwright automated smoke suite across all views
│   └── rigorous-e2e-audit.js  # Deep E2E audit: i18n leaks, RBAC & contrast checks
├── docs/                     # Specifications, diagrams, and sprint performance reports
├── scripts/                  # CI/CD metric generation and environment utilities
└── .github/workflows/        # Automated testing, deployment, and sprint tracking
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
- **Mohamed Yasser Elabsy** ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)) – *Project Lead & Software Architect*
- **Hager Khaled** ([@hager678](https://github.com/hager678)) – *Student Experience & Portal*
- **Abdulrahman Masoud** ([@abdulrhman-masoud](https://github.com/abdulrhman-masoud)) – *Employer Experience & Verification*

---

## License & Academic Notice
This project is developed for educational and academic evaluation purposes as part of the graduation requirements at Damanhour University.
