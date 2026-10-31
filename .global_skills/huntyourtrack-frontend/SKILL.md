---
name: huntyourtrack-frontend
description: Guidelines and architectural invariants for the HuntYourTrack Software Engineering course project frontend, covering multi-faculty roadmaps, corporate opportunities, client-side session mocking, and testing protocols.
---

# HuntYourTrack Frontend Engineering Guide

## 1. Project Context & Purpose

- **Course:** Software Engineering Course Project.
- **Product Vision:** A career exploration and opportunity aggregator connecting university students across multiple faculties (Engineering, Science, Business & Commerce, Law, and Computing/AI) with structured roadmaps, certified courses, and summer internships with live application deadlines.
- **Privacy Standard:** Zero personal academic names (students, instructors, or specific departments) inside user-facing frontend code. The application must render as an authentic, production-grade SaaS product.

---

## 2. Architecture & Tech Invariants

- **Execution Model:** 100% Client-Side Pure Prototype.
- **Directory Layout:**
  - `frontend/index.html`: Product Landing Page, active opportunities catalog, multi-faculty career tracks, and Track Hunter Canvas.
  - `frontend/student.html`: Student Career Hub with discipline-specific roadmaps, milestones, and resume dropzone.
  - `frontend/auth.html`: Central authentication with "Continue with Google" flow, multi-role onboarding wizard, and pre-seeded admin login.
  - `frontend/admin.html`: Platform administrative console with client-side RBAC route guarding.
  - `frontend/css/`: Modular stylesheets (`style.css`, `landing.css`, `auth.css`, `admin.css`, `components.css`).
  - `frontend/js/`: Client engines (`i18n.js`, `hunter-canvas.js`, `opportunities.js`, `auth.js`, `admin.js`, `components.js`).
- **Design Tokens & Dark Mode:**
  - Always reference CSS variables (`var(--color-card)`, `var(--color-foreground)`, `var(--color-primary)`).
  - Never hardcode `#FFFFFF` or stark dark colors that cause contrast breaks in dark theme (`[data-theme="dark"]`).
- **Resume Parsing & Keyword Engine:**
  - Simulated client-side: analyzes uploaded Word/PDF/Excel resumes to extract discipline keywords (Engineering, Science, Business, Law, Tech) and personalize the student's dashboard.

---

## 3. Team Backlog & Governance Status

- **Lead Architect (@EngMohamedElabsy):**
  - US01–US06, US13–US17 are **100% Completed, Verified, and Merged into `main`**.
- **Teammate Issues (OPEN / NOT SOLVED YET):**
  - **Hager Khaled (@hager678):**
    - `US07 (#45)`: Student Landing Page Wireframe (`Todo`)
    - `US08 (#46)`: Student Authentication UI (`toprogram`)
    - `US09 (#47)`: Student Dashboard Layout (`toprogram`)
  - **Abdulrahman Masoud (@abdulrhman-masoud):**
    - `US10 (#48)`: Employer Dashboard Main UI (`Todo`)
    - `US11 (#49)`: Internship Posting Form UI (`Todo`)
    - `US12 (#50)`: Applicant Review Interface (`Todo`)
- **Strict Role Boundary:** Never modify, touch, or close teammate issues unless authorized by formal handover.
- **Atomic Pull Requests:** 1 Story = 1 Dedicated Branch & PR.

---

## 4. Verification & Testing

- Run local server: `npm start` (`http://localhost:8080`).
- Run automated tests: `npm test` (Playwright smoke test and rigorous E2E audit asserting zero mixed languages, dark mode tokens, and route guards).
