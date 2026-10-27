const assert = require('node:assert/strict');
const test = require('node:test');
const { app } = require('../server');
const userStore = require('../models/userStore');

let server;
let baseUrl;

test.before(async () => {
    userStore.clear();
    await new Promise((resolve) => {
        server = app.listen(0, '127.0.0.1', () => {
            const address = server.address();
            baseUrl = `http://127.0.0.1:${address.port}`;
            resolve();
        });
    });
});

test.after(async () => {
    userStore.clear();
    if (server) {
        await new Promise((resolve) => server.close(resolve));
    }
});

test('US01 Authentication & Session Suite', async (t) => {
    let authCookie = '';

    await t.test('1. Registration rejects missing fields with 400', async () => {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: 'Test Student' })
        });
        assert.equal(response.status, 400);
        const data = await response.json();
        assert.match(data.message, /required/i);
    });

    await t.test('2. Registration rejects short passwords (< 8 chars) with 400', async () => {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: 'Test Student',
                email: 'student@alexu.edu.eg',
                faculty: 'Faculty of Engineering',
                password: 'short'
            })
        });
        assert.equal(response.status, 400);
        const data = await response.json();
        assert.match(data.message, /8 characters/i);
    });

    await t.test('3. Registration succeeds with valid data and sets httpOnly session cookie', async () => {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: 'Mohamed Elabsy',
                email: 'mohamed@alexu.edu.eg',
                faculty: 'Faculty of Engineering',
                password: 'SecurePassword2026!'
            })
        });

        assert.equal(response.status, 201);
        const setCookieHeader = response.headers.get('set-cookie');
        assert.ok(setCookieHeader, 'Should have Set-Cookie header');
        assert.match(setCookieHeader, /token=/);
        assert.match(setCookieHeader, /HttpOnly/i);
        assert.match(setCookieHeader, /SameSite=Lax/i);

        const data = await response.json();
        assert.equal(data.message, 'Account created successfully.');
        assert.equal(data.user.email, 'mohamed@alexu.edu.eg');
        assert.equal(data.user.name, 'Mohamed Elabsy');
        assert.equal(data.user.faculty, 'Faculty of Engineering');
        assert.equal(typeof data.user.passwordHash, 'undefined', 'Password hash must not be exposed');
    });

    await t.test('4. Registration rejects duplicate email with 409', async () => {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: 'Duplicate Student',
                email: 'mohamed@alexu.edu.eg',
                faculty: 'Faculty of Science',
                password: 'DifferentPassword2026!'
            })
        });
        assert.equal(response.status, 409);
        const data = await response.json();
        assert.equal(data.message, 'That email is already registered.');
    });

    await t.test('5. Login rejects invalid password with 401', async () => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                email: 'mohamed@alexu.edu.eg',
                password: 'WrongPassword!'
            })
        });
        assert.equal(response.status, 401);
        const data = await response.json();
        assert.equal(data.message, 'Invalid email or password.');
    });

    await t.test('6. Login rejects non-existent email with 401', async () => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                email: 'unknown@alexu.edu.eg',
                password: 'SecurePassword2026!'
            })
        });
        assert.equal(response.status, 401);
        const data = await response.json();
        assert.equal(data.message, 'Invalid email or password.');
    });

    await t.test('7. Login succeeds with valid credentials and sets session cookie', async () => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                email: 'mohamed@alexu.edu.eg',
                password: 'SecurePassword2026!'
            })
        });

        assert.equal(response.status, 200);
        const setCookieHeader = response.headers.get('set-cookie');
        assert.ok(setCookieHeader);
        assert.match(setCookieHeader, /token=/);
        assert.match(setCookieHeader, /HttpOnly/i);

        authCookie = setCookieHeader.split(';')[0]; // Extract token=...

        const data = await response.json();
        assert.equal(data.message, 'Signed in successfully.');
        assert.equal(data.redirectTo, '/dashboard');
        assert.equal(data.user.email, 'mohamed@alexu.edu.eg');
    });

    await t.test('8. Protected route /api/auth/me accepts valid session cookie', async () => {
        const response = await fetch(`${baseUrl}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': authCookie
            }
        });

        assert.equal(response.status, 200);
        const data = await response.json();
        assert.equal(data.user.email, 'mohamed@alexu.edu.eg');
        assert.equal(data.user.name, 'Mohamed Elabsy');
    });

    await t.test('9. Password reset request succeeds', async () => {
        const response = await fetch(`${baseUrl}/api/auth/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ email: 'mohamed@alexu.edu.eg' })
        });

        assert.equal(response.status, 200);
        const data = await response.json();
        assert.match(data.message, /reset link will be sent/i);
    });

    await t.test('10. Logout clears session cookie', async () => {
        const response = await fetch(`${baseUrl}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Cookie': authCookie
            }
        });

        assert.equal(response.status, 200);
        const setCookieHeader = response.headers.get('set-cookie');
        assert.ok(setCookieHeader);
        assert.match(setCookieHeader, /token=;/);
    });
});
