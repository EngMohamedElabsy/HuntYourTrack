/**
 * Application configuration.
 * Centralizes environment variables with sensible defaults for local development.
 */
module.exports = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'huntyourtrack-dev-secret-key-2026',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    COOKIE_NAME: 'token',
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    },
    ALLOWED_ORIGINS: [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ]
};
