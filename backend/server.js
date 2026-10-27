const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('node:path');
const config = require('./config');
const authRouter = require('./routes/auth');

const app = express();

// CORS configuration supporting credentials (cookies) across local development environments
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
        if (!origin) return callback(null, true);
        if (config.ALLOWED_ORIGINS.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parsing and cookie middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount API routes
app.use('/api/auth', authRouter);

// Serve static frontend files for seamless single-server full-stack operation
const frontendPath = path.resolve(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'HuntYourTrack Backend' });
});

// Fallback to auth.html for root path if not resolved by static
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'auth.html'));
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

let server = null;

if (require.main === module) {
    server = app.listen(config.PORT, () => {
        console.log(`[HuntYourTrack Backend] Server running on http://localhost:${config.PORT}`);
        console.log(`[HuntYourTrack Backend] Serving frontend from ${frontendPath}`);
    });
}

module.exports = { app, server };
