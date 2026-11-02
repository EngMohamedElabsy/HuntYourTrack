/**
 * HuntYourTrack - DreamWorks Cloud Fisherman & Anti-Gravity Canvas Engine
 * Inspired by classic fantasy silhouette (crescent moon fisherman in clouds).
 * Features:
 * - Anti-gravity cosmic/nebula particle atmosphere responding to mouse coordinates.
 * - Glowing crescent moon with sitting fisherman silhouette and bending neon rod.
 * - Multi-Hook laser line branching to latch onto multiple discipline nodes simultaneously.
 * - Interactive mouse physics & camera parallax.
 * - Rotating intelligent typewriter engine for idle explanations.
 */

class TrackHunterCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        // State & Physics
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false, active: false };
        this.time = 0;
        this.animationId = null;
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        this.theme = initialTheme;
        this.isDark = !['light', 'daylight'].includes(initialTheme);

        // Multi-Hook targets & current active faculty
        this.activeFaculty = 'all';
        this.searchQuery = '';
        this.hookedNodes = [];

        // Particles & Clouds for Anti-Gravity atmosphere
        this.stardust = [];
        this.clouds = [];

        // Discipline Nodes across 5 faculties with rich curriculum roadmaps
        this.nodes = [
            // Computing
            {
                id: 'cs-ai',
                label: 'AI & Deep Learning',
                labelAr: 'الذكاء الاصطناعي وتعلم الآلة',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '12 أسبوعاً',
                weeksEn: '12 Weeks',
                skills: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Vector DBs'],
                milestonesAr: [
                    'الرياضيات التطبيقية والتعلم الآلي الكلاسيكي',
                    'الشبكات العصبية العميقة ورؤية الحاسب',
                    'معالجة اللغات الطبيعية ونماذج التوليد LLMs',
                    'نشر النماذج سحابياً في بيئة الإنتاج المباشرة'
                ],
                milestonesEn: [
                    'Applied Mathematics & Classical ML Foundations',
                    'Deep Neural Networks & Computer Vision',
                    'NLP Architectures & Generative LLM Engineering',
                    'Production AI Microservice & Cloud Deployment'
                ],
                xRel: 0.22, yRel: 0.65, color: '#00F2FE', radius: 8, glow: 15
            },
            {
                id: 'cs-cloud',
                label: 'Full-Stack Cloud & DevOps',
                labelAr: 'الحوسبة السحابية والأنظمة الموزعة',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '14 أسبوعاً',
                weeksEn: '14 Weeks',
                skills: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'AWS'],
                milestonesAr: [
                    'معمارية الويب والخدمات المصغرة Microservices',
                    'الحاويات Docker وهندسة Kubernetes',
                    'خطوط التكامل المستمر CI/CD والبنية ككود Terraform',
                    'المراقبة ورصد الأداء وقابلية التوسع الأفقي'
                ],
                milestonesEn: [
                    'Web Architecture & Microservices Protocols',
                    'Containerization with Docker & Kubernetes',
                    'CI/CD Automation Pipelines & Terraform IaC',
                    'Observability, Performance & Horizontal Scaling'
                ],
                xRel: 0.38, yRel: 0.78, color: '#38BDF8', radius: 9, glow: 18
            },
            {
                id: 'cs-sec',
                label: 'Cybersecurity SOC',
                labelAr: 'الأمن السيبراني وعمليات الدفاع',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                skills: ['Network Security', 'Wireshark', 'SIEM', 'Linux Hardening'],
                milestonesAr: [
                    'أساسيات الشبكات والتحليل الجنائي الرقمي',
                    'إدارة مراكز العمليات الأمنية SOC و SIEM',
                    'اختبار الاختراق الأخلاقي وتقييم الثغرات',
                    'الاستجابة للحوادث الأمنية والتعافي الرقمي'
                ],
                milestonesEn: [
                    'Network Security & Digital Forensics Fundamentals',
                    'SOC Operations & SIEM Telemetry Analysis',
                    'Ethical Penetration Testing & Vulnerability Assessment',
                    'Incident Response & Business Continuity Planning'
                ],
                xRel: 0.52, yRel: 0.62, color: '#818CF8', radius: 8, glow: 14
            },
            // Engineering
            {
                id: 'eng-mecha',
                label: 'Mechatronics & Robotics',
                labelAr: 'الميكاترونكس وهندسة الروبوتات',
                faculty: 'engineering',
                facultyAr: 'الهندسة والتكنولوجيا',
                weeks: '14 أسبوعاً',
                weeksEn: '14 Weeks',
                skills: ['ROS2', 'C++', 'Control Systems', 'SolidWorks', 'MATLAB'],
                milestonesAr: [
                    'الديناميكا والحركية الميكانيكية وتصميم CAD',
                    'الدوائر الإلكترونية والمتحكمات الدقيقة',
                    'برمجة الروبوتات بنظام ROS2 و C++',
                    'تكامل الأنظمة ذاتية القيادة والأتمتة الصناعية'
                ],
                milestonesEn: [
                    'Kinematics, Dynamics & CAD Modeling',
                    'Embedded Electronics & Microcontroller Interfacing',
                    'Robot Operating System (ROS2) & Real-time C++',
                    'Autonomous Navigation & Industrial Automation'
                ],
                xRel: 0.68, yRel: 0.70, color: '#34D399', radius: 9, glow: 18
            },
            {
                id: 'eng-auto',
                label: 'Embedded Automotive',
                labelAr: 'الأنظمة المدمجة وبرمجيات السيارات',
                faculty: 'engineering',
                facultyAr: 'الهندسة والتكنولوجيا',
                weeks: '12 أسبوعاً',
                weeksEn: '12 Weeks',
                skills: ['Embedded C', 'AUTOSAR', 'CAN-bus', 'RTOS', 'ARM Cortex'],
                milestonesAr: [
                    'برمجة المتحكمات بلغة Embedded C المتقدمة',
                    'أنظمة التشغيل في الوقت الحقيقي FreeRTOS',
                    'معمارية برمجيات السيارات القياسية AUTOSAR',
                    'بروتوكولات الاتصال CAN-bus و LIN والتشخيص'
                ],
                milestonesEn: [
                    'Embedded C & Hardware Register Programming',
                    'Real-Time Operating Systems (RTOS) Scheduling',
                    'AUTOSAR Architecture & ECU Layering',
                    'In-Vehicle Networks: CAN, LIN & Diagnostics'
                ],
                xRel: 0.82, yRel: 0.60, color: '#10B981', radius: 8, glow: 16
            },
            // Science
            {
                id: 'sci-bio',
                label: 'Bioinformatics & Genomics',
                labelAr: 'المعلوماتية الحيوية والجينوم الحاسوبي',
                faculty: 'science',
                facultyAr: 'العلوم الأساسية',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                skills: ['Python', 'Biopython', 'Nextflow', 'BLAST', 'R/Bioconductor'],
                milestonesAr: [
                    'البيولوجيا الجزيئية ومصادر البيانات الحيوية',
                    'خوارزميات محاذاة التسلسلات وتسلسل الجيل التالي NGS',
                    'بناء خطوط الأنابيب التحليلية باستخدام Nextflow',
                    'الطب الدقيق والنمذجة الهيكلية للبروتينات'
                ],
                milestonesEn: [
                    'Molecular Biology & NCBI Database Interfacing',
                    'Sequence Alignment & Next-Gen Sequencing (NGS)',
                    'Automated Analysis Pipelines with Nextflow',
                    'Precision Medicine & Protein Structure Prediction'
                ],
                xRel: 0.16, yRel: 0.82, color: '#A78BFA', radius: 8, glow: 15
            },
            {
                id: 'sci-chem',
                label: 'Computational Chemistry',
                labelAr: 'الكيمياء الحاسوبية والنمذجة الدوائية',
                faculty: 'science',
                facultyAr: 'العلوم الأساسية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                skills: ['Molecular Dynamics', 'GROMACS', 'PyMOL', 'QSAR'],
                milestonesAr: [
                    'مبادئ ميكانيكا الكم والنمذجة الجزيئية',
                    'محاكاة الديناميكا الجزيئية ببرنامج GROMACS',
                    'الالتحام الجزيئي وتصميم الأدوية بمساعدة الحاسوب',
                    'تحليل علاقات النشاط بالتركيب الكيميائي QSAR'
                ],
                milestonesEn: [
                    'Quantum Chemistry & Force Field Principles',
                    'Molecular Dynamics Simulation with GROMACS',
                    'Structure-Based Virtual Screening & Molecular Docking',
                    'Quantitative Structure-Activity Relationships (QSAR)'
                ],
                xRel: 0.30, yRel: 0.90, color: '#C084FC', radius: 7, glow: 12
            },
            // Business
            {
                id: 'bus-fintech',
                label: 'FinTech Algorithmic Trading',
                labelAr: 'التكنولوجيا المالية والتداول الخوارزمي',
                faculty: 'business',
                facultyAr: 'التجارة وإدارة الأعمال',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                skills: ['Financial Modeling', 'Python Pandas', 'SQL', 'Risk Management'],
                milestonesAr: [
                    'الأسواق المالية والمشتقات وإدارة المخاطر',
                    'تحليل السلاسل الزمنية المالية بلغة بايثون',
                    'بناء واختبار استراتيجيات التداول الخوارزمي',
                    'أنظمة المدفوعات الرقمية وبوابات التكنولوجيا المالية'
                ],
                milestonesEn: [
                    'Financial Markets, Derivatives & Risk Metrics',
                    'Time Series Quantitative Analysis in Python',
                    'Algorithmic Strategy Backtesting & Optimization',
                    'Digital Payment Rails, Open Banking & FinTech Compliance'
                ],
                xRel: 0.62, yRel: 0.88, color: '#FBBF24', radius: 8, glow: 16
            },
            {
                id: 'bus-analytics',
                label: 'Business Intelligence & BI',
                labelAr: 'ذكاء الأعمال وتحليل البيانات المؤسسية',
                faculty: 'business',
                facultyAr: 'التجارة وإدارة الأعمال',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                skills: ['Power BI', 'SQL Server', 'Tableau', 'DAX', 'Excel Advanced'],
                milestonesAr: [
                    'مستودعات البيانات ونمذجة الأبعاد Star Schema',
                    'تطوير مؤشرات الأداء ولوحات التحكم في Power BI',
                    'صياغة معادلات DAX المتقدمة للتحليل التجاري',
                    'رواية القصص بالبيانات ودعم القرارات الاستراتيجية'
                ],
                milestonesEn: [
                    'Enterprise Data Warehousing & Dimensional Modeling',
                    'Power BI Executive Dashboard Engineering',
                    'Advanced DAX & Business Calculation Engines',
                    'Data Storytelling & Executive Decision Support'
                ],
                xRel: 0.76, yRel: 0.84, color: '#F59E0B', radius: 8, glow: 14
            },
            // Law
            {
                id: 'law-cyber',
                label: 'Cyber Law & Digital Evidence',
                labelAr: 'القانون السيبراني والأدلة الرقمية',
                faculty: 'law',
                facultyAr: 'الحقوق والتشريعات الرقمية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                skills: ['Cybercrime Law', 'GDPR', 'Digital Evidence', 'Compliance'],
                milestonesAr: [
                    'أطر وتشريعات مكافحة الجرائم الإلكترونية',
                    'حجية الأدلة الرقمية وسلسلة الحيازة القانونية',
                    'قوانين حماية البيانات والخصوصية GDPR واللوائح الوطنية',
                    'الامتثال المؤسسي والحوكمة الرقمية'
                ],
                milestonesEn: [
                    'Cybercrime Legal Frameworks & Jurisdictions',
                    'Digital Forensics Chain of Custody & Admissibility',
                    'GDPR & National Data Protection Compliance',
                    'Corporate Digital Governance & Risk Auditing'
                ],
                xRel: 0.44, yRel: 0.92, color: '#F472B6', radius: 8, glow: 14
            },
            {
                id: 'law-ip',
                label: 'Tech & AI IP Protection',
                labelAr: 'الملكية الفكرية في التكنولوجيا والذكاء الاصطناعي',
                faculty: 'law',
                facultyAr: 'الحقوق والتشريعات الرقمية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                skills: ['IP Law', 'Patents', 'Software Licensing', 'AI Ethics'],
                milestonesAr: [
                    'براءات الاختراع للبرمجيات والخوارزميات',
                    'تراخيص البرمجيات مفتوحة المصدر والملكية التجارية',
                    'التشريعات الدولية للمصنفات المولدة بالذكاء الاصطناعي',
                    'صياغة عقود التكنولوجيا واتفاقيات عدم الإفصاح NDA'
                ],
                milestonesEn: [
                    'Software & Algorithmic Patentability Principles',
                    'Open-Source Licensing, Copyleft & Commercial IP',
                    'AI-Generated Output Copyright & Ethical Regulations',
                    'Technology Licensing, NDAs & Commercial Contract Drafting'
                ],
                xRel: 0.88, yRel: 0.74, color: '#FB7185', radius: 7, glow: 12
            }
        ];

        this.init();
        this.initTypewriter();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse Parallax
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            if (e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100) {
                this.mouse.targetX = e.clientX - rect.left;
                this.mouse.targetY = e.clientY - rect.top;
                this.mouse.isHovering = true;
                this.mouse.active = true;
            } else {
                this.mouse.isHovering = false;
            }
        });

        // Theme sync
        window.addEventListener('hyt:themeChanged', (e) => {
            this.theme = e.detail && e.detail.theme ? e.detail.theme : (document.documentElement.getAttribute('data-theme') || 'dark');
            this.isDark = !['light', 'daylight'].includes(this.theme);
        });

        // Language sync
        window.addEventListener('hyt:langChanged', () => {
            if (this.hookedNodes.length > 0) {
                this.renderHookedPanel(this.hookedNodes[this.hookedNodes.length - 1]);
            }
            this.updateLiveStatus();
        });

        // Click to hook/unhook node
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            this.selectNearestNodes(clickX, clickY);
        });

        this.initAtmosphere();
        this.updateHookedNodes();
        if (this.hookedNodes.length > 0) {
            this.renderHookedPanel(this.hookedNodes[0]);
        }
        this.updateLiveStatus();
        this.animate();

        // Register global bridge
        window.hytHunter = this;
    }

    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        this.width = parent ? parent.clientWidth : window.innerWidth;
        this.height = parent ? Math.max(460, parent.clientHeight) : 520;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        this.updateNodeCoordinates();
        this.initAtmosphere();
    }

    initAtmosphere() {
        // Floating anti-gravity stardust and celestial starlets
        this.stardust = Array.from({ length: 65 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2.2 + 0.8,
            speedY: (Math.random() * 0.25 + 0.08) * -1, // gentle upward float (anti-gravity)
            speedX: (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.7 + 0.3,
            pulse: Math.random() * Math.PI * 2,
            z: Math.random() * 0.8 + 0.2,
            isStar: Math.random() > 0.65
        }));

        // Dreamy volumetric clouds surrounding moon
        this.clouds = [
            { xRel: 0.32, yRel: 0.28, r: 70, opacity: 0.14, speed: 0.08, phase: 0 },
            { xRel: 0.44, yRel: 0.32, r: 95, opacity: 0.18, speed: -0.06, phase: 1.2 },
            { xRel: 0.56, yRel: 0.26, r: 80, opacity: 0.15, speed: 0.07, phase: 2.4 },
            { xRel: 0.68, yRel: 0.34, r: 105, opacity: 0.12, speed: -0.05, phase: 3.6 },
            { xRel: 0.50, yRel: 0.38, r: 120, opacity: 0.20, speed: 0.04, phase: 4.8 }
        ];
    }

    updateNodeCoordinates() {
        this.nodes.forEach(n => {
            n.x = n.xRel * this.width;
            n.y = n.yRel * this.height;
            n.baseX = n.x;
            n.baseY = n.y;
            n.vx = (Math.random() - 0.5) * 0.25;
            n.vy = (Math.random() - 0.5) * 0.25;
        });
    }

    filterFaculty(facId) {
        this.activeFaculty = facId;
        this.updateHookedNodes();
    }

    getMatchingTracks(query) {
        if (!query) return this.nodes;
        const q = (query || '').toLowerCase().trim();
        return this.nodes.filter(n =>
            (n.label && n.label.toLowerCase().includes(q)) ||
            (n.labelAr && n.labelAr.toLowerCase().includes(q)) ||
            (n.faculty && n.faculty.toLowerCase().includes(q)) ||
            (n.facultyAr && n.facultyAr.toLowerCase().includes(q)) ||
            (n.skills && n.skills.some(s => s.toLowerCase().includes(q)))
        );
    }

    searchTrack(query) {
        this.searchQuery = (query || '').toLowerCase().trim();
        this.updateHookedNodes();
        if (window.updateHunterAutocomplete) {
            window.updateHunterAutocomplete(this.searchQuery, this.getMatchingTracks(this.searchQuery));
        }
    }

    updateHookedNodes() {
        if (this.searchQuery) {
            const matches = this.getMatchingTracks(this.searchQuery);
            this.hookedNodes = matches;
            if (matches.length > 0) {
                this.renderHookedPanel(matches[0]);
            } else {
                this.renderHookedPanel(null);
            }
        } else if (this.activeFaculty !== 'all') {
            this.hookedNodes = this.nodes.filter(n => n.faculty === this.activeFaculty);
            if (this.hookedNodes.length > 0) this.renderHookedPanel(this.hookedNodes[0]);
        } else {
            // Default: Hook top primary tracks across major faculties simultaneously!
            this.hookedNodes = [
                this.nodes.find(n => n.id === 'cs-ai'),
                this.nodes.find(n => n.id === 'cs-cloud'),
                this.nodes.find(n => n.id === 'eng-mecha'),
                this.nodes.find(n => n.id === 'bus-fintech')
            ].filter(Boolean);
            if (this.hookedNodes.length > 0) this.renderHookedPanel(this.hookedNodes[0]);
        }
        this.updateLiveStatus();
    }

    toggleTrackHook(id) {
        const node = this.nodes.find(n => n.id === id);
        if (!node) return;
        const idx = this.hookedNodes.findIndex(hn => hn.id === id);
        if (idx !== -1) {
            // Unhook
            this.hookedNodes.splice(idx, 1);
        } else {
            // Hook
            this.hookedNodes.push(node);
        }
        const lastHooked = this.hookedNodes[this.hookedNodes.length - 1] || null;
        this.renderHookedPanel(lastHooked);
        this.updateLiveStatus();
    }

    selectNearestNodes(x, y) {
        let closest = null;
        let minDist = 45;
        for (const n of this.nodes) {
            const d = Math.hypot(n.x - x, n.y - y);
            if (d < minDist) {
                minDist = d;
                closest = n;
            }
        }
        if (closest) {
            this.toggleTrackHook(closest.id);
        } else {
            const sorted = [...this.nodes].sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y));
            if (sorted[0]) this.toggleTrackHook(sorted[0].id);
        }
    }

    shuffleTrack() {
        const shuffled = [...this.nodes].sort(() => 0.5 - Math.random());
        this.hookedNodes = shuffled.slice(0, 2);
        this.renderHookedPanel(this.hookedNodes[0] || null);
        this.updateLiveStatus();
    }

    updateLiveStatus() {
        const statusEl = document.getElementById('hunter-tracks-counter');
        if (!statusEl) return;
        const isAr = document.documentElement.lang === 'ar';
        const count = this.hookedNodes.length;
        if (count === 0) {
            statusEl.textContent = isAr 
                ? '🎯 انقر على أي مسار في الرادار لاصطياده واستعراض خارطة طريقه' 
                : '🎯 Click any track node on the radar to hook and explore its roadmap';
        } else {
            statusEl.textContent = isAr 
                ? `🎯 تم اصطياد ${count} مسار${count > 2 ? 'ات' : ''} بنجاح · انقر على أي مسار لاصطياده أو إلغائه`
                : `🎯 ${count} track${count > 1 ? 's' : ''} hooked · Click any node to hook or release`;
        }
    }

    getCompletedTopics(trackId) {
        try {
            return JSON.parse(localStorage.getItem('hyt_roadmap_done_' + trackId) || '[]');
        } catch {
            return [];
        }
    }

    toggleTopicComplete(trackId, topicId) {
        let done = this.getCompletedTopics(trackId);
        if (done.includes(topicId)) {
            done = done.filter(id => id !== topicId);
        } else {
            done.push(topicId);
        }
        localStorage.setItem('hyt_roadmap_done_' + trackId, JSON.stringify(done));
        const node = this.nodes.find(n => n.id === trackId);
        if (node) this.renderHookedPanel(node);
    }

    getRoadmapSyllabus(node) {
        const syllabi = {
            'cs-ai': [
                {
                    phase: 1,
                    titleEn: 'Phase 1: Mathematical Foundations & Python Engineering',
                    titleAr: 'المرحلة الأولى: الأساسيات الرياضية والبرمجة بلغة بايثون',
                    descEn: 'Master computational linear algebra, probability, and vectorized data structures.',
                    descAr: 'إتقان الجبر الخطي الحسابي والاحتمالات وهياكل البيانات المصفوفية.',
                    nodes: [
                        { id: 'ai-py', titleEn: 'Python OOP & Advanced Typing', titleAr: 'بايثون المتقدمة والبرمجة الكائنية', descEn: 'Generators, decorators, dataclasses, asynchronous I/O', descAr: 'المولدات، البرمجة غير المتزامنة، وهياكل الفئات المتقدمة' },
                        { id: 'ai-math', titleEn: 'Linear Algebra & Multivariable Calculus', titleAr: 'الجبر الخطي وحساب التفاضل والتكامل', descEn: 'Matrix decompositions, eigenvalues, gradients & partial derivatives', descAr: 'المصفوفات والمتجهات، التدرج، والمشتقات الجزئية' },
                        { id: 'ai-data', titleEn: 'Vectorized Data Wrangling (NumPy & Pandas)', titleAr: 'معالجة وتحليل البيانات (NumPy & Pandas)', descEn: 'Tensor reshaping, indexing, time-series & aggregation pipelines', descAr: 'العمليات على المصفوفات، معالجة السلاسل الزمنية والبيانات الضخمة' },
                        { id: 'ai-sql', titleEn: 'Relational & Analytical SQL', titleAr: 'قواعد البيانات والـ SQL التحليلي', descEn: 'Window functions, CTEs, indexing & data warehouse modeling', descAr: 'الاستعلامات المعقدة والنمذجة التحليلية للبيانات' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Classical Machine Learning & Feature Science',
                    titleAr: 'المرحلة الثانية: تعلم الآلة الكلاسيكي وهندسة الخصائص',
                    descEn: 'Design, train, and mathematically evaluate foundational machine learning algorithms.',
                    descAr: 'بناء وتدريب وتقييم خوارزميات التعلم الآلي الكلاسيكية.',
                    nodes: [
                        { id: 'ai-sup', titleEn: 'Supervised Learning & Regularization', titleAr: 'التعلم الخاضع للإشراف (Supervised ML)', descEn: 'Linear/Logistic regression, Ridge, Lasso, ElasticNet', descAr: 'الانحدار الخطي واللوجستي وأساليب معالجة فرط التخصيص' },
                        { id: 'ai-tree', titleEn: 'Tree Ensembles & Gradient Boosting', titleAr: 'خوارزميات الأشجار والتعزيز التدرجي', descEn: 'Random Forests, XGBoost, LightGBM, CatBoost architectures', descAr: 'الغابات العشوائية ومكتبات XGBoost و LightGBM فائقة السرعة' },
                        { id: 'ai-unsup', titleEn: 'Unsupervised Learning & Dimensionality Reduction', titleAr: 'التعلم غير الخاضع للإشراف وتقليل الأبعاد', descEn: 'K-Means, DBSCAN, PCA, t-SNE & clustering metrics', descAr: 'التجميع العنقودي، وتحليل المكونات الرئيسية PCA' },
                        { id: 'ai-eval', titleEn: 'Validation Strategies & Metric Engineering', titleAr: 'استراتيجيات التحقق ومقاييس الأداء', descEn: 'Stratified K-Fold, ROC-AUC, PR-curves, calibration curves', descAr: 'التحقق المتقاطع ومنحنيات ROC والدقة والاستدعاء' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Deep Neural Architectures & PyTorch Ecosystem',
                    titleAr: 'المرحلة الثالثة: الشبكات العصبية العميقة وبيئة PyTorch',
                    descEn: 'Construct artificial neural networks, backpropagation graphs, and spatial vision models.',
                    descAr: 'تصميم الشبكات العصبية، حساب التدرج العكسي، ونماذج الرؤية الحاسوبية.',
                    nodes: [
                        { id: 'ai-nn', titleEn: 'Neural Network Foundations & Backpropagation', titleAr: 'أساسيات الشبكات العصبية والتغذية العكسية', descEn: 'Perceptrons, activation functions (GELU, Swish), AdamW optimization', descAr: 'المدركات، دوال التنشيط، وخوارزميات التحسين AdamW' },
                        { id: 'ai-torch', titleEn: 'PyTorch Tensor Graphs & Autograd Engine', titleAr: 'إطار عمل PyTorch وحساب التدرج الآلي', descEn: 'Custom nn.Modules, Datasets, Dataloaders & GPU acceleration', descAr: 'بناء الطبقات المخصصة ومحركات التسريع الرسومي CUDA' },
                        { id: 'ai-cv', titleEn: 'Convolutional Vision & Object Detection', titleAr: 'الرؤية الحاسوبية واكتشاف الكائنات', descEn: 'ResNet, EfficientNet, YOLOv10 object detection & segmentation', descAr: 'الشبكات الالتفافية CNN ونماذج YOLO لاكتشاف العناصر' },
                        { id: 'ai-seq', titleEn: 'Sequential Modeling & Attention Prelude', titleAr: 'معالجة السلاسل والتمهيد لآلية الانتباه', descEn: 'Bidirectional LSTMs, GRUs, seq2seq models & encoder-decoder networks', descAr: 'الشبكات المتكررة RNN وموديلات التشفير وفك التشفير' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: Modern Generative AI, Transformers & LLM Engineering',
                    titleAr: 'المرحلة الرابعة: الذكاء الاصطناعي التوليدي والـ LLMs والـ RAG',
                    descEn: 'Architect self-attention transformers, fine-tune open models, and deploy RAG systems.',
                    descAr: 'معماريات المحولات، ضبط وتطويع النماذج التوليدية، وبناء أنظمة الـ RAG.',
                    nodes: [
                        { id: 'ai-trans', titleEn: 'Self-Attention & Transformer Mechanics', titleAr: 'معمارية المحولات (Transformer Architecture)', descEn: 'Multi-head attention, positional encoding, RoPE, KV-caching', descAr: 'آلية الانتباه الذاتي متعدد الرؤوس والتخزين المؤقت KV' },
                        { id: 'ai-rag', titleEn: 'Retrieval-Augmented Generation (RAG)', titleAr: 'أنظمة التوليد المعزز بالاسترجاع (RAG)', descEn: 'Vector embeddings, chunking, hybrid BM25 + dense search, Chroma/Pinecone', descAr: 'تضمين النصوص، البحث الهجين، وقواعد البيانات الشعاعية' },
                        { id: 'ai-ft', titleEn: 'Efficient Parameter Fine-Tuning (PEFT/LoRA)', titleAr: 'الضبط الدقيق منخفض الرتبة (LoRA/QLoRA)', descEn: 'Quantization (4-bit/8-bit), instruct-tuning, alignment with DPO', descAr: 'تكميم النماذج وتطويعها لمهام مخصصة باستهلاك منخفض للذاكرة' },
                        { id: 'ai-agent', titleEn: 'Autonomous Agents & Tool Execution', titleAr: 'الوكلاء الذكاء الاصطناعي واستدعاء الأدوات', descEn: 'ReAct loops, function calling, structured outputs, multi-agent frameworks', descAr: 'وكلاء المهام المستقلة واستدعاء واجهات البرمجة تلقائياً' }
                    ]
                },
                {
                    phase: 5,
                    titleEn: 'Phase 5: MLOps, High-Throughput Serving & Production',
                    titleAr: 'المرحلة الخامسة: عمليات تعلم الآلة MLOps والنشر السحابي',
                    descEn: 'Deploy scalable AI inference microservices with monitoring and continuous retraining.',
                    descAr: 'نشر واجهات الاستدلال السحابية عالية السرعة ومراقبة النماذج في الإنتاج.',
                    nodes: [
                        { id: 'ai-serve', titleEn: 'High-Throughput Inference Engines', titleAr: 'محركات استدلال النماذج فائقة السرعة', descEn: 'vLLM, Ollama, TensorRT-LLM, batching & speculative decoding', descAr: 'تقنيات الـ vLLM وتسريع زمن الاستجابة للاستدلال' },
                        { id: 'ai-api', titleEn: 'FastAPI Production Inference Gateway', titleAr: 'بوابة الاستدلال بـ FastAPI وحاويات Docker', descEn: 'Asynchronous streaming endpoints, SSE, rate limiting & containerization', descAr: 'بث النتائج اللحظي، عزل الحاويات، وإدارة الأحمال' },
                        { id: 'ai-pipe', titleEn: 'CI/CD Pipeline & Experiment Tracking', titleAr: 'خطوط الأتمتة CI/CD وتتبع التجارب', descEn: 'MLflow registry, Weights & Biases, model drift & data versioning DVC', descAr: 'رصد تدهور النماذج وإدارة إصدارات البيانات والنماذج' },
                        { id: 'ai-cloud', titleEn: 'Cloud Orchestration & Auto-Scaling', titleAr: 'إدارة السحابة وتوسيع النطاق الآلي', descEn: 'Kubernetes GPU pods, AWS SageMaker / GCP Vertex AI endpoints', descAr: 'إدارة موارد معالجات الرسوم على كوبرنيتس والسحابة' }
                    ]
                }
            ],
            'cs-cloud': [
                {
                    phase: 1,
                    titleEn: 'Phase 1: Modern Full-Stack Foundations & TypeScript',
                    titleAr: 'المرحلة الأولى: أساسيات الويب المتكامل والـ TypeScript',
                    descEn: 'Type-safe frontend architecture, modern frameworks, and responsive design systems.',
                    descAr: 'بناء واجهات ويب آمنة برمجياً باستخدام أحدث أطر العمل.',
                    nodes: [
                        { id: 'fs-ts', titleEn: 'TypeScript Enterprise Patterns', titleAr: 'أنماط TypeScript للمؤسسات', descEn: 'Generics, union discriminating, utility types & strict typing', descAr: 'الأنواع المتقدمة والقوالب العامة لضمان استقرار الكود' },
                        { id: 'fs-react', titleEn: 'React Architecture & Server Components', titleAr: 'معمارية React ومكونات الخادم', descEn: 'Concurrent rendering, custom hooks, state stores, Next.js App Router', descAr: 'الرندرة المتزامنة، خطافات الحالة، وتوجيه Next.js' },
                        { id: 'fs-api', titleEn: 'API Design & Contract Protocols', titleAr: 'تصميم واجهات البرمجة REST & GraphQL', descEn: 'OpenAPI specs, tRPC, GraphQL schemas & real-time WebSockets', descAr: 'بروتوكولات الاتصال اللحظي والتوثيق القياسي' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Backend Microservices & Distributed Data',
                    titleAr: 'المرحلة الثانية: الخدمات المصغرة وقواعد البيانات الموزعة',
                    descEn: 'Design resilient microservice backends with transactional reliability and caching.',
                    descAr: 'معمارية الخدمات الموزعة، التخزين المؤقت، وقواعد البيانات العلائقية.',
                    nodes: [
                        { id: 'fs-node', titleEn: 'Scalable Node.js / Go Backend Services', titleAr: 'خدمات خلفية بلغة Node.js أو Go', descEn: 'Event loop tuning, goroutines, concurrency patterns & Clean Architecture', descAr: 'هيكلية الكود النظيف والتعامل مع التزامن العالي' },
                        { id: 'fs-db', titleEn: 'Relational Database Optimization (PostgreSQL)', titleAr: 'تحسين قواعد بيانات PostgreSQL', descEn: 'ACID transactions, B-Tree & GIN indexes, partitioning & connection pools', descAr: 'المعاملات المالية، الفهارس الذكية، وتوزيع الأحمال' },
                        { id: 'fs-cache', titleEn: 'Distributed Caching & Messaging Queues', titleAr: 'التخزين المؤقت وطوابير الرسائل', descEn: 'Redis cluster cache invalidation, RabbitMQ & Kafka streaming', descAr: 'شبكات التخزين المؤقت Redis وبث الأحداث بـ Kafka' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Containerization & Cloud Native Orchestration',
                    titleAr: 'المرحلة الثالثة: تقنيات الحاويات وإدارة Kubernetes',
                    descEn: 'Containerize multi-service applications and deploy them to fault-tolerant clusters.',
                    descAr: 'تغليف التطبيقات في حاويات وإدارتها عبر عنقود كوبرنيتس.',
                    nodes: [
                        { id: 'fs-dock', titleEn: 'Multi-Stage Docker Packaging', titleAr: 'بناء حاويات Docker متعددة المراحل', descEn: 'Minimal Alpine/Distroless images, build caching & rootless security', descAr: 'تقليص حجم الحاويات وتعزيز الأمان الداخلي' },
                        { id: 'fs-k8s', titleEn: 'Kubernetes Cluster Architecture', titleAr: 'معمارية ونشر كوبرنيتس (Kubernetes)', descEn: 'Deployments, Services, Ingress NGINX, ConfigMaps & StatefulSets', descAr: 'إدارة النطاقات، موازنة الحمل، والخدمات الثابتة' },
                        { id: 'fs-helm', titleEn: 'Helm Package Management & GitOps', titleAr: 'إدارة الحزم بـ Helm ونموذج GitOps', descEn: 'Reusable Helm charts, ArgoCD automated synchronization', descAr: 'مزامنة الحالة المستمرة للتطبيقات من مستودع Git' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: CI/CD Automation & Infrastructure as Code',
                    titleAr: 'المرحلة الرابعة: خطوط الأتمتة والبنية التحتية ككود',
                    descEn: 'Automate build, test, security scans, and provision cloud resources declaratively.',
                    descAr: 'أتمتة الفحص والدمج وبناء البنية التحتية السحابية آلياً.',
                    nodes: [
                        { id: 'fs-cicd', titleEn: 'Production GitHub Actions Pipelines', titleAr: 'خطوط الأتمتة بـ GitHub Actions', descEn: 'Matrix testing, caching, security scanning (Trivy/SonarQube) & zero-downtime deploy', descAr: 'فحص الأمان الآلي والنشر بدون توقف للنظام' },
                        { id: 'fs-iac', titleEn: 'Declarative Cloud with Terraform', titleAr: 'البنية التحتية ككود (Terraform)', descEn: 'VPC networks, EKS/GKE clusters, RDS databases & remote state locking', descAr: 'إنشاء الخوادم والشبكات السحابية المشفرة آلياً' },
                        { id: 'fs-obs', titleEn: 'Observability, Metrics & SRE', titleAr: 'المراقبة ورصد الأداء واستقرار الأنظمة', descEn: 'Prometheus alerts, Grafana dashboards & OpenTelemetry distributed tracing', descAr: 'لوحات قياس الأداء والإنذارات الاستباقية للأعطال' }
                    ]
                }
            ],
            'cs-sec': [
                {
                    phase: 1,
                    titleEn: 'Phase 1: Core Networking & OS Defense Fundamentals',
                    titleAr: 'المرحلة الأولى: أساسيات الشبكات والدفاع عن أنظمة التشغيل',
                    descEn: 'Deep understanding of packets, operating system kernels, and security baselines.',
                    descAr: 'فهم بروتوكولات الحزم وتحصين أنظمة التشغيل.',
                    nodes: [
                        { id: 'sec-net', titleEn: 'Deep Protocol & Packet Analysis', titleAr: 'تحليل الحزم والبروتوكولات (Wireshark)', descEn: 'TCP/IP 3-way handshake, TLS 1.3 handshake, DNS & Wireshark triage', descAr: 'تفكيك وفحص حركة مرور البيانات المشفرة والشبكية' },
                        { id: 'sec-linux', titleEn: 'Linux Kernel & System Hardening', titleAr: 'تحصين نظام لينكس (Linux Hardening)', descEn: 'SELinux, AppArmor, PAM, auditd, SSH key defense & CIS benchmarks', descAr: 'إدارة أذونات الأمان المتقدمة وسياسات الوصول الصارمة' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Security Operations (SOC) & Threat Telemetry',
                    titleAr: 'المرحلة الثانية: عمليات مركز الأمن السيبراني (SOC) والـ SIEM',
                    descEn: 'Collect, correlate, and investigate enterprise security logs and intrusions.',
                    descAr: 'تجميع ومطابقة سجلات الأمان والتحقيق في الهجمات السيبرانية.',
                    nodes: [
                        { id: 'sec-siem', titleEn: 'SIEM Deployment & Query Mastery (Splunk/ELK)', titleAr: 'منصات الـ SIEM وتحليل السجلات (Splunk)', descEn: 'Log parsing, correlation rules, dashboard metrics & MITRE ATT&CK mapping', descAr: 'اكتشاف الأنماط المشبوهة وربطها بإطار MITRE العالمي' },
                        { id: 'sec-hunt', titleEn: 'Proactive Threat Hunting & EDR', titleAr: 'صيد التهديدات وحماية النقاط الطرفية (EDR)', descEn: 'Endpoint telemetry, process trees, Sysmon monitoring & Sigma rules', descAr: 'تحليل سلوك العمليات المشبوهة وقواعد الكشف الموحدة' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Ethical Hacking & Defensive Hardening',
                    titleAr: 'المرحلة الثالثة: اختبار الاختراق الأخلاقي والتقييم الأمني',
                    descEn: 'Simulate attacker tactics to identify and remediate security vulnerabilities.',
                    descAr: 'محاكاة تكتيكات المهاجمين لاكتشاف الثغرات وسدها استباقياً.',
                    nodes: [
                        { id: 'sec-web', titleEn: 'Web Application Security (OWASP Top 10)', titleAr: 'أمان تطبيقات الويب (OWASP Top 10)', descEn: 'SQLi, XSS, SSRF, IDOR, authentication bypass & Burp Suite Pro', descAr: 'فحص واكتشاف ثغرات الويب المتقدمة وأمان واجهات الـ API' },
                        { id: 'sec-pen', titleEn: 'Network Penetration Testing & Pivoting', titleAr: 'اختبار اختراق الشبكات والأنظمة الداخلية', descEn: 'Port scanning Nmap, credential cracking, privilege escalation, Metasploit', descAr: 'فحص المنافذ ورفع الصلاحيات واختبار دفاعات الجدران النارية' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: Digital Forensics & Incident Response (DFIR)',
                    titleAr: 'المرحلة الرابعة: التحقيق الجنائي الرقمي والاستجابة للحوادث',
                    descEn: 'Investigate breaches, preserve legal evidence, and neutralize advanced threats.',
                    descAr: 'فحص الذاكرة والأقراص وعزل الهجمات وتوثيق الأدلة القانونية.',
                    nodes: [
                        { id: 'sec-foren', titleEn: 'Memory & Disk Forensic Analysis', titleAr: 'التحليل الجنائي للذاكرة والأقراص (Volatility)', descEn: 'RAM artifact triage with Volatility, filesystem timeline & chain of custody', descAr: 'استخراج الأدلة من ذاكرة الوصول العشوائي وسجلات النظام' },
                        { id: 'sec-ir', titleEn: 'Enterprise Incident Response Playbooks', titleAr: 'خطط وإجراءات الاستجابة للحوادث السيبرانية', descEn: 'Containment, eradication, ransomware recovery & post-mortem reporting', descAr: 'عزل الأجهزة المصابة ومواجهة برمجيات الفدية والتعافي' }
                    ]
                }
            ]
        };

        if (syllabi[node.id]) return syllabi[node.id];

        const skills = node.skills || ['Foundations', 'Tooling', 'Advanced Applications'];
        const milestonesAr = node.milestonesAr || ['الأساسيات والمبادئ الأولية', 'التطبيق العملي والأدوات', 'المشاريع المتقدمة', 'الاعتماد المهني'];
        const milestonesEn = node.milestonesEn || ['Theoretical Foundations', 'Applied Tooling & Simulation', 'Complex Project Execution', 'Industry Standards & Deployment'];

        return [1, 2, 3, 4].map((phaseNum, i) => ({
            phase: phaseNum,
            titleEn: `Phase ${phaseNum}: ${milestonesEn[i] || 'Advanced Competency'}`,
            titleAr: `المرحلة ${phaseNum}: ${milestonesAr[i] || 'الكفاءة المتقدمة'}`,
            descEn: `Structured professional competencies and milestones aligned with corporate requirements.`,
            descAr: `المهارات والخبرات العملية المعتمدة والمتوافقة مع معايير الشركات الشريكة.`,
            nodes: [
                {
                    id: `${node.id}-topic-${phaseNum}-a`,
                    titleEn: `${skills[i % skills.length] || 'Core Methodology'} Fundamentals`,
                    titleAr: `أساسيات وتطبيقات ${skills[i % skills.length] || 'المهارة الأساسية'}`,
                    descEn: `Key theoretical frameworks and hands-on laboratory exercises.`,
                    descAr: `المفاهيم النظرية والتطبيقات المعملية المعيارية.`
                },
                {
                    id: `${node.id}-topic-${phaseNum}-b`,
                    titleEn: `Applied Enterprise Tools & Practice`,
                    titleAr: `الأدوات والممارسات البرمجية المعتمدة`,
                    descEn: `Production tooling, automated test cases, and domain workflows.`,
                    descAr: `أدوات العمل وسيناريوهات التطبيق المعيارية في المؤسسات.`
                },
                {
                    id: `${node.id}-topic-${phaseNum}-c`,
                    titleEn: `Industry Standards & Production Case Studies`,
                    titleAr: `دراسات الحالة وتطبيقات سوق العمل المعتمدة`,
                    descEn: `Enterprise execution protocols, quality validation, and deliverables.`,
                    descAr: `بروتوكولات التنفيذ واختبارات الجودة ومخرجات العمل الحقيقية.`
                }
            ]
        }));
    }

    focusTrack(id) {
        const node = this.nodes.find(n => n.id === id);
        if (!node) return;
        if (!this.hookedNodes.some(hn => hn.id === id)) {
            this.hookedNodes.push(node);
        }
        this.renderHookedPanel(node);
        this.updateLiveStatus();
    }

    renderHookedPanel(node) {
        const panel = document.getElementById('hooked-track-panel');
        if (!panel) return;
        if (!node) {
            panel.classList.remove('active');
            return;
        }

        const isAr = document.documentElement.lang === 'ar';
        const title = isAr ? (node.labelAr || node.label) : node.label;
        const faculty = isAr ? (node.facultyAr || node.faculty) : node.faculty.toUpperCase();
        const duration = isAr ? node.weeks : node.weeksEn;

        // Fetch deep roadmap.sh syllabus and completion state
        const syllabus = this.getRoadmapSyllabus(node);
        let totalTopics = 0;
        syllabus.forEach(p => totalTopics += p.nodes.length);
        const completedTopics = this.getCompletedTopics(node.id);
        const completedCount = completedTopics.length;
        const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

        panel.innerHTML = `
            <div class="hooked-track-header">
                <div>
                    <span class="badge-tag badge-remote" style="margin-bottom: 0.5rem; display: inline-block;">
                        ${isAr ? '🎣 مسار مصطاد حالياً' : '🎣 Active Hooked Track'} · ${faculty}
                    </span>
                    <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-foreground);">
                        ${title}
                    </h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.95rem; margin: 0;">
                        ⏱️ ${duration} · ${isAr ? 'منهج هرمي تفاعلي كامل مستوحى من معايير roadmap.sh العالمية' : 'Full interactive hierarchical tree curriculum inspired by roadmap.sh'}
                    </p>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                    <a href="pages/auth.html" class="btn btn-primary" style="padding: 0.65rem 1.4rem;">
                        ${isAr ? '🚀 بدء هذا المسار المهني' : '🚀 Start This Track'}
                    </a>
                    <a href="#opportunities" class="btn btn-secondary" style="padding: 0.65rem 1.4rem;">
                        ${isAr ? '💼 التدريبات المرتبطة' : '💼 Matching Internships'}
                    </a>
                    <button type="button" class="btn btn-outline" onclick="window.hytHunter.toggleTrackHook('${node.id}')" style="padding: 0.65rem 1.1rem;">
                        ${isAr ? '❌ إلغاء الاصطياد' : '❌ Unhook'}
                    </button>
                </div>
            </div>

            <!-- Skills Gained Pills -->
            <div style="margin-top: 1rem;">
                <strong style="display: block; font-size: 0.88rem; margin-bottom: 0.6rem; color: var(--color-foreground);">
                    ${isAr ? '🛠️ المهارات والتقنيات الأساسية المكتسبة:' : '🛠️ Core Competencies & Skills Gained:'}
                </strong>
                <div class="skills-pill-group" style="margin-bottom: 1rem;">
                    ${(node.skills || []).map(s => `<span class="skill-pill" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${s}</span>`).join('')}
                </div>
            </div>

            <!-- roadmap.sh Interactive Progress Bar -->
            <div class="roadmap-header-card" style="margin-top: 1.25rem;">
                <div style="flex: 1; min-width: 260px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: 700; font-size: 0.95rem; color: var(--color-foreground);">
                            ${isAr ? '🎯 إنجاز خارطة الطريق التفاعلية:' : '🎯 Interactive Roadmap Progression:'}
                        </span>
                        <span style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary); font-family: monospace;">
                            ${completedCount} / ${totalTopics} ${isAr ? 'موضوع' : 'Topics'} (${progressPercent}%)
                        </span>
                    </div>
                    <div style="width: 100%; height: 10px; background: var(--color-border); border-radius: 999px; overflow: hidden;">
                        <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #00F2FE, #6366F1); border-radius: 999px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--color-muted-foreground);">
                    ${isAr ? '💡 انقر على أي بطاقة موضوع لوضع علامة الإنجاز والمتابعة الذاتية' : '💡 Click any topic card to mark as completed for self-paced tracking'}
                </div>
            </div>

            <!-- roadmap.sh Deep Hierarchical Tree -->
            <div class="roadmap-tree-container">
                ${syllabus.map((p, pIdx) => `
                    <div class="roadmap-phase-card">
                        <div class="roadmap-phase-head">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <span class="roadmap-phase-num">${p.phase}</span>
                                <div>
                                    <h4 style="font-size: 1.05rem; font-weight: 800; margin: 0; color: var(--color-foreground);">
                                        ${isAr ? p.titleAr : p.titleEn}
                                    </h4>
                                    <p style="font-size: 0.82rem; color: var(--color-muted-foreground); margin: 0.2rem 0 0;">
                                        ${isAr ? p.descAr : p.descEn}
                                    </p>
                                </div>
                            </div>
                            <span class="badge-tag" style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.1); color: var(--color-primary);">
                                ${p.nodes.length} ${isAr ? 'مواضيع رئيسية' : 'Key Modules'}
                            </span>
                        </div>

                        <div class="roadmap-node-grid">
                            ${p.nodes.map(n => {
                                const isDone = completedTopics.includes(n.id);
                                return `
                                    <div class="roadmap-node-card ${isDone ? 'completed' : ''}" onclick="window.hytHunter.toggleTopicComplete('${node.id}', '${n.id}')">
                                        <div class="roadmap-checkbox">${isDone ? '✓' : ''}</div>
                                        <div class="roadmap-node-content">
                                            <div class="roadmap-node-title">${isAr ? n.titleAr : n.titleEn}</div>
                                            <div class="roadmap-node-desc">${isAr ? n.descAr : n.descEn}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    ${pIdx < syllabus.length - 1 ? '<div class="roadmap-connector-v"></div>' : ''}
                `).join('')}
            </div>
        `;

        panel.classList.add('active');
    }

    animate() {
        this.time += 0.016;

        // Anti-Gravity Mouse Damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Living Cosmic Atmosphere & Floating Stardust
        this.drawAtmosphere();

        // 2. Draw Volumetric Clouds behind Moon
        this.drawClouds(true);

        // 3. Draw DreamWorks Crescent Moon & Sitting Fisherman
        const moonPos = this.drawDreamWorksFisherman();

        // 4. Draw Floating Clouds in front of Moon (Depth)
        this.drawClouds(false);

        // 5. Draw Multi-Hook Glowing Fishing Lines
        this.drawMultiHookLines(moonPos);

        // 6. Draw Discipline Nodes & Hover Tooltips
        this.drawNodes();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawSparkleStar(cx, cy, outerRadius, color, alpha = 1, rotation = 0) {
        const innerRadius = outerRadius * 0.22;
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const r = (i % 2 === 0) ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = outerRadius * 1.4;
        this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        this.ctx.fill();
        this.ctx.restore();
    }

    getThemePalette() {
        const theme = this.theme || document.documentElement.getAttribute('data-theme') || 'dark';
        switch (theme) {
            case 'reef':
                return {
                    bgCenter: 'rgba(19, 46, 37, 0.95)',
                    bgMid: 'rgba(11, 25, 21, 0.98)',
                    bgOuter: 'rgba(6, 16, 13, 1)',
                    starColor: '#6EE7B7',
                    stardust: 'rgba(52, 211, 153, ',
                    cloud0: 'rgba(16, 185, 129, ',
                    cloud1: 'rgba(19, 46, 37, ',
                    fishermanFill: '#06100D',
                    glowColor: '#10B981',
                    textColor: '#E3F2EC',
                    mutedText: '#86A397'
                };
            case 'nebula':
                return {
                    bgCenter: 'rgba(29, 25, 59, 0.95)',
                    bgMid: 'rgba(17, 15, 37, 0.98)',
                    bgOuter: 'rgba(11, 10, 24, 1)',
                    starColor: '#C4B5FD',
                    stardust: 'rgba(196, 181, 253, ',
                    cloud0: 'rgba(244, 114, 182, ',
                    cloud1: 'rgba(29, 25, 59, ',
                    fishermanFill: '#0B0A18',
                    glowColor: '#A78BFA',
                    textColor: '#ECE8F7',
                    mutedText: '#9A93B3'
                };
            case 'ember':
                return {
                    bgCenter: 'rgba(43, 29, 19, 0.95)',
                    bgMid: 'rgba(25, 18, 11, 0.98)',
                    bgOuter: 'rgba(15, 11, 7, 1)',
                    starColor: '#FCD34D',
                    stardust: 'rgba(251, 191, 36, ',
                    cloud0: 'rgba(255, 107, 74, ',
                    cloud1: 'rgba(43, 29, 19, ',
                    fishermanFill: '#0F0B07',
                    glowColor: '#F5B841',
                    textColor: '#F5ECE3',
                    mutedText: '#AD9C8B'
                };
            case 'light':
            case 'daylight':
                return {
                    bgCenter: 'rgba(238, 242, 255, 0.95)',
                    bgMid: 'rgba(224, 231, 255, 0.9)',
                    bgOuter: 'rgba(241, 245, 249, 1)',
                    starColor: '#818CF8',
                    stardust: 'rgba(99, 102, 241, ',
                    cloud0: 'rgba(199, 210, 254, ',
                    cloud1: 'rgba(224, 231, 255, ',
                    fishermanFill: '#1E1B4B',
                    glowColor: '#6366F1',
                    textColor: '#0F172A',
                    mutedText: '#64748B'
                };
            case 'dark':
            case 'abyss':
            default:
                return {
                    bgCenter: 'rgba(15, 23, 42, 0.95)',
                    bgMid: 'rgba(10, 15, 29, 0.98)',
                    bgOuter: 'rgba(5, 7, 14, 1)',
                    starColor: '#BAE6FD',
                    stardust: 'rgba(147, 197, 253, ',
                    cloud0: 'rgba(56, 189, 248, ',
                    cloud1: 'rgba(30, 41, 59, ',
                    fishermanFill: '#030712',
                    glowColor: '#00F2FE',
                    textColor: '#F8FAFC',
                    mutedText: '#94A3B8'
                };
        }
    }

    drawAtmosphere() {
        const pal = this.getThemePalette();

        // Deep background gradient tailored to active theme
        const bgGrad = this.ctx.createRadialGradient(
            this.width / 2, this.height * 0.35, 20,
            this.width / 2, this.height * 0.5, this.width * 0.75
        );
        bgGrad.addColorStop(0, pal.bgCenter);
        bgGrad.addColorStop(0.5, pal.bgMid);
        bgGrad.addColorStop(1, pal.bgOuter);

        this.ctx.fillStyle = bgGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Anti-Gravity Floating Stardust & Sparkling Starlets
        this.stardust.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.pulse += 0.025;

            // Mouse gravitational repulsion
            if (this.mouse.isHovering) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 120 && dist > 1) {
                    p.x += (dx / dist) * 1.2;
                    p.y += (dy / dist) * 1.2;
                }
            }

            // Wrap around screen vertically (anti-gravity continuous rise)
            if (p.y < 0) {
                p.y = this.height;
                p.x = Math.random() * this.width;
            }
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;

            const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.pulse));
            if (p.isStar) {
                this.drawSparkleStar(p.x, p.y, p.size * 2.4, pal.starColor, alpha * 0.8, p.pulse * 0.8);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `${pal.stardust}${alpha})`;
                this.ctx.fill();
            }
        });
    }

    drawClouds(isBack) {
        const pal = this.getThemePalette();
        const parallaxX = (this.mouse.x - this.width / 2) * (isBack ? 0.02 : 0.05);
        const parallaxY = (this.mouse.y - this.height / 2) * (isBack ? 0.015 : 0.04);

        this.clouds.forEach((c, idx) => {
            if (isBack && idx >= 3) return;
            if (!isBack && idx < 3) return;

            const cx = c.xRel * this.width + Math.sin(this.time * c.speed + c.phase) * 14 + parallaxX;
            const cy = c.yRel * this.height + Math.cos(this.time * c.speed + c.phase) * 6 + parallaxY;

            const cloudGrad = this.ctx.createRadialGradient(cx, cy, 5, cx, cy, c.r);
            if (this.isDark) {
                cloudGrad.addColorStop(0, `${pal.cloud0}${c.opacity})`);
                cloudGrad.addColorStop(0.6, `${pal.cloud1}${c.opacity * 0.5})`);
                cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            } else {
                cloudGrad.addColorStop(0, `rgba(199, 210, 254, ${c.opacity * 1.2})`);
                cloudGrad.addColorStop(0.7, `rgba(224, 231, 255, ${c.opacity * 0.4})`);
                cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            }

            this.ctx.beginPath();
            this.ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
            this.ctx.fillStyle = cloudGrad;
            this.ctx.fill();
        });
    }

    drawDreamWorksFisherman() {
        // Parallax coordinates for Crescent Moon & Fisherman
        const parallaxX = (this.mouse.x - this.width / 2) * 0.035;
        const parallaxY = (this.mouse.y - this.height / 2) * 0.025;
        const moonX = this.width * 0.5 + parallaxX;
        const moonY = this.height * 0.22 + Math.sin(this.time * 0.8) * 5 + parallaxY;
        const moonRadius = Math.min(this.width, this.height) * 0.12;

        this.ctx.save();

        // 1. Crescent Moon Outer Glow
        const glowGrad = this.ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 2);
        glowGrad.addColorStop(0, 'rgba(250, 204, 21, 0.35)');
        glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        this.ctx.fillStyle = glowGrad;
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2);
        this.ctx.fill();

        // 2. Draw Classic Crescent Moon Shape
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius, Math.PI * 0.25, Math.PI * 1.75, false);
        this.ctx.arc(moonX + moonRadius * 0.42, moonY, moonRadius * 0.88, Math.PI * 1.7, Math.PI * 0.3, true);
        this.ctx.closePath();

        const moonGrad = this.ctx.createLinearGradient(moonX - moonRadius, moonY - moonRadius, moonX + moonRadius, moonY + moonRadius);
        moonGrad.addColorStop(0, '#FEF08A');
        moonGrad.addColorStop(0.6, '#FACC15');
        moonGrad.addColorStop(1, '#38BDF8');
        this.ctx.fillStyle = moonGrad;
        this.ctx.shadowColor = '#FACC15';
        this.ctx.shadowBlur = 18;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // 3. Draw Fisherman Silhouette sitting gracefully on the lower cusp of the moon
        const seatX = moonX - moonRadius * 0.15;
        const seatY = moonY + moonRadius * 0.48;
        const pal = this.getThemePalette();

        this.ctx.fillStyle = pal.fishermanFill;

        // Torso / Legs
        this.ctx.beginPath();
        this.ctx.ellipse(seatX, seatY, 7, 10, -0.2, 0, Math.PI * 2);
        this.ctx.fill();

        // Dangling legs
        this.ctx.beginPath();
        this.ctx.moveTo(seatX - 2, seatY + 6);
        this.ctx.lineTo(seatX - 4, seatY + 16);
        this.ctx.lineTo(seatX - 1, seatY + 22);
        this.ctx.lineWidth = 3.5;
        this.ctx.strokeStyle = pal.fishermanFill;
        this.ctx.stroke();

        // Head & Classic Fisherman Straw Hat
        const headX = seatX + 2;
        const headY = seatY - 14;
        this.ctx.beginPath();
        this.ctx.arc(headX, headY, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // Hat brim
        this.ctx.beginPath();
        this.ctx.ellipse(headX, headY - 3, 11, 3.5, -0.15, 0, Math.PI * 2);
        this.ctx.fill();

        // 4. Slender Curved Fishing Rod (Neon Luminous Carbon Fiber)
        const handX = seatX + 5;
        const handY = seatY - 4;
        const rodTipX = handX + 55;
        const rodTipY = handY - 42;

        this.ctx.beginPath();
        this.ctx.moveTo(handX - 12, handY + 10);
        this.ctx.quadraticCurveTo(handX + 15, handY - 15, rodTipX, rodTipY);
        this.ctx.lineWidth = 2.5;
        this.ctx.strokeStyle = '#F8FAFC';
        this.ctx.shadowColor = '#00F2FE';
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Luminous glowing tip ring
        this.ctx.beginPath();
        this.ctx.arc(rodTipX, rodTipY, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#00F2FE';
        this.ctx.shadowColor = '#00F2FE';
        this.ctx.shadowBlur = 12;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.restore();

        return { rodTipX, rodTipY };
    }

    drawMultiHookLines(moonPos) {
        if (!this.hookedNodes.length) return;

        const startX = moonPos.rodTipX;
        const startY = moonPos.rodTipY;

        // Central junction point beneath clouds where line branches into Multi-Hooks
        const junctionX = startX + (this.mouse.x - startX) * 0.15;
        const junctionY = startY + (this.height * 0.45 - startY);

        this.ctx.save();

        // 1. Main Line from Rod Tip to Multi-Hook Junction
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        const sagX = (startX + junctionX) / 2 + Math.sin(this.time * 2) * 4;
        const sagY = (startY + junctionY) / 2 + 15;
        this.ctx.quadraticCurveTo(sagX, sagY, junctionX, junctionY);
        this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.75)';
        this.ctx.lineWidth = 1.8;
        this.ctx.shadowColor = '#00F2FE';
        this.ctx.shadowBlur = 8;
        this.ctx.stroke();

        // Glowing Multi-Hook Splitter Crystal
        this.ctx.beginPath();
        this.ctx.arc(junctionX, junctionY, 4.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.shadowColor = '#00F2FE';
        this.ctx.shadowBlur = 14;
        this.ctx.fill();

        // 2. Branching Neon Lines connecting to multiple nodes simultaneously!
        this.hookedNodes.forEach((node, i) => {
            const destX = node.x;
            const destY = node.y;

            // Animated laser pulse offset
            const pulse = (this.time * 3 + i * 1.5) % 1;

            this.ctx.beginPath();
            this.ctx.moveTo(junctionX, junctionY);
            const ctrlX = (junctionX + destX) / 2 + Math.sin(this.time * 2 + i) * 12;
            const ctrlY = (junctionY + destY) / 2 - 10;
            this.ctx.quadraticCurveTo(ctrlX, ctrlY, destX, destY);

            this.ctx.strokeStyle = node.color;
            this.ctx.lineWidth = 1.6;
            this.ctx.shadowColor = node.color;
            this.ctx.shadowBlur = 12;
            this.ctx.stroke();

            // Energy pulse bead traveling along the line to target
            const t = pulse;
            const bx = (1 - t) * (1 - t) * junctionX + 2 * (1 - t) * t * ctrlX + t * t * destX;
            const by = (1 - t) * (1 - t) * junctionY + 2 * (1 - t) * t * ctrlY + t * t * destY;

            this.ctx.beginPath();
            this.ctx.arc(bx, by, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.shadowColor = node.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();

            // Target node lock-on rings & ripples
            this.ctx.beginPath();
            this.ctx.arc(destX, destY, node.radius + 8 + Math.sin(this.time * 4 + i) * 3, 0, Math.PI * 2);
            this.ctx.strokeStyle = node.color;
            this.ctx.lineWidth = 1.2;
            this.ctx.stroke();
        });

        this.ctx.restore();
    }

    drawNodes() {
        this.nodes.forEach(n => {
            // Gentle anti-gravity bobbing
            n.x = n.baseX + Math.sin(this.time * 1.2 + n.id.charCodeAt(0)) * 6;
            n.y = n.baseY + Math.cos(this.time * 1.4 + n.id.charCodeAt(1)) * 5;

            const isHooked = this.hookedNodes.some(hn => hn.id === n.id);

            this.ctx.save();

            // Shimmering Celestial Starbursts
            if (isHooked) {
                const starRadius = n.radius * 2.8 + Math.sin(this.time * 3 + n.id.charCodeAt(0)) * 2.5;
                this.drawSparkleStar(n.x, n.y, starRadius, n.color, 0.75, this.time * 1.2);

                // Orbiting celestial starlets ✨
                for (let s = 0; s < 3; s++) {
                    const orbitAngle = this.time * 2 + (s * Math.PI * 2) / 3;
                    const orbitDist = n.radius * 2.3;
                    const ox = n.x + Math.cos(orbitAngle) * orbitDist;
                    const oy = n.y + Math.sin(orbitAngle) * orbitDist;
                    this.drawSparkleStar(ox, oy, 3.5, '#FFFFFF', 0.9, -this.time * 3);
                }
            } else {
                // Subtle gentle twinkle for background nodes
                const starRadius = n.radius * 1.4 + Math.sin(this.time * 2 + n.id.charCodeAt(0)) * 1.2;
                this.drawSparkleStar(n.x, n.y, starRadius, n.color, 0.22, this.time * 0.4);
            }

            // Node Glow
            const pal = this.getThemePalette();
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? 'rgba(0, 242, 254, 0.25)' : 'rgba(99, 102, 241, 0.2)')
                : (this.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(100, 116, 139, 0.08)');
            this.ctx.fill();

            // Node Core Circle
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = isHooked ? '#FFFFFF' : n.color;
            this.ctx.shadowColor = n.color;
            this.ctx.shadowBlur = isHooked ? 20 : 8;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Label text beneath node
            this.ctx.font = isHooked ? 'bold 12px Inter, sans-serif' : '11px Inter, sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = isHooked ? pal.textColor : pal.mutedText;
            this.ctx.fillText(n.label, n.x, n.y + n.radius + 14);

            // Faculty badge
            if (isHooked) {
                this.ctx.font = '9px monospace';
                this.ctx.fillStyle = n.color;
                this.ctx.fillText(`[${n.faculty.toUpperCase()}]`, n.x, n.y + n.radius + 26);
            }

            this.ctx.restore();
        });
    }

    initTypewriter() {
        const el = document.getElementById('hyt-typewriter');
        if (!el) return;

        const messagesEn = [
            "Hunting verified corporate internships across 5 university faculties...",
            "Casting multi-discipline roadmaps: Computing, Engineering, Science, Business & Law...",
            "Scanning student resume keywords with instant ATS match scoring...",
            "Connecting Damanhour University coursework with certified industry careers..."
        ];

        const messagesAr = [
            "اصطياد فرص التدريب الصيفي المعتمدة لطلاب ٥ كليات جامعية...",
            "رسم خرائط المهن خطوة بخطوة: حاسبات، هندسة، علوم، تجارة، وحقوق...",
            "فحص ومطابقة الكلمات المفتاحية في السيرة الذاتية بنظام الـ ATS...",
            "ربط المقررات الدراسية بجامعة دمنهور باحتياجات سوق العمل الحقيقية..."
        ];

        let msgIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentMsg = '';

        const type = () => {
            const isRtl = document.documentElement.dir === 'rtl';
            const messages = isRtl ? messagesAr : messagesEn;
            const fullMsg = messages[msgIndex % messages.length];

            if (isDeleting) {
                currentMsg = fullMsg.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentMsg = fullMsg.substring(0, charIndex + 1);
                charIndex++;
            }

            el.textContent = currentMsg;

            let delay = isDeleting ? 25 : 45;

            if (!isDeleting && charIndex === fullMsg.length) {
                delay = 2400; // Hold full sentence for 2.4s
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                msgIndex++;
                delay = 400;
            }

            setTimeout(type, delay);
        };

        type();
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hunter-radar-canvas')) {
        new TrackHunterCanvas('hunter-radar-canvas');
    }
});
