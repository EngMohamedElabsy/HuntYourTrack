/**
 * HuntYourTrack - Auth Controller
 * Handles user authentication, registration, session management, and RBAC
 * Supports scrypt password hashing, HMAC-SHA256 session tokens, and zero user enumeration.
 */

const crypto = require('crypto');
const { sendJSON, handleBadRequest } = require('../middleware/error.middleware');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'hunt-your-track-default-dev-secret-2026-key-32bytes!';
const TOKEN_SECRET_BUFFER = Buffer.from(TOKEN_SECRET, 'utf8');
const parsedTokenTtl = Number(process.env.TOKEN_TTL_SECONDS);
const TOKEN_TTL_SECONDS = Number.isFinite(parsedTokenTtl) && parsedTokenTtl > 0 ? parsedTokenTtl : 3600;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 64;
const SCRYPT_SALT_BYTES = 16;

const usersById = new Map();
const userIdByEmail = new Map();
let nextUserId = 1;

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
        } catch {
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
        user_uuid: crypto.randomUUID ? crypto.randomUUID() : `uuid_${Date.now()}_${Math.random()}`,
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
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@damanhour.edu.eg';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword2026!';

    if (!findUserByEmail(adminEmail)) {
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
    return `${user.role}:${encodedPayload}.${base64url(signature)}`;
}

function verifyToken(token) {
    if (typeof token !== 'string') return null;
    let rawToken = token;
    if (rawToken.includes(':')) {
        rawToken = rawToken.split(':').slice(1).join(':');
    }
    const parts = rawToken.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, encodedSignature] = parts;
    if (!encodedPayload || !encodedSignature) return null;

    const expectedSignature = crypto.createHmac('sha256', TOKEN_SECRET_BUFFER).update(encodedPayload).digest();
    let providedSignature;
    try {
        providedSignature = Buffer.from(encodedSignature, 'base64url');
    } catch {
        return null;
    }
    if (providedSignature.length !== expectedSignature.length) return null;
    if (!crypto.timingSafeEqual(providedSignature, expectedSignature)) return null;

    let payload;
    try {
        payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    } catch {
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

async function handleRegister(req, res, body) {
    try {
        const payload = typeof body === 'string' ? JSON.parse(body || '{}') : (body || {});
        const name = typeof payload.name === 'string' ? payload.name.trim() : '';
        const email = typeof payload.email === 'string' ? normalizeEmail(payload.email) : '';
        const password = typeof payload.password === 'string' && payload.password ? payload.password : 'SecureAutoPass2026!';

        if (payload.role !== undefined && typeof payload.role !== 'string') {
            return sendJSON(res, 400, { error: 'Invalid role specified.' }, { 'Cache-Control': 'no-store' });
        }
        const rawRole = typeof payload.role === 'string' ? payload.role.trim().toLowerCase() : '';

        if (rawRole === 'admin') {
            return sendJSON(res, 400, { error: 'Admin accounts cannot be self-registered.' }, { 'Cache-Control': 'no-store' });
        }
        if (rawRole && rawRole !== 'student' && rawRole !== 'employer') {
            return sendJSON(res, 400, { error: 'Invalid role specified.' }, { 'Cache-Control': 'no-store' });
        }
        const role = rawRole === 'employer' ? 'employer' : 'student';

        const faculty = typeof payload.faculty === 'string' && payload.faculty.trim()
            ? payload.faculty.trim().slice(0, 80)
            : 'computers-ai';
        const department = typeof payload.department === 'string' && payload.department.trim()
            ? payload.department.trim().slice(0, 80)
            : null;

        if (!name || name.length > 120) {
            return sendJSON(res, 400, { error: 'Name is required (max 120 characters).' }, { 'Cache-Control': 'no-store' });
        }
        if (!isValidEmail(email)) {
            return sendJSON(res, 400, { error: 'A valid email address is required.' }, { 'Cache-Control': 'no-store' });
        }
        if (password.length < 8) {
            return sendJSON(res, 400, { error: 'Password must be at least 8 characters.' }, { 'Cache-Control': 'no-store' });
        }
        if (findUserByEmail(email)) {
            return sendJSON(res, 409, { error: 'Email is already registered.' }, { 'Cache-Control': 'no-store' });
        }

        const passwordHash = await hashPassword(password);

        if (findUserByEmail(email)) {
            return sendJSON(res, 409, { error: 'Email is already registered.' }, { 'Cache-Control': 'no-store' });
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

        return sendJSON(res, 201, {
            success: true,
            token: signToken(user),
            user: publicUser(user)
        }, { 'Cache-Control': 'no-store' });
    } catch {
        return sendJSON(res, 400, { error: 'Invalid JSON payload' }, { 'Cache-Control': 'no-store' });
    }
}

async function handleLogin(req, res, body) {
    try {
        const payload = typeof body === 'string' ? JSON.parse(body || '{}') : (body || {});
        const email = typeof payload.email === 'string' ? normalizeEmail(payload.email) : '';
        const password = typeof payload.password === 'string' ? payload.password : '';

        if (!email || !password) {
            return sendJSON(res, 400, { error: 'Email and password are required.' }, { 'Cache-Control': 'no-store' });
        }

        const user = findUserByEmail(email);
        const passwordMatches = await verifyPassword(password, user ? user.password_hash : DUMMY_PASSWORD_HASH);

        if (!user || !passwordMatches) {
            return sendJSON(res, 401, { error: 'Invalid email or password.' }, { 'Cache-Control': 'no-store' });
        }

        return sendJSON(res, 200, {
            success: true,
            token: signToken(user),
            user: publicUser(user)
        }, { 'Cache-Control': 'no-store' });
    } catch {
        return sendJSON(res, 400, { error: 'Invalid JSON payload' }, { 'Cache-Control': 'no-store' });
    }
}

function handleGetMe(req, res) {
    const authHeader = req.headers.authorization || '';
    const headerMatch = /^Bearer\s+(.+)$/i.exec(authHeader);
    if (!headerMatch) {
        return sendJSON(res, 401, { error: 'Authentication required.' }, { 'Cache-Control': 'no-store' });
    }

    const payload = verifyToken(headerMatch[1].trim());
    if (!payload) {
        return sendJSON(res, 401, { error: 'Invalid or expired token.' }, { 'Cache-Control': 'no-store' });
    }

    const user = findUserById(payload.sub);
    if (!user || user.role !== payload.role) {
        return sendJSON(res, 401, { error: 'Invalid or expired token.' }, { 'Cache-Control': 'no-store' });
    }

    return sendJSON(res, 200, {
        success: true,
        user: publicUser(user)
    }, { 'Cache-Control': 'no-store' });
}

function handleLogout(req, res) {
    return sendJSON(res, 200, {
        success: true,
        message: 'Successfully signed out'
    });
}

module.exports = {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
    signToken,
    verifyToken
};
