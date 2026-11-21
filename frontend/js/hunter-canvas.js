/**
 * HuntYourTrack - Bespoke Cosmic Galaxy & Constellation Track Hunter Canvas Engine
 * High-performance vanilla HTML5 Canvas interactive visualization.
 * 
 * Features:
 * - Central Supermassive Galactic Core & Dynamic Accretion Disc with Logarithmic Spiral Arms.
 * - 350+ Keplerian stardust particles in orbital motion responding to mouse gravity & inertia.
 * - 5 Faculty Constellation Sectors (12 Accredited Career Tracks).
 * - Glowing Constellation Vector Networks connecting discipline clusters.
 * - Precision Holographic HUD Reticle & Real-time Telemetry [RA/DEC] Coordinate Display.
 * - Coherent Multi-Target Laser Lock-On Beams with traveling photon pulses.
 * - Zero Emoji Architecture: 100% SVG and vector typography.
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

        // Particles & Atmosphere
        this.stardust = [];

        // 12 Accredited Discipline Nodes across 5 faculties
        this.nodes = [
            // Computing & AI
            {
                id: 'cs-ai',
                label: 'AI & Deep Learning',
                labelAr: 'الذكاء الاصطناعي وتعلم الآلة',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '12 أسبوعاً',
                weeksEn: '12 Weeks',
                sector: 'ALPHA-01',
                telemetry: { ra: '19h 50m', dec: '+08° 52\'' },
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
                xRel: 0.22, yRel: 0.26, color: '#00F2FE', radius: 9, glow: 18
            },
            {
                id: 'cs-cloud',
                label: 'Full-Stack Cloud & DevOps',
                labelAr: 'الحوسبة السحابية والأنظمة الموزعة',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '14 أسبوعاً',
                weeksEn: '14 Weeks',
                sector: 'ALPHA-02',
                telemetry: { ra: '20h 14m', dec: '+12° 36\'' },
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
                xRel: 0.14, yRel: 0.44, color: '#38BDF8', radius: 9, glow: 18
            },
            {
                id: 'cs-sec',
                label: 'Cybersecurity SOC',
                labelAr: 'الأمن السيبراني وعمليات الدفاع',
                faculty: 'computing',
                facultyAr: 'الحاسبات والذكاء الاصطناعي',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                sector: 'ALPHA-03',
                telemetry: { ra: '21h 05m', dec: '+15° 20\'' },
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
                xRel: 0.28, yRel: 0.58, color: '#818CF8', radius: 8, glow: 15
            },

            // Engineering & Tech
            {
                id: 'eng-mecha',
                label: 'Mechatronics & Robotics',
                labelAr: 'الميكاترونكس وهندسة الروبوتات',
                faculty: 'engineering',
                facultyAr: 'الهندسة والتكنولوجيا',
                weeks: '14 أسبوعاً',
                weeksEn: '14 Weeks',
                sector: 'BETA-01',
                telemetry: { ra: '05h 35m', dec: '-05° 23\'' },
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
                xRel: 0.74, yRel: 0.26, color: '#34D399', radius: 9, glow: 18
            },
            {
                id: 'eng-auto',
                label: 'Embedded Automotive',
                labelAr: 'الأنظمة المدمجة وبرمجيات السيارات',
                faculty: 'engineering',
                facultyAr: 'الهندسة والتكنولوجيا',
                weeks: '12 أسبوعاً',
                weeksEn: '12 Weeks',
                sector: 'BETA-02',
                telemetry: { ra: '06h 45m', dec: '-16° 42\'' },
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
                xRel: 0.86, yRel: 0.44, color: '#10B981', radius: 8, glow: 16
            },
            {
                id: 'eng-energy',
                label: 'Renewable Energy & Smart Grids',
                labelAr: 'الطاقة المتجددة والشبكات الذكية',
                faculty: 'engineering',
                facultyAr: 'الهندسة والتكنولوجيا',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                sector: 'BETA-03',
                telemetry: { ra: '07h 12m', dec: '-18° 10\'' },
                skills: ['SCADA', 'Power Electronics', 'Solar PV', 'Smart Grid Protocols', 'MATLAB Simulink'],
                milestonesAr: [
                    'مبادئ توليد الطاقة الكهروضوئية وتوربينات الرياح',
                    'إلكترونيات القوى والمحولات والمحاكاة بـ Simulink',
                    'أنظمة التحكم الإشرافي SCADA ومراقبة الشبكات',
                    'إدارة وتخزين الطاقة والربط بالشبكات الذكية'
                ],
                milestonesEn: [
                    'Solar PV & Wind Energy Generation Fundamentals',
                    'Power Electronics, Inverters & Simulink Modeling',
                    'SCADA Control & Industrial Grid Telemetry',
                    'Energy Storage Systems & Smart Grid Interconnection'
                ],
                xRel: 0.68, yRel: 0.16, color: '#059669', radius: 8, glow: 15
            },

            // Pure & Applied Sciences
            {
                id: 'sci-bio',
                label: 'Bioinformatics & Genomics',
                labelAr: 'المعلوماتية الحيوية والجينوم الحاسوبي',
                faculty: 'science',
                facultyAr: 'العلوم الأساسية',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                sector: 'GAMMA-01',
                telemetry: { ra: '12h 30m', dec: '+12° 23\'' },
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
                xRel: 0.18, yRel: 0.76, color: '#A78BFA', radius: 8, glow: 15
            },
            {
                id: 'sci-chem',
                label: 'Computational Chemistry',
                labelAr: 'الكيمياء الحاسوبية والنمذجة الدوائية',
                faculty: 'science',
                facultyAr: 'العلوم الأساسية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                sector: 'GAMMA-02',
                telemetry: { ra: '13h 15m', dec: '+08° 10\'' },
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
                xRel: 0.32, yRel: 0.86, color: '#C084FC', radius: 7, glow: 13
            },

            // Business & FinTech
            {
                id: 'bus-fintech',
                label: 'FinTech Algorithmic Trading',
                labelAr: 'التكنولوجيا المالية والتداول الخوارزمي',
                faculty: 'business',
                facultyAr: 'التجارة وإدارة الأعمال',
                weeks: '10 أسابيع',
                weeksEn: '10 Weeks',
                sector: 'DELTA-01',
                telemetry: { ra: '14h 15m', dec: '+19° 11\'' },
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
                xRel: 0.84, yRel: 0.72, color: '#FBBF24', radius: 8, glow: 16
            },
            {
                id: 'bus-analytics',
                label: 'Business Intelligence & BI',
                labelAr: 'ذكاء الأعمال وتحليل البيانات المؤسسية',
                faculty: 'business',
                facultyAr: 'التجارة وإدارة الأعمال',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                sector: 'DELTA-02',
                telemetry: { ra: '15h 02m', dec: '+22° 45\'' },
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
                xRel: 0.70, yRel: 0.84, color: '#F59E0B', radius: 8, glow: 15
            },

            // Law & Digital IP
            {
                id: 'law-cyber',
                label: 'Cyber Law & Digital Evidence',
                labelAr: 'القانون السيبراني والأدلة الرقمية',
                faculty: 'law',
                facultyAr: 'الحقوق والتشريعات الرقمية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                sector: 'EPSILON-01',
                telemetry: { ra: '16h 45m', dec: '-28° 02\'' },
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
                xRel: 0.44, yRel: 0.88, color: '#F472B6', radius: 8, glow: 15
            },
            {
                id: 'law-ip',
                label: 'Tech & AI IP Protection',
                labelAr: 'الملكية الفكرية في التكنولوجيا والذكاء الاصطناعي',
                faculty: 'law',
                facultyAr: 'الحقوق والتشريعات الرقمية',
                weeks: '8 أسابيع',
                weeksEn: '8 Weeks',
                sector: 'EPSILON-02',
                telemetry: { ra: '17h 20m', dec: '-32° 18\'' },
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
                xRel: 0.56, yRel: 0.88, color: '#FB7185', radius: 7, glow: 13
            }
        ];

        this.init();
        this.initTypewriter();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse Parallax & HUD tracker
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            if (e.clientX >= rect.left - 40 && e.clientX <= rect.right + 40 &&
                e.clientY >= rect.top - 40 && e.clientY <= rect.bottom + 40) {
                this.mouse.targetX = Math.max(0, Math.min(this.width, e.clientX - rect.left));
                this.mouse.targetY = Math.max(0, Math.min(this.height, e.clientY - rect.top));
                this.mouse.isHovering = true;
                this.mouse.active = true;
            } else {
                this.mouse.isHovering = false;
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.isHovering = false;
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
        const parentH = parent ? parent.clientHeight : 500;
        this.height = Math.min(540, Math.max(420, parentH || 500));
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        this.updateNodeCoordinates();
        this.initAtmosphere();
    }

    initAtmosphere() {
        const count = 360;
        const maxDist = Math.hypot(this.width, this.height) * 0.55;

        this.stardust = Array.from({ length: count }, () => {
            const dist = Math.pow(Math.random(), 0.75) * maxDist + 25;
            const angle = Math.random() * Math.PI * 2;
            const orbitalSpeed = (0.25 / Math.sqrt(dist + 20)) * (Math.random() * 0.4 + 0.8);
            return {
                dist,
                angle,
                baseDist: dist,
                speed: orbitalSpeed,
                size: Math.random() * 1.8 + 0.6,
                alpha: Math.random() * 0.65 + 0.25,
                colorShift: Math.random(),
                z: Math.random() * 0.8 + 0.2
            };
        });
    }

    updateNodeCoordinates() {
        const cx = this.width * 0.5;
        const cy = this.height * 0.46;
        const minDim = Math.min(this.width, this.height);

        // 3 Elliptical Orbital Tiers around central Earth
        const tier1R = Math.max(90, minDim * 0.22);
        const tier2R = Math.max(160, minDim * 0.33);
        const tier3R = Math.max(220, minDim * 0.43);

        this.nodes.forEach((n, idx) => {
            let radius, angle;
            if (idx < 4) {
                // Inner tier (4 nodes)
                radius = tier1R;
                angle = (idx * (Math.PI * 2 / 4)) + 0.35;
            } else if (idx < 8) {
                // Mid tier (4 nodes)
                radius = tier2R;
                angle = ((idx - 4) * (Math.PI * 2 / 4)) + 0.75;
            } else {
                // Outer tier (4 nodes)
                radius = tier3R;
                angle = ((idx - 8) * (Math.PI * 2 / 4)) + 1.15;
            }

            // Elliptical perspective
            n.x = cx + Math.cos(angle) * radius * 1.18;
            n.y = cy + Math.sin(angle) * radius * 0.68;
            n.baseX = n.x;
            n.baseY = n.y;
            n.vx = 0;
            n.vy = 0;
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
            // Default: Hook primary tracks across key faculties
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
            this.hookedNodes.splice(idx, 1);
        } else {
            this.hookedNodes.push(node);
        }
        const lastHooked = this.hookedNodes[this.hookedNodes.length - 1] || null;
        this.renderHookedPanel(lastHooked);
        this.updateLiveStatus();
    }

    selectNearestNodes(x, y) {
        let closest = null;
        let minDist = 55;
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
        this.hookedNodes = shuffled.slice(0, 3);
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
                ? 'انقر على أي مسار في الرادار لاصطياده واستعراض خارطة طريقه' 
                : 'Select any track node on the radar to lock on and view roadmap';
        } else {
            statusEl.textContent = isAr 
                ? `تم اصطياد ${count} مسار${count > 2 ? 'ات' : ''} بنجاح · انقر على أي مسار لاصطياده أو إلغائه`
                : `${count} track${count > 1 ? 's' : ''} locked · Click any star to hook or release`;
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
                        { id: 'fs-cicd', titleEn: 'Production GitHub Actions Pipelines', titleAr: 'خطوط الأتمتة بـ GitHub Actions', descEn: 'Matrix testing, caching, security scanning & zero-downtime deploy', descAr: 'فحص الأمان الآلي والنشر بدون توقف للنظام' },
                        { id: 'fs-iac', titleEn: 'Declarative Cloud with Terraform', titleAr: 'البنية التحتية ككود (Terraform)', descEn: 'VPC networks, EKS clusters, RDS databases & remote state locking', descAr: 'إنشاء الخوادم والشبكات السحابية المشفرة آلياً' },
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

    removeTrackFromHook(id) {
        this.hookedNodes = this.hookedNodes.filter(n => n.id !== id);
        const nextNode = this.hookedNodes[this.hookedNodes.length - 1] || null;
        this.renderHookedPanel(nextNode);
        this.updateLiveStatus();
    }

    clearAllHookedTracks() {
        this.hookedNodes = [];
        this.renderHookedPanel(null);
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

        const reticleSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-inline-end:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>`;
        const clockSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-inline-end:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

        const trayHtml = this.hookedNodes.length > 0 ? `
            <div class="selected-tracks-tray" style="margin-bottom: 1.25rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.85rem 1.25rem; background: var(--color-card); border: 1px solid var(--color-border); border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
                    <span style="font-size: 0.82rem; font-weight: 700; color: var(--color-foreground); text-transform: uppercase; letter-spacing: 0.5px;">
                        ${isAr ? "المسارات المحددة (" + this.hookedNodes.length + "):" : "Selected Tracks (" + this.hookedNodes.length + "):"}
                    </span>
                    <div style="display: flex; gap: 0.45rem; flex-wrap: wrap;">
                        ${this.hookedNodes.map(hn => {
                            const hnTitle = isAr ? (hn.labelAr || hn.label) : hn.label;
                            const isActive = (hn.id === node.id);
                            return `
                                <div class="selected-track-pill" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 999px; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; background: ${isActive ? "rgba(99, 102, 241, 0.2)" : "var(--color-muted)"}; border: 1px solid ${isActive ? hn.color : "var(--color-border)"}; color: ${isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)"};" onclick="window.hytHunter.focusTrack('${hn.id}')">
                                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${hn.color};"></span>
                                    <span>${hnTitle}</span>
                                    <button type="button" aria-label="Remove Track" onclick="event.stopPropagation(); window.hytHunter.removeTrackFromHook('${hn.id}');" style="background: none; border: none; cursor: pointer; color: inherit; padding: 0 2px; font-size: 0.88rem; line-height: 1; display: inline-flex; align-items: center; opacity: 0.75;" title="${isAr ? "إلغاء هذا المسار" : "Dismiss this track"}">✕</button>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                ${this.hookedNodes.length > 1 ? `
                    <button type="button" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;" onclick="window.hytHunter.clearAllHookedTracks()">
                        ${isAr ? "إلغاء تحديد الكل" : "Clear All"}
                    </button>
                ` : ""}
            </div>
        ` : "";

        panel.innerHTML = `
            ${trayHtml}
            <div class="hooked-track-header">
                <div>
                    <span class="badge-tag badge-remote" style="margin-bottom: 0.5rem; display: inline-flex; align-items: center;">
                        ${reticleSvg} ${isAr ? 'مسار نشط ومقفل في الرادار' : 'Locked Radar Track'} · ${faculty}
                    </span>
                    <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-foreground);">
                        ${title}
                    </h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.95rem; margin: 0; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                        ${clockSvg} <span>${duration}</span> · <span>${isAr ? 'منهج هرمي تفاعلي كامل وفق المعايير الأكاديمية' : 'Full interactive hierarchical syllabus aligned with enterprise benchmarks'}</span>
                    </p>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                    <a href="pages/auth.html" class="btn btn-primary" style="padding: 0.65rem 1.4rem;">
                        ${isAr ? 'بدء هذا المسار المهني' : 'Start This Track'}
                    </a>
                    <a href="#opportunities" class="btn btn-secondary" style="padding: 0.65rem 1.4rem;">
                        ${isAr ? 'التدريبات المرتبطة' : 'Matching Internships'}
                    </a>
                    <button type="button" class="btn btn-outline" onclick="window.hytHunter.toggleTrackHook('${node.id}')" style="padding: 0.65rem 1.1rem;">
                        ${isAr ? 'إلغاء التحديد' : 'Release Star'}
                    </button>
                </div>
            </div>

            <!-- Skills Gained Pills -->
            <div style="margin-top: 1rem;">
                <strong style="display: block; font-size: 0.88rem; margin-bottom: 0.6rem; color: var(--color-foreground);">
                    ${isAr ? 'المهارات والتقنيات الأساسية المكتسبة:' : 'Core Competencies & Skills Gained:'}
                </strong>
                <div class="skills-pill-group" style="margin-bottom: 1rem;">
                    ${(node.skills || []).map(s => `<span class="skill-pill" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${s}</span>`).join('')}
                </div>
            </div>

            <!-- Interactive Progress Bar -->
            <div class="roadmap-header-card" style="margin-top: 1.25rem;">
                <div style="flex: 1; min-width: 260px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: 700; font-size: 0.95rem; color: var(--color-foreground);">
                            ${isAr ? 'إنجاز خارطة الطريق التفاعلية:' : 'Interactive Roadmap Progression:'}
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
                    ${isAr ? 'انقر على أي بطاقة موضوع لتحديد الإنجاز والمتابعة الذاتية' : 'Click any topic card to mark as completed for self-paced tracking'}
                </div>
            </div>

            <!-- Interactive Visual Roadmap Graph -->
            <div class="roadmap-visual-graph">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">
                    <div>
                        <strong style="font-size: 1.05rem; color: var(--color-foreground);">
                            ${isAr ? 'المخطط البصري لخارطة الطريق (Visual Roadmap Flowchart)' : 'Visual Roadmap Graph (Interactive Node Flowchart)'}
                        </strong>
                        <span style="display: block; font-size: 0.8rem; color: var(--color-muted-foreground);">
                            ${isAr ? 'شبكة العقد والمهارات المتتابعة من البداية وحتى الجاهزية لسوق العمل' : 'Connected milestone progression from foundational theory to market readiness'}
                        </span>
                    </div>
                    <span class="badge-tag" style="background: rgba(16, 185, 129, 0.12); color: #10B981; font-weight: 700;">
                        ${isAr ? 'شبكة تفاعلية مترابطة' : 'Live Interconnected Nodes'}
                    </span>
                </div>

                <div class="roadmap-graph-timeline">
                    <div class="roadmap-graph-connector-line"></div>
                    ${syllabus.map((p) => `
                        <div class="roadmap-graph-node-col">
                            <div class="roadmap-graph-node-bubble" title="${isAr ? p.titleAr : p.titleEn}">
                                ${p.phase}
                            </div>
                            <div class="roadmap-graph-node-title">
                                ${isAr ? p.titleAr : p.titleEn}
                            </div>
                            <div class="roadmap-graph-node-desc">
                                ${isAr ? p.descAr : p.descEn}
                            </div>
                            <div class="roadmap-graph-subtopics">
                                ${p.nodes.map(n => {
                                    const isDone = completedTopics.includes(n.id);
                                    return `
                                        <div class="roadmap-graph-subtopic-pill ${isDone ? 'completed' : ''}" onclick="window.hytHunter.toggleTopicComplete('${node.id}', '${n.id}')" title="${isAr ? 'اضغط لتحديد الإنجاز' : 'Click to toggle completion'}">
                                            <span>${isAr ? n.titleAr : n.titleEn}</span>
                                            <span>${isDone ? '✓' : '○'}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Hierarchical Tree Syllabus -->
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
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }

    animate() {
        this.time += 0.016;

        // Smooth Mouse Damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Space Atmosphere & Swirling Stardust
        this.drawAtmosphere();

        // 2. Draw Galactic Accretion Disc & Logarithmic Spiral Arms
        this.drawAccretionCore();

        // 3. Draw Constellation Vector Networks (Faculty clusters)
        this.drawConstellations();

        // 4. Draw Quantum Laser Lock-On Beams to Hooked Nodes
        this.drawCosmicBeams();

        // 5. Draw 12 Stellar Career Track Nodes
        this.drawStellarTracks();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    getThemePalette() {
        switch (this.theme) {
            case 'reef':
                return {
                    coreGlow: 'rgba(16, 185, 129, 0.35)',
                    coreCenter: '#10B981',
                    spiral1: 'rgba(34, 211, 238, 0.22)',
                    spiral2: 'rgba(16, 185, 129, 0.18)',
                    textColor: '#E3F2EC',
                    mutedText: '#86A397',
                    hudColor: '#10B981'
                };
            case 'nebula':
                return {
                    coreGlow: 'rgba(167, 139, 250, 0.35)',
                    coreCenter: '#C084FC',
                    spiral1: 'rgba(192, 132, 252, 0.22)',
                    spiral2: 'rgba(129, 140, 248, 0.18)',
                    textColor: '#ECE8F7',
                    mutedText: '#9A93B3',
                    hudColor: '#C084FC'
                };
            case 'ember':
                return {
                    coreGlow: 'rgba(251, 146, 60, 0.35)',
                    coreCenter: '#F97316',
                    spiral1: 'rgba(251, 146, 60, 0.22)',
                    spiral2: 'rgba(239, 68, 68, 0.18)',
                    textColor: '#F5ECE3',
                    mutedText: '#AD9C8B',
                    hudColor: '#F97316'
                };
            case 'light':
            case 'daylight':
                return {
                    coreGlow: 'rgba(2, 132, 199, 0.25)',
                    coreCenter: '#0284C7',
                    spiral1: 'rgba(56, 189, 248, 0.20)',
                    spiral2: 'rgba(99, 102, 241, 0.15)',
                    textColor: '#090D16',
                    mutedText: '#64748B',
                    hudColor: '#0284C7'
                };
            case 'dark':
            case 'abyss':
            default:
                return {
                    coreGlow: 'rgba(0, 242, 254, 0.35)',
                    coreCenter: '#00F2FE',
                    spiral1: 'rgba(0, 242, 254, 0.24)',
                    spiral2: 'rgba(99, 102, 241, 0.22)',
                    textColor: '#F8FAFC',
                    mutedText: '#94A3B8',
                    hudColor: '#00F2FE'
                };
        }
    }

    drawAtmosphere() {
        const cx = this.width * 0.5;
        const cy = this.height * 0.46;
        const pal = this.getThemePalette();

        this.ctx.save();
        this.stardust.forEach(p => {
            // Orbital rotation
            p.angle += p.speed;

            // Compute Cartesian coordinates
            let px = cx + Math.cos(p.angle) * p.dist;
            let py = cy + Math.sin(p.angle) * p.dist * 0.65; // subtle elliptical tilt

            // Mouse gravity perturbation
            if (this.mouse.active) {
                const dx = this.mouse.x - px;
                const dy = this.mouse.y - py;
                const distToMouse = Math.hypot(dx, dy);
                if (distToMouse < 110 && distToMouse > 2) {
                    const force = (110 - distToMouse) / 110 * 1.5;
                    px += (dx / distToMouse) * force * 4;
                    py += (dy / distToMouse) * force * 4;
                }
            }

            // Draw drifting starlight particle
            this.ctx.beginPath();
            this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.colorShift > 0.5 ? pal.coreCenter : '#FFFFFF';
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fill();
        });
        this.ctx.restore();
    }

    drawAccretionCore() {
        // Free-floating celestial galaxy - zero central core
    }

    drawConstellations() {
        // Zero connecting lines between nodes as mandated by user UX directive!
        // Free-floating celestial track nodes orbiting Earth cleanly without web clutter.
    }

    drawCosmicBeams() {
        // Free-floating celestial stars - zero connecting beam lines
    }

    drawStellarTracks() {
        const pal = this.getThemePalette();
        const isAr = document.documentElement.lang === 'ar';

        this.nodes.forEach(n => {
            // Gentle Keplerian orbital bobbing
            n.x = n.baseX + Math.sin(this.time * 0.9 + n.id.charCodeAt(0)) * 4;
            n.y = n.baseY + Math.cos(this.time * 1.0 + n.id.charCodeAt(1)) * 3;

            const isHooked = this.hookedNodes.some(hn => hn.id === n.id);
            const isHovered = this.mouse.isHovering && Math.hypot(n.x - this.mouse.x, n.y - this.mouse.y) < 36;

            this.ctx.save();

            // 1. Star Beacon
            const beaconRadius = isHooked ? n.radius + 3 : n.radius;
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, beaconRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = isHooked ? '#FFFFFF' : n.color;
            this.ctx.shadowColor = n.color;
            this.ctx.shadowBlur = isHooked ? 20 : 8;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // 2. Beacon Corona Halo
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, beaconRadius * 2.2, 0, Math.PI * 2);
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? 'rgba(0, 242, 254, 0.25)' : 'rgba(2, 132, 199, 0.20)')
                : (this.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)');
            this.ctx.fill();

            // 3. Clean Floating Track Name Badge (Glass Pill) - ONLY TRACK NAME
            const trackTitle = isAr ? (n.labelAr || n.label) : (n.label || n.labelAr);
            this.ctx.font = isHooked ? 'bold 12px Inter, Cairo, sans-serif' : '500 11px Inter, Cairo, sans-serif';
            const textWidth = this.ctx.measureText(trackTitle).width;
            const badgeW = textWidth + 18;
            const badgeH = 22;
            const badgeX = n.x - badgeW / 2;
            const badgeY = n.y + beaconRadius + 7;

            // Pill Background
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)')
                : (this.isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.88)');
            this.ctx.strokeStyle = isHooked 
                ? n.color 
                : (this.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)');
            this.ctx.lineWidth = isHooked ? 1.5 : 1;

            this.ctx.beginPath();
            const r = 11;
            if (this.ctx.roundRect) {
                this.ctx.roundRect(badgeX, badgeY, badgeW, badgeH, r);
            } else {
                this.ctx.rect(badgeX, badgeY, badgeW, badgeH);
            }
            this.ctx.fill();
            this.ctx.stroke();

            // Track Name text (only the name, zero clutter!)
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? '#FFFFFF' : '#000000')
                : (this.isDark ? '#E2E8F0' : '#1E293B');
            this.ctx.fillText(trackTitle, n.x, badgeY + badgeH / 2);

            this.ctx.restore();
        });
    }

    drawTargetingHUD() {
        // Clean experience - zero telemetry clutter or focus brackets
    }

    initTypewriter() {
        const el = document.getElementById('hyt-typewriter');
        if (!el) return;

        const messagesEn = [
            "Stellar Radar: Tracking accredited internships across 5 university faculties...",
            "Mapping career constellations: Computing, Engineering, Science, Business & Law...",
            "Scanning student resume keywords with instant ATS match scoring...",
            "Connecting Damanhour University coursework with certified industry careers..."
        ];

        const messagesAr = [
            "رادار المجرة: تتبع فرص التدريب الصيفي المعتمدة لطلاب ٥ كليات جامعية...",
            "رسم خرائط المهن خطوة بخطوة: حاسبات، هندسة، علوم، تجارة، وحقوق...",
            "فحص ومطابقة الكلمات المفتاحية في السيرة الذاتية بنظام الـ ATS المعتمد...",
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
