const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Authentication middleware to verify JWT session token.
 * Looks for token in cookies first, then in Authorization header.
 */
function authenticateToken(req, res, next) {
    let token = null;

    if (req.cookies && req.cookies[config.COOKIE_NAME]) {
        token = req.cookies[config.COOKIE_NAME];
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Authentication required. No session token provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired session token.' });
    }
}

module.exports = authenticateToken;
