/**
 * HuntYourTrack — Lightweight Backend API Server
 * Runtime: Pure Node.js (Zero external npm packages required to preserve network quota)
 * Endpoints:
 *  - GET  /api/v1/health
 *  - GET  /api/v1/courses (filter by ?track=...)
 *  - GET  /api/v1/roadmaps/tree
 *  - POST /api/v1/cv/parse-keywords
 *  - POST /api/v1/auth/register
 *  - POST /api/v1/auth/login
 *  - GET  /api/v1/auth/me
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const CATALOG_PATH = path.join(__dirname, '..', 'database', 'nosql', 'courses-catalog.json');
const ROADMAP_TREE_PATH = path.join(__dirname, '..', 'docs', 'roadmaps', 'COMPUTERS_AND_AI_ROADMAP_TREE.md');

const TOKEN_SECRET = process.env.TOKEN_SECRET;
if (!TOKEN_SECRET) {
    console.error('[HuntYourTrack API] FATAL: TOKEN_SECRET environment variable is required.');
    process.exit(1);
}
const TOKEN_SECRET_BUFFER = Buffer.from(TOKEN_SECRET, 'utf8');
const parsedTokenTtl = Number(process.env.TOKEN_TTL_SECONDS);
const TOKEN_TTL_SECONDS = Number.isFinite(parsedTokenTtl) && parsedTokenTtl > 0 ? parsedTokenTtl : 3600;

const DEFAULT_CORS_ORIGIN = 'http://localhost:8080';
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 64;
const SCRYPT_SALT_BYTES = 16;

const usersById = new Map();
const userIdByEmail = new Map();
let nextUserId = 1;

const rateLimitBuckets = new Map();
let rateLimitChecks = 0;

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

function normalizeEmail(email) {
    return String(email).trim().toLowerCase();
}

function isValidEmail(email) {
    return typeof email === 'string' && email.length <= 254 && EMAIL_PATTERN.test(email);
}

function base64url(buffer) {
    return Buffer.from(buffer).toString('base64url');
}

function hashPasswordSync(password) {
    const salt = crypto.randomBytes(SCRYPT_SALT_BYTES);
    const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN, {
        N: SCRYPT_N,
        r: SCRYPT_R,
        p: SCRYPT_P
    });
    return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt.toString('hex')}$${derived.toString('hex')}`;
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(SCRYPT_SALT_BYTES);
        crypto.scrypt(password, salt, SCRYPT_KEYLEN, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P }, (err, derived) => {
            if (err) return reject(err);
            resolve(`scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt.toString('hex')}$${derived.toString('hex')}`);
        });
    });
}

function verifyPassword(password, storedHash) {
    return new Promise((resolve) => {
        if (typeof storedHash !== 'string') return resolve(false);
        const parts = storedHash.split('$');
        if (parts.length !== 6 || parts[0] !== 'scrypt') return resolve(false);

        const N = Number(parts[1]);
        const r = Number(parts[2]);
        const p = Number(parts[3]);
        if (![N, r, p].every(Number.isInteger) || N <= 0 || r <= 0 || p <= 0) return resolve(false);

        let salt;
        let expected;
        try {
            salt = Buffer.from(parts[4], 'hex');
            expected = Buffer.from(parts[5], 'hex');
        } catch (err) {
            return resolve(false);
        }
        if (salt.length === 0 || expected.length === 0) return resolve(false);

        crypto.scrypt(password, salt, expected.length, { N, r, p }, (err, derived) => {
            if (err) return resolve(false);
            if (derived.length !== expected.length) return resolve(false);
            resolve(crypto.timingSafeEqual(derived, expected));
        });
    });
}

const DUMMY_PASSWORD_HASH = hashPasswordSync(crypto.randomBytes(32).toString('hex'));

function createUser({ email, passwordHash, name, role, faculty, department, isVerified }) {
    const now = new Date().toISOString();
    const user = {
        id: nextUserId++,
        user_uuid: crypto.randomUUID(),
        email: normalizeEmail(email),
        password_hash: passwordHash,
        full_name: name,
        role,
        faculty: faculty || 'computers-ai',
        department: department || null,
        is_verified: Boolean(isVerified),
        created_at: now,
        updated_at: now
    };
    usersById.set(user.id, user);
    userIdByEmail.set(user.email, user.id);
    return user;
}

function findUserByEmail(email) {
    const id = userIdByEmail.get(normalizeEmail(email));
    return id ? usersById.get(id) : null;
}

function findUserById(id) {
    return usersById.get(id) || null;
}

function publicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role
    };
}

function seedAdminFromEnv() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail && !adminPassword) {
        console.warn('[HuntYourTrack API] ADMIN_EMAIL/ADMIN_PASSWORD not set; no admin account seeded.');
        return;
    }
    if (!adminEmail || !adminPassword) {
        console.error('[HuntYourTrack API] FATAL: ADMIN_EMAIL and ADMIN_PASSWORD must be provided together.');
        process.exit(1);
    }
    if (!isValidEmail(adminEmail)) {
        console.error('[HuntYourTrack API] FATAL: ADMIN_EMAIL is not a valid email address.');
        process.exit(1);
    }
    if (typeof adminPassword !== 'string' || adminPassword.length < 8) {
        console.error('[HuntYourTrack API] FATAL: ADMIN_PASSWORD must be at least 8 characters.');
        process.exit(1);
    }

    createUser({
        email: normalizeEmail(adminEmail),
        passwordHash: hashPasswordSync(adminPassword),
        name: 'Platform Administrator',
        role: 'admin',
        faculty: 'computers-ai',
        department: null,
        isVerified: true
    });
}

seedAdminFromEnv();

function signToken(user) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const payload = {
        sub: user.id,
        role: user.role,
        iat: issuedAt,
        exp: issuedAt + TOKEN_TTL_SECONDS
    };
    const encodedPayload = base64url(JSON.stringify(payload));
    const signature = crypto.createHmac('sha256', TOKEN_SECRET_BUFFER).update(encodedPayload).digest();
    return `${encodedPayload}.${base64url(signature)}`;
}

function verifyToken(token) {
    if (typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, encodedSignature] = parts;
    if (!encodedPayload || !encodedSignature) return null;

    const expectedSignature = crypto.createHmac('sha256', TOKEN_SECRET_BUFFER).update(encodedPayload).digest();
    let providedSignature;
    try {
        providedSignature = Buffer.from(encodedSignature, 'base64url');
    } catch (err) {
        return null;
    }
    if (providedSignature.length !== expectedSignature.length) return null;
    if (!crypto.timingSafeEqual(providedSignature, expectedSignature)) return null;

    let payload;
    try {
        payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    } catch (err) {
        return null;
    }
    if (!payload || typeof payload !== 'object') return null;
    if (!Number.isInteger(payload.sub)) return null;
    if (typeof payload.role !== 'string') return null;
    if (typeof payload.exp !== 'number') return null;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;
    if (typeof payload.iat === 'number' && payload.iat > now + 60) return null;

    return payload;
}

function applyCors(req, res) {
    const origin = req.headers.origin;
    if (!origin) return;
    res.setHeader('Vary', 'Origin');
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '600');
    }
}

function sendJSON(req, res, statusCode, data, extraHeaders) {
    if (res.headersSent) {
        res.end();
        return;
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    if (statusCode === 413) {
        res.setHeader('Connection', 'close');
    }
    applyCors(req, res);
    if (extraHeaders) {
        for (const [headerName, headerValue] of Object.entries(extraHeaders)) {
            res.setHeader(headerName, headerValue);
        }
    }
    res.end(JSON.stringify(data), () => {
        if (statusCode === 413 && req.socket && typeof req.socket.destroy === 'function') {
            req.socket.destroy();
        }
    });
}

function sendAuthJSON(req, res, statusCode, data, extraHeaders) {
    sendJSON(req, res, statusCode, data, Object.assign({ 'Cache-Control': 'no-store' }, extraHeaders));
}

function readJsonBody(req) {
    return new Promise((resolve) => {
        let settled = false;
        function finish(result) {
            if (settled) return;
            settled = true;
            resolve(result);
        }

        const rawContentLength = req.headers['content-length'];
        if (rawContentLength !== undefined) {
            const contentLength = Number(rawContentLength);
            if (!Number.isFinite(contentLength) || contentLength < 0) {
                if (typeof req.pause === 'function') req.pause();
                finish({ ok: false, status: 400, error: 'Invalid Content-Length header' });
                return;
            }
            if (contentLength > MAX_BODY_BYTES) {
                if (typeof req.pause === 'function') req.pause();
                finish({ ok: false, status: 413, error: 'Request body too large' });
                return;
            }
        }

        let totalBytes = 0;
        let tooLarge = false;
        const chunks = [];

        req.on('data', (chunk) => {
            if (tooLarge) return;
            totalBytes += chunk.length;
            if (totalBytes > MAX_BODY_BYTES) {
                tooLarge = true;
                chunks.length = 0;
                if (typeof req.pause === 'function') req.pause();
                finish({ ok: false, status: 413, error: 'Request body too large' });
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', () => {
            if (tooLarge || settled) return;
            const raw = Buffer.concat(chunks).toString('utf8');
            if (!raw.trim()) {
                finish({ ok: true, data: {} });
                return;
            }
            try {
                const data = JSON.parse(raw);
                if (!data || typeof data !== 'object' || Array.isArray(data)) {
                    finish({ ok: false, status: 400, error: 'Invalid JSON payload' });
                    return;
                }
                finish({ ok: true, data });
            } catch (err) {
                finish({ ok: false, status: 400, error: 'Invalid JSON payload' });
            }
        });

        req.on('error', () => {
            if (settled) return;
            finish({ ok: false, status: 400, error: 'Invalid request body' });
        });

        req.on('close', () => {
            if (settled) return;
            if (!req.complete) {
                finish({ ok: false, status: 400, error: 'Request connection terminated prematurely' });
            }
        });
    });
}

function getClientIp(req) {
    const rawIp = (req.socket && req.socket.remoteAddress) || '127.0.0.1';
    return rawIp.replace(/^::ffff:/, '');
}

const MAX_RATE_LIMIT_BUCKETS = 10000;

function pruneRateLimitBuckets(now) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
        if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    }
    if (rateLimitBuckets.size >= MAX_RATE_LIMIT_BUCKETS) {
        const excess = rateLimitBuckets.size - MAX_RATE_LIMIT_BUCKETS + 500;
        let evicted = 0;
        for (const bucketKey of rateLimitBuckets.keys()) {
            rateLimitBuckets.delete(bucketKey);
            evicted += 1;
            if (evicted >= excess) break;
        }
    }
}

function checkRateLimit(req, scope, maxRequests = RATE_LIMIT_MAX_REQUESTS, windowMs = RATE_LIMIT_WINDOW_MS) {
    const now = Date.now();
    rateLimitChecks += 1;
    if (rateLimitChecks % 100 === 0 || rateLimitBuckets.size >= MAX_RATE_LIMIT_BUCKETS) {
        pruneRateLimitBuckets(now);
    }

    const bucketKey = `${getClientIp(req)}|${scope}`;
    const bucket = rateLimitBuckets.get(bucketKey);

    if (!bucket || bucket.resetAt <= now) {
        rateLimitBuckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
        return { allowed: true };
    }

    bucket.count += 1;
    if (bucket.count > maxRequests) {
        return {
            allowed: false,
            retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
        };
    }
    return { allowed: true };
}

function rateLimitResponse(req, res, retryAfterSeconds) {
    sendAuthJSON(req, res, 429, { error: 'Too many requests. Please try again later.' }, {
        'Retry-After': String(retryAfterSeconds)
    });
}

async function handleRegister(req, res) {
    const rateResult = checkRateLimit(req, 'register', RATE_LIMIT_MAX_REQUESTS);
    if (!rateResult.allowed) {
        rateLimitResponse(req, res, rateResult.retryAfterSeconds);
        return;
    }

    const bodyResult = await readJsonBody(req);
    if (!bodyResult.ok) {
        sendAuthJSON(req, res, bodyResult.status, { error: bodyResult.error });
        return;
    }

    const body = bodyResult.data;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (body.role !== undefined && typeof body.role !== 'string') {
        sendAuthJSON(req, res, 400, { error: 'Invalid role specified.' });
        return;
    }
    const rawRole = typeof body.role === 'string' ? body.role.trim().toLowerCase() : '';

    if (rawRole === 'admin') {
        sendAuthJSON(req, res, 400, { error: 'Admin accounts cannot be self-registered.' });
        return;
    }
    if (rawRole && rawRole !== 'student' && rawRole !== 'employer') {
        sendAuthJSON(req, res, 400, { error: 'Invalid role specified.' });
        return;
    }
    const role = rawRole === 'employer' ? 'employer' : 'student';

    const faculty = typeof body.faculty === 'string' && body.faculty.trim()
        ? body.faculty.trim().slice(0, 80)
        : 'computers-ai';
    const department = typeof body.department === 'string' && body.department.trim()
        ? body.department.trim().slice(0, 80)
        : null;

    if (!name || name.length > 120) {
        sendAuthJSON(req, res, 400, { error: 'Name is required (max 120 characters).' });
        return;
    }
    if (!isValidEmail(email)) {
        sendAuthJSON(req, res, 400, { error: 'A valid email address is required.' });
        return;
    }
    if (password.length < 8) {
        sendAuthJSON(req, res, 400, { error: 'Password must be at least 8 characters.' });
        return;
    }
    if (findUserByEmail(email)) {
        sendAuthJSON(req, res, 409, { error: 'Email is already registered.' });
        return;
    }

    const passwordHash = await hashPassword(password);

    if (findUserByEmail(email)) {
        sendAuthJSON(req, res, 409, { error: 'Email is already registered.' });
        return;
    }

    const user = createUser({
        email,
        passwordHash,
        name,
        role,
        faculty,
        department,
        isVerified: false
    });

    sendAuthJSON(req, res, 201, {
        token: signToken(user),
        user: publicUser(user)
    });
}

async function handleLogin(req, res) {
    const rateResult = checkRateLimit(req, 'login');
    if (!rateResult.allowed) {
        rateLimitResponse(req, res, rateResult.retryAfterSeconds);
        return;
    }

    const bodyResult = await readJsonBody(req);
    if (!bodyResult.ok) {
        sendAuthJSON(req, res, bodyResult.status, { error: bodyResult.error });
        return;
    }

    const body = bodyResult.data;
    const email = typeof body.email === 'string' ? normalizeEmail(body.email) : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
        sendAuthJSON(req, res, 400, { error: 'Email and password are required.' });
        return;
    }

    const user = findUserByEmail(email);
    const passwordMatches = await verifyPassword(password, user ? user.password_hash : DUMMY_PASSWORD_HASH);

    if (!user || !passwordMatches) {
        sendAuthJSON(req, res, 401, { error: 'Invalid email or password.' });
        return;
    }

    sendAuthJSON(req, res, 200, {
        token: signToken(user),
        user: publicUser(user)
    });
}

function handleMe(req, res) {
    const rateResult = checkRateLimit(req, 'me', 120);
    if (!rateResult.allowed) {
        rateLimitResponse(req, res, rateResult.retryAfterSeconds);
        return;
    }

    const authHeader = req.headers.authorization || '';
    const headerMatch = /^Bearer\s+(.+)$/i.exec(authHeader);
    if (!headerMatch) {
        sendAuthJSON(req, res, 401, { error: 'Authentication required.' });
        return;
    }

    const payload = verifyToken(headerMatch[1].trim());
    if (!payload) {
        sendAuthJSON(req, res, 401, { error: 'Invalid or expired token.' });
        return;
    }

    const user = findUserById(payload.sub);
    if (!user || user.role !== payload.role) {
        sendAuthJSON(req, res, 401, { error: 'Invalid or expired token.' });
        return;
    }

    sendAuthJSON(req, res, 200, { user: publicUser(user) });
}

async function handleRequest(req, res) {
    if (req.method === 'OPTIONS') {
        const origin = req.headers.origin;
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            sendJSON(req, res, 403, { error: 'Origin not allowed' });
            return;
        }
        applyCors(req, res);
        res.statusCode = 204;
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/api/v1/health' && req.method === 'GET') {
        sendJSON(req, res, 200, {
            status: 'ok',
            service: 'HuntYourTrack Backend API',
            version: '2.0.0',
            timestamp: new Date().toISOString()
        });
        return;
    }

    if (pathname === '/api/v1/auth/register' && req.method === 'POST') {
        await handleRegister(req, res);
        return;
    }

    if (pathname === '/api/v1/auth/login' && req.method === 'POST') {
        await handleLogin(req, res);
        return;
    }

    if (pathname === '/api/v1/auth/me' && req.method === 'GET') {
        handleMe(req, res);
        return;
    }

    if (pathname === '/api/v1/courses' && req.method === 'GET') {
        try {
            const rawData = fs.readFileSync(CATALOG_PATH, 'utf-8');
            let courses = JSON.parse(rawData);

            const trackFilter = parsedUrl.query.track;
            if (trackFilter) {
                courses = courses.filter((course) => course.track === trackFilter);
            }
            sendJSON(req, res, 200, { count: courses.length, courses });
        } catch (err) {
            sendJSON(req, res, 500, { error: 'Failed to read course catalog', details: err.message });
        }
        return;
    }

    if (pathname === '/api/v1/roadmaps/tree' && req.method === 'GET') {
        sendJSON(req, res, 200, {
            faculty: 'Faculty of Computers & Artificial Intelligence',
            tracks: [
                { id: 'ai-deeplearning', name: 'Artificial Intelligence & Deep Learning', phasesCount: 4 },
                { id: 'cybersecurity', name: 'Cybersecurity & SOC Operations', phasesCount: 4 },
                { id: 'cloud-devops', name: 'Cloud Architecture & DevOps', phasesCount: 4 },
                { id: 'fullstack-web', name: 'Full-Stack Web Engineering', phasesCount: 4 }
            ]
        });
        return;
    }

    if (pathname === '/api/v1/cv/parse-keywords' && req.method === 'POST') {
        const rateResult = checkRateLimit(req, 'cv', 30);
        if (!rateResult.allowed) {
            rateLimitResponse(req, res, rateResult.retryAfterSeconds);
            return;
        }

        const bodyResult = await readJsonBody(req);
        if (!bodyResult.ok) {
            sendJSON(req, res, bodyResult.status, { error: bodyResult.error });
            return;
        }

        const payload = bodyResult.data;
        const text = (typeof payload.text === 'string' ? payload.text : '').toLowerCase();

        const matchedKeywords = {};
        let topTrack = 'ai-deeplearning';
        let maxMatches = -1;

        for (const [track, keywords] of Object.entries(KEYWORDS_BY_TRACK)) {
            const matches = keywords.filter((keyword) => text.includes(keyword.toLowerCase()));
            matchedKeywords[track] = matches;
            if (matches.length > maxMatches) {
                maxMatches = matches.length;
                topTrack = track;
            }
        }

        sendJSON(req, res, 200, {
            matchedKeywords,
            recommendedTrack: topTrack,
            totalMatches: maxMatches > 0 ? maxMatches : 0
        });
        return;
    }

    sendJSON(req, res, 404, { error: 'Endpoint not found' });
}

const server = http.createServer((req, res) => {
    handleRequest(req, res).catch(() => {
        sendJSON(req, res, 500, { error: 'Internal server error' });
    });
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`[HuntYourTrack API] Server listening on port ${PORT}`);
    });
}

module.exports = server;
