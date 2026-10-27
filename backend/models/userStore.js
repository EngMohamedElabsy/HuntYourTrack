const crypto = require('node:crypto');

/**
 * In-memory user store for authentication and user management.
 * Designed with a clean interface that can easily transition to MongoDB Atlas.
 */
class UserStore {
    constructor() {
        /** @type {Map<string, Object>} */
        this.usersById = new Map();
        /** @type {Map<string, string>} Maps normalized lowercase email to user ID */
        this.emailToId = new Map();
    }

    /**
     * Normalize email string by trimming whitespace and converting to lowercase.
     * @param {string} email
     * @returns {string}
     */
    normalizeEmail(email) {
        return (email || '').trim().toLowerCase();
    }

    /**
     * Find a user by email address.
     * @param {string} email
     * @returns {Object|null}
     */
    findByEmail(email) {
        const normalized = this.normalizeEmail(email);
        const id = this.emailToId.get(normalized);
        if (!id) return null;
        return this.usersById.get(id) || null;
    }

    /**
     * Find a user by unique identifier.
     * @param {string} id
     * @returns {Object|null}
     */
    findById(id) {
        return this.usersById.get(id) || null;
    }

    /**
     * Create and store a new user record.
     * @param {Object} data
     * @param {string} data.name
     * @param {string} data.email
     * @param {string} data.faculty
     * @param {string} data.passwordHash
     * @returns {Object}
     */
    create({ name, email, faculty, passwordHash }) {
        const normalizedEmail = this.normalizeEmail(email);
        const id = crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        const user = {
            id,
            name: name.trim(),
            email: normalizedEmail,
            faculty: faculty.trim(),
            passwordHash,
            createdAt: new Date().toISOString()
        };

        this.usersById.set(id, user);
        this.emailToId.set(normalizedEmail, id);

        return user;
    }

    /**
     * Clear all stored users (primarily for testing purposes).
     */
    clear() {
        this.usersById.clear();
        this.emailToId.clear();
    }

    /**
     * Get total number of registered users.
     * @returns {number}
     */
    count() {
        return this.usersById.size;
    }
}

// Export singleton instance
const userStore = new UserStore();
module.exports = userStore;
