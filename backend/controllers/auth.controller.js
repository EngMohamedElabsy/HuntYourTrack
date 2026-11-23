/**
 * HuntYourTrack - Auth Controller
 * Handles user authentication, registration, session management, and RBAC
 */

const { sendJSON, handleBadRequest } = require('../middleware/error.middleware');
const { verifyAuth } = require('../middleware/auth.middleware');

function handleRegister(req, res, body) {
    try {
        const payload = JSON.parse(body || '{}');
        const { email, role = 'student', name, university, faculty, department } = payload;

        if (!email || !email.includes('@')) {
            return handleBadRequest(res, 'Valid university email is required');
        }

        const sessionToken = `${role}:usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        return sendJSON(res, 201, {
            success: true,
            message: 'User registered successfully',
            token: sessionToken,
            user: {
                email,
                role,
                name: name || email.split('@')[0],
                university: university || 'University',
                faculty: faculty || 'Computing & AI',
                department: department || 'General'
            }
        });
    } catch {
        return handleBadRequest(res, 'Invalid JSON body for registration');
    }
}

function handleLogin(req, res, body) {
    try {
        const payload = JSON.parse(body || '{}');
        const { email, role = 'student' } = payload;

        if (!email || !email.includes('@')) {
            return handleBadRequest(res, 'Valid university email is required');
        }

        const sessionToken = `${role}:sess_${Date.now()}`;

        return sendJSON(res, 200, {
            success: true,
            token: sessionToken,
            user: {
                email,
                role,
                name: email.split('@')[0]
            }
        });
    } catch {
        return handleBadRequest(res, 'Invalid JSON body for login');
    }
}

function handleGetMe(req, res) {
    const authResult = verifyAuth(req);
    if (!authResult.authenticated) {
        return sendJSON(res, 401, { success: false, error: authResult.error });
    }

    return sendJSON(res, 200, {
        success: true,
        user: authResult.user
    });
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
    handleLogout
};
