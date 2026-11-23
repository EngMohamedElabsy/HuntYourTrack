/**
 * HuntYourTrack - Courses Controller
 * Manages verified course catalogs and syllabi
 */

const fs = require('fs');
const path = require('path');
const { sendJSON, handleError, handleNotFound } = require('../middleware/error.middleware');

const CATALOG_PATH = path.join(__dirname, '..', '..', 'database', 'nosql', 'courses-catalog.json');

function getCoursesList(req, res, query = {}) {
    try {
        if (!fs.existsSync(CATALOG_PATH)) {
            return sendJSON(res, 200, { success: true, count: 0, courses: [] });
        }
        const raw = fs.readFileSync(CATALOG_PATH, 'utf-8');
        let courses = JSON.parse(raw);

        if (query.track) {
            courses = courses.filter(c => c.track === query.track);
        }
        if (query.level) {
            courses = courses.filter(c => c.level && c.level.toLowerCase() === query.level.toLowerCase());
        }
        if (query.q) {
            const term = query.q.toLowerCase();
            courses = courses.filter(c =>
                c.title.toLowerCase().includes(term) ||
                (c.institution && c.institution.toLowerCase().includes(term))
            );
        }

        return sendJSON(res, 200, {
            success: true,
            count: courses.length,
            courses
        });
    } catch (err) {
        return handleError(res, err, 'Failed to fetch courses catalog');
    }
}

function getCourseById(req, res, id) {
    try {
        if (!fs.existsSync(CATALOG_PATH)) {
            return handleNotFound(res, 'Course');
        }
        const raw = fs.readFileSync(CATALOG_PATH, 'utf-8');
        const courses = JSON.parse(raw);
        const course = courses.find(c => c.id === id);

        if (!course) {
            return handleNotFound(res, `Course with ID ${id}`);
        }

        return sendJSON(res, 200, { success: true, course });
    } catch (err) {
        return handleError(res, err, 'Failed to retrieve course details');
    }
}

function getRoadmapTree(req, res) {
    return sendJSON(res, 200, {
        success: true,
        faculty: 'Faculty of Computers & Artificial Intelligence',
        tracks: [
            { id: 'ai-deeplearning', name: 'Artificial Intelligence & Deep Learning', phasesCount: 4 },
            { id: 'cybersecurity', name: 'Cybersecurity & SOC Operations', phasesCount: 4 },
            { id: 'cloud-devops', name: 'Cloud Architecture & DevOps', phasesCount: 4 },
            { id: 'fullstack-web', name: 'Full-Stack Web Engineering', phasesCount: 4 }
        ]
    });
}

module.exports = {
    getCoursesList,
    getCourseById,
    getRoadmapTree
};
