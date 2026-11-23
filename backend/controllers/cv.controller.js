/**
 * HuntYourTrack - CV & ATS Keywords Matching Controller
 * Domain-aware resume keyword extraction and career track scoring
 */

const fs = require('fs');
const path = require('path');
const { sendJSON, handleError, handleBadRequest } = require('../middleware/error.middleware');

const KEYWORDS_PATH = path.join(__dirname, '..', '..', 'database', 'nosql', 'ats_keywords.json');

function loadKeywords() {
    if (fs.existsSync(KEYWORDS_PATH)) {
        return JSON.parse(fs.readFileSync(KEYWORDS_PATH, 'utf-8'));
    }
    return {
        'ai-deeplearning': ['python', 'pytorch', 'machine learning', 'deep learning'],
        'fullstack-web': ['javascript', 'react', 'node.js', 'typescript'],
        'cloud-devops': ['docker', 'kubernetes', 'aws', 'ci/cd'],
        'cybersecurity': ['wireshark', 'penetration testing', 'owasp']
    };
}

function handleParseKeywords(req, res, body) {
    try {
        const payload = JSON.parse(body || '{}');
        const text = (payload.text || '').toLowerCase();

        if (!text.trim()) {
            return handleBadRequest(res, 'text field is required for ATS keyword extraction');
        }

        const keywordsByTrack = loadKeywords();
        const matchedKeywords = {};
        const trackScores = {};
        let topTrack = 'ai-deeplearning';
        let maxMatches = -1;

        for (const [track, keywords] of Object.entries(keywordsByTrack)) {
            const matches = keywords.filter(kw => text.includes(kw.toLowerCase()));
            matchedKeywords[track] = matches;
            trackScores[track] = matches.length;

            if (matches.length > maxMatches) {
                maxMatches = matches.length;
                topTrack = track;
            }
        }

        // Calculate a normalized match rate (0 to 100%)
        const totalTopKeywords = (keywordsByTrack[topTrack] || []).length || 1;
        const atsMatchScore = Math.min(100, Math.round(((maxMatches > 0 ? maxMatches : 0) / totalTopKeywords) * 100));

        return sendJSON(res, 200, {
            success: true,
            recommendedTrack: topTrack,
            atsMatchScore,
            totalMatches: maxMatches > 0 ? maxMatches : 0,
            matchedKeywords,
            trackScores
        });
    } catch {
        return handleBadRequest(res, 'Invalid JSON body for CV parsing');
    }
}

function getKeywordsCatalog(req, res) {
    try {
        const keywords = loadKeywords();
        return sendJSON(res, 200, {
            success: true,
            keywords
        });
    } catch (err) {
        return handleError(res, err, 'Failed to retrieve keywords catalog');
    }
}

module.exports = {
    handleParseKeywords,
    getKeywordsCatalog
};
