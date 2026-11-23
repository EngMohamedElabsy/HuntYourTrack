/**
 * HuntYourTrack - Centralized Error Handler Middleware
 */

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
}

function handleError(res, err, message = 'Internal Server Error') {
    console.error('[API Error]:', err);
    sendJSON(res, 500, {
        success: false,
        error: message,
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
}

function handleNotFound(res, resource = 'Endpoint') {
    sendJSON(res, 404, {
        success: false,
        error: `${resource} not found`
    });
}

function handleBadRequest(res, error = 'Invalid request parameters') {
    sendJSON(res, 400, {
        success: false,
        error
    });
}

module.exports = {
    sendJSON,
    handleError,
    handleNotFound,
    handleBadRequest
};
