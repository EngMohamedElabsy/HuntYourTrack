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
        titleAr: "تدريب صيفي في الحوسبة السحابية وهندسة ديف أوبس 2026",
        orgName: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgNameEn: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgNameAr: "فودافون للحلول الذكية (_VOIS مصر)",
        orgLogoText: "VO",
        type: "Internship",
        facultyTrack: "computing",
        targetFaculty: "Computers & Information / Engineering",
        targetFacultyEn: "Computers & Information / Engineering",
        targetFacultyAr: "حاسبات ومعلومات / هندسة",
        desc: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        descEn: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        descAr: "برنامج هندسي تطبيقي يركز على خدمات AWS/Azure، معمارية Kubernetes للخدمات المصغرة، خطوط أتمتة CI/CD، ومراقبة موثوقية الأنظمة المؤسسية.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-05",
        endDate: "2026-11-28",
        applyUrl: "https://careers.vodafone.com/engineering-egypt",
        stipend: "EGP 8,500/mo",
        stipendEn: "EGP 8,500/mo (Paid)",
        stipendAr: "8,500 ج.م شهرياً (مدفوع)",
        term: "8 – 12 weeks",
        termEn: "8 – 12 weeks",
        termAr: "8 – 12 أسبوعاً",
        location: "Smart Village, Giza",
        locationEn: "Smart Village, Giza (Hybrid)",
        locationAr: "القرية الذكية، الجيزة (هجين)",
        applicantsCount: 42,
        matchScore: 96,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        requirementsEn: [
            "Solid foundations in Linux administration and Bash scripting",
            "Familiarity with containerization fundamentals (Docker)",
            "Understanding of microservices and RESTful API architecture"
        ],
        requirementsAr: [
            "إتقان أساسيات إدارة بيئات لينكس والبرمجة النصية عبر Bash",
            "معرفة جيدة بمفاهيم الحاويات والخدمات المصغرة (Docker)",
            "فهم بروتوكولات الشبكات وهندسة واجهات البرمجة REST APIs"
        ],
        benefitsEn: [
            "Direct 1-on-1 mentorship with Senior Cloud Architects",
            "Monthly paid stipend (EGP 8,500) & transport allowances",
            "Official Faculty Internship Endorsement and credit hours"
        ],
        benefitsAr: [
            "إشراف مباشر ومتابعة فردية من كبار معماريي السحابة",
            "مكافأة مالية شهرية مدفوعة (8,500 ج.م) مع بدل مواصلات",
            "اعتماد رسمي لساعات التدريب الصيفي من عمادة الكلية"
        ],
        verified: true,
        postedBy: "Vodafone Talent Acquisition"
    },
    {
        id: "opp-itida-2026",
        title: "Full-Stack Web & AI Graduation Track",
        titleEn: "Full-Stack Web & AI Graduation Track",
        titleAr: "مسار تخرج معتمد في تطوير الويب والذكاء الاصطناعي",
        orgName: "ITIDA & Information Technology Institute (ITI)",
        orgNameEn: "ITIDA & Information Technology Institute (ITI)",
        orgNameAr: "هيئة تنمية صناعة تكنولوجيا المعلومات (ITIDA) ومعهد ITI",
        orgLogoText: "ITI",
        type: "Training Course",
        facultyTrack: "computing",
        targetFaculty: "Computers & Information / Engineering / Commerce",
        targetFacultyEn: "Computers & Information / Engineering / Commerce",
        targetFacultyAr: "حاسبات ومعلومات / هندسة / تجارة",
        desc: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        descEn: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        descAr: "مسار تدريبي مكثف لمدة 3 أشهر يغطي تقنيات Next.js و Node.js ونماذج الذكاء الاصطناعي التوليدي والنشر السحابي في معامل القرية الذكية.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-01",
        endDate: "2026-11-19",
        applyUrl: "https://iti.gov.eg/tracks/fullstack-ai",
        stipend: "100% Free Scholarship",
        stipendEn: "Fully Sponsored (100% Free)",
        stipendAr: "منحة ممولة بالكامل (مجاناً 100%)",
        term: "3 months",
        termEn: "3 months intensive",
        termAr: "3 أشهر مكثفة",
        location: "ITI Smart Village / Alexandria Hub",
        locationEn: "ITI Smart Village / Alexandria Hub",
        locationAr: "مقر معهد ITI بالقرية الذكية وفرع الإسكندرية",
        applicantsCount: 68,
        matchScore: 92,
        skills: ["React", "Node.js", "Python", "Generative AI", "PostgreSQL"],
        requirementsEn: [
            "Good command of modern JavaScript / TypeScript fundamentals",
            "University student (Years 3 or 4) or recent university graduate",
            "Commitment to full-time on-site laboratory attendance"
        ],
        requirementsAr: [
            "إجادة أساسيات لغة جافاسكريبت الحديثة ونماذج البرمجة الشيئية",
            "أن يكون المتقدم طالباً بالفرقة الثالثة/الرابعة أو خريجاً حديثاً",
            "الالتزام بالحضور التفرغي الكامل في معامل المعهد المعتمدة"
        ],
        benefitsEn: [
            "Government-accredited professional certification",
            "Graduation project showcase attended by 50+ hiring tech companies",
            "Free access to high-performance GPU clusters for AI model training"
        ],
        benefitsAr: [
            "شهادة دبلوم مهني معتمدة رسمياً من وزارة الاتصالات",
            "يوم توظيف سنوي مع كبرى شركات البرمجيات ومراكز التعهيد",
            "وصول مجاني لمعامل الحوسبة الفائقة ومعالجات الذكاء الاصطناعي"
        ],
        verified: true,
        postedBy: "ITI Academic Council"
    },
    {
        id: "opp-valeo-2026",
        title: "Embedded Systems & Automotive Software Internship",
        titleEn: "Embedded Systems & Automotive Software Internship",
        titleAr: "تدريب صيفي في الأنظمة المدمجة وبرمجيات السيارات",
        orgName: "Silicon Egypt & Valeo Systems",
        orgNameEn: "Silicon Egypt & Valeo Systems",
        orgNameAr: "سيليكون مصر وأنظمة فاليو العالمية (Valeo Systems)",
        orgLogoText: "VA",
        type: "Internship",
        facultyTrack: "engineering",
        targetFaculty: "Engineering / Computer Science",
        targetFacultyEn: "Engineering / Computer Science",
        targetFacultyAr: "هندسة / علوم الحاسب",
        desc: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        descEn: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        descAr: "تدريب تطبيقي متخصص في هندسة برمجيات السيارات باستخدام C/C++ ومعمارية AUTOSAR وأنظمة التشغيل الفورية RTOS واختبار شبكات CAN-bus.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-10",
        endDate: "2026-12-05",
        applyUrl: "https://valeo.com/careers/egypt-embedded",
        stipend: "EGP 7,500/mo",
        stipendEn: "EGP 7,500/mo (Paid)",
        stipendAr: "7,500 ج.م شهرياً (مدفوع)",
        term: "8 weeks",
        termEn: "8 weeks",
        termAr: "8 أسابيع",
        location: "Smart Village, Cairo",
        locationEn: "Smart Village, Cairo",
        locationAr: "القرية الذكية، القاهرة",
        applicantsCount: 29,
        matchScore: 94,
        skills: ["Embedded C", "C++", "AUTOSAR", "RTOS", "CAN-bus"],
        requirementsEn: [
            "Strong grasp of C and basic hardware interfacing",
            "Familiarity with microcontroller peripherals (UART, SPI, I2C, Timers)",
            "Enrolled in Electrical, Computer Engineering, or Computer Science"
        ],
        requirementsAr: [
            "إتقان لغة البرمجة C والتعامل مع السجلات ومعالجات Microcontrollers",
            "معرفة ببروتوكولات الاتصال التسلسلي (UART, SPI, I2C, CAN)",
            "القيد بكليات الهندسة (حاسبات/كهرباء) أو كليات الحاسبات والذكاء الاصطناعي"
        ],
        benefitsEn: [
            "Hands-on work on electronic control units (ECU) for tier-1 cars",
            "Fast-track full-time employment offer upon graduation",
            "Direct sponsorship for your academic graduation project"
        ],
        benefitsAr: [
            "العمل المباشر على وحدات التحكم الإلكترونية للسيارات العالمية",
            "فرصة تعيين مباشر بعقود عمل هندسية رسمية فور التخرج",
            "رعاية وتمويل كامل لمشروع التخرج الأكاديمي المتميز"
        ],
        verified: true,
        postedBy: "Valeo Egypt Tech Hub"
    },
    {
        id: "opp-fawry-2026",
        title: "FinTech Software Engineering & Financial Systems",
        titleEn: "FinTech Software Engineering & Financial Systems",
        titleAr: "تدريب هندسة النظم المالية والمدفوعات الإلكترونية (FinTech)",
        orgName: "Fawry Banking & Electronic Payments",
        orgNameEn: "Fawry Banking & Electronic Payments",
        orgNameAr: "فوري للخدمات المصرفية والمدفوعات الإلكترونية",
        orgLogoText: "FW",
        type: "Internship",
        facultyTrack: "business",
        targetFaculty: "Business & Commerce / Computers & Information",
        targetFacultyEn: "Business & Commerce / Computers & Information",
        targetFacultyAr: "تجارة وإدارة أعمال / حاسبات ومعلومات",
        desc: "Build next-generation digital payment rails, micro-lending platforms, and secure transaction ledgers handling 5M+ daily transactions.",
        descEn: "Build next-generation digital payment rails, micro-lending platforms, and secure transaction ledgers handling 5M+ daily transactions.",
        descAr: "تطوير بوابات المدفوعات الرقمية وأنظمة التمويل متناهي الصغر وسجلات المعاملات المالية الآمنة التي تعالج ملايين العمليات يومياً.",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-04",
        endDate: "2026-11-25",
        applyUrl: "https://fawry.com/careers/internships",
        stipend: "EGP 6,000/mo",
        stipendEn: "EGP 6,000/mo (Paid)",
        stipendAr: "6,000 ج.م شهرياً (مدفوع)",
        term: "10 weeks",
        termEn: "10 weeks",
        termAr: "10 أسابيع",
        location: "New Cairo, Egypt",
        locationEn: "New Cairo, Egypt (Hybrid)",
        locationAr: "القاهرة الجديدة (نظام هجين)",
        applicantsCount: 35,
        matchScore: 89,
        skills: ["Financial Modeling", "SQL", "Payment Gateways", "Java", "Excel"],
        requirementsEn: [
            "Understanding of financial accounting and banking concepts",
            "Working knowledge of SQL databases and transaction integrity",
            "Strong numerical aptitude and analytical problem-solving skills"
        ],
        requirementsAr: [
            "إلمام بأساسيات النظم المالية والمحاسبية والمصرفية الرقمية",
            "إجادة التعامل مع قواعد البيانات واستعلامات SQL المعقدة",
            "مهارات تحليلية ورياضية عالية للتحقق من تكامل العمليات المالية"
        ],
        benefitsEn: [
            "Real-world exposure to financial compliance (PCI-DSS)",
            "Paid monthly stipend and flexible working hours",
            "Opportunity to secure an Associate Financial Analyst role"
        ],
        benefitsAr: [
            "خبرة عملية بمعايير الأمان المالي الدولي PCI-DSS والبنك المركزي",
            "مكافأة شهرية منتظمة مع مرونة في ساعات العمل الطلابية",
            "أولوية التعيين في وظائف محللي النظم والبيانات المالية بعد التخرج"
        ],
        verified: true,
        postedBy: "Fawry Engineering Campus"
    },
    {
        id: "opp-bio-2026",
        title: "Healthcare Bioinformatics & Genomic Analysis Track",
        titleEn: "Healthcare Bioinformatics & Genomic Analysis Track",
        titleAr: "مسار بحوث المعلوماتية الحيوية وتحليل الجينوم الطبي",
        orgName: "Damanhour Faculty of Science & AI Research Labs",
        orgNameEn: "Damanhour Faculty of Science & AI Research Labs",
        orgNameAr: "معامل أبحاث الذكاء الاصطناعي والعلوم - جامعة دمنهور",
        orgLogoText: "DM",
        type: "Training Course",
        facultyTrack: "science",
        targetFaculty: "Science / Computers & Information",
        targetFacultyEn: "Science / Computers & Information",
        targetFacultyAr: "كلية العلوم / حاسبات وذكاء اصطناعي",
        desc: "Advanced computational biology program applying deep learning algorithms to DNA sequencing, molecular modeling, and disease biomarker discovery.",
        descEn: "Advanced computational biology program applying deep learning algorithms to DNA sequencing, molecular modeling, and disease biomarker discovery.",
        descAr: "برنامج بيولوجيا حوسبية متقدم يطبق خوارزميات التعلم العميق على التسلسل الجيني ونمذجة الجزيئات الحيوية واكتشاف المؤشرات المرضية.",
        imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-06",
        endDate: "2026-12-01",
        applyUrl: "https://damanhour.edu.eg/science-bio-fellowship",
        stipend: "Academic Grant",
        stipendEn: "Academic Grant & Lab Endorsement",
        stipendAr: "منحة بحثية واعتماد أكاديمي للمشروع",
        term: "8 weeks",
        termEn: "8 weeks",
        termAr: "8 أسابيع",
        location: "Damanhour University Science Complex",
        locationEn: "Damanhour University Science Complex",
        locationAr: "مجمع كليات العلوم والذكاء الاصطناعي - دمنهور",
        applicantsCount: 19,
        matchScore: 91,
        skills: ["Biotech/PCR", "Bioinformatics", "Python", "Data Analysis", "Genomics"],
        requirementsEn: [
            "Foundational understanding of molecular biology or genetics",
            "Basic experience with Python data manipulation (NumPy/Pandas)",
            "Enrolled in Faculty of Science or Computers & AI"
        ],
        requirementsAr: [
            "خلفية جيدة في علم الأحياء الجزيئي أو الوراثة والتسلسل الجيني",
            "معرفة أولية بتحليل البيانات باستخدام بايثون (Pandas/NumPy)",
            "القيد بكليات العلوم (أقسام البيوتكنولوجي/الكيمياء) أو الحاسبات"
        ],
        benefitsEn: [
            "Co-authorship on peer-reviewed scientific publications",
            "Access to specialized PCR and bioinformatics computational clusters",
            "Dean Recommendation for postgraduate scholarships"
        ],
        benefitsAr: [
            "المشاركة بالاسم في نشر أوراق بحثية بمجلات علمية دولية",
            "إتاحة استخدام أجهزة PCR المتقدمة ومعامل الحوسبة العلمية",
            "خطاب توصية رسمي من عميد الكلية للمنح والبعثات الدراسية الدولية"
        ],
        verified: true,
        postedBy: "Scientific Research Council"
    },
    {
        id: "opp-law-2026",
        title: "Intellectual Property & Digital Rights Legal Fellowship",
        titleEn: "Intellectual Property & Digital Rights Legal Fellowship",
        titleAr: "زمالة الملكية الفكرية والتحكيم التجاري للشركات الرقمية",
        orgName: "Cairo Commercial Law & Arbitration Consortium",
        orgNameEn: "Cairo Commercial Law & Arbitration Consortium",
        orgNameAr: "مجمع القاهرة للتحكيم الدولي وحقوق الملكية الفكرية",
        orgLogoText: "LAW",
        type: "Training Course",
        facultyTrack: "law",
        targetFaculty: "Law & Legal Studies",
        targetFacultyEn: "Law & Legal Studies",
        targetFacultyAr: "كلية الحقوق والدراسات القانونية",
        desc: "Comprehensive practical fellowship on technology licensing, cyber law compliance, international trade arbitration, and SaaS trademark protection.",
        descEn: "Comprehensive practical fellowship on technology licensing, cyber law compliance, international trade arbitration, and SaaS trademark protection.",
        descAr: "برنامج تدريبي تطبيقي يغطي تراخيص البرمجيات وقوانين حماية البيانات الرقمية والتحكيم في منازعات التجارة الإلكترونية والملكية الفكرية.",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-03",
        endDate: "2026-11-27",
        applyUrl: "https://cairo-arbitration.org/fellowship",
        stipend: "Accredited Fellowship",
        stipendEn: "Certified Fellowship & Arbitration Hours",
        stipendAr: "شهادة زمالة معتمدة وساعات تحكيم مقيدة",
        term: "6 weeks",
        termEn: "6 weeks",
        termAr: "6 أسابيع",
        location: "Zamalek, Cairo (Hybrid)",
        locationEn: "Zamalek, Cairo (Hybrid)",
        locationAr: "الزمالك، القاهرة (جلسات هجينة وميدانية)",
        applicantsCount: 16,
        matchScore: 88,
        skills: ["Intellectual Property", "Commercial Arbitration", "Contract Law", "Legal Tech"],
        requirementsEn: [
            "Student at Faculty of Law (Years 3 or 4) or Law Graduate",
            "Demonstrated interest in Intellectual Property & Tech Regulation",
            "Proficiency in Arabic legal drafting and contract review"
        ],
        requirementsAr: [
            "أن يكون المتقدم طالباً بالفرقة الثالثة/الرابعة أو حاصلاً على ليسانس الحقوق",
            "اهتمام موثق بمجالات الجرائم المعلوماتية وحماية البيانات الشخصية",
            "إجادة الصياغة القانونية باللغة العربية ومراجعة العقود التجارية"
        ],
        benefitsEn: [
            "Hands-on moot arbitration trials under leading commercial judges",
            "Accredited Commercial Arbitration Certificate",
            "Exclusive network connection to major corporate legal departments"
        ],
        benefitsAr: [
            "جلسات محاكاة عملية لقضايا تحكيم حقيقية بإشراف مستشارين قانونيين",
            "شهادة زمالة معتمدة في التحكيم وقوانين التكنولوجيا الحديثة",
            "شبكة تواصل مباشرة مع الإدارات القانونية بكبرى الشركات التجارية"
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
    }

    calculateCountdown(endDateStr) {
        const end = new Date(endDateStr + "T23:59:59").getTime();
        const now = Date.now();
        const diff = end - now;
        const isArabic = document.documentElement.lang === "ar";

        if (diff <= 0) {
            return {
                status: "closed",
                text: isArabic ? "انتهى موعد التقديم" : "Application Closed",
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
                text: isArabic ? `🔴 باقي ${hours} ساعة فقط!` : `🔴 ${hours}h left!`,
                badgeClass: "badge-danger",
                days,
                hours
            };
        } else if (days <= 7) {
            return {
                status: "closing-soon",
                text: isArabic ? `🟡 باقي ${days} أيام (${hours} س)` : `🟡 ${days}d ${hours}h left`,
                badgeClass: "badge-warning",
                days,
                hours
            };
        } else {
            return {
                status: "open",
                text: isArabic ? `🟢 متبقي ${days} يوماً` : `🟢 ${days} days left`,
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
        const isArabic = document.documentElement.lang === "ar";

        const facultyOptions = [
            { id: "all", labelEn: "All Tracks (6)", labelAr: "كافة المسارات (6)" },
            { id: "computing", labelEn: "💻 Computing & AI", labelAr: "💻 حاسبات وذكاء اصطناعي" },
            { id: "engineering", labelEn: "⚙️ Engineering", labelAr: "⚙️ هندسة وتصنيع" },
            { id: "business", labelEn: "💳 Business & FinTech", labelAr: "💳 تجارة ونظم مالية" },
            { id: "science", labelEn: "🧬 Science & Bio", labelAr: "🧬 علوم ومعلوماتية حيوية" },
            { id: "law", labelEn: "⚖️ Law & IP Rights", labelAr: "⚖️ حقوق وملكية فكرية" }
        ];

        return `
            <div class="opp-filter-bar">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-muted-foreground); margin-inline-end: 0.4rem;">
                    ${isArabic ? "🎯 تصفية حسب الكلية:" : "🎯 Filter by Discipline:"}
                </span>
                ${facultyOptions.map(opt => `
                    <button type="button" class="opp-filter-chip ${this.facultyFilter === opt.id ? "active" : ""}"
                            onclick="window.hytOpportunities.setFilter('${opt.id}', undefined)">
                        ${isArabic ? opt.labelAr : opt.labelEn}
                    </button>
                `).join("")}
            </div>
        `;
    }

    renderCatalog(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isArabic = document.documentElement.lang === "ar";

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
                    <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🔍</div>
                    <h3 style="margin: 0 0 0.5rem; font-size: 1.2rem;">${isArabic ? "لا توجد فرص مطابقة لهذا التصنيف حالياً" : "No opportunities matched this filter"}</h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.9rem; margin-bottom: 1.2rem;">
                        ${isArabic ? "يمكنك استعراض كافة المسارات للحصول على الفرص المتاحة." : "Try selecting another track or view all available opportunities."}
                    </p>
                    <button type="button" class="btn btn-secondary" onclick="window.hytOpportunities.setFilter('all', 'all')">
                        ${isArabic ? "إعادة ضبط التصفية" : "Reset Filters"}
                    </button>
                </div>
            `;
        } else {
            gridHtml = filtered.map(opp => {
                const countdown = this.calculateCountdown(opp.endDate);
                const title = isArabic ? (opp.titleAr || opp.title) : (opp.titleEn || opp.title);
                const orgName = isArabic ? (opp.orgNameAr || opp.orgName) : (opp.orgNameEn || opp.orgName);
                const desc = isArabic ? (opp.descAr || opp.desc) : (opp.descEn || opp.desc);
                const targetFaculty = isArabic ? (opp.targetFacultyAr || opp.targetFaculty) : (opp.targetFacultyEn || opp.targetFaculty);
                const stipend = isArabic ? (opp.stipendAr || opp.stipend) : (opp.stipendEn || opp.stipend);
                const term = isArabic ? (opp.termAr || opp.term || "8-12 weeks") : (opp.termEn || opp.term || "8-12 weeks");
                const location = isArabic ? (opp.locationAr || opp.location || "Cairo") : (opp.locationEn || opp.location || "Cairo");
                const matchRingHtml = this.renderMatchRing(opp.matchScore || 90);
                const skillsList = opp.skills || ["Core Competencies"];

                return `
                    <article class="opp-card-modern" data-faculty="${opp.facultyTrack || "general"}" data-id="${opp.id}">
                        <div>
                            <div class="opp-header-row">
                                <div class="opp-brand-info">
                                    <div class="opp-brand-logo">
                                        ${opp.orgLogoText || "🏢"}
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
                                    <span class="fact-label">${isArabic ? "💰 المكافأة:" : "💰 Stipend:"}</span>
                                    <span style="font-weight: 600;">${stipend}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label">${isArabic ? "⏱️ المدة:" : "⏱️ Term:"}</span>
                                    <span style="font-weight: 600;">${term}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label">${isArabic ? "📍 المقر:" : "📍 Location:"}</span>
                                    <span style="font-weight: 600;">${location}</span>
                                </div>
                                <div class="opp-fact-pill">
                                    <span class="fact-label">${isArabic ? "👥 المتقدمون:" : "👥 Applied:"}</span>
                                    <span style="font-weight: 600;">${opp.applicantsCount || 24} ${isArabic ? "طالب" : "students"}</span>
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
                                    🎓 ${targetFaculty}
                                </span>
                                <span class="tag-pill ${countdown.badgeClass}" style="font-size: 0.75rem;">
                                    ⏱️ ${countdown.text}
                                </span>
                            </div>

                            <div class="opp-footer-actions">
                                <button type="button" class="btn btn-primary" onclick="window.openOpportunityApply('${opp.id}')" style="font-size: 0.88rem; font-weight: 700;">
                                    ${isArabic ? "تقديم الآن ←" : "Apply Now →"}
                                </button>
                                <button type="button" class="btn btn-secondary" onclick="window.openOpportunityDetails('${opp.id}')" style="font-size: 0.88rem;" title="${isArabic ? "عرض التفاصيل الكاملة" : "View Full Details"}">
                                    ℹ️ ${isArabic ? "التفاصيل" : "Details"}
                                </button>
                                <button type="button" class="btn btn-secondary" onclick="window.toggleBookmarkOpportunity('${opp.id}', this)" style="padding: 0.45rem 0.75rem;" title="${isArabic ? "حفظ الفرصة" : "Bookmark"}">
                                    🔖
                                </button>
                            </div>
                        </div>
                    </article>
                `;
            }).join("");
        }

        container.innerHTML = gridHtml;
    }
}

window.hytOpportunities = new OpportunitiesManager();

// Refresh catalog when language changes
window.addEventListener("hyt:langChanged", () => {
    if (window.hytOpportunities) {
        window.hytOpportunities.renderCatalog("opportunities-catalog-container");
    }
});
