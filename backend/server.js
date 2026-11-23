/**
 * HuntYourTrack — Lightweight Modular Backend API Server (US38)
 * Architecture: Modular routes/, controllers/, and middleware/
 * Runtime: Pure Node.js (Zero external npm packages required to preserve network quota)
 * Endpoints:
 *  - GET  /api/v1/health
 *  - Auth: POST /api/v1/auth/register, POST /api/v1/auth/login, GET /api/v1/auth/me, POST /api/v1/auth/logout
 *  - Courses: GET /api/v1/courses, GET /api/v1/courses/:id, GET /api/v1/roadmaps/tree
 *  - Opportunities: GET /api/v1/opportunities, GET /api/v1/opportunities/:id, POST /api/v1/opportunities/apply
 *  - CV & ATS: POST /api/v1/cv/parse-keywords, GET /api/v1/cv/keywords
 */

const http = require('http');

const { handleCors } = require('./middleware/cors.middleware');
const { checkRateLimit } = require('./middleware/rate-limit.middleware');
const { sendJSON, handleNotFound } = require('./middleware/error.middleware');

const { authRoutes } = require('./routes/auth.routes');
const { coursesRoutes } = require('./routes/courses.routes');
const { opportunitiesRoutes } = require('./routes/opportunities.routes');
const { cvRoutes } = require('./routes/cv.routes');

const PORT = process.env.PORT || 3000;
const MAX_BODY_BYTES = 16 * 1024; // 16KB security limit

function createServer() {
    return http.createServer((req, res) => {
        // 1. CORS Preflight & Headers
        if (handleCors(req, res)) {
            return;
        }

        // 2. In-memory Rate Limiting
        if (!checkRateLimit(req, res)) {
            return;
        }

        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams.entries());

        // 3. Health check endpoint
        if (pathname === '/api/v1/health' && req.method === 'GET') {
            return sendJSON(res, 200, {
                status: 'ok',
                service: 'HuntYourTrack Modular Backend API',
                version: '2.1.0',
                architecture: 'modular (routes/controllers/middleware)',
                timestamp: new Date().toISOString()
            });
        }

        // 4. Content-Length Header Guard
        const rawContentLength = req.headers['content-length'];
        if (rawContentLength !== undefined) {
            const contentLength = Number(rawContentLength);
            if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
                res.writeHead(413, { 'Content-Type': 'application/json', 'Connection': 'close' });
                res.end(JSON.stringify({ error: 'Request body too large (max 16KB)' }), () => {
                    if (req.socket && typeof req.socket.destroy === 'function') req.socket.destroy();
                });
                return;
            }
        }

        // 5. Ingest Body for POST/PUT requests
        let body = '';
        let tooLarge = false;

        req.on('data', chunk => {
            if (tooLarge) return;
            body += chunk;
            if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
                tooLarge = true;
                res.writeHead(413, { 'Content-Type': 'application/json', 'Connection': 'close' });
                res.end(JSON.stringify({ error: 'Request body too large (max 16KB)' }), () => {
                    if (req.socket && typeof req.socket.destroy === 'function') req.socket.destroy();
                });
            }
        });

        req.on('end', () => {
            if (tooLarge) return;

            // 6. Dispatch to Modular Routers
            if (authRoutes(req, res, pathname, query, body)) return;
            if (coursesRoutes(req, res, pathname, query, body)) return;
            if (opportunitiesRoutes(req, res, pathname, query, body)) return;
            if (cvRoutes(req, res, pathname, query, body)) return;

            // 7. Fallback 404
            return handleNotFound(res, `Route ${pathname}`);
        });
    });
}

const server = createServer();

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`[HuntYourTrack API] Modular server listening on port ${PORT}`);
    });
}

module.exports = server;
module.exports.createServer = createServer;
