/**
 * HuntYourTrack — Unified Class Central + Internships Catalog & State Store (US40)
 * Centralizes multi-provider free MOOCs, corporate internships, favorites, enrollments,
 * onboarding preferences, and deadline notifications across all 9 connected screens.
 */
(function (window) {
    'use strict';

    const FAVORITES_KEY = 'hyt_favorites_v1';
    const ENROLLED_KEY = 'hyt_enrolled_courses_v1';
    const ONBOARDING_KEY = 'hyt_onboarding_prefs_v1';
    const NOTIF_READ_KEY = 'hyt_notifications_read_v1';

    const FULL_COURSES_CATALOG = [
    {
        "id": "course-ai-01",
        "title": "Machine Learning Specialization",
        "provider": "DeepLearning.AI & Stanford Online",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "8 weeks (4-6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.9,
        "reviewsCount": 4280,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/specializations/machine-learning-introduction",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supervised Learning",
            "Python",
            "NumPy",
            "Neural Networks",
            "Decision Trees"
        ],
        "syllabus": [
            "Week 1-2: Supervised Machine Learning: Regression & Classification",
            "Week 3-5: Advanced Learning Algorithms & Neural Networks",
            "Week 6-8: Unsupervised Learning, Recommenders & Reinforcement Learning"
        ],
        "description": "Master foundational machine learning concepts and apply these techniques to build real-world AI applications taught by Andrew Ng."
    },
    {
        "id": "course-ai-02",
        "title": "CS50's Introduction to Artificial Intelligence with Python",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "7 weeks (10-15 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Certificate / Audit",
        "rating": 4.8,
        "reviewsCount": 3150,
        "language": "English",
        "enrollmentUrl": "https://cs50.harvard.edu/ai/",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Graph Search",
            "Knowledge Representation",
            "Bayesian Networks",
            "NLP",
            "PyTorch"
        ],
        "syllabus": [
            "Module 1: Search Algorithms (BFS, DFS, A*, Minimax)",
            "Module 2: Knowledge, Logic & Uncertainty",
            "Module 3: Optimization, Machine Learning & Neural Networks",
            "Module 4: Natural Language Processing & Transformers"
        ],
        "description": "Learn to use machine learning in Python in this introductory Harvard course on the algorithms at the foundation of modern AI."
    },
    {
        "id": "course-ai-03",
        "title": "Deep Learning Specialization (Neural Networks & CNNs)",
        "provider": "DeepLearning.AI",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "10 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.9,
        "reviewsCount": 5120,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/specializations/deep-learning",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Deep Learning",
            "TensorFlow",
            "CNNs",
            "RNNs",
            "Transformers"
        ],
        "syllabus": [
            "Course 1: Neural Networks and Deep Learning",
            "Course 2: Improving Deep Neural Networks: Hyperparameter Tuning",
            "Course 3: Convolutional Neural Networks for Vision",
            "Course 4: Sequence Models & Attention Mechanisms"
        ],
        "description": "Build and train deep neural networks, identify key architecture parameters, and master CNNs and sequence models."
    },
    {
        "id": "course-sec-01",
        "title": "Google Cybersecurity Professional Certificate",
        "provider": "Google Career Certificates",
        "platform": "Coursera",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "12 weeks (7 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Financial Aid",
        "rating": 4.8,
        "reviewsCount": 2940,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/professional-certificates/google-cybersecurity",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Linux",
            "SQL",
            "SIEM Tools",
            "Python Security",
            "Incident Response"
        ],
        "syllabus": [
            "Foundations of Cybersecurity & Risk Management",
            "Networks, Firewalls & Intrusion Detection",
            "Linux, SQL & SIEM Log Analysis",
            "Automated Incident Response with Python"
        ],
        "description": "Prepare for an entry-level SOC analyst role by identifying common threats, mitigating vulnerabilities, and using SIEM tools."
    },
    {
        "id": "course-sec-02",
        "title": "Network Security & Incident Triage",
        "provider": "Cisco Networking Academy",
        "platform": "NetAcad",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "8 weeks (3-5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Digital Badge Included",
        "rating": 4.7,
        "reviewsCount": 1820,
        "language": "English",
        "enrollmentUrl": "https://www.netacad.com/courses/cybersecurity",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Wireshark",
            "Firewalls",
            "Packet Analysis",
            "Zero Trust",
            "SOC"
        ],
        "syllabus": [
            "Network Protocols & Packet Inspection with Wireshark",
            "Endpoint & Perimeter Defense",
            "Security Operations & Threat Triage"
        ],
        "description": "Learn practical packet analysis with Wireshark, firewall configuration, and security operations center (SOC) incident response."
    },
    {
        "id": "course-cloud-01",
        "title": "Introduction to Linux (LFS101x)",
        "provider": "The Linux Foundation",
        "platform": "edX",
        "track": "cloud-devops",
        "faculty": "computers-ai",
        "duration": "14 weeks (5-7 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.7,
        "reviewsCount": 2410,
        "language": "English",
        "enrollmentUrl": "https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Linux CLI",
            "Bash Scripting",
            "File Systems",
            "Networking",
            "System Admin"
        ],
        "syllabus": [
            "Linux Philosophy, Boot Process & Distributions",
            "Command Line Operations & Shell Scripting",
            "User Management, Permissions & Networking"
        ],
        "description": "Develop a good working knowledge of Linux using both the graphical interface and command line across major distributions."
    },
    {
        "id": "course-web-01",
        "title": "Full Stack Open (Modern Web Development)",
        "provider": "University of Helsinki",
        "platform": "FullStackOpen",
        "track": "fullstack-web",
        "faculty": "computers-ai",
        "duration": "12 weeks (10-15 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "100% Free Verified Certificate",
        "rating": 4.95,
        "reviewsCount": 3890,
        "language": "English",
        "enrollmentUrl": "https://fullstackopen.com/en/",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "React",
            "Node.js",
            "Express",
            "TypeScript",
            "GraphQL",
            "CI/CD"
        ],
        "syllabus": [
            "Parts 0-2: Fundamentals of Web Apps, React & Server Communication",
            "Parts 3-5: Node.js, Express, MongoDB & End-to-End Testing",
            "Parts 6-9: State Management, GraphQL & TypeScript",
            "Parts 10-13: CI/CD Pipelines, Containers & Relational Databases"
        ],
        "description": "Deep dive into modern JavaScript-based web development: React, Redux, Node.js, Express, REST APIs, GraphQL, and TypeScript."
    },
    {
        "id": "course-web-02",
        "title": "CS50's Web Programming with Python and JavaScript",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "fullstack-web",
        "faculty": "computers-ai",
        "duration": "12 weeks (6-9 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Certificate Available",
        "rating": 4.9,
        "reviewsCount": 4650,
        "language": "English",
        "enrollmentUrl": "https://cs50.harvard.edu/web/",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "HTML5/CSS3",
            "JavaScript",
            "Python",
            "Django",
            "SQL",
            "CI/CD"
        ],
        "syllabus": [
            "HTML, CSS, Responsive Design & Git",
            "Python, Django & SQL Data Models",
            "JavaScript, User Interfaces & Testing/CI-CD"
        ],
        "description": "Pick up where CS50 leaves off, diving more deeply into the design and implementation of scalable web apps with Python, JS, and SQL."
    },
    {
        "id": "course-cs-01",
        "title": "Algorithms, Part I",
        "provider": "Princeton University",
        "platform": "Coursera",
        "track": "fullstack-web",
        "faculty": "computers-ai",
        "duration": "6 weeks (6-10 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "100% Free Open Course",
        "rating": 4.9,
        "reviewsCount": 3420,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/learn/algorithms-part1",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Data Structures",
            "Sorting",
            "Binary Search Trees",
            "Hash Tables",
            "Java"
        ],
        "syllabus": [
            "Union-Find & Analysis of Algorithms",
            "Stacks, Queues, Mergesort & Quicksort",
            "Priority Queues & Balanced Search Trees"
        ],
        "description": "Essential information every serious programmer needs to know about algorithms and data structures, emphasizing real-world performance."
    },
    {
        "id": "course-eng-01",
        "title": "Introduction to Embedded Systems & IoT",
        "provider": "University of California, Irvine",
        "platform": "Coursera",
        "track": "embedded-iot",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.7,
        "reviewsCount": 1540,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/learn/iot",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "Microcontrollers",
            "IoT Protocols",
            "Sensors",
            "RTOS"
        ],
        "syllabus": [
            "Embedded Systems Architecture & Hardware Interfaces",
            "Microcontroller Programming & Interrupts",
            "IoT Networking & Real-Time Constraints"
        ],
        "description": "Explore the role of microcontrollers, sensors, and embedded software in building connected automotive and industrial IoT devices."
    },
    {
        "id": "course-eng-02",
        "title": "Solar Energy Engineering: Photovoltaic Systems",
        "provider": "TU Delft",
        "platform": "edX",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "8 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.8,
        "reviewsCount": 1290,
        "language": "English",
        "enrollmentUrl": "https://www.edx.org/learn/solar-energy/delft-university-of-technology-solar-energy",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Photovoltaics",
            "Smart Grids",
            "Power Electronics",
            "Energy Storage"
        ],
        "syllabus": [
            "Solar Radiation & Semiconductor Physics",
            "PV Cell Technologies & System Design",
            "Grid Integration & Energy Storage"
        ],
        "description": "Learn how to design complete photovoltaic solar energy systems, from semiconductor physics to utility-scale grid integration."
    },
    {
        "id": "course-biz-01",
        "title": "Financial Markets",
        "provider": "Yale University",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "7 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.85,
        "reviewsCount": 5600,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/learn/financial-markets-global",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Risk Management",
            "Behavioral Finance",
            "FinTech",
            "Capital Markets"
        ],
        "syllabus": [
            "Financial Markets, Probability & Risk Management",
            "Behavioral Finance & Market Efficiency",
            "Banking, Insurance & Modern FinTech Regulation"
        ],
        "description": "An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise, by Nobel laureate Robert Shiller."
    },
    {
        "id": "course-biz-02",
        "title": "Business Analytics & Data-Driven Decision Making",
        "provider": "Wharton, University of Pennsylvania",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "6 weeks (3-4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.7,
        "reviewsCount": 2110,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/specializations/business-analytics",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Customer Analytics",
            "Forecasting",
            "SQL",
            "PowerBI",
            "KPIs"
        ],
        "syllabus": [
            "Descriptive & Predictive Customer Analytics",
            "Operations & People Analytics",
            "Financial Modeling & Executive Dashboards"
        ],
        "description": "Use big data analytics to make strategic business, financial, and operational decisions across modern enterprises."
    },
    {
        "id": "course-sci-01",
        "title": "Introduction to Genomic Technologies & Bioinformatics",
        "provider": "Johns Hopkins University",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "4 weeks (4-5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit Available",
        "rating": 4.75,
        "reviewsCount": 1480,
        "language": "English",
        "enrollmentUrl": "https://www.coursera.org/learn/introduction-genomics",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Genomics",
            "Python",
            "Bioconductor",
            "Sequence Alignment"
        ],
        "syllabus": [
            "Molecular Biology & Sequencing Technologies",
            "Computational Genomics & Data Pipelines",
            "Applied Bioinformatics Case Studies"
        ],
        "description": "Introduces the basic biology of modern genomics and the computational tools used to measure and analyze DNA/RNA sequences."
    },
    {
        "id": "course-law-01",
        "title": "CS50 for Lawyers: Technology, Privacy & Law",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "10 weeks (3-6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Certificate / Audit",
        "rating": 4.9,
        "reviewsCount": 1950,
        "language": "English",
        "enrollmentUrl": "https://cs50.harvard.edu/law/",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cybersecurity Law",
            "Data Privacy",
            "Smart Contracts",
            "IP Regulation"
        ],
        "syllabus": [
            "Computational Thinking & Programming Challenges",
            "Cryptography, Cybersecurity & Digital Forensics",
            "Databases, Privacy Compliance & Technology Regulation"
        ],
        "description": "Formulate technology-informed legal arguments and understand cybersecurity, privacy, and software systems from a legal perspective."
    },
    {
        "id": "course-ext-016",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Technical University of Munich",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1235,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-017",
        "title": "Mastering Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "UC Berkeley",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1264,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-018",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "Johns Hopkins University",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1293,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-019",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "ETH Zurich",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1322,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-020",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "University of Cambridge",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1351,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-021",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "University of Oxford",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1380,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-022",
        "title": "Introduction to Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "Columbia University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1409,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-023",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "Google Career Certificates",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1438,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-024",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Harvard University",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1467,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-025",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Stanford Online",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1496,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-026",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1525,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-027",
        "title": "Advanced PLC Automation & Industrial SCADA Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1554,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-028",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1583,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-029",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Microsoft Learn",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1612,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-030",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "The Linux Foundation",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1641,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-031",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1670,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-032",
        "title": "Mastering VLSI & Digital ASIC Architecture Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "edX",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1699,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-033",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "Yale University",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1728,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-034",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1757,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-035",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Princeton University",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1786,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-036",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Imperial College London",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1815,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-037",
        "title": "Introduction to Wind Turbine Power Aerodynamics Specialization",
        "provider": "TU Delft",
        "platform": "Coursera",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1844,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-038",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "Technical University of Munich",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1873,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-039",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "UC Berkeley",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1902,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-040",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Johns Hopkins University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1931,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-041",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "ETH Zurich",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1960,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-042",
        "title": "Advanced Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "University of Cambridge",
        "platform": "Stanford Online",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1989,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-043",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "University of Oxford",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2018,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-044",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Columbia University",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2047,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-045",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Google Career Certificates",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2076,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-046",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Harvard University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2105,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-047",
        "title": "Mastering Robotics Kinematics with ROS2 Specialization",
        "provider": "Stanford Online",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2134,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-048",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2163,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-049",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2192,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-050",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2221,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-051",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "Microsoft Learn",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2250,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-052",
        "title": "Introduction to Solar Photovoltaic Grid Systems Specialization",
        "provider": "The Linux Foundation",
        "platform": "YouTube / FreeCodeCamp",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2279,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-053",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2308,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-054",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2337,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-055",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Yale University",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2366,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-056",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2395,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-057",
        "title": "Advanced Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "Princeton University",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2424,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-058",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Imperial College London",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2453,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-059",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "TU Delft",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2482,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-060",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Technical University of Munich",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2511,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-061",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "UC Berkeley",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2540,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-062",
        "title": "Mastering Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "Johns Hopkins University",
        "platform": "edX",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2569,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-063",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "ETH Zurich",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2598,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-064",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "University of Cambridge",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2627,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-065",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "University of Oxford",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2656,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-066",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Columbia University",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2685,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-067",
        "title": "Introduction to PLC Automation & Industrial SCADA Specialization",
        "provider": "Google Career Certificates",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2714,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-068",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2743,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-069",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Stanford Online",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2772,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-070",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2801,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-071",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2830,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-072",
        "title": "Advanced VLSI & Digital ASIC Architecture Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "Stanford Online",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 2859,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-073",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "Microsoft Learn",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 2888,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-074",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "The Linux Foundation",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 2917,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-075",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 2946,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-076",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 2975,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-077",
        "title": "Mastering Wind Turbine Power Aerodynamics Specialization",
        "provider": "Yale University",
        "platform": "Udacity",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3004,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-078",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3033,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-079",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Princeton University",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3062,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-080",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Imperial College London",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3091,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-081",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "TU Delft",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3120,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-082",
        "title": "Introduction to Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "Technical University of Munich",
        "platform": "YouTube / FreeCodeCamp",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3149,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-083",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "UC Berkeley",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3178,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-084",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Johns Hopkins University",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3207,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-085",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "ETH Zurich",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3236,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-086",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "University of Cambridge",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3265,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-087",
        "title": "Advanced Robotics Kinematics with ROS2 Specialization",
        "provider": "University of Oxford",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3294,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-088",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Columbia University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3323,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-089",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Google Career Certificates",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3352,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-090",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Harvard University",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3381,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-091",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "Stanford Online",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3410,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-092",
        "title": "Mastering Solar Photovoltaic Grid Systems Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "edX",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3439,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-093",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3468,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-094",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3497,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-095",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Microsoft Learn",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3526,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-096",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "The Linux Foundation",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3555,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-097",
        "title": "Introduction to Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3584,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-098",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3613,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-099",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Yale University",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3642,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-100",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3671,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-101",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "Princeton University",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3700,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-102",
        "title": "Advanced Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "Imperial College London",
        "platform": "Stanford Online",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3729,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-103",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "TU Delft",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3758,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-104",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Technical University of Munich",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3787,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-105",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "UC Berkeley",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3816,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-106",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Johns Hopkins University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3845,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-107",
        "title": "Mastering PLC Automation & Industrial SCADA Specialization",
        "provider": "ETH Zurich",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 3874,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-108",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "University of Cambridge",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 3903,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-109",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "University of Oxford",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 3932,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-110",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Columbia University",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 3961,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-111",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "Google Career Certificates",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 3990,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-112",
        "title": "Introduction to VLSI & Digital ASIC Architecture Specialization",
        "provider": "Harvard University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4019,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-113",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "Stanford Online",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4048,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-114",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4077,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-115",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4106,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-116",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4135,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-117",
        "title": "Advanced Wind Turbine Power Aerodynamics Specialization",
        "provider": "Microsoft Learn",
        "platform": "Class Central",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4164,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-118",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "The Linux Foundation",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4193,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-119",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4222,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-120",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4251,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-121",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "Yale University",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4280,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-122",
        "title": "Mastering Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "edX",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4309,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-123",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "Princeton University",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4338,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-124",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Imperial College London",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4367,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-125",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "TU Delft",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4396,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-126",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Technical University of Munich",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4425,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-127",
        "title": "Introduction to Robotics Kinematics with ROS2 Specialization",
        "provider": "UC Berkeley",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4454,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-128",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "Johns Hopkins University",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4483,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-129",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "ETH Zurich",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4512,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-130",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "University of Cambridge",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4541,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-131",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "University of Oxford",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4570,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-132",
        "title": "Advanced Solar Photovoltaic Grid Systems Specialization",
        "provider": "Columbia University",
        "platform": "Stanford Online",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4599,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-133",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "Google Career Certificates",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4628,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-134",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4657,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-135",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Stanford Online",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4686,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-136",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4715,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-137",
        "title": "Mastering Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4744,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-138",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4773,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-139",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Microsoft Learn",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4802,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-140",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "The Linux Foundation",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4831,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-141",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 4860,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-142",
        "title": "Introduction to Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "YouTube / FreeCodeCamp",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 4889,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-143",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "Yale University",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 4918,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-144",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 4947,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-145",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Princeton University",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 4976,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-146",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Imperial College London",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5005,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-147",
        "title": "Advanced PLC Automation & Industrial SCADA Specialization",
        "provider": "TU Delft",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5034,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-148",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Technical University of Munich",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5063,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-149",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "UC Berkeley",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5092,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-150",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Johns Hopkins University",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5121,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-151",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "ETH Zurich",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5150,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-152",
        "title": "Mastering VLSI & Digital ASIC Architecture Specialization",
        "provider": "University of Cambridge",
        "platform": "edX",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5179,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-153",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "University of Oxford",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5208,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-154",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Columbia University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5237,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-155",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Google Career Certificates",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5266,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-156",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Harvard University",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5295,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-157",
        "title": "Introduction to Wind Turbine Power Aerodynamics Specialization",
        "provider": "Stanford Online",
        "platform": "Coursera",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5324,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-158",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5353,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-159",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5382,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-160",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5411,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-161",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "Microsoft Learn",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5440,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-162",
        "title": "Advanced Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "The Linux Foundation",
        "platform": "Stanford Online",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5469,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-163",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5498,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-164",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5527,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-165",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Yale University",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5556,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-166",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5585,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-167",
        "title": "Mastering Robotics Kinematics with ROS2 Specialization",
        "provider": "Princeton University",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5614,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-168",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "Imperial College London",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5643,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-169",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "TU Delft",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5672,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-170",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Technical University of Munich",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5701,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-171",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "UC Berkeley",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5730,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-172",
        "title": "Introduction to Solar Photovoltaic Grid Systems Specialization",
        "provider": "Johns Hopkins University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5759,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-173",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "ETH Zurich",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5788,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-174",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "University of Cambridge",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5817,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-175",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "University of Oxford",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5846,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-176",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Columbia University",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 5875,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-177",
        "title": "Advanced Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "Google Career Certificates",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 5904,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-178",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Harvard University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 5933,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-179",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Stanford Online",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 5962,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-180",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 5991,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-181",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6020,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-182",
        "title": "Mastering Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "edX",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6049,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-183",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "Microsoft Learn",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6078,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-184",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "The Linux Foundation",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6107,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-185",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6136,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-186",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6165,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-187",
        "title": "Introduction to PLC Automation & Industrial SCADA Specialization",
        "provider": "Yale University",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6194,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-188",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6223,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-189",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Princeton University",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6252,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-190",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Imperial College London",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6281,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-191",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "TU Delft",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6310,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-192",
        "title": "Advanced VLSI & Digital ASIC Architecture Specialization",
        "provider": "Technical University of Munich",
        "platform": "Stanford Online",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6339,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-193",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "UC Berkeley",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6368,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-194",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Johns Hopkins University",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6397,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-195",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "ETH Zurich",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6426,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-196",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "University of Cambridge",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6455,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-197",
        "title": "Mastering Wind Turbine Power Aerodynamics Specialization",
        "provider": "University of Oxford",
        "platform": "Udacity",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6484,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-198",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "Columbia University",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6513,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-199",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Google Career Certificates",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6542,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-200",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Harvard University",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6571,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-201",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "Stanford Online",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6600,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-202",
        "title": "Introduction to Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "YouTube / FreeCodeCamp",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6629,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-203",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6658,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-204",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6687,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-205",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Microsoft Learn",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6716,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-206",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "The Linux Foundation",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6745,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-207",
        "title": "Advanced Robotics Kinematics with ROS2 Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Class Central",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6774,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-208",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6803,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-209",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Yale University",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6832,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-210",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 6861,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-211",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "Princeton University",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 6890,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-212",
        "title": "Mastering Solar Photovoltaic Grid Systems Specialization",
        "provider": "Imperial College London",
        "platform": "edX",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 6919,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-213",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "TU Delft",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 6948,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-214",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Technical University of Munich",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 6977,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-215",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "UC Berkeley",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 7006,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-216",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Johns Hopkins University",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 7035,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-217",
        "title": "Introduction to Embedded Systems & IoT Microcontrollers Specialization",
        "provider": "ETH Zurich",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 7064,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Embedded%20Systems%20%26%20IoT%20Microcontrollers",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Embedded C",
            "ARM Cortex",
            "UART",
            "RTOS"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Embedded Systems & IoT Microcontrollers",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Embedded Systems & IoT Microcontrollers taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-218",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "University of Cambridge",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 7093,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-219",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "University of Oxford",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 7122,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-220",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Columbia University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 7151,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-221",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "Google Career Certificates",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 7180,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-222",
        "title": "Advanced Electric Vehicle Battery Management (BMS) Specialization",
        "provider": "Harvard University",
        "platform": "Stanford Online",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 7209,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Electric%20Vehicle%20Battery%20Management%20(BMS)",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "BMS",
            "Lithium Batteries",
            "Powertrain",
            "Thermal Systems"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Electric Vehicle Battery Management (BMS)",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Electric Vehicle Battery Management (BMS) taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-223",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "Stanford Online",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 7238,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-224",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 7267,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-225",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 7296,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-226",
        "title": "Introduction to Cyber Threat Intelligence & SIEM Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 825,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-227",
        "title": "Mastering PLC Automation & Industrial SCADA Specialization",
        "provider": "Microsoft Learn",
        "platform": "Udacity",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 854,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=PLC%20Automation%20%26%20Industrial%20SCADA",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PLC Ladder Logic",
            "Siemens TIA Portal",
            "SCADA",
            "Industrial IoT"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of PLC Automation & Industrial SCADA",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering PLC Automation & Industrial SCADA taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-228",
        "title": "Advanced Global Supply Chain Operations Specialization",
        "provider": "The Linux Foundation",
        "platform": "Stanford Online",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 883,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Global%20Supply%20Chain%20Operations",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Supply Chain",
            "ERP",
            "Inventory Optimization",
            "Six Sigma"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Global Supply Chain Operations",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Global Supply Chain Operations taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-229",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Coursera",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 912,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-230",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "edX",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 941,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-231",
        "title": "Advanced Deep Learning with PyTorch Specialization",
        "provider": "Yale University",
        "platform": "Class Central",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 970,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-232",
        "title": "Introduction to VLSI & Digital ASIC Architecture Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "YouTube / FreeCodeCamp",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 999,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=VLSI%20%26%20Digital%20ASIC%20Architecture",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Verilog",
            "RTL Design",
            "FPGA",
            "Synopsys"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of VLSI & Digital ASIC Architecture",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering VLSI & Digital ASIC Architecture taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-233",
        "title": "Mastering Agile Product Management & Scrum Specialization",
        "provider": "Princeton University",
        "platform": "Udacity",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1028,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Agile%20Product%20Management%20%26%20Scrum",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Product Roadmap",
            "Agile/Scrum",
            "User Stories",
            "KPIs"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Agile Product Management & Scrum",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Agile Product Management & Scrum taught by world-class instructors from Princeton University."
    },
    {
        "id": "course-ext-234",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Imperial College London",
        "platform": "Stanford Online",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1057,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Imperial College London."
    },
    {
        "id": "course-ext-235",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "TU Delft",
        "platform": "Coursera",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1086,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from TU Delft."
    },
    {
        "id": "course-ext-236",
        "title": "Mastering Cyber Threat Intelligence & SIEM Specialization",
        "provider": "Technical University of Munich",
        "platform": "edX",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1115,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from Technical University of Munich."
    },
    {
        "id": "course-ext-237",
        "title": "Advanced Wind Turbine Power Aerodynamics Specialization",
        "provider": "UC Berkeley",
        "platform": "Class Central",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1144,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Wind%20Turbine%20Power%20Aerodynamics",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Aerodynamics",
            "Blade Design",
            "Grid Sync",
            "Power Electronics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Wind Turbine Power Aerodynamics",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Wind Turbine Power Aerodynamics taught by world-class instructors from UC Berkeley."
    },
    {
        "id": "course-ext-238",
        "title": "Introduction to Business Intelligence & Executive Dashboards Specialization",
        "provider": "Johns Hopkins University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1173,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Business%20Intelligence%20%26%20Executive%20Dashboards",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Power BI",
            "DAX",
            "SQL",
            "Executive Dashboards"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Business Intelligence & Executive Dashboards",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Business Intelligence & Executive Dashboards taught by world-class instructors from Johns Hopkins University."
    },
    {
        "id": "course-ext-239",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "ETH Zurich",
        "platform": "Udacity",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1202,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from ETH Zurich."
    },
    {
        "id": "course-ext-240",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "University of Cambridge",
        "platform": "Stanford Online",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1231,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from University of Cambridge."
    },
    {
        "id": "course-ext-241",
        "title": "Introduction to Deep Learning with PyTorch Specialization",
        "provider": "University of Oxford",
        "platform": "Coursera",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1260,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from University of Oxford."
    },
    {
        "id": "course-ext-242",
        "title": "Mastering Automotive AUTOSAR & CAN Bus Protocols Specialization",
        "provider": "Columbia University",
        "platform": "edX",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1289,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Automotive%20AUTOSAR%20%26%20CAN%20Bus%20Protocols",
        "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "AUTOSAR",
            "CAN-bus",
            "Vector CANoe",
            "Automotive C"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Automotive AUTOSAR & CAN Bus Protocols",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Automotive AUTOSAR & CAN Bus Protocols taught by world-class instructors from Columbia University."
    },
    {
        "id": "course-ext-243",
        "title": "Advanced Algorithmic Trading Strategies with Python Specialization",
        "provider": "Google Career Certificates",
        "platform": "Class Central",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1318,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Algorithmic%20Trading%20Strategies%20with%20Python",
        "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Quant Finance",
            "Pandas",
            "Backtesting",
            "Time Series"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Algorithmic Trading Strategies with Python",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Algorithmic Trading Strategies with Python taught by world-class instructors from Google Career Certificates."
    },
    {
        "id": "course-ext-244",
        "title": "Introduction to Biostatistics & Clinical Trial Design Specialization",
        "provider": "Harvard University",
        "platform": "YouTube / FreeCodeCamp",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1347,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Harvard University."
    },
    {
        "id": "course-ext-245",
        "title": "Mastering Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Stanford Online",
        "platform": "Udacity",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1376,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Stanford Online."
    },
    {
        "id": "course-ext-246",
        "title": "Advanced Cyber Threat Intelligence & SIEM Specialization",
        "provider": "MIT OpenCourseWare",
        "platform": "Stanford Online",
        "track": "cybersecurity",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1405,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Threat%20Intelligence%20%26%20SIEM",
        "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "SIEM",
            "Splunk",
            "Wireshark",
            "Incident Response"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Threat Intelligence & SIEM",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Threat Intelligence & SIEM taught by world-class instructors from MIT OpenCourseWare."
    },
    {
        "id": "course-ext-247",
        "title": "Introduction to Robotics Kinematics with ROS2 Specialization",
        "provider": "DeepLearning.AI",
        "platform": "Coursera",
        "track": "embedded-systems",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1434,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Robotics%20Kinematics%20with%20ROS2",
        "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "ROS2",
            "Kinematics",
            "Gazebo",
            "Python Robotics"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Robotics Kinematics with ROS2",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Robotics Kinematics with ROS2 taught by world-class instructors from DeepLearning.AI."
    },
    {
        "id": "course-ext-248",
        "title": "Mastering FinTech & Open Banking Rails Specialization",
        "provider": "IBM SkillsBuild",
        "platform": "edX",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1463,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=FinTech%20%26%20Open%20Banking%20Rails",
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Payment Rails",
            "APIs",
            "Stripe Integration",
            "RegTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of FinTech & Open Banking Rails",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering FinTech & Open Banking Rails taught by world-class instructors from IBM SkillsBuild."
    },
    {
        "id": "course-ext-249",
        "title": "Advanced Biostatistics & Clinical Trial Design Specialization",
        "provider": "Microsoft Learn",
        "platform": "Class Central",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1492,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Microsoft Learn."
    },
    {
        "id": "course-ext-250",
        "title": "Introduction to Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "The Linux Foundation",
        "platform": "YouTube / FreeCodeCamp",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1521,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from The Linux Foundation."
    },
    {
        "id": "course-ext-251",
        "title": "Mastering Deep Learning with PyTorch Specialization",
        "provider": "Amazon Web Services (AWS)",
        "platform": "Udacity",
        "track": "ai-deeplearning",
        "faculty": "computers-ai",
        "duration": "4 weeks (3 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.6,
        "reviewsCount": 1550,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Deep%20Learning%20with%20PyTorch",
        "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PyTorch",
            "TensorFlow",
            "Neural Nets",
            "Transformers"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Deep Learning with PyTorch",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Deep Learning with PyTorch taught by world-class instructors from Amazon Web Services (AWS)."
    },
    {
        "id": "course-ext-252",
        "title": "Advanced Solar Photovoltaic Grid Systems Specialization",
        "provider": "Cisco Networking Academy",
        "platform": "Stanford Online",
        "track": "renewable-energy",
        "faculty": "engineering",
        "duration": "6 weeks (4 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.68,
        "reviewsCount": 1579,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Solar%20Photovoltaic%20Grid%20Systems",
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "PV System Design",
            "Inverters",
            "Smart Grids",
            "CleanTech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Solar Photovoltaic Grid Systems",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Solar Photovoltaic Grid Systems taught by world-class instructors from Cisco Networking Academy."
    },
    {
        "id": "course-ext-253",
        "title": "Introduction to Financial Valuation & DCF Modeling Specialization",
        "provider": "Yale University",
        "platform": "Coursera",
        "track": "fintech",
        "faculty": "business",
        "duration": "8 weeks (5 hrs/week)",
        "level": "Beginner",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.76,
        "reviewsCount": 1608,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Financial%20Valuation%20%26%20DCF%20Modeling",
        "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Financial Modeling",
            "Excel",
            "DCF",
            "WACC Analysis"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Financial Valuation & DCF Modeling",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Financial Valuation & DCF Modeling taught by world-class instructors from Yale University."
    },
    {
        "id": "course-ext-254",
        "title": "Mastering Biostatistics & Clinical Trial Design Specialization",
        "provider": "Wharton School, UPenn",
        "platform": "edX",
        "track": "bioinformatics",
        "faculty": "science",
        "duration": "10 weeks (6 hrs/week)",
        "level": "Intermediate",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.84,
        "reviewsCount": 1637,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Biostatistics%20%26%20Clinical%20Trial%20Design",
        "thumbnail": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Biostatistics",
            "Survival Analysis",
            "Clinical Design",
            "R"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Biostatistics & Clinical Trial Design",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Biostatistics & Clinical Trial Design taught by world-class instructors from Wharton School, UPenn."
    },
    {
        "id": "course-ext-255",
        "title": "Advanced Cyber Law & Digital Forensics Evidence Specialization",
        "provider": "Princeton University",
        "platform": "Class Central",
        "track": "cyberlaw",
        "faculty": "law",
        "duration": "12 weeks (5 hrs/week)",
        "level": "Advanced",
        "isFree": true,
        "certificate": "Free Audit / Course Badge",
        "rating": 4.92,
        "reviewsCount": 1666,
        "language": "English",
        "enrollmentUrl": "https://www.classcentral.com/search?q=Cyber%20Law%20%26%20Digital%20Forensics%20Evidence",
        "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        "skills": [
            "Cyber Law",
            "Forensic Evidence",
            "Cross-Border Jurisdiction",
            "Legal Tech"
        ],
        "syllabus": [
            "Module 1: Core Fundamentals of Cyber Law & Digital Forensics Evidence",
            "Module 2: Practical Lab Hands-on & Exercises",
            "Module 3: Industry Standard Methodologies & Tools",
            "Module 4: Real-World Capstone Project"
        ],
        "description": "Comprehensive academic and industry training program covering Cyber Law & Digital Forensics Evidence taught by world-class instructors from Princeton University."
    }
];

    function getCurrentUser() {
        if (window.HYT_SESSION && window.HYT_SESSION.email) return window.HYT_SESSION;
        try {
            const raw = window.sessionStorage.getItem('hyt_mock_user');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.email) return parsed;
            }
        } catch (e) {}
        return null;
    }

    function isAuthenticated() {
        try {
            const hasToken = Boolean(window.sessionStorage.getItem('hyt_token'));
            return hasToken && Boolean(getCurrentUser());
        } catch (e) {
            return false;
        }
    }

    function getUserScopedKey(baseKey) {
        const user = getCurrentUser();
        const suffix = user && user.email ? '_' + user.email.toLowerCase().replace(/[^a-z0-9@._-]/g, '') : '_guest';
        return baseKey + suffix;
    }

    function safeReadJson(key, fallback) {
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function safeWriteJson(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {}
    }

    const CatalogStore = {
        getCurrentUser,
        isAuthenticated,
        requireAuthForAction(redirectPage) {
            if (isAuthenticated()) return true;
            const target = redirectPage || (window.location.pathname.split('/').pop() + window.location.search) || 'explore.html';
            const inPages = window.location.pathname.includes('/pages/');
            const authPath = inPages ? 'auth.html' : 'pages/auth.html';
            window.location.href = `${authPath}?error=login_required&redirect=${encodeURIComponent(target)}`;
            return false;
        },

        getAllCourses() {
            return FULL_COURSES_CATALOG.slice();
        },

        getCourseById(id) {
            return FULL_COURSES_CATALOG.find(c => c.id === id) || null;
        },

        getAllOpportunities() {
            if (window.hytOpportunities && typeof window.hytOpportunities.getAll === 'function') {
                return window.hytOpportunities.getAll();
            }
            if (typeof DEFAULT_OPPORTUNITIES !== 'undefined') {
                return DEFAULT_OPPORTUNITIES.slice();
            }
            return [];
        },

        getOpportunityById(id) {
            const all = this.getAllOpportunities();
            return all.find(o => o.id === id) || null;
        },

        getFavorites() {
            const data = safeReadJson(getUserScopedKey(FAVORITES_KEY), { courses: [], opportunities: [] });
            // Also merge any guest / legacy bookmarks so unauthenticated saves persist seamlessly
            const legacyBookmarks = safeReadJson('hyt_saved_bookmarks', []);
            const currentOpps = Array.isArray(data.opportunities) ? data.opportunities : [];
            const mergedOpps = Array.from(new Set([...currentOpps, ...(Array.isArray(legacyBookmarks) ? legacyBookmarks : [])]));
            return {
                courses: Array.isArray(data.courses) ? data.courses : [],
                opportunities: mergedOpps
            };
        },

        isFavorite(type, id) {
            const favs = this.getFavorites();
            const bucket = type === 'internship' || type === 'opportunity' ? favs.opportunities : favs.courses;
            return bucket.includes(id);
        },

        toggleFavorite(type, id) {
            const favs = this.getFavorites();
            const isOpp = type === 'internship' || type === 'opportunity';
            const list = isOpp ? favs.opportunities : favs.courses;
            const idx = list.indexOf(id);
            let added = false;
            if (idx >= 0) {
                list.splice(idx, 1);
            } else {
                list.push(id);
                added = true;
            }
            safeWriteJson(getUserScopedKey(FAVORITES_KEY), favs);
            if (isOpp) {
                safeWriteJson('hyt_saved_bookmarks', favs.opportunities);
            }
            window.dispatchEvent(new CustomEvent('hyt:favoritesChanged', { detail: { type, id, added, favs } }));
            return added;
        },

        getEnrolledCourses() {
            const list = safeReadJson(getUserScopedKey(ENROLLED_KEY), ['course-ai-01']);
            return Array.isArray(list) ? list : [];
        },

        isEnrolled(courseId) {
            return this.getEnrolledCourses().includes(courseId);
        },

        enrollCourse(courseId) {
            const list = this.getEnrolledCourses();
            if (!list.includes(courseId)) {
                list.unshift(courseId);
                safeWriteJson(getUserScopedKey(ENROLLED_KEY), list);
                window.dispatchEvent(new CustomEvent('hyt:enrollmentChanged', { detail: { courseId, list } }));
            }
            return list;
        },

        getOnboardingPrefs() {
            return safeReadJson(ONBOARDING_KEY, null);
        },

        saveOnboardingPrefs(prefs) {
            const payload = {
                faculty: prefs.faculty || 'computers-ai',
                goal: prefs.goal || 'Software & AI Career',
                skills: Array.isArray(prefs.skills) ? prefs.skills : [],
                completedAt: new Date().toISOString()
            };
            safeWriteJson(ONBOARDING_KEY, payload);
            return payload;
        },

        getNotifications() {
            const readIds = safeReadJson(NOTIF_READ_KEY, []);
            const opps = this.getAllOpportunities();
            const items = [
                {
                    id: 'notif-welcome',
                    title: 'Welcome to HuntYourTrack 2.0',
                    body: '15+ free MOOCs from Harvard, Stanford, Helsinki & Google are synced with your career tracks.',
                    time: 'Today',
                    type: 'info',
                    link: 'explore.html'
                },
                {
                    id: 'notif-cs50',
                    title: "Featured Track Match: CS50's AI with Python",
                    body: 'Harvard University free audit & certificate track matches your AI & Computing interest.',
                    time: '2h ago',
                    type: 'course',
                    link: 'details.html?type=course&id=course-ai-02'
                }
            ];

            if (opps.length > 0) {
                const topOpp = opps[0];
                items.unshift({
                    id: `notif-opp-${topOpp.id}`,
                    title: `Internship Open: ${topOpp.titleEn || topOpp.title}`,
                    body: `${topOpp.orgNameEn || topOpp.orgName} — ${topOpp.matchScore || 95}% ATS Compatibility Match.`,
                    time: 'Active Cycle',
                    type: 'internship',
                    link: `details.html?type=internship&id=${topOpp.id}`
                });
            }

            return items.map(n => ({ ...n, read: readIds.includes(n.id) }));
        },

        markAllNotificationsRead() {
            const ids = this.getNotifications().map(n => n.id);
            safeWriteJson(NOTIF_READ_KEY, ids);
        },

        renderHeaderAuth(containerId) {
            const box = document.getElementById(containerId);
            if (!box) return;
            const user = getCurrentUser();
            if (isAuthenticated() && user) {
                const role = (user.role || 'student').toLowerCase();
                const dashPage = role === 'admin' ? 'admin.html' : (role === 'employer' ? 'employer.html' : 'student.html');
                box.innerHTML = `
                    <a href="${dashPage}" class="btn btn-secondary" style="padding: 0.45rem 0.9rem; font-size: 0.84rem;">Dashboard</a>
                    <button type="button" class="btn btn-primary" style="padding: 0.45rem 0.9rem; font-size: 0.84rem;" onclick="window.HYT_CATALOG.signOut()">Sign Out</button>
                `;
            } else {
                box.innerHTML = `<a href="auth.html" class="btn btn-primary" style="padding: 0.45rem 0.95rem; font-size: 0.85rem;">Sign In</a>`;
            }
        },

        signOut() {
            try {
                window.sessionStorage.removeItem('hyt_token');
                window.sessionStorage.removeItem('hyt_mock_user');
            } catch (e) {}
            window.location.href = 'auth.html';
        }
    };

    window.HYT_CATALOG = CatalogStore;
})(window);
