/**
 * HuntYourTrack - Opportunities Routes
 */

const { getOpportunitiesList, getOpportunityById, handleApply } = require('../controllers/opportunities.controller');

function opportunitiesRoutes(req, res, pathname, query, body) {
    if (pathname === '/api/v1/opportunities' && req.method === 'GET') {
        getOpportunitiesList(req, res, query);
        return true;
    }
    if (pathname === '/api/v1/opportunities/apply' && req.method === 'POST') {
        handleApply(req, res, body);
        return true;
    }
    if (pathname.startsWith('/api/v1/opportunities/') && req.method === 'GET') {
        const id = pathname.replace('/api/v1/opportunities/', '');
        getOpportunityById(req, res, id);
        return true;
    }
    return false;
}

module.exports = { opportunitiesRoutes };
