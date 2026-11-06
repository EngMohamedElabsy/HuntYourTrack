import valeoLogo from "@/assets/logo-valeo.jpg.asset.json";
import cloud4workLogo from "@/assets/logo-cloud4work.jpg.asset.json";
import aiLabLogo from "@/assets/logo-damanhour-ai-lab.jpg.asset.json";
import fawryLogo from "@/assets/logo-fawry.jpg.asset.json";
import rayaLogo from "@/assets/logo-raya.jpg.asset.json";
import instabugLogo from "@/assets/logo-instabug.jpg.asset.json";

export type City = "alexandria" | "cairo" | "giza" | "remote";
export type WorkMode = "Hybrid" | "Remote" | "On-site";
export type OpportunityType = "internship" | "fellowship" | "junior";
export type Track = "cs-ai" | "engineering" | "bi";
export type CompModel = "paid" | "free" | "credits";
export type Standing = "foundation" | "senior" | "graduate";
export type DurationBand = "short" | "standard" | "coop";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  city: City;
  mode: WorkMode;
  match: number;
  compensation: string;
  /** Monthly stipend in USD used for sorting; 0 when not a fixed amount. */
  stipendUsd: number;
  compModel: CompModel;
  weeks: number;
  skills: string[];
  /** Extra search keywords not shown as tags. */
  keywords: string[];
  closes: string; // ISO date
  published: string; // ISO date
  type: OpportunityType;
  tracks: Track[];
  standing: Standing[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  openings: number;
  applicants: number;
  startDate: string; // ISO date
  mentor: string;
}

type DetailKeys =
  | "responsibilities"
  | "requirements"
  | "benefits"
  | "openings"
  | "applicants"
  | "startDate"
  | "mentor";

const BASE: Omit<Opportunity, DetailKeys>[] = [
  {
    id: "valeo-embedded",
    title: "Embedded Software Engineering Intern",
    company: "Valeo Egypt",
    logo: valeoLogo.url,
    location: "Alexandria (Hybrid)",
    city: "alexandria",
    mode: "Hybrid",
    match: 96,
    compensation: "$400 / mo",
    stipendUsd: 400,
    compModel: "paid",
    weeks: 12,
    skills: ["C++", "RTOS", "CAN-bus", "AUTOSAR"],
    keywords: ["automotive", "embedded"],
    closes: "2026-07-15",
    published: "2026-05-20",
    type: "internship",
    tracks: ["cs-ai", "engineering"],
    standing: ["senior"],
    summary:
      "Work alongside Valeo's automotive software teams on real-time embedded modules, from requirements to bench testing on ECUs.",
  },
  {
    id: "cloud4work-devops",
    title: "Junior Cloud & DevOps Trainee",
    company: "Cloud4Work",
    logo: cloud4workLogo.url,
    location: "Cairo (Remote)",
    city: "cairo",
    mode: "Remote",
    match: 92,
    compensation: "Paid Stipend",
    stipendUsd: 0,
    compModel: "paid",
    weeks: 16,
    skills: ["Docker", "Kubernetes", "CI/CD", "Linux"],
    keywords: ["AWS", "cloud"],
    closes: "2026-07-28",
    published: "2026-06-02",
    type: "fellowship",
    tracks: ["cs-ai"],
    standing: ["senior", "graduate"],
    summary:
      "A structured training fellowship covering containerisation, cluster operations and delivery pipelines for production cloud workloads.",
  },
  {
    id: "ai-lab-ml-research",
    title: "Machine Learning Research Intern",
    company: "Damanhour AI Lab × Zewail",
    logo: aiLabLogo.url,
    location: "Giza (On-site)",
    city: "giza",
    mode: "On-site",
    match: 98,
    compensation: "Faculty Fund",
    stipendUsd: 0,
    compModel: "credits",
    weeks: 10,
    skills: ["PyTorch", "NLP", "Computer Vision"],
    keywords: ["Python", "research", "AI"],
    closes: "2026-08-02",
    published: "2026-06-10",
    type: "internship",
    tracks: ["cs-ai"],
    standing: ["senior", "graduate"],
    summary:
      "Join a joint faculty research group on applied NLP and vision projects, with mentorship toward a co-authored publication.",
  },
  {
    id: "fawry-backend",
    title: "FinTech Backend Engineering Fellowship",
    company: "Fawry Digital Banking",
    logo: fawryLogo.url,
    location: "Giza (Hybrid)",
    city: "giza",
    mode: "Hybrid",
    match: 89,
    compensation: "Competitive",
    stipendUsd: 0,
    compModel: "paid",
    weeks: 14,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
    keywords: ["payments", "fintech"],
    closes: "2026-07-20",
    published: "2026-05-28",
    type: "fellowship",
    tracks: ["cs-ai", "bi"],
    standing: ["senior", "graduate"],
    summary:
      "Build and operate high-throughput payment services alongside Fawry's backend engineers, with a focus on reliability and data integrity.",
  },
  {
    id: "raya-soc",
    title: "Cybersecurity SOC Analyst Intern",
    company: "Raya Information Tech",
    logo: rayaLogo.url,
    location: "Cairo (On-site)",
    city: "cairo",
    mode: "On-site",
    match: 84,
    compensation: "Paid Stipend",
    stipendUsd: 0,
    compModel: "paid",
    weeks: 8,
    skills: ["Wireshark", "SIEM", "Linux", "Network Sec"],
    keywords: ["security", "SOC"],
    closes: "2026-07-18",
    published: "2026-05-15",
    type: "internship",
    tracks: ["cs-ai", "engineering"],
    standing: ["foundation", "senior"],
    summary:
      "Monitor, triage and document live security events in a 24/7 security operations centre under senior analyst supervision.",
  },
  {
    id: "instabug-frontend",
    title: "Frontend UI/UX Engineering Intern",
    company: "Instabug",
    logo: instabugLogo.url,
    location: "Fully Remote",
    city: "remote",
    mode: "Remote",
    match: 91,
    compensation: "$500 / mo",
    stipendUsd: 500,
    compModel: "paid",
    weeks: 12,
    skills: ["React", "TypeScript", "Tailwind", "Jest"],
    keywords: ["frontend", "UI", "UX"],
    closes: "2026-07-25",
    published: "2026-06-05",
    type: "internship",
    tracks: ["cs-ai", "bi"],
    standing: ["foundation", "senior"],
    summary:
      "Ship interface improvements to Instabug's dashboard used by mobile teams worldwide, pairing with designers and frontend engineers.",
  },
];


const DETAILS: Record<string, Pick<Opportunity, DetailKeys>> = {
  "valeo-embedded": {
    responsibilities: [
      "Implement and unit-test embedded C++ modules for body-control ECUs",
      "Integrate drivers over CAN-bus and validate on hardware-in-the-loop benches",
      "Document software components following AUTOSAR conventions",
    ],
    requirements: [
      "3rd/4th year Computer or Electrical Engineering student",
      "Solid C/C++ and data structures fundamentals",
      "Familiarity with microcontrollers or RTOS concepts",
    ],
    benefits: ["$400 monthly stipend", "Hybrid schedule", "Return offer track for top interns"],
    openings: 4,
    applicants: 128,
    startDate: "2026-07-26",
    mentor: "Eng. Karim Mostafa",
  },
  "cloud4work-devops": {
    responsibilities: [
      "Containerise internal services and maintain Kubernetes manifests",
      "Build and harden CI/CD pipelines for staging and production",
      "Monitor cluster health and respond to alerts with the SRE team",
    ],
    requirements: [
      "Comfortable on the Linux command line",
      "Basic Docker knowledge; Kubernetes exposure is a plus",
      "Scripting in Bash or Python",
    ],
    benefits: ["Paid training stipend", "Fully remote", "Cloud certification voucher"],
    openings: 6,
    applicants: 94,
    startDate: "2026-08-09",
    mentor: "Eng. Nour El-Din",
  },
  "ai-lab-ml-research": {
    responsibilities: [
      "Reproduce and extend recent NLP / vision papers in PyTorch",
      "Curate Arabic-language datasets and run evaluation benchmarks",
      "Present weekly findings to the faculty research group",
    ],
    requirements: [
      "Strong Python and linear algebra foundations",
      "Completed a machine learning or AI course",
      "Curiosity for research and clear technical writing",
    ],
    benefits: ["Faculty research fund", "Academic course credits", "Co-authorship opportunity"],
    openings: 3,
    applicants: 76,
    startDate: "2026-08-16",
    mentor: "Dr. Salma Farouk",
  },
  "fawry-backend": {
    responsibilities: [
      "Develop Spring Boot microservices for payment flows",
      "Design PostgreSQL schemas and Kafka event contracts",
      "Write integration tests and take part in code reviews",
    ],
    requirements: [
      "Good Java and OOP fundamentals",
      "Understanding of SQL and relational databases",
      "Interest in distributed systems",
    ],
    benefits: ["Competitive stipend", "Hybrid schedule", "Mentorship from senior engineers"],
    openings: 5,
    applicants: 141,
    startDate: "2026-08-02",
    mentor: "Eng. Hany Saleh",
  },
  "raya-soc": {
    responsibilities: [
      "Triage SIEM alerts and escalate verified incidents",
      "Analyse network captures with Wireshark",
      "Write incident reports and update detection playbooks",
    ],
    requirements: [
      "Networking fundamentals (TCP/IP, DNS, HTTP)",
      "Basic Linux administration",
      "Interest in security operations; CTF experience is a plus",
    ],
    benefits: ["Paid stipend", "On-site SOC exposure", "Security certification prep"],
    openings: 4,
    applicants: 63,
    startDate: "2026-07-28",
    mentor: "Eng. Yasmine Adel",
  },
  "instabug-frontend": {
    responsibilities: [
      "Ship UI improvements in React and TypeScript",
      "Turn Figma designs into accessible, tested components",
      "Pair with designers on usability research findings",
    ],
    requirements: [
      "Solid HTML, CSS and modern JavaScript",
      "Experience with React from coursework or side projects",
      "An eye for detail and interaction quality",
    ],
    benefits: ["$500 monthly stipend", "Fully remote", "Equipment allowance"],
    openings: 2,
    applicants: 212,
    startDate: "2026-08-04",
    mentor: "Eng. Omar Fathy",
  },
};

export const OPPORTUNITIES: Opportunity[] = BASE.map((o) => {
  const d = DETAILS[o.id];
  if (!d) throw new Error(`Missing details for ${o.id}`);
  return { ...o, ...d };
});

export const TRACK_LABEL: Record<Track, string> = {
  "cs-ai": "Computers & AI",
  engineering: "Engineering",
  bi: "Business Informatics",
};

export const TYPE_LABEL: Record<OpportunityType, string> = {
  internship: "Summer Internship",
  fellowship: "Training Fellowship",
  junior: "Full-time Junior",
};

export type SortKey = "original" | "match" | "deadline" | "newest" | "stipend";

export interface Filters {
  query: string;
  city: City | "";
  sort: SortKey;
  track: Track | "all";
  types: OpportunityType[];
  mode: "all" | "Hybrid" | "Remote";
  durations: DurationBand[];
  compModels: CompModel[];
  standings: Standing[];
  keywords: string[];
}

export const DEFAULT_FILTERS: Filters = {
  query: "",
  city: "",
  sort: "original",
  track: "all",
  types: [],
  mode: "all",
  durations: [],
  compModels: [],
  standings: [],
  keywords: [],
};

export function durationBands(weeks: number): DurationBand[] {
  const bands: DurationBand[] = [];
  if (weeks >= 4 && weeks <= 8) bands.push("short");
  if (weeks >= 8 && weeks <= 12) bands.push("standard");
  if (weeks > 12) bands.push("coop");
  return bands;
}

function haystack(o: Opportunity) {
  return [o.title, o.company, ...o.skills, ...o.keywords].join(" ").toLowerCase();
}

export function filterOpportunities(list: Opportunity[], f: Filters): Opportunity[] {
  const q = f.query.trim().toLowerCase();
  const result = list.filter((o) => {
    if (q && !haystack(o).includes(q)) return false;
    if (f.city && o.city !== f.city) return false;
    if (f.track !== "all" && !o.tracks.includes(f.track)) return false;
    if (f.types.length && !f.types.includes(o.type)) return false;
    if (f.mode !== "all" && o.mode !== f.mode) return false;
    if (f.durations.length && !durationBands(o.weeks).some((b) => f.durations.includes(b)))
      return false;
    if (f.compModels.length && !f.compModels.includes(o.compModel)) return false;
    if (f.standings.length && !o.standing.some((s) => f.standings.includes(s))) return false;
    if (f.keywords.length) {
      const h = haystack(o);
      if (!f.keywords.every((k) => h.includes(k.toLowerCase()))) return false;
    }
    return true;
  });
  return sortOpportunities(result, f.sort);
}

export function sortOpportunities(list: Opportunity[], sort: SortKey): Opportunity[] {
  const copy = [...list];
  switch (sort) {
    case "match":
      return copy.sort((a, b) => b.match - a.match);
    case "deadline":
      return copy.sort((a, b) => a.closes.localeCompare(b.closes));
    case "newest":
      return copy.sort((a, b) => b.published.localeCompare(a.published));
    case "stipend":
      return copy.sort((a, b) => b.stipendUsd - a.stipendUsd);
    default:
      return copy;
  }
}

export function formatDate(iso: string) {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${String(d).padStart(2, "0")}, ${y}`;
}

export function countByType(list: Opportunity[], type: OpportunityType) {
  return list.filter((o) => o.type === type).length;
}
