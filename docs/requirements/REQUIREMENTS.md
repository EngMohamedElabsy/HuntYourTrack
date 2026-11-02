# HuntYourTrack — Software Requirements Specification (SRS) 📋

> **Academic Evaluation Document:** Software Engineering Requirements & Backlog Traceability  
> **Institution:** Faculty of Computers & Information, Damanhour University (CS Department)  
> **Course Supervisor:** Teaching Assistant Eng. Menna  
> **Project Lead:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **Repository:** [EngMohamedElabsy/HuntYourTrack](https://github.com/EngMohamedElabsy/HuntYourTrack)  
> **Sprint Project Board:** [HuntYourTrack - Graduation Sprint 1 & 2 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)

---

## 1. Project Overview & Scope
HuntYourTrack is an AI-assisted career progression navigator and verified opportunity aggregator designed for Egyptian university students across multiple disciplines. It bridges the gap between theoretical undergraduate coursework and industry expectations by charting clear career paths, scanning resumes for ATS keywords, and presenting certified corporate internships with real-time application countdowns.

---

## 2. User Personas & Role Matrix
The platform enforces a strict Role-Based Access Control (RBAC) model client-side:

| Role / Persona | Description | Key Permissions & Responsibilities |
| :--- | :--- | :--- |
| **🎓 Student** | University undergraduates & recent graduates. | Explore career roadmaps, filter opportunities by faculty, drag-and-drop resume for keyword analysis, and apply directly to training tracks. |
| **🏢 Employer / Partner** | Corporate recruiters & authorized training bodies (e.g., ITI, Telecom, Software Houses). | Publish internships, define required skills and deadlines, review applicant profiles, and filter candidates by ATS match score. |
| **🛡️ Administrator** | Faculty administrators and project evaluators. | Review and accredit employer organizations, manage student/recruiter access states (Active/Suspended), and oversee system health. |
| **🌐 Guest / Visitor** | Public visitors exploring the platform. | View product landing page, interact with the Track Hunter radar, search public opportunities catalog, and register an account. |

---

## 3. Functional Requirements (FR)

### FR-01: Multi-Faculty Career Roadmaps
- **Description:** The system MUST provide dedicated learning roadmaps across 5 major academic faculties: Computing & AI, Engineering, Science, Business & Commerce, and Law.
- **Verification:** Users can select any faculty tab on the landing page or student hub and view tailored pathways with skill prerequisites and course recommendations.

### FR-02: Interactive Track Hunter Radar Canvas
- **Description:** The platform MUST render an interactive HTML5 Canvas radar at 60fps simulating skill constellation discovery based on student interaction.
- **Verification:** Cursor movement or touch events dynamically illuminate relevant technology nodes with Dark/Light token responsiveness.

### FR-03: Real-Time Corporate Opportunity Catalog & Lifecycle
- **Description:** Opportunities MUST be categorized into 3 dynamic states based on real-time chronological evaluation:
  1. `🔥 Active Opportunities`: Currently accepting applications.
  2. `⏳ Closing Soon`: Less than 48 hours remaining with high-visibility urgency badges.
  3. `📁 Past Archive`: Expired listings kept for benchmark reference.
- **Verification:** Live countdown timers display remaining Days, Hours, and Minutes and automatically transition listings upon expiration.

### FR-04: Client-Side ATS Resume Keyword Parser (Simulation)
- **Description:** The student portal MUST provide a drag-and-drop dropzone supporting Word (.docx), PDF (.pdf), and Excel (.xlsx) files.
- **Verification:** Upon drop/upload, the system extracts filename and simulated keywords, calculates an ATS match percentage, and personalizes recommended courses.

### FR-05: Employer Opportunity Publisher Form
- **Description:** Employers MUST be able to publish opportunities through an interactive form specifying Title, Academic Track, Detailed Description, Required Skills (with custom entry), Compensation (Paid/Free), and Deadline.
- **Verification:** Form validates required fields with inline feedback, persists the payload to `localStorage`, and updates the employer dashboard and public catalog instantly.

### FR-06: Applicant Review Matrix & Candidate Screening
- **Description:** The employer portal MUST present a split-pane review interface showing candidate list with circular ATS match badges, status filters, and detailed applicant profiles.
- **Verification:** Employers can mark candidates as `Accepted`, `Shortlisted`, or `Rejected` with instant visual status updates.

### FR-07: Admin Executive Control Center & User Management
- **Description:** The administration console MUST display registered users with filtering by role and faculty, and provide action toggles to activate or freeze accounts.
- **Verification:** Status toggles immediately update the in-memory state and display corresponding badges.

### FR-08: Employer Accreditation & Verification Workflow
- **Description:** Administrators MUST be able to review corporate partner documentation via a modal dialog and issue approved or rejected accreditation clearance.
- **Verification:** Approved partners receive a verified checkmark badge (`Verified Partner`) across their published opportunities.

### FR-09: Strict Head Route Guarding (Access Control)
- **Description:** Protected portals (`pages/student.html`, `pages/employer.html`, `pages/admin.html`) MUST execute JavaScript validation in `<head>` before the DOM is painted.
- **Verification:** Unauthenticated access or unauthorized role attempts are blocked and redirected to `pages/auth.html` with explanatory query parameters.

### FR-10: 100% Bilingual Arabic & English Support (i18n)
- **Description:** The platform MUST support dynamic language switching between Arabic (RTL) and English (LTR) across all user-facing strings using `data-i18n` attributes.
- **Verification:** Language switcher updates page directionality, text alignment, and typography seamlessly without page reloads.

### FR-11: Adaptive Dark / Light Design Theme
- **Description:** The UI MUST support both Light and Dark themes via CSS custom properties and persist user preference.
- **Verification:** Toggling theme immediately updates backgrounds, cards, typography contrast, and canvas visual palettes.

### FR-12: Unified Single-Portal Navigation
- **Description:** All portals, dashboards, and forms MUST be accessible through cohesive, non-redundant navigation links with clear back-to-home actions.
- **Verification:** Zero dead links, zero 404 errors, and full breadcrumb clarity.

---

## 4. Non-Functional Requirements (NFR)

| ID | Category | Requirement Specification | Metric / Target |
| :--- | :--- | :--- | :--- |
| **NFR-01** | **Performance** | Initial page load time on standard 3G/4G connections. | < 1.2 seconds, 0 external runtime dependencies. |
| **NFR-02** | **Accessibility & Usability** | UI contrast compliance and keyboard navigation. | WCAG 2.1 AA compliant (> 4.5:1 text contrast ratio). |
| **NFR-03** | **Responsiveness** | Responsive layout across mobile, tablet, and widescreen. | 0 horizontal overflow from 320px to 1920px. |
| **NFR-04** | **Security** | Role isolation and client-side route defense. | Unauthorized access blocked in `<head>` prior to paint. |
| **NFR-05** | **Reliability & Portability**| Works offline/client-side without backend server crashes. | 100% uptime on static hosts (GitHub Pages). |
| **NFR-06** | **Maintainability** | Clean modular architecture separating assets, CSS, JS, and HTML. | Verified via CI Stage 1 architecture linting. |

---

## 5. User Stories Traceability Matrix (Sprint 1 & Sprint 2)

All functional requirements are mapped to dedicated GitHub Issues on the official project backlog:

| Story ID | GitHub Issue | Title & Deliverable | Assignee | Story Points | Implementation File | Status |
| :---: | :---: | :--- | :---: | :---: | :--- | :---: |
| **US01** | [#39](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/39) | Global Design System & UI Kit | @EngMohamedElabsy | 5 | `frontend/css/style.css` | 🟢 Done |
| **US02** | [#40](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/40) | Layout Architecture & Navigation Map | @EngMohamedElabsy | 3 | `docs/specs/navigation-map.md` | 🟢 Done |
| **US03** | [#41](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/41) | Core Component Library | @EngMohamedElabsy | 5 | `frontend/pages/components.html` | 🟢 Done |
| **US04** | [#42](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/42) | Admin Control Panel Core UI | @EngMohamedElabsy | 8 | `frontend/pages/admin.html` | 🟢 Done |
| **US05** | [#43](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/43) | Employer Verification Workflow UI | @EngMohamedElabsy | 5 | `frontend/pages/admin.html` | 🟢 Done |
| **US06** | [#44](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/44) | Final Design Prototype Review | @EngMohamedElabsy | 3 | Full System Audit | 🟢 Done |
| **US07** | [#45](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/45) | Multi-Faculty Student Landing Page & Radar | @hager678 | 8 | `frontend/index.html` | 🟢 Done |
| **US08** | [#46](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/46) | Student Authentication & Multi-Faculty Flow | @hager678 | 5 | `frontend/pages/auth.html` | 🟢 Done |
| **US09** | [#47](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/47) | Personalized Student Hub & Resume Dropzone | @hager678 | 8 | `frontend/pages/student.html` | 🟢 Done |
| **US10** | [#48](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/48) | Employer Dashboard Main UI | @abdulrhman-masoud | 5 | `frontend/pages/employer.html` | 🟢 Done |
| **US11** | [#49](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/49) | Internship Posting Form UI | @abdulrhman-masoud | 5 | `frontend/pages/employer.html` | 🟢 Done |
| **US12** | [#50](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/50) | Applicant Review Interface | @abdulrhman-masoud | 8 | `frontend/pages/employer.html` | 🟢 Done |
| **US13** | [#53](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/53) | Unified Single Deployment & Product Landing | @EngMohamedElabsy | 8 | `frontend/index.html` | 🟢 Done |
| **US14** | [#54](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/54) | Secure Authentication Architecture & RBAC | @EngMohamedElabsy | 8 | `frontend/js/auth.js` | 🟢 Done |
| **US15** | [#55](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/55) | Responsive Layout & Multi-Device Breakpoints | @EngMohamedElabsy | 5 | `frontend/css/*.css` | 🟢 Done |
| **US16** | [#56](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/56) | UI/UX Button Polish & Action Semantics | @EngMohamedElabsy | 5 | Design Kit | 🟢 Done |
| **US17** | [#61](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/61) | Architectural Overhaul & Track Hunter Radar | @EngMohamedElabsy | 8 | `frontend/index.html` | 🟢 Done |
| **US18** | [#63](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/63) | Universal Multi-Faculty Roadmaps & Sanitization | @EngMohamedElabsy | 8 | `frontend/index.html` | 🟢 Done |
| **US19** | [#64](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/64) | Interactive Role Onboarding & ATS Resume Engine | @EngMohamedElabsy | 8 | `frontend/pages/student.html` | 🟢 Done |
| **US20** | [#65](https://github.com/EngMohamedElabsy/HuntYourTrack/issues/65) | Comprehensive Opportunity Deadlines & Lifecycle | @EngMohamedElabsy | 5 | `frontend/js/opportunities.js`| 🟢 Done |

---

*This document serves as the formal academic requirements baseline for HuntYourTrack evaluation.*
