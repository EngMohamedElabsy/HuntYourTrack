/**
 * HuntYourTrack - Authentication and Multi-Role Management Logic
 * Supports Student, Employer, and Administrator onboarding & RBAC session management.
 */

const DEPARTMENT_MAP = {
    computers: [
        { val: "cs", label: "Computer Science (CS)" },
        { val: "ai", label: "Artificial Intelligence (AI)" },
        { val: "is", label: "Information Systems (IS)" },
        { val: "it", label: "Information Technology (IT)" },
        { val: "cyber", label: "Cybersecurity" }
    ],
    engineering: [
        { val: "cce", label: "Computer & Control Engineering" },
        { val: "comm", label: "Electronics & Communications" },
        { val: "mecha", label: "Mechatronics Engineering" }
    ],
    commerce: [
        { val: "mis", label: "Management Info Systems (MIS)" },
        { val: "fintech", label: "Financial Technology (FinTech)" },
        { val: "analytics", label: "Business Analytics" }
    ],
    law: [
        { val: "cyberlaw", label: "Digital Law & Cybercrime Regulation" },
        { val: "techip", label: "Tech & AI Intellectual Property" }
    ],
    other: [
        { val: "general", label: "General Track / Self-Learner" }
    ]
};

function getSavedEmails() {
    try {
        const raw = localStorage.getItem('hyt_saved_emails');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveEmail(email) {
    if (!email) return;
    try {
        let list = getSavedEmails();
        list = [email, ...list.filter(e => e.toLowerCase() !== email.toLowerCase())].slice(0, 5);
        localStorage.setItem('hyt_saved_emails', JSON.stringify(list));
    } catch (e) {}
}

function fillSavedEmail(email) {
    const emailInput = document.getElementById('login-email');
    if (emailInput) {
        emailInput.value = email;
        const passInput = document.getElementById('login-password');
        if (passInput) passInput.focus();
    }
}
window.fillSavedEmail = fillSavedEmail;

function renderSavedEmailsPicker() {
    const list = getSavedEmails();
    const datalist = document.getElementById('saved-emails-list');
    if (datalist) {
        datalist.innerHTML = list.map(e => `<option value="${e}"></option>`).join('');
    }

    const container = document.getElementById('saved-accounts-container');
    if (container) {
        if (list.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.style.display = 'block';
        container.innerHTML = `
            <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-muted-foreground); margin-bottom: 0.4rem;">
                Saved Accounts:
            </div>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                ${list.map(e => `
                    <button type="button" class="tag-pill" style="font-size: 0.75rem; cursor: pointer; padding: 0.25rem 0.65rem; border: 1px solid var(--color-border); background: var(--color-muted); color: var(--color-foreground); border-radius: 999px;" onclick="window.fillSavedEmail('${e}')">
                        ${e}
                    </button>
                `).join('')}
            </div>
        `;
    }
}
window.renderSavedEmailsPicker = renderSavedEmailsPicker;

function updateDepartmentOptions(facultyKey) {
    const deptSelect = document.getElementById('signup-dept');
    if (!deptSelect) return;

    const list = DEPARTMENT_MAP[facultyKey] || DEPARTMENT_MAP.computers;
    

    deptSelect.innerHTML = list.map(item => {
        return `<option value="${item.val}">${item.label}</option>`;
    }).join('');
}
window.updateDepartmentOptions = updateDepartmentOptions;

function switchAuthTab(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');
    const title = document.getElementById('form-title');
    const subtitle = document.getElementById('form-subtitle');
    const status = document.getElementById('auth-status');
    

    if (status) status.textContent = '';

    if (mode === 'login') {
        loginForm.classList.remove('form-hidden');
        signupForm.classList.add('form-hidden');
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
        btnLogin.setAttribute('aria-selected', 'true');
        btnSignup.setAttribute('aria-selected', 'false');

        if (title) title.textContent = "Sign In";
        if (subtitle) subtitle.textContent = "Access your personalized career path.";
    } else {
        loginForm.classList.add('form-hidden');
        signupForm.classList.remove('form-hidden');
        btnLogin.classList.remove('active');
        btnSignup.classList.add('active');
        btnLogin.setAttribute('aria-selected', 'false');
        btnSignup.setAttribute('aria-selected', 'true');

        if (title) title.textContent = "Create Account";
        if (subtitle) subtitle.textContent = "Choose your faculty and track to start your journey.";
    }
}
window.switchAuthTab = switchAuthTab;

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
}
window.togglePasswordVisibility = togglePasswordVisibility;

const AUTH_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLE_REDIRECTS = {
    student: 'student.html',
    employer: 'employer.html',
    admin: 'admin.html'
};
const AUTH_ERROR_MESSAGES = {
    session_expired: 'Your session has expired. Please sign in again.',
    login_required: 'Please sign in to continue.',
    unauthorized: 'Please sign in to continue.',
    forbidden: 'You do not have access to that page.',
    auth_unavailable: 'Unable to verify your session. Please sign in again.'
};
const KNOWN_REDIRECT_PAGES = new Set([
    'student.html',
    'employer.html',
    'employer-dashboard.html',
    'post-internship.html',
    'applicants-review.html',
    'admin.html',
    'workflow.html',
    'index.html'
]);
const ROLE_ALLOWED_PAGES = {
    student: new Set(['student.html', 'index.html']),
    employer: new Set(['employer.html', 'employer-dashboard.html', 'post-internship.html', 'applicants-review.html', 'index.html']),
    admin: new Set(['admin.html', 'workflow.html', 'student.html', 'employer.html', 'employer-dashboard.html', 'post-internship.html', 'applicants-review.html', 'index.html'])
};
let authRequestInFlight = false;

function setAuthStatus(message, state) {
    const status = document.getElementById('auth-status');
    if (!status) return;
    status.textContent = message || '';
    status.classList.remove('error', 'success');
    if (state === 'error' || state === 'success') status.classList.add(state);
}

function setFormBusy(button, busy) {
    if (!button) return;
    button.disabled = busy;
    if (busy) button.setAttribute('aria-busy', 'true');
    else button.removeAttribute('aria-busy');
}

function validateCredentials(email, password) {
    if (!AUTH_EMAIL_PATTERN.test(email)) return 'Please enter a valid email address.';
    if (!password || password.length < 8) return 'Password must be at least 8 characters.';
    return '';
}

function getSafeRedirectTarget(fallback, role) {
    const defaultTarget = fallback || (role && ROLE_REDIRECTS[role]) || ROLE_REDIRECTS.student;
    const target = new URLSearchParams(window.location.search).get('redirect');
    if (!target) return defaultTarget;

    const trimmed = target.trim();
    if (!trimmed) return defaultTarget;
    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return defaultTarget;
    if (trimmed.startsWith('//') || trimmed.startsWith('\\\\')) return defaultTarget;
    if (/[\u0000-\u001f\u007f]/.test(trimmed)) return defaultTarget;

    try {
        const resolved = new URL(trimmed, window.location.href);
        if (resolved.origin !== window.location.origin) return defaultTarget;

        const pathname = resolved.pathname;
        const fileName = pathname.split('/').pop().toLowerCase();
        if (!fileName || fileName === 'auth' || fileName === 'auth.html') return defaultTarget;

        const normalizedName = fileName.endsWith('.html') ? fileName : `${fileName}.html`;

        // Strict destination whitelist enforcement
        if (!KNOWN_REDIRECT_PAGES.has(normalizedName)) return defaultTarget;

        // Enforce role-based access authorization to avoid cross-role redirect loops
        const userRole = role && ROLE_ALLOWED_PAGES[role] ? role : 'student';
        const allowedPages = ROLE_ALLOWED_PAGES[userRole];
        if (!allowedPages.has(normalizedName)) return defaultTarget;

        // Resolve root landing page path correctly from pages/ subfolder
        if (normalizedName === 'index.html') {
            return `../index.html${resolved.search}${resolved.hash}`;
        }

        return `${normalizedName}${resolved.search}${resolved.hash}`;
    } catch (err) {
        return defaultTarget;
    }
}

function redirectAfterAuth(role) {
    const fallback = ROLE_REDIRECTS[role] || ROLE_REDIRECTS.student;
    window.location.href = getSafeRedirectTarget(fallback, role);
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    if (authRequestInFlight) return;

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitButton = document.getElementById('login-submit-btn');
    const email = (emailInput ? emailInput.value : '').trim().toLowerCase();
    const password = passwordInput ? passwordInput.value : '';

    const validationError = validateCredentials(email, password);
    if (validationError) {
        setAuthStatus(validationError, 'error');
        showToast(validationError, 'danger');
        return;
    }

    const api = window.HYT_API;
    if (!api) {
        const unavailableMessage = 'Authentication service is unavailable. Please reload the page.';
        setAuthStatus(unavailableMessage, 'error');
        showToast(unavailableMessage, 'danger');
        return;
    }

    authRequestInFlight = true;
    setFormBusy(submitButton, true);
    setAuthStatus('Signing in...', '');

    try {
        const user = await api.login(email, password);
        const role = user && user.role;
        if (!role || !ROLE_REDIRECTS[role]) {
            throw new Error('Your account role is not supported.');
        }
        saveEmail(email);
        setAuthStatus('Signed in successfully. Redirecting...', 'success');
        showToast(`Welcome back, ${user.name || email}.`, 'success');
        setTimeout(() => redirectAfterAuth(role), 600);
    } catch (error) {
        const message = error && error.message ? error.message : 'Sign in failed. Please try again.';
        setAuthStatus(message, 'error');
        showToast(message, 'danger');
    } finally {
        authRequestInFlight = false;
        setFormBusy(submitButton, false);
    }
}
window.handleLoginSubmit = handleLoginSubmit;

async function handleSignupSubmit(e) {
    e.preventDefault();
    if (authRequestInFlight) return;

    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const facultySelect = document.getElementById('signup-faculty');
    const deptSelect = document.getElementById('signup-dept');
    const roleSelect = document.getElementById('signup-role');
    const submitButton = document.getElementById('signup-submit-btn');

    const name = (nameInput ? nameInput.value : '').trim();
    const email = (emailInput ? emailInput.value : '').trim().toLowerCase();
    const password = passwordInput ? passwordInput.value : '';
    const faculty = facultySelect ? facultySelect.value : 'computers';
    const department = deptSelect ? deptSelect.value : '';
    const role = roleSelect ? roleSelect.value : 'student';

    if (!name || name.length > 120) {
        const nameError = 'Please enter your full name (max 120 characters).';
        setAuthStatus(nameError, 'error');
        showToast(nameError, 'danger');
        return;
    }

    const validationError = validateCredentials(email, password);
    if (validationError) {
        setAuthStatus(validationError, 'error');
        showToast(validationError, 'danger');
        return;
    }

    if (role !== 'student' && role !== 'employer') {
        const roleError = 'Admin accounts are provisioned by the platform and cannot be self-registered.';
        setAuthStatus(roleError, 'error');
        showToast(roleError, 'danger');
        return;
    }

    const api = window.HYT_API;
    if (!api) {
        const unavailableMessage = 'Authentication service is unavailable. Please reload the page.';
        setAuthStatus(unavailableMessage, 'error');
        showToast(unavailableMessage, 'danger');
        return;
    }

    authRequestInFlight = true;
    setFormBusy(submitButton, true);
    setAuthStatus('Creating your account...', '');

    try {
        const user = await api.register({ name, email, password, role, faculty, department });
        const userRole = user && user.role ? user.role : 'student';
        setAuthStatus('Account created successfully. Redirecting...', 'success');
        showToast(`Welcome, ${user.name || name}.`, 'success');
        setTimeout(() => redirectAfterAuth(userRole), 600);
    } catch (error) {
        const message = error && error.message ? error.message : 'Account creation failed. Please try again.';
        setAuthStatus(message, 'error');
        showToast(message, 'danger');
    } finally {
        authRequestInFlight = false;
        setFormBusy(submitButton, false);
    }
}
window.handleSignupSubmit = handleSignupSubmit;

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const text = document.createElement('span');
    text.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'toast-close-btn';
    closeButton.setAttribute('aria-label', 'Dismiss notification');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => toast.remove());

    toast.append(text, closeButton);
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4500);
}
window.showToast = showToast;

window.addEventListener('hyt:langChanged', () => {
    const facultySelect = document.getElementById('signup-faculty');
    if (facultySelect) {
        updateDepartmentOptions(facultySelect.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderSavedEmailsPicker();
    const facultySelect = document.getElementById('signup-faculty');
    if (facultySelect) {
        updateDepartmentOptions(facultySelect.value);
    }

    const errorParam = new URLSearchParams(window.location.search).get('error');
    if (errorParam) {
        const message = AUTH_ERROR_MESSAGES[errorParam] || errorParam.slice(0, 200);
        setAuthStatus(message, 'error');
    }
});
