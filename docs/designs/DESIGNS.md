# HuntYourTrack — Software Engineering Designs & UML Models 📐

> **Academic Evaluation Document:** Software Architecture, UML & Visual System Models  
> **Institution:** Faculty of Computers & Information, Damanhour University (CS Department)  
> **Course Supervisor:** Teaching Assistant Eng. Menna  
> **Lead Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **FigJam Collaborative Architecture Board:** [HuntYourTrack FigJam Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)  
> **Figma UI/UX Design System File:** [HuntYourTrack Figma Design File](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)

---

## 1. System Use Case Model

```mermaid
flowchart LR
    subgraph Actors ["System Actors"]
        Student(("🎓 Student"))
        Employer(("🏢 Employer / Recruiter"))
        Admin(("🛡️ Faculty Admin"))
    end

    subgraph PlatformBoundary ["HuntYourTrack Platform Boundary"]
        UC1(["Explore Multi-Faculty Tracks & Radar"])
        UC2(["Filter Opportunities & Deadlines"])
        UC3(["Sign Up / In with Multi-Faculty Affiliation"])
        UC4(["Upload Resume to Dropzone & Parse ATS"])
        UC5(["Track Milestone Progression Roadmap"])
        UC6(["Apply for Verified Internship / Course"])
        UC7(["Post New Opportunity & Set Requirements"])
        UC8(["Screen Candidates by ATS Match %"])
        UC9(["Accept / Shortlist / Reject Candidates"])
        UC10(["Accredit Corporate Partner Organizations"])
        UC11(["Manage User Accounts & Clearance"])
        UC12(["Switch Theme & Bilingual Language"])
    end

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6
    Student --> UC12

    Employer --> UC2
    Employer --> UC3
    Employer --> UC7
    Employer --> UC8
    Employer --> UC9
    Employer --> UC12

    Admin --> UC3
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
```

---

## 2. Software Class Diagram (Data & Domain Model)

```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string name
        +string role
        +string status
        +Date createdAt
        +login() bool
        +logout() void
    }

    class Student {
        +string faculty
        +string major
        +string academicYear
        +string resumeUrl
        +string[] detectedSkills
        +uploadResume(file)
        +selectTrack(trackId)
        +applyToOpportunity(oppId)
    }

    class Employer {
        +string companyName
        +string industry
        +string websiteUrl
        +bool isVerified
        +postOpportunity(data)
        +reviewApplicant(appId, status)
    }

    class Admin {
        +string adminDepartment
        +verifyEmployer(employerId, bool)
        +toggleUserStatus(userId, status)
        +generateReport()
    }

    class Track {
        +string trackId
        +string name
        +string faculty
        +string[] competencies
        +string[] suggestedCourses
    }

    class Opportunity {
        +string id
        +string title
        +string provider
        +string track
        +string[] requiredSkills
        +bool isPaid
        +Date startDate
        +Date endDate
        +string applyUrl
        +bool verified
        +getStatus() string
        +getCountdown() string
    }

    class Application {
        +int id
        +int studentId
        +string opportunityId
        +int matchScore
        +string status
        +string[] missingSkills
        +Date appliedAt
        +updateStatus(newStatus)
    }

    User <|-- Student
    User <|-- Employer
    User <|-- Admin

    Student "1" --> "0..*" Application : submits
    Opportunity "1" --> "0..*" Application : receives
    Employer "1" --> "0..*" Opportunity : publishes
    Track "1" --> "0..*" Opportunity : categorizes
```

---

## 3. State Machine Diagram (Opportunity & Student Lifecycle)

```mermaid
stateDiagram-v2
    [*] --> Draft : Employer Creates Opportunity
    Draft --> Published : Validated & Posted
    Published --> Active : Start Date Reached
    Active --> ClosingSoon : Less than 48 Hours Remaining
    ClosingSoon --> Expired : Deadline Exceeded
    Expired --> Archived : Preserved in Benchmark History
    Archived --> [*]

    state Active {
        [*] --> AcceptingApplications
        AcceptingApplications --> ScreeningCandidates : Applicants Apply
        ScreeningCandidates --> Shortlisted : ATS Score > 85%
        ScreeningCandidates --> Reviewed : Reviewing Profile
    }
```

---

## 4. Component & Data Flow Architecture

```mermaid
flowchart TD
    subgraph ClientTier ["Client Browser Tier (Zero-Runtime Frontend)"]
        UI_Shell["Unified Single-Portal Shell\n(frontend/index.html)"]
        UI_Pages["Modular Workspaces\n(frontend/pages/*.html)"]
        Canvas_Radar["Track Hunter Radar Engine\n(Canvas API @ 60fps)"]
        Theme_i18n["Bilingual & Dark/Light Engine\n(frontend/js/i18n.js)"]
    end

    subgraph SecurityTier ["Security & Route Defense Tier"]
        HeadGuard["Strict <head> Route Guard\n(Immediate Execution before DOM Paint)"]
        RBAC_Policy["Role Isolation Policy\n(Student / Employer / Admin)"]
    end

    subgraph PersistenceTier ["Client-Side Simulation & State Engine"]
        SessionStore[("localStorage: user_session & auth_token")]
        OppStore[("localStorage: posted_internships & catalog")]
        ResumeEngine["Simulated Keyword ATS Scanner\n(Biotech, CAD, Law, FinTech, Computing)"]
    end

    UI_Shell --> UI_Pages
    UI_Shell --> Canvas_Radar
    UI_Shell --> Theme_i18n
    UI_Pages --> HeadGuard
    HeadGuard --> RBAC_Policy
    RBAC_Policy --> SessionStore
    UI_Pages --> OppStore
    UI_Pages --> ResumeEngine
```

---

## 5. Sequence Diagram: Student Resume Upload & ATS Matching

```mermaid
sequenceDiagram
    autonumber
    actor Student as 🎓 Student
    participant Portal as 💻 Student Hub (pages/student.html)
    participant Parser as 🧠 ATS Keyword Engine
    participant Store as 🗄️ Local Storage
    participant Opps as 💼 Opportunities Grid

    Student->>Portal: Drag and drop CV file (.pdf / .docx)
    Portal->>Parser: Extract filename & simulate keyword analysis
    Parser->>Parser: Scan for Faculty tokens (e.g., Python, CAD, Biotech)
    Parser-->>Portal: Return Detected Skills & ATS Match Score (e.g., 94%)
    Portal->>Store: Persist parsed student profile & matched skills
    Portal->>Opps: Query matching corporate opportunities
    Opps-->>Portal: Render tailored internship recommendations
    Portal-->>Student: Display visual match confirmation & next roadmap steps
```

---

## 6. Diagram Artifacts Repository

All source diagram scripts and vector PDF exports are organized in this directory:
- **Architecture Diagram:** [diagrams/HuntYourTrack_Architecture.puml](diagrams/HuntYourTrack_Architecture.puml) · [PDF Export](pdf_exports/Architecture.pdf)
- **Component Diagram:** [diagrams/HuntYourTrack_ComponentDiagram.puml](diagrams/HuntYourTrack_ComponentDiagram.puml) · [PDF Export](pdf_exports/ComponentDiagram.pdf)
- **Class Model (UML):** [diagrams/HuntYourTrack_UML.puml](diagrams/HuntYourTrack_UML.puml) · [PDF Export](pdf_exports/UML.pdf)
- **Entity Relationship Model (ERD):** [diagrams/HuntYourTrack_ERD.puml](diagrams/HuntYourTrack_ERD.puml) · [PDF Export](pdf_exports/ERD.pdf)
- **Database Schema:** [diagrams/HuntYourTrack_DataBase.puml](diagrams/HuntYourTrack_DataBase.puml) · [PDF Export](pdf_exports/DataBase.pdf)
- **FigJam Interactive Whiteboard:** [HuntYourTrack Live FigJam Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)
