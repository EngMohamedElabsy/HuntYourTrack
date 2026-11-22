/**
 * HuntYourTrack — Lightweight Backend API Server
 * Runtime: Pure Node.js (Zero external npm packages required to preserve network quota)
 * Endpoints:
 *  - GET  /api/v1/health
 *  - GET  /api/v1/courses (filter by ?track=...)
 *  - GET  /api/v1/roadmaps/tree
 *  - POST /api/v1/cv/parse-keywords
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const CATALOG_PATH = path.join(__dirname, '..', 'database', 'nosql', 'courses-catalog.json');
const ROADMAP_TREE_PATH = path.join(__dirname, '..', 'docs', 'roadmaps', 'COMPUTERS_AND_AI_ROADMAP_TREE.md');

// Keyword dictionary for client-side and server-side ATS parser
const KEYWORDS_BY_TRACK = {
    'ai-deeplearning': [
        'python', 'pytorch', 'tensorflow', 'keras', 'scikit-learn', 'machine learning',
        'deep learning', 'cnn', 'yolo', 'transformer', 'nlp', 'pandas', 'numpy',
        'opencv', 'huggingface', 'neural networks'
    ],
    'cybersecurity': [
        'wireshark', 'nmap', 'metasploit', 'siem', 'splunk', 'burp suite', 'owasp',
        'penetration testing', 'soc', 'linux hardening', 'cryptography', 'tcp/ip',
        'incident response', 'malware'
    ],
    'cloud-devops': [
        'docker', 'kubernetes', 'terraform', 'aws', 'gcp', 'azure', 'ci/cd',
        'github actions', 'ansible', 'linux', 'bash', 'nginx', 'prometheus', 'grafana'
    ],
    'fullstack-web': [
        'javascript', 'typescript', 'react', 'vue', 'node.js', 'express', 'mongodb',
        'postgresql', 'mysql', 'html5', 'css3', 'tailwind', 'rest api', 'graphql', 'redis'
    ]
};

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // 1. Health check
    if (pathname === '/api/v1/health' && req.method === 'GET') {
        return sendJSON(res, 200, {
            status: 'ok',
            service: 'HuntYourTrack Backend API',
            version: '2.0.0',
            timestamp: new Date().toISOString()
        });
    }

    // 2. Courses Catalog
    if (pathname === '/api/v1/courses' && req.method === 'GET') {
        try {
            const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8');
            let courses = JSON.parse(rawData);
            
            const trackFilter = parsedUrl.query.track;
            if (trackFilter) {
                courses = courses.filter(c => c.track === trackFilter);
            }
            return sendJSON(res, 200, { count: courses.length, courses });
        } catch (err) {
            return sendJSON(res, 500, { error: 'Failed to read course catalog', details: err.message });
        }
    }

    // 3. Roadmap Tree Data
    if (pathname === '/api/v1/roadmaps/tree' && req.method === 'GET') {
        return sendJSON(res, 200, {
            faculty: 'Faculty of Computers & Artificial Intelligence',
            tracks: [
                { id: 'ai-deeplearning', name: 'Artificial Intelligence & Deep Learning', phasesCount: 4 },
                { id: 'cybersecurity', name: 'Cybersecurity & SOC Operations', phasesCount: 4 },
                { id: 'cloud-devops', name: 'Cloud Architecture & DevOps', phasesCount: 4 },
                { id: 'fullstack-web', name: 'Full-Stack Web Engineering', phasesCount: 4 }
            ]
        });
    }

    // 4. CV Keyword Parser Endpoint
    if (pathname === '/api/v1/cv/parse-keywords' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body || '{}');
                const text = (payload.text || '').toLowerCase();

                const matchedKeywords = {};
                let topTrack = 'ai-deeplearning';
                let maxMatches = -1;

                for (const [track, keywords] of Object.entries(KEYWORDS_BY_TRACK)) {
                    const matches = keywords.filter(kw => text.includes(kw.toLowerCase()));
                    matchedKeywords[track] = matches;
                    if (matches.length > maxMatches) {
                        maxMatches = matches.length;
                        topTrack = track;
                    }
                }

                return sendJSON(res, 200, {
                    matchedKeywords,
                    recommendedTrack: topTrack,
                    totalMatches: maxMatches > 0 ? maxMatches : 0
                });
            } catch (err) {
                return sendJSON(res, 400, { error: 'Invalid JSON payload' });
            }
        });
        return;
    }

    // Fallback 404
    return sendJSON(res, 404, { error: 'Endpoint not found' });
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`[HuntYourTrack API] Server listening on port ${PORT}`);
    });
}

module.exports = server;
