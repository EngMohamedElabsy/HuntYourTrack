/**
 * HuntYourTrack - Courses Routes
 */

const { getCoursesList, getCourseById, getRoadmapTree } = require('../controllers/courses.controller');

function coursesRoutes(req, res, pathname, query, body) {
    if (pathname === '/api/v1/courses' && req.method === 'GET') {
        getCoursesList(req, res, query);
        return true;
    }
    if (pathname.startsWith('/api/v1/courses/') && req.method === 'GET') {
        const id = pathname.replace('/api/v1/courses/', '');
        getCourseById(req, res, id);
        return true;
    }
    if (pathname === '/api/v1/roadmaps/tree' && req.method === 'GET') {
        getRoadmapTree(req, res);
        return true;
    }
    return false;
}

module.exports = { coursesRoutes };
