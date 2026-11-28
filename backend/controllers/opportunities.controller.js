/**
 * HuntYourTrack - Opportunities Controller
 * Manages internships, training tracks, and student applications
 */

const fs = require('fs');
const path = require('path');
const { sendJSON, handleError, handleNotFound, handleBadRequest } = require('../middleware/error.middleware');

const OPPORTUNITIES_PATH = path.join(__dirname, '..', '..', 'database', 'nosql', 'opportunities.json');

function getOpportunitiesList(req, res, query = {}) {
    try {
        if (!fs.existsSync(OPPORTUNITIES_PATH)) {
            return sendJSON(res, 200, { success: true, count: 0, opportunities: [] });
        }
        const raw = fs.readFileSync(OPPORTUNITIES_PATH, 'utf-8');
        let opportunities = JSON.parse(raw);

        // Auto-prune expired deadlines unless explicitly requested otherwise
        if (query.includeExpired !== 'true') {
            const now = Date.now();
            opportunities = opportunities.filter(o => !o.deadline || new Date(o.deadline + 'T23:59:59').getTime() >= now);
        }

        if (query.discipline) {
            opportunities = opportunities.filter(o => o.discipline === query.discipline);
        }
        if (query.type) {
            opportunities = opportunities.filter(o => o.type === query.type);
        }
        if (query.q) {
            const term = query.q.toLowerCase();
            opportunities = opportunities.filter(o =>
                o.title.toLowerCase().includes(term) ||
                o.orgName.toLowerCase().includes(term) ||
                (o.skills && o.skills.some(s => s.toLowerCase().includes(term)))
            );
        }

        return sendJSON(res, 200, {
            success: true,
            count: opportunities.length,
            opportunities
        });
    } catch (err) {
        return handleError(res, err, 'Failed to fetch opportunities');
    }
}

function getOpportunityById(req, res, id) {
    try {
        if (!fs.existsSync(OPPORTUNITIES_PATH)) {
            return handleNotFound(res, 'Opportunity');
        }
        const raw = fs.readFileSync(OPPORTUNITIES_PATH, 'utf-8');
        const opportunities = JSON.parse(raw);
        const opp = opportunities.find(o => o.id === id);

        if (!opp) {
            return handleNotFound(res, `Opportunity with ID ${id}`);
        }

        return sendJSON(res, 200, { success: true, opportunity: opp });
    } catch (err) {
        return handleError(res, err, 'Failed to retrieve opportunity details');
    }
}

function handleApply(req, res, body) {
    try {
        const payload = JSON.parse(body || '{}');
        const { opportunityId, applicantEmail, resumeText } = payload;

        if (!opportunityId || !applicantEmail) {
            return handleBadRequest(res, 'opportunityId and applicantEmail are required');
        }

        const applicationId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        return sendJSON(res, 201, {
            success: true,
            message: 'Application submitted successfully',
            application: {
                id: applicationId,
                opportunityId,
                applicantEmail,
                status: 'submitted',
                submittedAt: new Date().toISOString()
            }
        });
    } catch {
        return handleBadRequest(res, 'Invalid JSON payload for application');
    }
}

module.exports = {
    getOpportunitiesList,
    getOpportunityById,
    handleApply
};
