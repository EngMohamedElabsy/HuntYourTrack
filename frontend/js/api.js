/**
 * HuntYourTrack — Client API Layer
 * Provides unified interface for authentication, courses, roadmaps, and CV keyword parsing.
 * Auth tokens are kept in sessionStorage only; identity is always resolved by the server.
 * Courses and CV parsing fall back gracefully to local data for offline usage.
 */

(function (window) {
    'use strict';

    const API_BASE = (window.HYT_API_BASE || 'http://localhost:3000/api/v1').replace(/\/+$/, '');
    const TOKEN_KEY = 'hyt_token';

    function getToken() {
        try {
            return window.sessionStorage.getItem(TOKEN_KEY) || '';
        } catch (err) {
            return '';
        }
    }

    function setToken(token) {
        try {
            window.sessionStorage.setItem(TOKEN_KEY, token);
        } catch (err) {
            // Session storage unavailable; the session remains memory-only.
        }
    }

    function clearToken() {
        try {
            window.sessionStorage.removeItem(TOKEN_KEY);
        } catch (err) {
            // Nothing to clear when session storage is unavailable.
        }
    }

    async function apiRequest(path, options) {
        const config = options || {};
        const headers = { Accept: 'application/json' };
        const hasBody = config.body !== undefined;

        if (hasBody) headers['Content-Type'] = 'application/json';
        if (config.auth) {
            const token = getToken();
            if (token) headers.Authorization = `Bearer ${token}`;
        }

        let response;
        try {
            response = await fetch(`${API_BASE}${path}`, {
                method: config.method || 'GET',
                headers,
                body: hasBody ? JSON.stringify(config.body) : undefined
            });
        } catch (err) {
            const networkError = new Error('Unable to reach the server. Please try again.');
            networkError.status = 0;
            throw networkError;
        }

        let data = null;
        const raw = await response.text();
        if (raw) {
            try {
                data = JSON.parse(raw);
            } catch (err) {
                data = null;
            }
        }

        if (!response.ok) {
            const requestError = new Error((data && data.error) || 'Request failed. Please try again.');
            requestError.status = response.status;
            if (response.status === 401 && config.auth) clearToken();
            throw requestError;
        }

        return data;
    }

    // Offline fallback catalog (Class Central & Top Universities Verified Courses)
    const FALLBACK_COURSES = [
        {
            id: 'course-ai-01',
            title: 'Machine Learning Specialization',
            provider: 'DeepLearning.AI & Stanford Online',
            platform: 'Coursera / Class Central',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '8 weeks (4-6 hrs/week)',
            level: 'Beginner to Intermediate',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.9,
            enrollmentUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            description: 'Master foundational machine learning concepts and algorithms taught by Andrew Ng.'
        },
        {
            id: 'course-ai-02',
            title: "CS50's Introduction to Artificial Intelligence with Python",
            provider: 'Harvard University',
            platform: 'edX / Class Central',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '7 weeks (10-15 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Audit / Verified Option',
            rating: 4.8,
            enrollmentUrl: 'https://cs50.harvard.edu/ai/',
            thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
            description: 'Explore concepts and algorithms at the foundation of modern artificial intelligence.'
        },
        {
            id: 'course-ai-03',
            title: 'Deep Learning Specialization (Neural Networks & CNNs)',
            provider: 'DeepLearning.AI',
            platform: 'Coursera / Class Central',
            track: 'ai-deeplearning',
            faculty: 'computers-ai',
            duration: '10 weeks (5 hrs/week)',
            level: 'Intermediate to Advanced',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.9,
            enrollmentUrl: 'https://www.coursera.org/specializations/deep-learning',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80',
            description: 'Build neural networks, optimize hyper-parameters, and master CNNs & sequence models.'
        },
        {
            id: 'course-sec-01',
            title: 'Google Cybersecurity Professional Certificate',
            provider: 'Google Career Certificates',
            platform: 'Coursera / Class Central',
            track: 'cybersecurity',
            faculty: 'computers-ai',
            duration: '6 months (7 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit / Financial Aid',
            rating: 4.8,
            enrollmentUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
            description: 'Identify threats, mitigate vulnerabilities, and use SIEM tools for detection.'
        },
        {
            id: 'course-sec-02',
            title: 'Network Security & Incident Triage',
            provider: 'Cisco Networking Academy',
            platform: 'NetAcad / Class Central',
            track: 'cybersecurity',
            faculty: 'computers-ai',
            duration: '8 weeks (3-5 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: 'Free Digital Badge Included',
            rating: 4.7,
            enrollmentUrl: 'https://www.netacad.com/courses/cybersecurity',
            thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
            description: 'Learn packet analysis with Wireshark, firewall rules, and security operations.'
        },
        {
            id: 'course-cloud-01',
            title: 'Introduction to Linux (LFS101x)',
            provider: 'The Linux Foundation',
            platform: 'edX / Class Central',
            track: 'cloud-devops',
            faculty: 'computers-ai',
            duration: '14 weeks (5-7 hrs/week)',
            level: 'Beginner',
            isFree: true,
            certificate: 'Free Audit Available',
            rating: 4.6,
            enrollmentUrl: 'https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux',
            thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
            description: 'Master practical Linux command line operations and systems administration.'
        },
        {
            id: 'course-web-01',
            title: 'Full Stack Open (Modern Web Development)',
            provider: 'University of Helsinki',
            platform: 'FullStackOpen / Open Course',
            track: 'fullstack-web',
            faculty: 'computers-ai',
            duration: '12 weeks (10-15 hrs/week)',
            level: 'Intermediate',
            isFree: true,
            certificate: '100% Free Verified Certificate & ECTS Credits',
            rating: 4.95,
            enrollmentUrl: 'https://fullstackopen.com/en/',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
            description: 'Deep dive into React, Redux, Node.js, Express, REST APIs, GraphQL, and TypeScript.'
        }
    ];

    const ApiService = {
        /**
         * Return the in-memory session token (sessionStorage only)
         * @returns {string}
         */
        getToken,

        /**
         * Sign in and persist the server-issued token for this tab session
         * @param {string} email
         * @param {string} password
         * @returns {Promise<Object>} server-returned user (id, email, name, role)
         */
        async login(email, password) {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: { email, password }
            });
            if (!data || !data.token || !data.user) {
                throw new Error('Unexpected server response. Please try again.');
            }
            setToken(data.token);
            return data.user;
        },

        /**
         * Create an account and persist the server-issued token for this tab session
         * @param {Object} payload name, email, password, role, faculty, department
         * @returns {Promise<Object>} server-returned user (id, email, name, role)
         */
        async register(payload) {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: payload
            });
            if (!data || !data.token || !data.user) {
                throw new Error('Unexpected server response. Please try again.');
            }
            setToken(data.token);
            return data.user;
        },

        /**
         * Resolve the current identity from the server
         * @returns {Promise<Object>} user (id, email, name, role)
         */
        async me() {
            if (!getToken()) {
                const authError = new Error('Authentication required.');
                authError.status = 401;
                throw authError;
            }
            const data = await apiRequest('/auth/me', { auth: true });
            if (!data || !data.user) {
                throw new Error('Unexpected server response. Please try again.');
            }
            return data.user;
        },

        /**
         * Discard the session token; theme and language preferences are untouched
         */
        logout() {
            clearToken();
        },

        /**
         * Fetch courses catalog with optional track filter
         * @param {string} [track]
         * @returns {Promise<Array>}
         */
        async getCourses(track) {
            try {
                const query = track ? `?track=${encodeURIComponent(track)}` : '';
                const res = await fetch(`${API_BASE}/courses${query}`, { method: 'GET' });
                if (res.ok) {
                    const data = await res.json();
                    return data.courses || [];
                }
            } catch (e) {
                // Silently fall back to embedded verified catalog
            }
            if (track) {
                return FALLBACK_COURSES.filter(c => c.track === track);
            }
            return FALLBACK_COURSES;
        },

        /**
         * Parse CV text keywords to detect matching track
         * @param {string} cvText
         * @returns {Promise<Object>}
         */
        async parseCvKeywords(cvText) {
            try {
                const res = await fetch(`${API_BASE}/cv/parse-keywords`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: cvText })
                });
                if (res.ok) {
                    return await res.json();
                }
            } catch (e) {
                // Fallback to local keyword matcher
            }
            return this.localParseCvKeywords(cvText);
        },

        /**
         * Local ATS keyword matcher
         * @param {string} text
         */
        localParseCvKeywords(text) {
            const raw = (text || '').toLowerCase();
            const keywords = {
                'ai-deeplearning': ['python', 'pytorch', 'tensorflow', 'machine learning', 'deep learning', 'cnn', 'transformer', 'pandas'],
                'cybersecurity': ['wireshark', 'nmap', 'siem', 'splunk', 'penetration testing', 'soc', 'cryptography', 'incident response'],
                'cloud-devops': ['docker', 'kubernetes', 'terraform', 'aws', 'gcp', 'azure', 'ci/cd', 'linux', 'bash'],
                'fullstack-web': ['javascript', 'typescript', 'react', 'node.js', 'express', 'mongodb', 'postgresql', 'html5', 'css3']
            };

            const matched = {};
            let topTrack = 'ai-deeplearning';
            let maxCount = -1;

            for (const [track, kws] of Object.entries(keywords)) {
                const m = kws.filter(k => raw.includes(k));
                matched[track] = m;
                if (m.length > maxCount) {
                    maxCount = m.length;
                    topTrack = track;
                }
            }

            return {
                matchedKeywords: matched,
                recommendedTrack: topTrack,
                totalMatches: maxCount > 0 ? maxCount : 0
            };
        }
    };

    window.HYT_API = ApiService;

})(window);
