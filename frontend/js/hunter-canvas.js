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
                faculty: 'computing',
                weeksEn: '12 Weeks',
                sector: 'ALPHA-01',
                telemetry: { ra: '19h 50m', dec: '+08° 52\'' },
                skills: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Vector DBs'],
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
                faculty: 'computing',
                weeksEn: '14 Weeks',
                sector: 'ALPHA-02',
                telemetry: { ra: '20h 14m', dec: '+12° 36\'' },
                skills: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'AWS'],
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
                faculty: 'computing',
                weeksEn: '10 Weeks',
                sector: 'ALPHA-03',
                telemetry: { ra: '21h 05m', dec: '+15° 20\'' },
                skills: ['Network Security', 'Wireshark', 'SIEM', 'Linux Hardening'],
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
                faculty: 'engineering',
                weeksEn: '14 Weeks',
                sector: 'BETA-01',
                telemetry: { ra: '05h 35m', dec: '-05° 23\'' },
                skills: ['ROS2', 'C++', 'Control Systems', 'SolidWorks', 'MATLAB'],
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
                faculty: 'engineering',
                weeksEn: '12 Weeks',
                sector: 'BETA-02',
                telemetry: { ra: '06h 45m', dec: '-16° 42\'' },
                skills: ['Embedded C', 'AUTOSAR', 'CAN-bus', 'RTOS', 'ARM Cortex'],
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
                faculty: 'engineering',
                weeksEn: '10 Weeks',
                sector: 'BETA-03',
                telemetry: { ra: '07h 12m', dec: '-18° 10\'' },
                skills: ['SCADA', 'Power Electronics', 'Solar PV', 'Smart Grid Protocols', 'MATLAB Simulink'],
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
                faculty: 'science',
                weeksEn: '10 Weeks',
                sector: 'GAMMA-01',
                telemetry: { ra: '12h 30m', dec: '+12° 23\'' },
                skills: ['Python', 'Biopython', 'Nextflow', 'BLAST', 'R/Bioconductor'],
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
                faculty: 'science',
                weeksEn: '8 Weeks',
                sector: 'GAMMA-02',
                telemetry: { ra: '13h 15m', dec: '+08° 10\'' },
                skills: ['Molecular Dynamics', 'GROMACS', 'PyMOL', 'QSAR'],
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
                faculty: 'business',
                weeksEn: '10 Weeks',
                sector: 'DELTA-01',
                telemetry: { ra: '14h 15m', dec: '+19° 11\'' },
                skills: ['Financial Modeling', 'Python Pandas', 'SQL', 'Risk Management'],
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
                faculty: 'business',
                weeksEn: '8 Weeks',
                sector: 'DELTA-02',
                telemetry: { ra: '15h 02m', dec: '+22° 45\'' },
                skills: ['Power BI', 'SQL Server', 'Tableau', 'DAX', 'Excel Advanced'],
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
                faculty: 'law',
                weeksEn: '8 Weeks',
                sector: 'EPSILON-01',
                telemetry: { ra: '16h 45m', dec: '-28° 02\'' },
                skills: ['Cybercrime Law', 'GDPR', 'Digital Evidence', 'Compliance'],
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
                faculty: 'law',
                weeksEn: '8 Weeks',
                sector: 'EPSILON-02',
                telemetry: { ra: '17h 20m', dec: '-32° 18\'' },
                skills: ['IP Law', 'Patents', 'Software Licensing', 'AI Ethics'],
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
            // Clean Initial State: No tracks auto-hooked by default (User explores freely)
            this.hookedNodes = [];
            this.renderHookedPanel(null);
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
        
        const count = this.hookedNodes.length;
        if (count === 0) {
            statusEl.textContent = 'Select any track node on the radar to lock on and view roadmap';
        } else {
            statusEl.textContent = `${count} track${count > 1 ? 's' : ''} locked · Click any star to hook or release`;
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
                    descEn: 'Master computational linear algebra, probability, and vectorized data structures.',
                    nodes: [
                        { id: 'ai-py', titleEn: 'Python OOP & Advanced Typing', descEn: 'Generators, decorators, dataclasses, asynchronous I/O' },
                        { id: 'ai-math', titleEn: 'Linear Algebra & Multivariable Calculus', descEn: 'Matrix decompositions, eigenvalues, gradients & partial derivatives' },
                        { id: 'ai-data', titleEn: 'Vectorized Data Wrangling (NumPy & Pandas)', descEn: 'Tensor reshaping, indexing, time-series & aggregation pipelines' },
                        { id: 'ai-sql', titleEn: 'Relational & Analytical SQL', descEn: 'Window functions, CTEs, indexing & data warehouse modeling' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Classical Machine Learning & Feature Science',
                    descEn: 'Design, train, and mathematically evaluate foundational machine learning algorithms.',
                    nodes: [
                        { id: 'ai-sup', titleEn: 'Supervised Learning & Regularization', descEn: 'Linear/Logistic regression, Ridge, Lasso, ElasticNet' },
                        { id: 'ai-tree', titleEn: 'Tree Ensembles & Gradient Boosting', descEn: 'Random Forests, XGBoost, LightGBM, CatBoost architectures' },
                        { id: 'ai-unsup', titleEn: 'Unsupervised Learning & Dimensionality Reduction', descEn: 'K-Means, DBSCAN, PCA, t-SNE & clustering metrics' },
                        { id: 'ai-eval', titleEn: 'Validation Strategies & Metric Engineering', descEn: 'Stratified K-Fold, ROC-AUC, PR-curves, calibration curves' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Deep Neural Architectures & PyTorch Ecosystem',
                    descEn: 'Construct artificial neural networks, backpropagation graphs, and spatial vision models.',
                    nodes: [
                        { id: 'ai-nn', titleEn: 'Neural Network Foundations & Backpropagation', descEn: 'Perceptrons, activation functions (GELU, Swish), AdamW optimization' },
                        { id: 'ai-torch', titleEn: 'PyTorch Tensor Graphs & Autograd Engine', descEn: 'Custom nn.Modules, Datasets, Dataloaders & GPU acceleration' },
                        { id: 'ai-cv', titleEn: 'Convolutional Vision & Object Detection', descEn: 'ResNet, EfficientNet, YOLOv10 object detection & segmentation' },
                        { id: 'ai-seq', titleEn: 'Sequential Modeling & Attention Prelude', descEn: 'Bidirectional LSTMs, GRUs, seq2seq models & encoder-decoder networks' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: Modern Generative AI, Transformers & LLM Engineering',
                    descEn: 'Architect self-attention transformers, fine-tune open models, and deploy RAG systems.',
                    nodes: [
                        { id: 'ai-trans', titleEn: 'Self-Attention & Transformer Mechanics', descEn: 'Multi-head attention, positional encoding, RoPE, KV-caching' },
                        { id: 'ai-rag', titleEn: 'Retrieval-Augmented Generation (RAG)', descEn: 'Vector embeddings, chunking, hybrid BM25 + dense search, Chroma/Pinecone' },
                        { id: 'ai-ft', titleEn: 'Efficient Parameter Fine-Tuning (PEFT/LoRA)', descEn: 'Quantization (4-bit/8-bit), instruct-tuning, alignment with DPO' },
                        { id: 'ai-agent', titleEn: 'Autonomous Agents & Tool Execution', descEn: 'ReAct loops, function calling, structured outputs, multi-agent frameworks' }
                    ]
                },
                {
                    phase: 5,
                    titleEn: 'Phase 5: MLOps, High-Throughput Serving & Production',
                    descEn: 'Deploy scalable AI inference microservices with monitoring and continuous retraining.',
                    nodes: [
                        { id: 'ai-serve', titleEn: 'High-Throughput Inference Engines', descEn: 'vLLM, Ollama, TensorRT-LLM, batching & speculative decoding' },
                        { id: 'ai-api', titleEn: 'FastAPI Production Inference Gateway', descEn: 'Asynchronous streaming endpoints, SSE, rate limiting & containerization' },
                        { id: 'ai-pipe', titleEn: 'CI/CD Pipeline & Experiment Tracking', descEn: 'MLflow registry, Weights & Biases, model drift & data versioning DVC' },
                        { id: 'ai-cloud', titleEn: 'Cloud Orchestration & Auto-Scaling', descEn: 'Kubernetes GPU pods, AWS SageMaker / GCP Vertex AI endpoints' }
                    ]
                }
            ],
            'cs-cloud': [
                {
                    phase: 1,
                    titleEn: 'Phase 1: Modern Full-Stack Foundations & TypeScript',
                    descEn: 'Type-safe frontend architecture, modern frameworks, and responsive design systems.',
                    nodes: [
                        { id: 'fs-ts', titleEn: 'TypeScript Enterprise Patterns', descEn: 'Generics, union discriminating, utility types & strict typing' },
                        { id: 'fs-react', titleEn: 'React Architecture & Server Components', descEn: 'Concurrent rendering, custom hooks, state stores, Next.js App Router' },
                        { id: 'fs-api', titleEn: 'API Design & Contract Protocols', descEn: 'OpenAPI specs, tRPC, GraphQL schemas & real-time WebSockets' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Backend Microservices & Distributed Data',
                    descEn: 'Design resilient microservice backends with transactional reliability and caching.',
                    nodes: [
                        { id: 'fs-node', titleEn: 'Scalable Node.js / Go Backend Services', descEn: 'Event loop tuning, goroutines, concurrency patterns & Clean Architecture' },
                        { id: 'fs-db', titleEn: 'Relational Database Optimization (PostgreSQL)', descEn: 'ACID transactions, B-Tree & GIN indexes, partitioning & connection pools' },
                        { id: 'fs-cache', titleEn: 'Distributed Caching & Messaging Queues', descEn: 'Redis cluster cache invalidation, RabbitMQ & Kafka streaming' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Containerization & Cloud Native Orchestration',
                    descEn: 'Containerize multi-service applications and deploy them to fault-tolerant clusters.',
                    nodes: [
                        { id: 'fs-dock', titleEn: 'Multi-Stage Docker Packaging', descEn: 'Minimal Alpine/Distroless images, build caching & rootless security' },
                        { id: 'fs-k8s', titleEn: 'Kubernetes Cluster Architecture', descEn: 'Deployments, Services, Ingress NGINX, ConfigMaps & StatefulSets' },
                        { id: 'fs-helm', titleEn: 'Helm Package Management & GitOps', descEn: 'Reusable Helm charts, ArgoCD automated synchronization' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: CI/CD Automation & Infrastructure as Code',
                    descEn: 'Automate build, test, security scans, and provision cloud resources declaratively.',
                    nodes: [
                        { id: 'fs-cicd', titleEn: 'Production GitHub Actions Pipelines', descEn: 'Matrix testing, caching, security scanning & zero-downtime deploy' },
                        { id: 'fs-iac', titleEn: 'Declarative Cloud with Terraform', descEn: 'VPC networks, EKS clusters, RDS databases & remote state locking' },
                        { id: 'fs-obs', titleEn: 'Observability, Metrics & SRE', descEn: 'Prometheus alerts, Grafana dashboards & OpenTelemetry distributed tracing' }
                    ]
                }
            ],
            'cs-sec': [
                {
                    phase: 1,
                    titleEn: 'Phase 1: Core Networking & OS Defense Fundamentals',
                    descEn: 'Deep understanding of packets, operating system kernels, and security baselines.',
                    nodes: [
                        { id: 'sec-net', titleEn: 'Deep Protocol & Packet Analysis', descEn: 'TCP/IP 3-way handshake, TLS 1.3 handshake, DNS & Wireshark triage' },
                        { id: 'sec-linux', titleEn: 'Linux Kernel & System Hardening', descEn: 'SELinux, AppArmor, PAM, auditd, SSH key defense & CIS benchmarks' }
                    ]
                },
                {
                    phase: 2,
                    titleEn: 'Phase 2: Security Operations (SOC) & Threat Telemetry',
                    descEn: 'Collect, correlate, and investigate enterprise security logs and intrusions.',
                    nodes: [
                        { id: 'sec-siem', titleEn: 'SIEM Deployment & Query Mastery (Splunk/ELK)', descEn: 'Log parsing, correlation rules, dashboard metrics & MITRE ATT&CK mapping' },
                        { id: 'sec-hunt', titleEn: 'Proactive Threat Hunting & EDR', descEn: 'Endpoint telemetry, process trees, Sysmon monitoring & Sigma rules' }
                    ]
                },
                {
                    phase: 3,
                    titleEn: 'Phase 3: Ethical Hacking & Defensive Hardening',
                    descEn: 'Simulate attacker tactics to identify and remediate security vulnerabilities.',
                    nodes: [
                        { id: 'sec-web', titleEn: 'Web Application Security (OWASP Top 10)', descEn: 'SQLi, XSS, SSRF, IDOR, authentication bypass & Burp Suite Pro' },
                        { id: 'sec-pen', titleEn: 'Network Penetration Testing & Pivoting', descEn: 'Port scanning Nmap, credential cracking, privilege escalation, Metasploit' }
                    ]
                },
                {
                    phase: 4,
                    titleEn: 'Phase 4: Digital Forensics & Incident Response (DFIR)',
                    descEn: 'Investigate breaches, preserve legal evidence, and neutralize advanced threats.',
                    nodes: [
                        { id: 'sec-foren', titleEn: 'Memory & Disk Forensic Analysis', descEn: 'RAM artifact triage with Volatility, filesystem timeline & chain of custody' },
                        { id: 'sec-ir', titleEn: 'Enterprise Incident Response Playbooks', descEn: 'Containment, eradication, ransomware recovery & post-mortem reporting' }
                    ]
                }
            ]
        };

        if (syllabi[node.id]) return syllabi[node.id];

        const skills = node.skills || ['Foundations', 'Tooling', 'Advanced Applications'];
        const milestonesEn = node.milestonesEn || ['Theoretical Foundations', 'Applied Tooling & Simulation', 'Complex Project Execution', 'Industry Standards & Deployment'];

        return [1, 2, 3, 4].map((phaseNum, i) => ({
            phase: phaseNum,
            titleEn: `Phase ${phaseNum}: ${milestonesEn[i] || 'Advanced Competency'}`,
            descEn: `Structured professional competencies and milestones aligned with corporate requirements.`,
            nodes: [
                {
                    id: `${node.id}-topic-${phaseNum}-a`,
                    titleEn: `${skills[i % skills.length] || 'Core Methodology'} Fundamentals`,
                    descEn: `Key theoretical frameworks and hands-on laboratory exercises.`
                },
                {
                    id: `${node.id}-topic-${phaseNum}-b`,
                    titleEn: `Applied Enterprise Tools & Practice`,
                    descEn: `Production tooling, automated test cases, and domain workflows.`
                },
                {
                    id: `${node.id}-topic-${phaseNum}-c`,
                    titleEn: `Industry Standards & Production Case Studies`,
                    descEn: `Enterprise execution protocols, quality validation, and deliverables.`
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

        
        const title = node.label;
        const faculty = node.faculty.toUpperCase();
        const duration = node.weeksEn || "12 Weeks";

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
                        "Selected Tracks (" + this.hookedNodes.length + "):"
                    </span>
                    <div style="display: flex; gap: 0.45rem; flex-wrap: wrap;">
                        ${this.hookedNodes.map(hn => {
                            const hnTitle = hn.label;
                            const isActive = (hn.id === node.id);
                            return `
                                <div class="selected-track-pill" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 999px; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; background: ${isActive ? "rgba(99, 102, 241, 0.2)" : "var(--color-muted)"}; border: 1px solid ${isActive ? hn.color : "var(--color-border)"}; color: ${isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)"};" onclick="window.hytHunter.focusTrack('${hn.id}')">
                                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${hn.color};"></span>
                                    <span>${hnTitle}</span>
                                    <button type="button" aria-label="Remove Track" onclick="event.stopPropagation(); window.hytHunter.removeTrackFromHook('${hn.id}');" style="background: none; border: none; cursor: pointer; color: inherit; padding: 0 2px; font-size: 0.88rem; line-height: 1; display: inline-flex; align-items: center; opacity: 0.75;" title="Dismiss this track">✕</button>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                ${this.hookedNodes.length > 1 ? `
                    <button type="button" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;" onclick="window.hytHunter.clearAllHookedTracks()">
                        Clear All
                    </button>
                ` : ""}
            </div>
        ` : "";

        panel.innerHTML = `
            ${trayHtml}
            <div class="hooked-track-header">
                <div>
                    <span class="badge-tag badge-remote" style="margin-bottom: 0.5rem; display: inline-flex; align-items: center;">
                        ${reticleSvg} Locked Radar Track · ${faculty}
                    </span>
                    <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-foreground);">
                        ${title}
                    </h3>
                    <p style="color: var(--color-muted-foreground); font-size: 0.95rem; margin: 0; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                        ${clockSvg} <span>${duration}</span> · <span>Full interactive hierarchical syllabus aligned with enterprise benchmarks</span>
                    </p>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                    <a href="pages/auth.html" class="btn btn-primary" style="padding: 0.65rem 1.4rem;">
                        Start This Track
                    </a>
                    <a href="#opportunities" class="btn btn-secondary" style="padding: 0.65rem 1.4rem;">
                        Matching Internships
                    </a>
                    <button type="button" class="btn btn-outline" onclick="window.hytHunter.toggleTrackHook('${node.id}')" style="padding: 0.65rem 1.1rem;">
                        Release Star
                    </button>
                </div>
            </div>

            <!-- Skills Gained Pills -->
            <div style="margin-top: 1rem;">
                <strong style="display: block; font-size: 0.88rem; margin-bottom: 0.6rem; color: var(--color-foreground);">
                    Core Competencies & Skills Gained:
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
                            Interactive Roadmap Progression:
                        </span>
                        <span style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary); font-family: monospace;">
                            ${completedCount} / ${totalTopics} Topics (${progressPercent}%)
                        </span>
                    </div>
                    <div style="width: 100%; height: 10px; background: var(--color-border); border-radius: 999px; overflow: hidden;">
                        <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #00F2FE, #6366F1); border-radius: 999px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--color-muted-foreground);">
                    Click any topic card to mark as completed for self-paced tracking
                </div>
            </div>

            <!-- Interactive Visual Roadmap Graph -->
            <div class="roadmap-visual-graph">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem;">
                    <div>
                        <strong style="font-size: 1.05rem; color: var(--color-foreground);">
                            Visual Roadmap Graph (Interactive Node Flowchart)
                        </strong>
                        <span style="display: block; font-size: 0.8rem; color: var(--color-muted-foreground);">
                            Connected milestone progression from foundational theory to market readiness
                        </span>
                    </div>
                    <span class="badge-tag" style="background: rgba(16, 185, 129, 0.12); color: #10B981; font-weight: 700;">
                        Live Interconnected Nodes
                    </span>
                </div>

                <div class="roadmap-graph-timeline">
                    <div class="roadmap-graph-connector-line"></div>
                    ${syllabus.map((p) => `
                        <div class="roadmap-graph-node-col">
                            <div class="roadmap-graph-node-bubble" title="${p.titleEn}">
                                ${p.phase}
                            </div>
                            <div class="roadmap-graph-node-title">
                                ${p.titleEn}
                            </div>
                            <div class="roadmap-graph-node-desc">
                                ${p.descEn}
                            </div>
                            <div class="roadmap-graph-subtopics">
                                ${p.nodes.map(n => {
                                    const isDone = completedTopics.includes(n.id);
                                    return `
                                        <div class="roadmap-graph-subtopic-pill ${isDone ? 'completed' : ''}" onclick="window.hytHunter.toggleTopicComplete('${node.id}', '${n.id}')" title="Click to toggle completion">
                                            <span>${n.titleEn}</span>
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
                                        ${p.titleEn}
                                    </h4>
                                    <p style="font-size: 0.82rem; color: var(--color-muted-foreground); margin: 0.2rem 0 0;">
                                        ${p.descEn}
                                    </p>
                                </div>
                            </div>
                            <span class="badge-tag" style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.1); color: var(--color-primary);">
                                ${p.nodes.length} Key Modules
                            </span>
                        </div>

                        <div class="roadmap-node-grid">
                            ${p.nodes.map(n => {
                                const isDone = completedTopics.includes(n.id);
                                return `
                                    <div class="roadmap-node-card ${isDone ? 'completed' : ''}" onclick="window.hytHunter.toggleTopicComplete('${node.id}', '${n.id}')">
                                        <div class="roadmap-checkbox">${isDone ? '✓' : ''}</div>
                                        <div class="roadmap-node-content">
                                            <div class="roadmap-node-title">${n.titleEn}</div>
                                            <div class="roadmap-node-desc">${n.descEn}</div>
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
        if (window.init3DTiltCards) window.init3DTiltCards();
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
            const trackTitle = n.label;
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
            "Galaxy Radar: Tracking accredited summer internship opportunities across 5 university faculties...",
            "Career Roadmapping Step-by-Step: Computing, Engineering, Science, Business, and Law...",
            "ATS-Validated Resume Parsing and Keyword Alignment Engine...",
            "Bridging University Curricula with Enterprise Market Standards..."
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
