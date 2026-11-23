/**
 * HuntYourTrack - CORS Middleware
 * Zero-dependency native HTTP header configuration with origin validation
 */

const DEFAULT_ORIGINS = ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://127.0.0.1:3000', 'https://engmohamedelabsy.github.io'];

function getAllowedOrigins() {
    if (process.env.CORS_ORIGIN) {
        return process.env.CORS_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);
    }
    return DEFAULT_ORIGINS;
}

function handleCors(req, res) {
    const origin = req.headers.origin;
    const allowed = getAllowedOrigins();

    if (origin) {
        res.setHeader('Vary', 'Origin');
        if (!allowed.includes(origin) && !allowed.includes('*')) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Origin not allowed by CORS policy' }));
            return true;
        }
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return true; // handled
    }
    return false;
}

module.exports = { handleCors };
