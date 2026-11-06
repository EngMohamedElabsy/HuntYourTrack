# HuntYourTrack — Project Concept, Problem, Solution & Technology Stack

> **Academic Course:** Software Engineering · Course Project 2025–2026  
> **Institution:** Faculty of Computers and Information, Damanhour University  
> **Section Teaching Assistant:** Eng. Hoda  
> **Student Engineering Team:**  
> - **Mohamed Yasser Elabsy** ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy)) — CS Department (Computer Science) · Project Lead & Lead Architect  
> - **Hager Khaled** ([@hager678](https://github.com/hager678)) — IS Department (Information Systems) · Student Experience & Auth  
> - **Abdulrahman Masoud** ([@abdulrhman-masoud](https://github.com/abdulrhman-masoud)) — IT Department (Information Technology) · Employer Experience & Opportunities  
> **Canonical Live Platform:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)  
> **Sprint Project Board:** [HuntYourTrack - Graduation Sprint 1 & 2 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)  
> **Figma UI/UX Design File:** [Figma Wireframes & Mockups](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)  
> **FigJam Architecture Board:** [FigJam System Lifecycle Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)

---

## 1. Project Concept in Bullet Points

- **AI-Assisted Career Navigator:** A specialized digital platform designed to guide Egyptian university undergraduates and recent graduates through progressive career roadmaps, answering the fundamental student question: *"I just finished a skill or course, what should I study or build next?"* ("Hunt Your Track").
- **Universal Multi-Discipline Scope:** Eliminates tech-only bias by expanding beyond Computing & AI to serve 5 major academic faculties: Computing & AI, Engineering, Science, Business & Commerce, and Law.
- **Corporate Opportunity Aggregator & Deadlines:** Aggregates verified corporate internships, national training initiatives (e.g., ITI, ITIDA, NTI), and professional courses with real-time deadline countdown clocks.
- **ATS Resume Keyword Matching Engine:** Client-side parsing engine that extracts domain-specific competencies from uploaded CVs (Word, PDF, Excel) to calculate match percentages and suggest targeted learning modules.
- **Role-Based Workspaces & Route Guarding:** Secure role isolation providing customized experiences for Students (roadmaps, applications), Corporate Organizers (publishing, applicant review), and University Administrators (company accreditation, audit logs).
- **Lightweight Zero-Runtime Architecture:** 100% static client-side web application running directly in standard web browsers, featuring bilingual toggle (Arabic RTL / English LTR), dynamic Dark/Light themes, and responsive layouts.

---

## 2. The Problem Statement

1. **Academic-Industry Gap & Roadblock Confusion:** Undergraduates struggle to translate theoretical university coursework into commercial industry competencies, leading to uncertainty regarding career specializations and required prerequisite skills.
2. **Scattered Opportunities & Missed Application Deadlines:** Summer internships, government scholarships, and corporate training programs are fragmented across social media and job boards, causing students to frequently miss rigid application deadlines.
3. **High Screening Overhead & ATS Rejection:** Employers receive large volumes of uncurated resumes, while students receive generic rejections without actionable feedback on missing keywords or prerequisite qualifications.
4. **Neglect of Non-Computing Disciplines:** Existing career platforms overwhelmingly focus on software development, leaving students in Biotechnology, CAD/Embedded Engineering, Financial Modeling, and Intellectual Property Law without structured roadmaps.

---

## 3. The Proposed Solution & Value Proposition

HuntYourTrack addresses these systemic challenges through four core architectural pillars:

1. **Interactive Track Hunter Canvas Radar:**
   - HTML5 Canvas graphic rendering skill constellations and career paths at 60fps, providing visual clarity on beginner, intermediate, and advanced track competencies.
2. **Personalized Student Career Hub:**
   - Dynamic profile customizer enabling students to select faculty and major, track milestone completion, and upload resumes into an interactive drag-and-drop dropzone.
3. **Automated Opportunity Lifecycle Engine:**
   - Clear classification into three states (`Active Opportunities`, `Closing Soon < 48h`, and `Past Archive`) with dynamic countdown timers preventing missed deadlines.
4. **Applicant Review Matrix & Academic Governance:**
   - Corporate organizers review candidate match percentages and manage applicant status (Accept, Shortlist, Reject), while university administrators verify and accredit corporate partners before opportunities are published.

---

## 4. Target Audience & System Personas

| Target Persona | Description & System Scope | Core Needs & Objectives |
| :--- | :--- | :--- |
| **University Students & Fresh Graduates** | Undergraduates across the 5 target faculties (Years 1 to 4). | Discover structured career roadmaps, test resume keyword match, and apply for verified corporate internships before deadlines. |
| **Corporate Partners & Training Organizers** | HR managers, tech recruiters, and national training bodies (ITI, Telecom, Engineering Labs). | Publish targeted internship announcements, specify faculty requirements, and filter applicants via ATS match scoring. |
| **Academic Administration & Faculty Deans** | University deans, student affairs coordinators, and graduation project evaluation juries. | Monitor student career readiness, accredit external training providers, and ensure academic internship credibility. |

---

## 5. Comprehensive Technology Stack & Rationale

| Category | Tool / Technology | Selection Rationale & Implementation Details |
| :--- | :--- | :--- |
| **UI/UX Design** | **Figma** | High-fidelity screen mockups and wireframes with responsive layouts. Direct Link: [Figma Design File](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW). |
| **System Architecture** | **FigJam** | Collaborative architectural whiteboarding for state machines, entity lifecycles, and component flows. Direct Link: [FigJam System Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq). |
| **Diagrams as Code** | **PlantUML & Mermaid** | Version-controlled UML specifications (Use Case, Class, State, Component, Sequence) located in `docs/designs/`. |
| **Frontend Core** | **Semantic HTML5** | Accessible document structure partitioned into `frontend/index.html` and modular `frontend/pages/*.html`. |
| **Design System** | **CSS3 Design Tokens** | Centralized custom properties in `frontend/css/style.css` supporting seamless Dark/Light theme switching. |
| **Client Scripting** | **Modular ES6+ JavaScript** | Dependency-free modular scripts (`auth.js`, `opportunities.js`, `admin.js`, `i18n.js`). |
| **Motion Graphics** | **HTML5 Canvas API** | Lightweight 60fps skill constellation radar with mouse/touch interactive responsiveness. |
| **State & Persistence**| **Browser LocalStorage API** | Pure client-side simulation of authentication, session management, and opportunity publishing. |
| **Internationalization**| **Custom i18n Engine** | Instant language toggle (English LTR / Arabic RTL) maintaining zero UI leaks or layout shifts. |
| **E2E Test Suite** | **Playwright Test Runner** | Multi-step headless browser automated audit testing responsive viewports (375px mobile to 1440px desktop). |
| **CI/CD Pipeline** | **GitHub Actions** | Automated 5-stage quality DAG enforcing linting, security audits, E2E browser tests, and metric generation. |
| **Deployment** | **GitHub Pages** | Continuous deployment of production assets from `main` branch. |

---

*This document fulfills Requirement 4 for the Software Engineering Academic Evaluation (Faculty of Computers and Information, Damanhour University).*
