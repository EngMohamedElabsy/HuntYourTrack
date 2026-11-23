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
    ]
};

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

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    
    const status = document.getElementById('auth-status');

    if (email.includes('admin') || email === 'admin@damanhour.edu.eg') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', 'Academic Admin');
        showToast('Welcome to Admin Console!', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    } else if (email.includes('employer') || email.includes('partner') || email.includes('hr')) {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', 'Partner Organizer');
        showToast('Welcome to Employer Portal!', 'success');
        setTimeout(() => { window.location.href = 'employer.html'; }, 800);
    } else {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', email.split('@')[0]);
        localStorage.setItem('faculty', 'Faculty of Computers & Artificial Intelligence');
        localStorage.setItem('department', 'Computer Science (CS)');
        showToast('Signed in! Redirecting to Student Hub', 'success');
        setTimeout(() => { window.location.href = 'student.html'; }, 800);
    }
}
window.handleLoginSubmit = handleLoginSubmit;

function handleSignupSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const faculty = document.getElementById('signup-faculty').value;
    const dept = document.getElementById('signup-dept').value;
    const role = document.getElementById('signup-role').value;
    

    localStorage.setItem('user', role);
    localStorage.setItem('role', role);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_email', email);
    localStorage.setItem('faculty', faculty);
    localStorage.setItem('department', dept);

    showToast(`Welcome ${name}! Account created successfully`, 'success');
    
    setTimeout(() => {
        if (role === 'admin') window.location.href = 'admin.html';
        else if (role === 'employer') window.location.href = 'index.html#opportunities';
        else window.location.href = 'student.html';
    }, 900);
}
window.handleSignupSubmit = handleSignupSubmit;

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close-btn" onclick="this.parentElement.remove()">&times;</button>
    `;
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
    const facultySelect = document.getElementById('signup-faculty');
    if (facultySelect) {
        updateDepartmentOptions(facultySelect.value);
    }
});
