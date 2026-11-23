/**
 * HuntYourTrack - Rate Limiting Middleware
 * In-memory sliding window rate limiter (zero dependencies)
 */

const requestsPerIp = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 120; // 120 requests per minute

function checkRateLimit(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const record = requestsPerIp.get(ip) || { count: 0, resetTime: now + WINDOW_MS };

    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + WINDOW_MS;
    } else {
        record.count++;
    }

    requestsPerIp.set(ip, record);

    if (record.count > MAX_REQUESTS) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            error: 'Too many requests. Please wait a moment before trying again.',
            retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
        }));
        return false; // blocked
    }

    return true; // allowed
}

module.exports = { checkRateLimit };
