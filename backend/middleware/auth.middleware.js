/**
 * HuntYourTrack - Authentication & RBAC Verification Middleware
 * Validates simulated Bearer tokens without exposing secrets
 */

function verifyAuth(req, requiredRole = null) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authenticated: false, error: 'Authorization header missing or invalid' };
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
        return { authenticated: false, error: 'Token missing' };
    }

    // Decode simulated token (e.g. "student:session-uuid" or "admin:session-uuid")
    const parts = token.split(':');
    const role = parts[0] || 'student';
    const userId = parts[1] || 'anonymous';

    if (requiredRole && role !== requiredRole && role !== 'admin') {
        return { authenticated: false, error: 'Insufficient role permissions', role };
    }

    return {
        authenticated: true,
        user: { id: userId, role }
    };
}

module.exports = { verifyAuth };
