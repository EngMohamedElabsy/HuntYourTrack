/**
 * HuntYourTrack - Opportunities Data Store & Dynamic Deadline Engine (US28 & US29)
 * Modernized with Lovable & Stage Design System (Pure JavaScript ES6+ Architecture).
 * Multi-faculty coverage (Computing, Engineering, Science, Business, Law), ATS Match Rings,
 * Interactive Filter Chips, and Rich Details/Apply Modal Integration.
 */

const DEFAULT_OPPORTUNITIES = [
    {
        id: "opp-vois-2026",
        title: "Cloud & DevOps Summer Internship 2026",
        titleEn: "Cloud & DevOps Summer Internship 2026",
        orgName: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgNameEn: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgLogoText: "VO",
        type: "Internship",
        facultyTrack: "computing",
        targetFaculty: "Computers & Information / Engineering",
        targetFacultyEn: "Computers & Information / Engineering",
        desc: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        descEn: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-05",
        endDate: "2026-11-28",
        applyUrl: "https://careers.vodafone.com/engineering-egypt",
        stipend: "EGP 8,500/mo",
        stipendEn: "EGP 8,500/mo (Paid)",
        term: "8 – 12 weeks",
        termEn: "8 – 12 weeks",
        location: "Smart Village, Giza",
        locationEn: "Smart Village, Giza (Hybrid)",
        applicantsCount: 42,
        matchScore: 96,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        requirementsEn: [
            "Solid foundations in Linux administration and Bash scripting",
            "Familiarity with containerization fundamentals (Docker)",
            "Understanding of microservices and RESTful API architecture"
        ],
        benefitsEn: [
            "Direct 1-on-1 mentorship with Senior Cloud Architects",
            "Monthly paid stipend (EGP 8,500) & transport allowances",
            "Official Faculty Internship Endorsement and credit hours"
        ],
        verified: true,
        postedBy: "Vodafone Talent Acquisition"
    },
    {
        id: "opp-itida-2026",
        title: "Full-Stack Web & AI Graduation Track",
        titleEn: "Full-Stack Web & AI Graduation Track",
        orgName: "ITIDA & Information Technology Institute (ITI)",
        orgNameEn: "ITIDA & Information Technology Institute (ITI)",
        orgLogoText: "ITI",
        type: "Training Course",
        facultyTrack: "computing",
        targetFaculty: "Computers & Information / Engineering / Commerce",
        targetFacultyEn: "Computers & Information / Engineering / Commerce",
        desc: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        descEn: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-01",
        endDate: "2026-11-19",
        applyUrl: "https://iti.gov.eg/tracks/fullstack-ai",
        stipend: "100% Free Scholarship",
        stipendEn: "Fully Sponsored (100% Free)",
        term: "3 months",
        termEn: "3 months intensive",
        location: "ITI Smart Village / Alexandria Hub",
        locationEn: "ITI Smart Village / Alexandria Hub",
        applicantsCount: 68,
        matchScore: 92,
        skills: ["React", "Node.js", "Python", "Generative AI", "PostgreSQL"],
        requirementsEn: [
            "Good command of modern JavaScript / TypeScript fundamentals",
            "University student (Years 3 or 4) or recent university graduate",
            "Commitment to full-time on-site laboratory attendance"
        ],
        benefitsEn: [
            "Government-accredited professional certification",
            "Graduation project showcase attended by 50+ hiring tech companies",
            "Free access to high-performance GPU clusters for AI model training"
        ],
        verified: true,
        postedBy: "ITI Academic Council"
    },
    {
        id: "opp-valeo-2026",
        title: "Embedded Systems & Automotive Software Internship",
        titleEn: "Embedded Systems & Automotive Software Internship",
        orgName: "Silicon Egypt & Valeo Systems",
        orgNameEn: "Silicon Egypt & Valeo Systems",
        orgLogoText: "VA",
        type: "Internship",
        facultyTrack: "engineering",
        targetFaculty: "Engineering / Computer Science",
        targetFacultyEn: "Engineering / Computer Science",
        desc: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        descEn: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-10",
        endDate: "2026-12-05",
        applyUrl: "https://valeo.com/careers/egypt-embedded",
        stipend: "EGP 7,500/mo",
        stipendEn: "EGP 7,500/mo (Paid)",
        term: "8 weeks",
        termEn: "8 weeks",
        location: "Smart Village, Cairo",
        locationEn: "Smart Village, Cairo",
        applicantsCount: 29,
        matchScore: 94,
        skills: ["Embedded C", "C++", "AUTOSAR", "RTOS", "CAN-bus"],
        requirementsEn: [
            "Strong grasp of C and basic hardware interfacing",
            "Familiarity with microcontroller peripherals (UART, SPI, I2C, Timers)",
            "Enrolled in Electrical, Computer Engineering, or Computer Science"
        ],
        benefitsEn: [
            "Hands-on work on electronic control units (ECU) for tier-1 cars",
            "Fast-track full-time employment offer upon graduation",
            "Direct sponsorship for your academic graduation project"
        ],
        verified: true,
        postedBy: "Valeo Egypt Tech Hub"
    },
    {
        id: "opp-fawry-2026",
        title: "FinTech Software Engineering & Financial Systems",
        titleEn: "FinTech Software Engineering & Financial Systems",
        orgName: "Fawry Banking & Electronic Payments",
        orgNameEn: "Fawry Banking & Electronic Payments",
        orgLogoText: "FW",
        type: "Internship",
        facultyTrack: "business",
        targetFaculty: "Business & Commerce / Computers & Information",
        targetFacultyEn: "Business & Commerce / Computers & Information",
        desc: "Build next-generation digital payment rails, micro-lending platforms, and secure transaction ledgers handling 5M+ daily transactions.",
        descEn: "Build next-generation digital payment rails, micro-lending platforms, and secure transaction ledgers handling 5M+ daily transactions.",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-04",
        endDate: "2026-11-25",
        applyUrl: "https://fawry.com/careers/internships",
        stipend: "EGP 6,000/mo",
        stipendEn: "EGP 6,000/mo (Paid)",
        term: "10 weeks",
        termEn: "10 weeks",
        location: "New Cairo, Egypt",
        locationEn: "New Cairo, Egypt (Hybrid)",
        applicantsCount: 35,
        matchScore: 89,
        skills: ["Financial Modeling", "SQL", "Payment Gateways", "Java", "Excel"],
        requirementsEn: [
            "Understanding of financial accounting and banking concepts",
            "Working knowledge of SQL databases and transaction integrity",
            "Strong numerical aptitude and analytical problem-solving skills"
        ],
        benefitsEn: [
            "Real-world exposure to financial compliance (PCI-DSS)",
            "Paid monthly stipend and flexible working hours",
            "Opportunity to secure an Associate Financial Analyst role"
        ],
        verified: true,
        postedBy: "Fawry Engineering Campus"
    },
    {
        id: "opp-bio-2026",
        title: "Healthcare Bioinformatics & Genomic Analysis Track",
        titleEn: "Healthcare Bioinformatics & Genomic Analysis Track",
        orgName: "Damanhour Faculty of Science & AI Research Labs",
        orgNameEn: "Damanhour Faculty of Science & AI Research Labs",
        orgLogoText: "DM",
        type: "Training Course",
        facultyTrack: "science",
        targetFaculty: "Science / Computers & Information",
        targetFacultyEn: "Science / Computers & Information",
        desc: "Advanced computational biology program applying deep learning algorithms to DNA sequencing, molecular modeling, and disease biomarker discovery.",
        descEn: "Advanced computational biology program applying deep learning algorithms to DNA sequencing, molecular modeling, and disease biomarker discovery.",
        imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-06",
        endDate: "2026-12-01",
        applyUrl: "https://damanhour.edu.eg/science-bio-fellowship",
        stipend: "Academic Grant",
        stipendEn: "Academic Grant & Lab Endorsement",
        term: "8 weeks",
        termEn: "8 weeks",
        location: "Damanhour University Science Complex",
        locationEn: "Damanhour University Science Complex",
        applicantsCount: 19,
        matchScore: 91,
        skills: ["Biotech/PCR", "Bioinformatics", "Python", "Data Analysis", "Genomics"],
        requirementsEn: [
            "Foundational understanding of molecular biology or genetics",
            "Basic experience with Python data manipulation (NumPy/Pandas)",
            "Enrolled in Faculty of Science or Computers & AI"
        ],
        benefitsEn: [
            "Co-authorship on peer-reviewed scientific publications",
            "Access to specialized PCR and bioinformatics computational clusters",
            "Dean Recommendation for postgraduate scholarships"
        ],
        verified: true,
        postedBy: "Scientific Research Council"
    },
    {
        id: "opp-law-2026",
        title: "Intellectual Property & Digital Rights Legal Fellowship",
        titleEn: "Intellectual Property & Digital Rights Legal Fellowship",
        orgName: "Cairo Commercial Law & Arbitration Consortium",
        orgNameEn: "Cairo Commercial Law & Arbitration Consortium",
        orgLogoText: "LAW",
        type: "Training Course",
        facultyTrack: "law",
        targetFaculty: "Law & Legal Studies",
        targetFacultyEn: "Law & Legal Studies",
        desc: "Comprehensive practical fellowship on technology licensing, cyber law compliance, international trade arbitration, and SaaS trademark protection.",
        descEn: "Comprehensive practical fellowship on technology licensing, cyber law compliance, international trade arbitration, and SaaS trademark protection.",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-03",
        endDate: "2026-11-27",
        applyUrl: "https://cairo-arbitration.org/fellowship",
        stipend: "Accredited Fellowship",
        stipendEn: "Certified Fellowship & Arbitration Hours",
        term: "6 weeks",
        termEn: "6 weeks",
        location: "Zamalek, Cairo (Hybrid)",
        locationEn: "Zamalek, Cairo (Hybrid)",
        applicantsCount: 16,
        matchScore: 88,
        skills: ["Intellectual Property", "Commercial Arbitration", "Contract Law", "Legal Tech"],
        requirementsEn: [
            "Student at Faculty of Law (Years 3 or 4) or Law Graduate",
            "Demonstrated interest in Intellectual Property & Tech Regulation",
            "Proficiency in Arabic legal drafting and contract review"
        ],
        benefitsEn: [
            "Hands-on moot arbitration trials under leading commercial judges",
            "Accredited Commercial Arbitration Certificate",
            "Exclusive network connection to major corporate legal departments"
        ],
        verified: true,
        postedBy: "Commercial Arbitration Board"
    }
];

class OpportunitiesManager {
    constructor() {
        this.storageKey = "hyt_opportunities_v5";
        this.opportunities = [];
        this.facultyFilter = "all";
        this.typeFilter = "all";
        this.init();
    }

    init() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.opportunities = JSON.parse(stored);
            } catch (e) {
                this.opportunities = DEFAULT_OPPORTUNITIES;
                this.save();
            }
        } else {
            this.opportunities = DEFAULT_OPPORTUNITIES;
            this.save();
        }

        this.renderCatalog("opportunities-catalog-container");
        this.syncFromBackend();
    }

    async syncFromBackend() {
        if (!window.HYT_API || typeof window.HYT_API.getOpportunities !== "function") return;
        try {
            const res = await window.HYT_API.getOpportunities();
            if (res && res.ok && Array.isArray(res.data) && res.data.length > 0) {
                const byId = new Map(this.opportunities.map(o => [o.id, o]));
                let changed = false;
                for (const item of res.data) {
                    if (!byId.has(item.id)) {
                        byId.set(item.id, item);
                        changed = true;
                    }
                }
                if (changed) {
                    this.opportunities = Array.from(byId.values());
                    this.save();
                    this.renderCatalog("opportunities-catalog-container");
                }
            }
        } catch (e) {
            // Offline / static GitHub Pages mode uses localStorage cache gracefully
        }
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.opportunities));
    }

    getAll() {
        return this.opportunities;
    }

    getById(id) {
        return this.opportunities.find(o => o.id === id) || null;
    }

    setFilter(faculty, type) {
        if (faculty !== undefined) this.facultyFilter = faculty;
        if (type !== undefined) this.typeFilter = type;
        this.renderCatalog("opportunities-catalog-container");
        this.syncFromBackend();
    }

    async syncFromBackend() {
        if (!window.HYT_API || typeof window.HYT_API.getOpportunities !== "function") return;
        try {
            const res = await window.HYT_API.getOpportunities();
            if (res && res.ok && Array.isArray(res.data) && res.data.length > 0) {
                const byId = new Map(this.opportunities.map(o => [o.id, o]));
                let changed = false;
                for (const item of res.data) {
                    if (!byId.has(item.id)) {
                        byId.set(item.id, item);
                        changed = true;
                    }
                }
                if (changed) {
                    this.opportunities = Array.from(byId.values());
                    this.save();
                    this.renderCatalog("opportunities-catalog-container");
                }
            }
        } catch (e) {
            // Offline / static GitHub Pages mode uses localStorage cache gracefully
        }
    }

    calculateCountdown(endDateStr) {
        const end = new Date(endDateStr + "T23:59:59").getTime();
        const now = Date.now();
        const diff = end - now;
        

        if (diff <= 0) {
            return {
                status: "closed",
                text: "Application Closed",
                badgeClass: "badge-danger",
                days: 0,
                hours: 0
            };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days === 0) {
            return {
                status: "urgent",
                text: `${hours}h left!`,
                badgeClass: "badge-danger",
                days,
                hours
            };
        } else if (days <= 7) {
            return {
                status: "closing-soon",
                text: `${days}d ${hours}h left`,
                badgeClass: "badge-warning",
                days,
                hours
            };
        } else {
            return {
                status: "open",
                text: `${days} days left`,
                badgeClass: "badge-success",
                days,
                hours
            };
        }
    }

    renderMatchRing(score) {
        const radius = 20;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (score / 100) * circumference;

        return `
            <div class="match-ring-box" title="${score}% ATS Compatibility Match">
                <svg viewBox="0 0 48 48">
                    <circle class="match-ring-bg" cx="24" cy="24" r="${radius}" fill="none" stroke-width="3.5" />
                    <circle class="match-ring-meter" cx="24" cy="24" r="${radius}" fill="none" stroke-width="3.5"
                            stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" />
                </svg>
                <span class="match-ring-text">${score}%</span>
            </div>
        `;
    }

    renderFilterChips() {
        

                const facultyOptions = [
            { id: "all", label: "All Tracks (6)" },
            { id: "computing", label: "Computing & AI" },
            { id: "engineering", label: "Engineering" },
            { id: "business", label: "Business & FinTech" },
            { id: "science", label: "Science & Bio" },
            { id: "law", label: "Law & IP Rights" }
        ];

        return `
            <div class="opp-filter-bar">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-muted-foreground); margin-inline-end: 0.4rem;">
                    Filter by Discipline:
                </span>
                ${facultyOptions.map(opt => `
                    <button type="button" class="opp-filter-chip ${this.facultyFilter === opt.id ? "active" : ""}"
                            onclick="window.hytOpportunities.setFilter('${opt.id}', undefined)">
                        ${opt.label}
                    </button>
                `).join("")}
            </div>
        `;
    }

    renderCatalog(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        

        // Filter items
        let filtered = this.opportunities;
        if (this.facultyFilter !== "all") {
            filtered = filtered.filter(o => o.facultyTrack === this.facultyFilter);
        }
        if (this.typeFilter !== "all") {
            filtered = filtered.filter(o => o.type.toLowerCase().includes(this.typeFilter.toLowerCase()));
        }

        // Render filter chips above grid
        const parentSection = container.parentElement;
        const filterHtml = this.renderFilterChips();
        const existingBar = parentSection ? parentSection.querySelector(".opp-filter-bar") : null;
        if (existingBar) {
            existingBar.outerHTML = filterHtml;
        } else {
            container.insertAdjacentHTML("beforebegin", filterHtml);
        }

        let gridHtml = "";
        if (filtered.length === 0) {
            gridHtml = `
                <div class="panel" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
                    <div style="margin-bottom: 0.8rem;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="opacity: 0.5;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
                    <h3 style="margin: 0 0 0.5rem; font-size: 1.2rem;">No opportunities matched this filter</h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.9rem; margin-bottom: 1.2rem;">
                        Try selecting another track or view all available opportunities.
                    </p>
                    <button type="button" class="btn btn-secondary" onclick="window.hytOpportunities.setFilter('all', 'all')">
                        Reset Filters
                    </button>
                </div>
            `;
        } else {
            gridHtml = filtered.map(opp => {
                const countdown = this.calculateCountdown(opp.endDate);
                const title = opp.titleEn || opp.title;
                const orgName = opp.orgNameEn || opp.orgName;
                const desc = opp.descEn || opp.desc;
                const targetFaculty = opp.targetFacultyEn || opp.targetFaculty;
                const stipend = opp.stipendEn || opp.stipend;
                const term = opp.termEn || opp.term || "8-12 weeks";
                const location = opp.locationEn || opp.location || "Cairo";
                const matchRingHtml = this.renderMatchRing(opp.matchScore || 90);
                const skillsList = opp.skills || ["Core Competencies"];

                const thumbnailHtml = opp.imageUrl ? `
                    <div class="opp-card-thumbnail" style="width: 100%; height: 130px; border-radius: 12px; overflow: hidden; margin-bottom: 0.9rem; background: var(--color-muted); border: 1px solid var(--color-border);">
                        <img src="${opp.imageUrl}" alt="${title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.style.display='none';" />
                    </div>` : '';

                return `
                    <article class="opp-card opp-card-modern tilt-target" data-faculty="${opp.facultyTrack || "general"}" data-id="${opp.id}">
                        <div>
                            ${thumbnailHtml}
                            <div class="opp-header-row">
                                <div class="opp-brand-info">
                                    <div class="opp-brand-logo">
                                        ${opp.orgLogoText || (opp.organization ? opp.organization.charAt(0) : "H")}
                                    </div>
                                    <div>
                                        <div class="opp-company-name">
                                            ${orgName}
                                            ${opp.verified ? '<span style="color: var(--color-accent); font-weight: 700;" title="Accredited Partner">✓</span>' : ""}
                                        </div>
                                        <h3 class="opp-role-title">${title}</h3>
                                    </div>
                                </div>
                                ${matchRingHtml}
                            </div>

                            <p style="font-size: 0.88rem; color: var(--color-muted-foreground); margin: 0.75rem 0 0.5rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                ${desc}
                            </p>

                            <!-- Facts Grid -->
                            <div class="opp-facts-grid">
                                <div class="opp-fact-pill">
                                    <span class="fact-label">Stipend:</span>
                                    <span style="font-weight: 600;">${stipend}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label" style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        Term:
                                    </span>
                                    <span style="font-weight: 600;">${term}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label">Location:</span>
                                    <span style="font-weight: 600;">${location}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label">Applied:</span>
                                    <span style="font-weight: 600;">${opp.applicantsCount || 24} students</span>
                                </div>
                            </div>

                            <!-- Skills tags -->
                            <div class="opp-skills-list">
                                ${skillsList.map(s => `<span class="opp-skill-chip">${s}</span>`).join("")}
                            </div>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
                                <span class="tag-pill" style="font-size: 0.75rem; background: var(--color-muted); color: var(--color-foreground);">
                                    ${targetFaculty}
                                </span>
                                <span class="tag-pill opp-countdown-badge ${countdown.badgeClass}" style="font-size: 0.75rem; display: inline-flex; align-items: center; gap: 0.3rem;">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    ${countdown.text}
                                </span>
                            </div>

                            <div class="opp-footer-actions" style="display: flex; align-items: center; gap: 0.5rem;">
                                <a href="${opp.applyUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; font-size: 0.88rem; font-weight: 700; padding: 0.45rem 1rem; text-align: center; text-decoration: none;">
                                    Apply Now →
                                </a>
                                <button type="button" class="btn btn-secondary icon-action-btn" onclick="window.openOpportunityDetails('${opp.id}')" title="View Full Details" aria-label="View Full Details" style="padding: 0.45rem 0.65rem; display: inline-flex; align-items: center; justify-content: center;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-secondary bookmark-btn icon-action-btn" onclick="window.toggleBookmarkOpportunity('${opp.id}', this)" title="Save Opportunity" aria-label="Save Opportunity" style="padding: 0.45rem 0.65rem; display: inline-flex; align-items: center; justify-content: center;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bookmark-icon">
                                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </article>
                `;
            }).join("");
        }

        container.innerHTML = gridHtml;
        if (typeof window !== 'undefined' && window.init3DTiltCards) {
            window.init3DTiltCards();
        }
    }
}

window.hytOpportunities = new OpportunitiesManager();

// Refresh catalog when language changes
window.addEventListener("hyt:langChanged", () => {
    if (window.hytOpportunities) {
        window.hytOpportunities.renderCatalog("opportunities-catalog-container");
    }
});
