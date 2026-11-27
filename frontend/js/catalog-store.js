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
            id: 'course-ai-01',
            title: 'Machine Learning Specialization',
            provider: 'DeepLearning.AI & Stanford Online',
            platform: 'Coursera',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '8 weeks (4-6 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.9,
            reviewsCount: 4280,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            skills: ['Supervised Learning', 'Python', 'NumPy', 'Neural Networks', 'Decision Trees'],
            syllabus: [
                'Week 1-2: Supervised Machine Learning: Regression & Classification',
                'Week 3-5: Advanced Learning Algorithms & Neural Networks',
                'Week 6-8: Unsupervised Learning, Recommenders & Reinforcement Learning'
            ],
            description: 'Master foundational machine learning concepts and apply these techniques to build real-world AI applications taught by Andrew Ng.'
        },
        {
            id: 'course-ai-02',
            title: "CS50's Introduction to Artificial Intelligence with Python",
            provider: 'Harvard University',
            platform: 'edX',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '7 weeks (10-15 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Certificate / Audit',
            rating: 4.8,
            reviewsCount: 3150,
            language: 'English',
            enrollmentUrl: 'https://cs50.harvard.edu/ai/',
            thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
            skills: ['Graph Search', 'Knowledge Representation', 'Bayesian Networks', 'NLP', 'PyTorch'],
            syllabus: [
                'Module 1: Search Algorithms (BFS, DFS, A*, Minimax)',
                'Module 2: Knowledge, Logic & Uncertainty',
                'Module 3: Optimization, Machine Learning & Neural Networks',
                'Module 4: Natural Language Processing & Transformers'
            ],
            description: 'Learn to use machine learning in Python in this introductory Harvard course on the algorithms at the foundation of modern AI.'
        },
        {
            id: 'course-ai-03',
            title: 'Deep Learning Specialization (Neural Networks & CNNs)',
            provider: 'DeepLearning.AI',
            platform: 'Coursera',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '10 weeks (5 hrs/week)',
            level: 'Advanced',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.9,
            reviewsCount: 5120,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/specializations/deep-learning',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80',
            skills: ['Deep Learning', 'TensorFlow', 'CNNs', 'RNNs', 'Transformers'],
            syllabus: [
                'Course 1: Neural Networks and Deep Learning',
                'Course 2: Improving Deep Neural Networks: Hyperparameter Tuning',
                'Course 3: Convolutional Neural Networks for Vision',
                'Course 4: Sequence Models & Attention Mechanisms'
            ],
            description: 'Build and train deep neural networks, identify key architecture parameters, and master CNNs and sequence models.'
        },
        {
            id: 'course-sec-01',
            title: 'Google Cybersecurity Professional Certificate',
            provider: 'Google Career Certificates',
            platform: 'Coursera',
            track: 'cybersecurity',
            faculty: 'computers-ai',
            duration: '12 weeks (7 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit / Financial Aid',
            rating: 4.8,
            reviewsCount: 2940,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
            skills: ['Linux', 'SQL', 'SIEM Tools', 'Python Security', 'Incident Response'],
            syllabus: [
                'Foundations of Cybersecurity & Risk Management',
                'Networks, Firewalls & Intrusion Detection',
                'Linux, SQL & SIEM Log Analysis',
                'Automated Incident Response with Python'
            ],
            description: 'Prepare for an entry-level SOC analyst role by identifying common threats, mitigating vulnerabilities, and using SIEM tools.'
        },
        {
            id: 'course-sec-02',
            title: 'Network Security & Incident Triage',
            provider: 'Cisco Networking Academy',
            platform: 'NetAcad',
            track: 'cybersecurity',
            faculty: 'computers-ai',
            duration: '8 weeks (3-5 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Digital Badge Included',
            rating: 4.7,
            reviewsCount: 1820,
            language: 'English',
            enrollmentUrl: 'https://www.netacad.com/courses/cybersecurity',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
            skills: ['Wireshark', 'Firewalls', 'Packet Analysis', 'Zero Trust', 'SOC'],
            syllabus: [
                'Network Protocols & Packet Inspection with Wireshark',
                'Endpoint & Perimeter Defense',
                'Security Operations & Threat Triage'
            ],
            description: 'Learn practical packet analysis with Wireshark, firewall configuration, and security operations center (SOC) incident response.'
        },
        {
            id: 'course-cloud-01',
            title: 'Introduction to Linux (LFS101x)',
            provider: 'The Linux Foundation',
            platform: 'edX',
            track: 'cloud-devops',
            faculty: 'computers-ai',
            duration: '14 weeks (5-7 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.7,
            reviewsCount: 2410,
            language: 'English',
            enrollmentUrl: 'https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux',
            thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
            skills: ['Linux CLI', 'Bash Scripting', 'File Systems', 'Networking', 'System Admin'],
            syllabus: [
                'Linux Philosophy, Boot Process & Distributions',
                'Command Line Operations & Shell Scripting',
                'User Management, Permissions & Networking'
            ],
            description: 'Develop a good working knowledge of Linux using both the graphical interface and command line across major distributions.'
        },
        {
            id: 'course-web-01',
            title: 'Full Stack Open (Modern Web Development)',
            provider: 'University of Helsinki',
            platform: 'FullStackOpen',
            track: 'fullstack-web',
            faculty: 'computers-ai',
            duration: '12 weeks (10-15 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: '100% Free Verified Certificate',
            rating: 4.95,
            reviewsCount: 3890,
            language: 'English',
            enrollmentUrl: 'https://fullstackopen.com/en/',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
            skills: ['React', 'Node.js', 'Express', 'TypeScript', 'GraphQL', 'CI/CD'],
            syllabus: [
                'Parts 0-2: Fundamentals of Web Apps, React & Server Communication',
                'Parts 3-5: Node.js, Express, MongoDB & End-to-End Testing',
                'Parts 6-9: State Management, GraphQL & TypeScript',
                'Parts 10-13: CI/CD Pipelines, Containers & Relational Databases'
            ],
            description: 'Deep dive into modern JavaScript-based web development: React, Redux, Node.js, Express, REST APIs, GraphQL, and TypeScript.'
        },
        {
            id: 'course-web-02',
            title: "CS50's Web Programming with Python and JavaScript",
            provider: 'Harvard University',
            platform: 'edX',
            track: 'fullstack-web',
            faculty: 'computers-ai',
            duration: '12 weeks (6-9 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Certificate Available',
            rating: 4.9,
            reviewsCount: 4650,
            language: 'English',
            enrollmentUrl: 'https://cs50.harvard.edu/web/',
            thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
            skills: ['HTML5/CSS3', 'JavaScript', 'Python', 'Django', 'SQL', 'CI/CD'],
            syllabus: [
                'HTML, CSS, Responsive Design & Git',
                'Python, Django & SQL Data Models',
                'JavaScript, User Interfaces & Testing/CI-CD'
            ],
            description: 'Pick up where CS50 leaves off, diving more deeply into the design and implementation of scalable web apps with Python, JS, and SQL.'
        },
        {
            id: 'course-cs-01',
            title: 'Algorithms, Part I',
            provider: 'Princeton University',
            platform: 'Coursera',
            track: 'fullstack-web',
            faculty: 'computers-ai',
            duration: '6 weeks (6-10 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: '100% Free Open Course',
            rating: 4.9,
            reviewsCount: 3420,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/learn/algorithms-part1',
            thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
            skills: ['Data Structures', 'Sorting', 'Binary Search Trees', 'Hash Tables', 'Java'],
            syllabus: [
                'Union-Find & Analysis of Algorithms',
                'Stacks, Queues, Mergesort & Quicksort',
                'Priority Queues & Balanced Search Trees'
            ],
            description: 'Essential information every serious programmer needs to know about algorithms and data structures, emphasizing real-world performance.'
        },
        {
            id: 'course-eng-01',
            title: 'Introduction to Embedded Systems & IoT',
            provider: 'University of California, Irvine',
            platform: 'Coursera',
            track: 'embedded-iot',
            faculty: 'engineering',
            duration: '6 weeks (4 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.7,
            reviewsCount: 1540,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/learn/iot',
            thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
            skills: ['Embedded C', 'Microcontrollers', 'IoT Protocols', 'Sensors', 'RTOS'],
            syllabus: [
                'Embedded Systems Architecture & Hardware Interfaces',
                'Microcontroller Programming & Interrupts',
                'IoT Networking & Real-Time Constraints'
            ],
            description: 'Explore the role of microcontrollers, sensors, and embedded software in building connected automotive and industrial IoT devices.'
        },
        {
            id: 'course-eng-02',
            title: 'Solar Energy Engineering: Photovoltaic Systems',
            provider: 'TU Delft',
            platform: 'edX',
            track: 'renewable-energy',
            faculty: 'engineering',
            duration: '8 weeks (6 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.8,
            reviewsCount: 1290,
            language: 'English',
            enrollmentUrl: 'https://www.edx.org/learn/solar-energy/delft-university-of-technology-solar-energy',
            thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80',
            skills: ['Photovoltaics', 'Smart Grids', 'Power Electronics', 'Energy Storage'],
            syllabus: [
                'Solar Radiation & Semiconductor Physics',
                'PV Cell Technologies & System Design',
                'Grid Integration & Energy Storage'
            ],
            description: 'Learn how to design complete photovoltaic solar energy systems, from semiconductor physics to utility-scale grid integration.'
        },
        {
            id: 'course-biz-01',
            title: 'Financial Markets',
            provider: 'Yale University',
            platform: 'Coursera',
            track: 'fintech',
            faculty: 'business',
            duration: '7 weeks (4 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.85,
            reviewsCount: 5600,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/learn/financial-markets-global',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
            skills: ['Risk Management', 'Behavioral Finance', 'FinTech', 'Capital Markets'],
            syllabus: [
                'Financial Markets, Probability & Risk Management',
                'Behavioral Finance & Market Efficiency',
                'Banking, Insurance & Modern FinTech Regulation'
            ],
            description: 'An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise, by Nobel laureate Robert Shiller.'
        },
        {
            id: 'course-biz-02',
            title: 'Business Analytics & Data-Driven Decision Making',
            provider: 'Wharton, University of Pennsylvania',
            platform: 'Coursera',
            track: 'fintech',
            faculty: 'business',
            duration: '6 weeks (3-4 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.7,
            reviewsCount: 2110,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/specializations/business-analytics',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            skills: ['Customer Analytics', 'Forecasting', 'SQL', 'PowerBI', 'KPIs'],
            syllabus: [
                'Descriptive & Predictive Customer Analytics',
                'Operations & People Analytics',
                'Financial Modeling & Executive Dashboards'
            ],
            description: 'Use big data analytics to make strategic business, financial, and operational decisions across modern enterprises.'
        },
        {
            id: 'course-sci-01',
            title: 'Introduction to Genomic Technologies & Bioinformatics',
            provider: 'Johns Hopkins University',
            platform: 'Coursera',
            track: 'bioinformatics',
            faculty: 'science',
            duration: '4 weeks (4-5 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.75,
            reviewsCount: 1480,
            language: 'English',
            enrollmentUrl: 'https://www.coursera.org/learn/introduction-genomics',
            thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
            skills: ['Genomics', 'Python', 'Bioconductor', 'Sequence Alignment'],
            syllabus: [
                'Molecular Biology & Sequencing Technologies',
                'Computational Genomics & Data Pipelines',
                'Applied Bioinformatics Case Studies'
            ],
            description: 'Introduces the basic biology of modern genomics and the computational tools used to measure and analyze DNA/RNA sequences.'
        },
        {
            id: 'course-law-01',
            title: 'CS50 for Lawyers: Technology, Privacy & Law',
            provider: 'Harvard University',
            platform: 'edX',
            track: 'cyberlaw',
            faculty: 'law',
            duration: '10 weeks (3-6 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Certificate / Audit',
            rating: 4.9,
            reviewsCount: 1950,
            language: 'English',
            enrollmentUrl: 'https://cs50.harvard.edu/law/',
            thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
            skills: ['Cybersecurity Law', 'Data Privacy', 'Smart Contracts', 'IP Regulation'],
            syllabus: [
                'Computational Thinking & Programming Challenges',
                'Cryptography, Cybersecurity & Digital Forensics',
                'Databases, Privacy Compliance & Technology Regulation'
            ],
            description: 'Formulate technology-informed legal arguments and understand cybersecurity, privacy, and software systems from a legal perspective.'
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
            if (!isAuthenticated()) return { courses: [], opportunities: [] };
            const data = safeReadJson(getUserScopedKey(FAVORITES_KEY), { courses: [], opportunities: [] });
            return {
                courses: Array.isArray(data.courses) ? data.courses : [],
                opportunities: Array.isArray(data.opportunities) ? data.opportunities : []
            };
        },

        isFavorite(type, id) {
            if (!isAuthenticated()) return false;
            const favs = this.getFavorites();
            const bucket = type === 'internship' || type === 'opportunity' ? favs.opportunities : favs.courses;
            return bucket.includes(id);
        },

        toggleFavorite(type, id) {
            if (!this.requireAuthForAction()) return false;
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
            window.dispatchEvent(new CustomEvent('hyt:favoritesChanged', { detail: { type, id, added, favs } }));
            return added;
        },

        getEnrolledCourses() {
            if (!isAuthenticated()) return [];
            const list = safeReadJson(getUserScopedKey(ENROLLED_KEY), ['course-ai-01']);
            return Array.isArray(list) ? list : [];
        },

        isEnrolled(courseId) {
            return this.getEnrolledCourses().includes(courseId);
        },

        enrollCourse(courseId) {
            if (!this.requireAuthForAction()) return [];
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
