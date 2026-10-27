const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userStore = require('../models/userStore');

const BCRYPT_SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Generate a signed JWT for the given user payload.
 * @param {Object} user
 * @returns {string}
 */
function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        faculty: user.faculty
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}

/**
 * Register a new student account.
 */
async function register(req, res, next) {
    try {
        const { name, email, faculty, password } = req.body || {};

        if (!name || !email || !faculty || !password) {
            return res.status(400).json({ message: 'All fields (name, email, faculty, password) are required.' });
        }

        if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
            return res.status(400).json({ message: 'Please provide a valid university email address.' });
        }

        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        const existingUser = userStore.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'That email is already registered.' });
        }

        const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const newUser = userStore.create({
            name,
            email,
            faculty,
            passwordHash
        });

        const token = generateToken(newUser);
        res.cookie(config.COOKIE_NAME, token, config.COOKIE_OPTIONS);

        return res.status(201).json({
            message: 'Account created successfully.',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                faculty: newUser.faculty
            }
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Authenticate student credentials and establish session.
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = userStore.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = generateToken(user);
        res.cookie(config.COOKIE_NAME, token, config.COOKIE_OPTIONS);

        return res.status(200).json({
            message: 'Signed in successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                faculty: user.faculty
            },
            redirectTo: '/dashboard'
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Handle password reset requests.
 */
function passwordReset(req, res) {
    const { email } = req.body || {};
    if (!email) {
        return res.status(400).json({ message: 'University email is required.' });
    }

    return res.status(200).json({
        message: 'If that address is registered, a reset link will be sent.'
    });
}

/**
 * Return current session user details.
 */
function me(req, res) {
    return res.status(200).json({ user: req.user });
}

/**
 * Terminate session and clear cookie.
 */
function logout(req, res) {
    res.clearCookie(config.COOKIE_NAME, {
        httpOnly: config.COOKIE_OPTIONS.httpOnly,
        secure: config.COOKIE_OPTIONS.secure,
        sameSite: config.COOKIE_OPTIONS.sameSite
    });

    return res.status(200).json({ message: 'Logged out successfully.' });
}

module.exports = {
    register,
    login,
    passwordReset,
    me,
    logout
};
