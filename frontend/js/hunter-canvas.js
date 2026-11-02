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
        this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

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
            this.isDark = e.detail.theme === 'dark';
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
        // Floating anti-gravity stardust
        this.stardust = Array.from({ length: 65 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2 + 0.8,
            speedY: (Math.random() * 0.25 + 0.08) * -1, // gentle upward float (anti-gravity)
            speedX: (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.7 + 0.3,
            pulse: Math.random() * Math.PI * 2,
            z: Math.random() * 0.8 + 0.2
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

    searchTrack(query) {
        this.searchQuery = (query || '').toLowerCase().trim();
        this.updateHookedNodes();
    }

    updateHookedNodes() {
        if (this.searchQuery) {
            this.hookedNodes = this.nodes.filter(n => 
                n.label.toLowerCase().includes(this.searchQuery) ||
                n.faculty.toLowerCase().includes(this.searchQuery)
            );
        } else if (this.activeFaculty !== 'all') {
            this.hookedNodes = this.nodes.filter(n => n.faculty === this.activeFaculty);
        } else {
            // Default: Hook top primary tracks across major faculties simultaneously!
            this.hookedNodes = [
                this.nodes.find(n => n.id === 'cs-ai'),
                this.nodes.find(n => n.id === 'cs-cloud'),
                this.nodes.find(n => n.id === 'eng-mecha'),
                this.nodes.find(n => n.id === 'bus-fintech')
            ].filter(Boolean);
        }
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
        const milestones = isAr ? node.milestonesAr : node.milestonesEn;

        panel.innerHTML = `
            <div class="hooked-track-header">
                <div>
                    <span class="badge-tag badge-remote" style="margin-bottom: 0.5rem; display: inline-block;">
                        ${isAr ? '🎣 مسار مصطاد حالياً' : '🎣 Active Hooked Track'} · ${faculty}
                    </span>
                    <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-foreground);">
                        ${title}
                    </h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.95rem; margin: 0;">
                        ⏱️ ${duration} · ${isAr ? 'منهج معتمد ومربوط بمتطلبات التوظيف والتدريب الصيفي' : 'Accredited curriculum aligned with corporate hiring prerequisites'}
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

            <div>
                <strong style="display: block; font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--color-foreground);">
                    ${isAr ? '🛠️ المهارات والتقنيات الأساسية المكتسبة:' : '🛠️ Core Competencies & Skills Gained:'}
                </strong>
                <div class="skills-pill-group" style="margin-bottom: 1.5rem;">
                    ${(node.skills || []).map(s => `<span class="skill-pill" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${s}</span>`).join('')}
                </div>
            </div>

            <div>
                <strong style="display: block; font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--color-foreground);">
                    ${isAr ? '🗺️ خطوات وخارطة طريق المسار (4 محطات رئيسية):' : '🗺️ Career Track Milestone Roadmap (4 Key Stages):'}
                </strong>
                <div class="hooked-milestones-grid">
                    ${(milestones || []).map((m, i) => `
                        <div class="milestone-step-box">
                            <span class="milestone-step-num">${i + 1}</span>
                            <div>
                                <strong style="display: block; font-size: 0.88rem; color: var(--color-foreground); margin-bottom: 0.25rem;">
                                    ${isAr ? `المرحلة ${i + 1}` : `Stage ${i + 1}`}
                                </strong>
                                <span style="font-size: 0.82rem; color: var(--color-muted-foreground); line-height: 1.4; display: block;">
                                    ${m}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
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

    drawAtmosphere() {
        // Deep background gradient
        const bgGrad = this.ctx.createRadialGradient(
            this.width / 2, this.height * 0.35, 20,
            this.width / 2, this.height * 0.5, this.width * 0.75
        );
        if (this.isDark) {
            bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
            bgGrad.addColorStop(0.5, 'rgba(10, 15, 29, 0.98)');
            bgGrad.addColorStop(1, 'rgba(5, 7, 14, 1)');
        } else {
            bgGrad.addColorStop(0, 'rgba(238, 242, 255, 0.95)');
            bgGrad.addColorStop(0.5, 'rgba(224, 231, 255, 0.9)');
            bgGrad.addColorStop(1, 'rgba(248, 250, 252, 1)');
        }
        this.ctx.fillStyle = bgGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Anti-Gravity Floating Stardust Particles
        this.stardust.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.pulse += 0.02;

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

            const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.isDark ? `rgba(147, 197, 253, ${alpha})` : `rgba(99, 102, 241, ${alpha * 0.7})`;
            this.ctx.fill();
        });
    }

    drawClouds(isBack) {
        const parallaxX = (this.mouse.x - this.width / 2) * (isBack ? 0.02 : 0.05);
        const parallaxY = (this.mouse.y - this.height / 2) * (isBack ? 0.015 : 0.04);

        this.clouds.forEach((c, idx) => {
            if (isBack && idx >= 3) return;
            if (!isBack && idx < 3) return;

            const cx = c.xRel * this.width + Math.sin(this.time * c.speed + c.phase) * 14 + parallaxX;
            const cy = c.yRel * this.height + Math.cos(this.time * c.speed + c.phase) * 6 + parallaxY;

            const cloudGrad = this.ctx.createRadialGradient(cx, cy, 5, cx, cy, c.r);
            if (this.isDark) {
                cloudGrad.addColorStop(0, `rgba(56, 189, 248, ${c.opacity})`);
                cloudGrad.addColorStop(0.6, `rgba(30, 41, 59, ${c.opacity * 0.5})`);
                cloudGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
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

        this.ctx.fillStyle = this.isDark ? '#030712' : '#1E1B4B';

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
        this.ctx.strokeStyle = this.isDark ? '#030712' : '#1E1B4B';
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

            // Node Glow
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? 'rgba(0, 242, 254, 0.25)' : 'rgba(99, 102, 241, 0.2)')
                : 'rgba(100, 116, 139, 0.08)';
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
            this.ctx.fillStyle = isHooked 
                ? (this.isDark ? '#F8FAFC' : '#0F172A')
                : (this.isDark ? '#94A3B8' : '#64748B');
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
