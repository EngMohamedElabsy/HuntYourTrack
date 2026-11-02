# HuntYourTrack — UI & UX Design System, Wireframes & Mockups 🎨

> **Academic Evaluation Document:** User Interface & User Experience Design Specification  
> **Institution:** Faculty of Computers & Information, Damanhour University (CS Department)  
> **Course Supervisor:** Teaching Assistant Eng. Menna  
> **Lead Architect & UI Lead:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **Canonical Figma Design File:** [HuntYourTrack Figma Wireframes & Mockups](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)  
> **FigJam Design & Architecture Board:** [HuntYourTrack FigJam Workspace](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)

---

## 1. Official Figma Project Links

| Asset Type | Official Live URL | Access & Privileges |
| :--- | :--- | :--- |
| **🎨 Figma UI/UX Design System (Wireframes & High-Fidelity Mockups)** | [https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW) | View & Dev Mode Enabled for Academic Evaluation |
| **📐 FigJam Collaborative Diagrams & State Machine Board** | [https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq) | Full Interactive Canvas |

---

## 2. Design System Tokens & Color Palette

The interface is built strictly upon CSS custom properties defined in `frontend/css/style.css`, enforcing WCAG 2.1 AA color contrast (> 4.5:1 ratio for normal text):

### Light Mode Palette
- **Primary Accent (`--color-primary`):** `#6366F1` (Indigo 500) — Represents intelligence, guidance, and focus.
- **Primary Hover (`--color-primary-dark`):** `#4F46E5` (Indigo 600).
- **Secondary Accent (`--color-secondary`):** `#818CF8` (Indigo 400).
- **Success / Verification (`--color-accent`):** `#16A34A` (Emerald 600) — Accreditations, verified partners, paid internships.
- **Background (`--color-background`):** `#EEF2FF` (Indigo 50 Soft).
- **Surface / Cards (`--color-card`):** `#FFFFFF` (Pure White).
- **Text Primary (`--color-foreground`):** `#312E81` (Deep Indigo).
- **Text Muted (`--color-muted-foreground`):** `#475569` (Slate 600).
- **Borders (`--color-border`):** `#C7D2FE` (Indigo 200).

### Dark Mode Palette (`[data-theme="dark"]`)
- **Background (`--color-background`):** `#0B0F19` (Midnight Obsidian).
- **Surface / Cards (`--color-card`):** `#131B2E` (Deep Space Navy).
- **Primary (`--color-primary`):** `#818CF8` (Electric Indigo).
- **Text Primary (`--color-foreground`):** `#F8FAFC` (Crisp Off-White).
- **Text Muted (`--color-muted-foreground`):** `#94A3B8` (Slate 400).
- **Borders (`--color-border`):** `#1E293B` (Dark Slate).

### Typography Stack
- **English Display Headings:** `'Poppins', -apple-system, sans-serif` (Weights: 600, 700).
- **English Body & Interface:** `'Open Sans', system-ui, sans-serif` (Weights: 400, 500, 600).
- **Arabic Native Typography:** `'Cairo', 'Tajawal', sans-serif` (Full RTL typographic balance).

---

## 3. Structural Wireframes (Low-Fidelity Blueprints)

### Blueprint A: Product Landing & Unified Shell (`index.html`)
```
+-------------------------------------------------------------------------+
| [🎯 Logo] HuntYourTrack    [Tracks] [Opps] [Radar] [Employers]  [🌓] [🌐] [Sign In]|
+-------------------------------------------------------------------------+
|                                                                         |
|     [🎓 Graduation Project Badge · Faculty of Computers & Information]  |
|               HUNT YOUR CAREER TRACK & SECURE INTERNSHIPS              |
|         Tailored roadmaps for Computing, Engineering, Science, etc.     |
|                                                                         |
|            [🚀 Start Exploring Roadmaps]    [🔑 Sign Up Free]           |
|                                                                         |
| +---------------------------------------------------------------------+ |
| |                🕸️ TRACK HUNTER INTERACTIVE CANVAS RADAR             | |
| |                (Dynamic Constellations illuminated by cursor)       | |
| +---------------------------------------------------------------------+ |
|                                                                         |
| [🎯 Multi-Faculty Tracks Grid: Computers | Engineering | Science | Law ] |
| [💼 Corporate Opportunities Catalog: Active | Closing Soon | Archived ] |
| [🏢 Employer Partnership Gateway: Post Internship | Hire Talent ]      |
+-------------------------------------------------------------------------+
| Footer: Faculty of Computers and Information · Damanhour University     |
+-------------------------------------------------------------------------+
```

### Blueprint B: Student Career Hub (`pages/student.html`)
```
+-------------------------------------------------------------------------+
| [🎯 Logo] Student Portal            [🏠 Main]  [Faculty: CS v]  [🌓] [🚪] |
+-------------------------------------------------------------------------+
|  Welcome back, Mariam Hassan! · Faculty of Computers (CS Department)     |
|  [Overall Roadmap Progress: 65% █████████████░░░░░░░]                   |
+-------------------------------------------------------------------------+
| [ 📂 RESUME (CV) DROPZONE ]        | [ 🎯 PERSONALIZED ROADMAP STEPS ]  |
| Drag and drop your .pdf or .docx   | 1. [✓] Data Structures & Alg.      |
|                                    | 2. [✓] Linux Shell Scripting       |
| ATS Keyword Scan: 94% Match        | 3. [✓] Cloud & Docker Container    |
| Detected: Python, AWS, Docker      | 4. [ ] Kubernetes Clusters         |
+-------------------------------------------------------------------------+
| [ 💼 Recommended Internships for You: Vodafone VOIS Cloud Intern (94%) ]|
+-------------------------------------------------------------------------+
```

### Blueprint C: Employer Workspace (`pages/employer.html`)
```
+-------------------------------------------------------------------------+
| [🎯 Logo] Employer Hub     [📊 Overview] [➕ Post] [👥 Applicants (5)] [🏠] |
+-------------------------------------------------------------------------+
|  KPIs: [ 4 Active Postings ]    [ 91 Total Apps ]    [ 3 High Matches ] |
+-------------------------------------------------------------------------+
| CANDIDATES LIST (Filter: All v)   | CANDIDATE ATS DETAIL PANE           |
| --------------------------------- | ----------------------------------- |
| (94%) Mariam Hassan · Cloud Sec   | Mariam Hassan (Computing & AI)      |
| (91%) Omar Khaled · Frontend      | Match: 94% ATS Score                |
| (88%) Nour Ibrahim · DevOps       | Skills: [✓ AWS] [✓ Docker] [✓ Linux]|
| (76%) Youssef Adel · Data Analyst | Gaps:   [✕ Terraform]               |
|                                   | [✓ Accept]  [★ Shortlist]  [✕ Reject]|
+-------------------------------------------------------------------------+
```

---

## 4. High-Fidelity Screens Specification & Exported Mockups

All 6 high-fidelity mockups have been generated in retina resolution and uploaded as native visual frames onto the **[Official Figma Design Canvas](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)**:

| # | Screen Name | Layout Spec | Exported Retina Mockup |
| :---: | :--- | :--- | :--- |
| **01** | **Landing Page (Desktop)** | Hero section, Track Hunter radar canvas, multi-faculty tabs | [01_Landing_Page_Desktop.png](screens/01_Landing_Page_Desktop.png) |
| **02** | **Authentication Portal** | Sign in/up, Google auth simulation, role onboarding wizard | [02_Authentication_Portal.png](screens/02_Authentication_Portal.png) |
| **03** | **Student Career Hub** | Dynamic student header, resume dropzone, roadmap milestones | [03_Student_Career_Hub.png](screens/03_Student_Career_Hub.png) |
| **04** | **Employer Portal** | Publishing form, status lifecycle tabs, candidate review | [04_Employer_Opportunities_Manager.png](screens/04_Employer_Opportunities_Manager.png) |
| **05** | **Admin Governance Console** | Accreditation queue, user directory, audit trails | [05_Admin_Governance_Console.png](screens/05_Admin_Governance_Console.png) |
| **06** | **Mobile Responsive View** | Stacked 375px mobile experience with zero layout shift | [06_Mobile_Responsive_Experience.png](screens/06_Mobile_Responsive_Experience.png) |

---

## 5. Responsive Breakpoint Standards

- **Mobile Viewports (320px – 640px):** Single-column stacked layouts, touch-friendly tap targets (> 44x44px), collapsible navigation drawer.
- **Tablet Viewports (641px – 1024px):** 2-column adaptive grids, horizontal scrolling for data tables.
- **Desktop & Widescreen (1025px – 1920px):** Max container width bounded at 1200px with centered breathing room.
