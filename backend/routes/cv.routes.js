/**
 * HuntYourTrack - CV Routes
 */

const { handleParseKeywords, getKeywordsCatalog } = require('../controllers/cv.controller');

function cvRoutes(req, res, pathname, query, body) {
    if ((pathname === '/api/v1/cv/parse-keywords' || pathname === '/api/v1/cv/parse') && req.method === 'POST') {
        handleParseKeywords(req, res, body);
        return true;
    }
    if (pathname === '/api/v1/cv/keywords' && req.method === 'GET') {
        getKeywordsCatalog(req, res);
        return true;
    }
    return false;
}

module.exports = { cvRoutes };
