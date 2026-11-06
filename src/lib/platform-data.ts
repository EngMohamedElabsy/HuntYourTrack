/* Demo data for the role dashboards. Bundled until a real backend is connected. */

export interface FieldTrack {
  id: string;
  name: string;
  field: "Computer Science" | "Engineering" | "Business" | "Data" | "Security" | "Design";
  /** Explore track filter this maps to, when listings exist for it. */
  exploreTrack?: "cs-ai" | "engineering" | "bi";
  endorsedBy: string;
  openings: number;
  demand: number; // 0–100
  growth: number; // % year over year
  avgMatch: number;
  topSkills: string[];
  description: string;
}

export const FIELD_TRACKS: FieldTrack[] = [
  {
    id: "cs-ai",
    name: "Computers & AI",
    field: "Computer Science",
    exploreTrack: "cs-ai",
    endorsedBy: "Faculty of Computers & AI",
    openings: 42,
    demand: 94,
    growth: 28,
    avgMatch: 91,
    topSkills: ["Python", "PyTorch", "React", "SQL"],
    description: "Software, machine learning and cloud roles aligned with the CS degree plan.",
  },
  {
    id: "engineering",
    name: "Embedded & Systems Engineering",
    field: "Engineering",
    exploreTrack: "engineering",
    endorsedBy: "Faculty of Engineering",
    openings: 27,
    demand: 81,
    growth: 17,
    avgMatch: 86,
    topSkills: ["C++", "RTOS", "CAN-bus", "MATLAB"],
    description: "Automotive, embedded and industrial systems placements with partner manufacturers.",
  },
  {
    id: "bi",
    name: "Business Informatics",
    field: "Business",
    exploreTrack: "bi",
    endorsedBy: "Faculty of Commerce",
    openings: 19,
    demand: 72,
    growth: 12,
    avgMatch: 83,
    topSkills: ["SQL", "Power BI", "ERP", "Process Modelling"],
    description: "Where business meets technology: ERP, fintech operations and analytics.",
  },
  {
    id: "data",
    name: "Data & Analytics",
    field: "Data",
    endorsedBy: "Data Science Program",
    openings: 23,
    demand: 88,
    growth: 24,
    avgMatch: 87,
    topSkills: ["Python", "Pandas", "Tableau", "Statistics"],
    description: "Analyst and data engineering roles across banking, telecom and retail.",
  },
  {
    id: "security",
    name: "Cybersecurity",
    field: "Security",
    endorsedBy: "Network Security Lab",
    openings: 14,
    demand: 79,
    growth: 21,
    avgMatch: 82,
    topSkills: ["SIEM", "Linux", "Wireshark", "Python"],
    description: "SOC, penetration testing and governance traineeships.",
  },
  {
    id: "design",
    name: "Product & UX Design",
    field: "Design",
    endorsedBy: "Industrial Mentorship Consortium",
    openings: 11,
    demand: 68,
    growth: 9,
    avgMatch: 80,
    topSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    description: "Product design and UX research roles at startups and scale-ups.",
  },
];

export const SKILL_DEMAND = [
  { skill: "Python", demand: 92 },
  { skill: "SQL", demand: 86 },
  { skill: "React", demand: 78 },
  { skill: "Docker", demand: 71 },
  { skill: "C++", demand: 64 },
  { skill: "Cloud", demand: 69 },
  { skill: "Linux", demand: 61 },
];

/* ---------------- Student ---------------- */

export const STUDENT = {
  name: "Mariam Hassan",
  email: "mariam.hassan@cs.dmu.edu.eg",
  year: "4th Year — Computer Science",
  university: "Damanhour University",
  gpa: "3.62 / 4.0",
  location: "Damanhour, Beheira",
  about:
    "Final-year CS student focused on machine learning and frontend engineering. Built an Arabic sentiment classifier and contributed to two open-source React libraries.",
  skills: ["Python", "PyTorch", "React", "TypeScript", "SQL", "Docker", "Git"],
  interests: ["Machine Learning", "Frontend", "Cloud"],
  resumeScore: 82,
};

export const RESUME_METRICS = [
  { label: "Technical skills", value: 88 },
  { label: "Project depth", value: 79 },
  { label: "Keyword alignment", value: 84 },
  { label: "Work experience", value: 61 },
  { label: "Formatting & clarity", value: 93 },
];

export const SKILL_GAPS = ["Kubernetes", "System Design", "AWS", "Unit Testing"];

export type ApplicationStatus = "submitted" | "review" | "interview" | "offer" | "closed";

export const APPLICATION_STAGES: { key: ApplicationStatus; label: string }[] = [
  { key: "submitted", label: "Submitted" },
  { key: "review", label: "Under review" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
];

/** Earlier-cycle applications shown alongside the ones made in this browser. */
export const PAST_APPLICATIONS = [
  {
    id: "past-vois",
    title: "Graduate Software Program",
    company: "_VOIS (Vodafone)",
    match: 88,
    status: "interview" as ApplicationStatus,
    updated: "2026-06-28",
  },
  {
    id: "past-siemens",
    title: "EDA Tools Summer Intern",
    company: "Siemens EDA",
    match: 81,
    status: "review" as ApplicationStatus,
    updated: "2026-06-21",
  },
  {
    id: "past-iti",
    title: "ITI Summer Code Camp",
    company: "Information Technology Institute",
    match: 93,
    status: "offer" as ApplicationStatus,
    updated: "2026-06-12",
  },
];

/* ---------------- Mentor ---------------- */

export interface Intern {
  id: string;
  name: string;
  program: string;
  track: string;
  progress: number;
  rating: number;
  status: "ahead" | "on-track" | "attention";
  lastActive: string;
}

export const INTERNS: Intern[] = [
  { id: "i1", name: "Ahmed Samir", program: "Embedded Software Intern", track: "Engineering", progress: 82, rating: 4.6, status: "ahead", lastActive: "2h ago" },
  { id: "i2", name: "Laila Mahmoud", program: "Embedded Software Intern", track: "Engineering", progress: 67, rating: 4.2, status: "on-track", lastActive: "35m ago" },
  { id: "i3", name: "Youssef Nabil", program: "Embedded Software Intern", track: "Computers & AI", progress: 41, rating: 3.4, status: "attention", lastActive: "2d ago" },
  { id: "i4", name: "Hana Ibrahim", program: "AUTOSAR Integration Trainee", track: "Engineering", progress: 74, rating: 4.4, status: "on-track", lastActive: "5h ago" },
  { id: "i5", name: "Omar Khaled", program: "AUTOSAR Integration Trainee", track: "Computers & AI", progress: 58, rating: 3.9, status: "on-track", lastActive: "1d ago" },
  { id: "i6", name: "Nada Tarek", program: "Validation & Testing Intern", track: "Engineering", progress: 90, rating: 4.8, status: "ahead", lastActive: "10m ago" },
];

export interface Submission {
  id: string;
  internId: string;
  title: string;
  kind: "Code review" | "Weekly report" | "Design doc" | "Test plan";
  submitted: string;
  status: "pending" | "reviewed";
  score?: number;
  feedback?: string;
}

export const SUBMISSIONS: Submission[] = [
  { id: "s1", internId: "i1", title: "CAN driver retry logic", kind: "Code review", submitted: "Today, 10:42", status: "pending" },
  { id: "s2", internId: "i3", title: "Week 3 progress report", kind: "Weekly report", submitted: "Today, 09:15", status: "pending" },
  { id: "s3", internId: "i4", title: "BSW module configuration", kind: "Design doc", submitted: "Yesterday", status: "pending" },
  { id: "s4", internId: "i6", title: "HIL regression test plan", kind: "Test plan", submitted: "Yesterday", status: "pending" },
  { id: "s5", internId: "i2", title: "Week 3 progress report", kind: "Weekly report", submitted: "2 days ago", status: "reviewed", score: 8, feedback: "Clear blockers section — keep it up." },
  { id: "s6", internId: "i5", title: "Diagnostics service refactor", kind: "Code review", submitted: "3 days ago", status: "reviewed", score: 7, feedback: "Good structure; add unit tests for edge cases." },
];

export const MENTOR_WEEKLY = [
  { week: "W1", score: 6.4, completion: 58 },
  { week: "W2", score: 7.1, completion: 66 },
  { week: "W3", score: 7.6, completion: 73 },
  { week: "W4", score: 7.4, completion: 71 },
  { week: "W5", score: 8.1, completion: 80 },
  { week: "W6", score: 8.4, completion: 84 },
];

/* ---------------- Admin ---------------- */

export const ADMIN_TREND = [
  { month: "Jan", applications: 320, placements: 41 },
  { month: "Feb", applications: 410, placements: 55 },
  { month: "Mar", applications: 530, placements: 72 },
  { month: "Apr", applications: 610, placements: 88 },
  { month: "May", applications: 790, placements: 116 },
  { month: "Jun", applications: 960, placements: 149 },
  { month: "Jul", applications: 1120, placements: 171 },
];

export const PLACEMENTS_BY_FIELD = [
  { field: "Computer Science", value: 214 },
  { field: "Engineering", value: 138 },
  { field: "Business", value: 76 },
  { field: "Data", value: 92 },
  { field: "Security", value: 48 },
];

export type UserRole = "Student" | "Mentor" | "Admin";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  field: string;
  status: "active" | "suspended";
  joined: string;
}

export const USERS: PlatformUser[] = [
  { id: "u1", name: "Mariam Hassan", email: "mariam.hassan@cs.dmu.edu.eg", role: "Student", field: "Computer Science", status: "active", joined: "2025-09-14" },
  { id: "u2", name: "Ahmed Samir", email: "ahmed.samir@eng.dmu.edu.eg", role: "Student", field: "Engineering", status: "active", joined: "2025-09-20" },
  { id: "u3", name: "Karim Mostafa", email: "k.mostafa@valeo.com", role: "Mentor", field: "Engineering", status: "active", joined: "2025-10-02" },
  { id: "u4", name: "Salma Farouk", email: "s.farouk@dmu.edu.eg", role: "Mentor", field: "Computer Science", status: "active", joined: "2025-08-30" },
  { id: "u5", name: "Youssef Nabil", email: "youssef.nabil@cs.dmu.edu.eg", role: "Student", field: "Computer Science", status: "suspended", joined: "2025-11-05" },
  { id: "u6", name: "Rana Adel", email: "rana.adel@com.dmu.edu.eg", role: "Student", field: "Business", status: "active", joined: "2026-01-12" },
  { id: "u7", name: "Hany Saleh", email: "h.saleh@fawry.com", role: "Mentor", field: "Business", status: "active", joined: "2026-02-03" },
  { id: "u8", name: "Placement Office", email: "placements@dmu.edu.eg", role: "Admin", field: "—", status: "active", joined: "2025-07-01" },
  { id: "u9", name: "Nada Tarek", email: "nada.tarek@eng.dmu.edu.eg", role: "Student", field: "Engineering", status: "active", joined: "2026-02-18" },
  { id: "u10", name: "Omar Fathy", email: "o.fathy@instabug.com", role: "Mentor", field: "Computer Science", status: "active", joined: "2026-03-09" },
];

export interface PendingListing {
  id: string;
  title: string;
  company: string;
  field: string;
  submittedBy: string;
  submitted: string;
  stipend: string;
}

export const PENDING_LISTINGS: PendingListing[] = [
  { id: "p1", title: "Data Analyst Summer Intern", company: "Orange Egypt", field: "Data", submittedBy: "HR — Orange", submitted: "Today", stipend: "$350 / mo" },
  { id: "p2", title: "ERP Functional Trainee", company: "SAP Egypt", field: "Business", submittedBy: "University Relations", submitted: "Today", stipend: "Paid Stipend" },
  { id: "p3", title: "Penetration Testing Intern", company: "CyShield", field: "Security", submittedBy: "Talent Team", submitted: "Yesterday", stipend: "Competitive" },
  { id: "p4", title: "Product Design Intern", company: "Breadfast", field: "Design", submittedBy: "Design Lead", submitted: "2 days ago", stipend: "$300 / mo" },
];

export interface LogEntry {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  time: string;
}

export const SYSTEM_LOGS: LogEntry[] = [
  { id: "l1", level: "info", message: "Nightly match-score recalculation completed (2,486 profiles)", time: "09:00" },
  { id: "l2", level: "info", message: "Listing 'Frontend UI/UX Engineering Intern' published", time: "08:41" },
  { id: "l3", level: "warn", message: "SSO sign-in latency above 1.5s for 4 minutes", time: "07:58" },
  { id: "l4", level: "info", message: "Mentor Karim Mostafa reviewed 3 submissions", time: "07:22" },
  { id: "l5", level: "error", message: "Résumé parser failed on 2 uploads (unsupported format)", time: "06:47" },
  { id: "l6", level: "info", message: "Weekly digest emailed to 1,204 students", time: "06:00" },
];
