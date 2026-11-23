/**
 * HuntYourTrack - Auth Routes
 */

const { handleRegister, handleLogin, handleGetMe, handleLogout } = require('../controllers/auth.controller');

function authRoutes(req, res, pathname, query, body) {
    if (pathname === '/api/v1/auth/register' && req.method === 'POST') {
        handleRegister(req, res, body);
        return true;
    }
    if (pathname === '/api/v1/auth/login' && req.method === 'POST') {
        handleLogin(req, res, body);
        return true;
    }
    if (pathname === '/api/v1/auth/me' && req.method === 'GET') {
        handleGetMe(req, res);
        return true;
    }
    if (pathname === '/api/v1/auth/logout' && (req.method === 'POST' || req.method === 'GET')) {
        handleLogout(req, res);
        return true;
    }
    return false; // not matched
}

module.exports = { authRoutes };
