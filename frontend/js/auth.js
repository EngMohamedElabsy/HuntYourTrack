window.addEventListener('DOMContentLoaded', () => {
    if (window.gsap && typeof gsap.from === 'function') {
        gsap.from(".visual-panel h1", { opacity: 0, x: -50, duration: 1, ease: "power4.out" });
        gsap.from(".visual-panel p", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.3 });
        gsap.from(".auth-card", { opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 });
    }
});

let activeAuthMode = 'login';
let authAnimation;
const mobileLayout = window.matchMedia('(max-width: 700px)');

function setPanelPositions(mode) {
    const signup = mode === 'signup';
    const axis = mobileLayout.matches ? 'yPercent' : 'xPercent';
    const visual = document.getElementById('visual-panel');
    const form = document.getElementById('form-panel');
    if (!visual || !form) return;

    if (window.gsap) {
        gsap.set([visual, form], { xPercent: 0, yPercent: 0 });
        if (signup) {
            gsap.set(visual, { [axis]: 100 });
            gsap.set(form, { [axis]: -100 });
        }
    } else {
        const transProp = mobileLayout.matches ? 'translateY' : 'translateX';
        visual.style.transform = signup ? `${transProp}(100%)` : `${transProp}(0%)`;
        form.style.transform = signup ? `${transProp}(-100%)` : `${transProp}(0%)`;
    }
}

setPanelPositions(activeAuthMode);
mobileLayout.addEventListener('change', () => setPanelPositions(activeAuthMode));

function switchTab(type) {
    if (type !== 'login' && type !== 'signup' || type === activeAuthMode) return;
    activeAuthMode = type;
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');
    const slider = document.getElementById('slider');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const visualPanel = document.getElementById('visual-panel');
    const formPanel = document.getElementById('form-panel');
    const fromForm = type === 'login' ? signupForm : loginForm;
    const toForm = type === 'login' ? loginForm : signupForm;
    const axis = mobileLayout.matches ? 'yPercent' : 'xPercent';
    const direction = type === 'signup' ? 1 : -1;

    if (window.gsap) {
        gsap.killTweensOf([visualPanel, formPanel, fromForm, toForm]);
        if (authAnimation) authAnimation.kill();
    }

    btnLogin.setAttribute('aria-pressed', String(type === 'login'));
    btnSignup.setAttribute('aria-pressed', String(type === 'signup'));
    loginForm.inert = type !== 'login';
    signupForm.inert = type !== 'signup';
    loginForm.setAttribute('aria-hidden', String(type !== 'login'));
    signupForm.setAttribute('aria-hidden', String(type !== 'signup'));
    document.getElementById('auth-status').textContent = '';
    document.getElementById('auth-status').dataset.state = '';
    slider.style.transform = type === 'signup' ? 'translateX(100%)' : 'translateX(0)';

    if (type === 'login') {
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
        formTitle.innerText = "Welcome Back";
        formSubtitle.innerText = "Access your personalized career path.";
    } else {
        btnSignup.classList.add('active');
        btnLogin.classList.remove('active');
        formTitle.innerText = "Join the Future";
        formSubtitle.innerText = "Create an account to start your journey.";
    }

    fromForm.classList.add('form-hidden');
    fromForm.style.opacity = '0';
    toForm.classList.remove('form-hidden');
    toForm.scrollTop = 0;

    if (window.gsap) {
        gsap.set(toForm, { opacity: 0, x: direction * 16 });
        authAnimation = gsap.timeline();
        authAnimation.to(visualPanel, {
            [axis]: type === 'signup' ? 100 : 0,
            duration: 1.0,
            ease: 'power3.inOut'
        }, 0).to(formPanel, {
            [axis]: type === 'signup' ? -100 : 0,
            duration: 1.0,
            ease: 'power3.inOut'
        }, 0).to(visualPanel, {
            background: type === 'signup' ? '#16A34A' : '#6366F1',
            duration: 1.0,
            ease: 'power3.inOut'
        }, 0).to(toForm, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 0.25);
    } else {
        const transProp = mobileLayout.matches ? 'translateY' : 'translateX';
        visualPanel.style.transform = type === 'signup' ? `${transProp}(100%)` : `${transProp}(0%)`;
        formPanel.style.transform = type === 'signup' ? `${transProp}(-100%)` : `${transProp}(0%)`;
        visualPanel.style.background = type === 'signup' ? '#16A34A' : '#6366F1';
        toForm.style.opacity = '1';
    }
}

const resetDialog = document.getElementById('forgot-password-dialog');
document.getElementById('forgot-password-link').addEventListener('click', (event) => {
    event.preventDefault();
    resetDialog.showModal();
    document.getElementById('reset-email').focus();
});
document.getElementById('close-reset-dialog').addEventListener('click', () => resetDialog.close());

// Faculty and Major Mapping
const facultyMajors = {
    'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering'],
    'Science': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    'Business': ['Accounting', 'Finance', 'Marketing', 'Management'],
    'Law': ['Corporate Law', 'International Law', 'Civil Law', 'Criminal Law'],
    'Computing': ['Software Engineering', 'Computer Science', 'Information Systems', 'Cybersecurity', 'AI & Data Science']
};

function updateMajors() {
    const facultySelect = document.getElementById('signup-faculty');
    const majorSelect = document.getElementById('signup-major');
    const selectedFaculty = facultySelect.value;

    majorSelect.innerHTML = '';

    if (selectedFaculty && facultyMajors[selectedFaculty]) {
        majorSelect.disabled = false;
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = 'Select your major';
        majorSelect.appendChild(defaultOption);

        facultyMajors[selectedFaculty].forEach(major => {
            const option = document.createElement('option');
            option.value = major;
            option.textContent = major;
            majorSelect.appendChild(option);
        });
    } else {
        majorSelect.disabled = true;
        majorSelect.innerHTML = '<option value="" disabled selected>Select faculty first</option>';
    }
}

function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const toggleBtn = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        input.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function validateField(id, errorId, validationFn, errorMessage) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(errorId);
    const isValid = validationFn(input.value);

    if (!isValid) {
        errorEl.textContent = errorMessage;
        input.classList.add('invalid');
        return false;
    } else {
        errorEl.textContent = '';
        input.classList.remove('invalid');
        return true;
    }
}

document.querySelectorAll('form[data-auth-mode]').forEach((form) => {
    // Real-time validation
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            const mode = form.dataset.authMode;
            if (mode === 'login') {
                if (input.id === 'login-email') validateField('login-email', 'error-login-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email format');
                if (input.id === 'login-password') validateField('login-password', 'error-login-password', v => v.length >= 8, 'Password must be at least 8 characters');
            } else if (mode === 'register') {
                if (input.id === 'signup-name') validateField('signup-name', 'error-signup-name', v => v.trim().length > 0, 'Full Name is required');
                if (input.id === 'signup-email') validateField('signup-email', 'error-signup-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email format');
                if (input.id === 'signup-faculty') validateField('signup-faculty', 'error-signup-faculty', v => v !== '', 'Faculty is required');
                if (input.id === 'signup-major') validateField('signup-major', 'error-signup-major', v => v !== '', 'Major is required');
                if (input.id === 'signup-password') validateField('signup-password', 'error-signup-password', v => v.length >= 8, 'Password must be at least 8 characters');
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = form.querySelector('.auth-status') || document.getElementById('auth-status');
        const submitButton = form.querySelector('.auth-submit');
        const mode = form.dataset.authMode;
        const payload = Object.fromEntries(new FormData(form).entries());

        let isFormValid = true;

        if (mode === 'login') {
            if (!validateField('login-email', 'error-login-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email format')) isFormValid = false;
            if (!validateField('login-password', 'error-login-password', v => v.length >= 8, 'Password must be at least 8 characters')) isFormValid = false;
        } else if (mode === 'register') {
            if (!validateField('signup-name', 'error-signup-name', v => v.trim().length > 0, 'Full Name is required')) isFormValid = false;
            if (!validateField('signup-email', 'error-signup-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email format')) isFormValid = false;
            if (!validateField('signup-faculty', 'error-signup-faculty', v => v !== '', 'Faculty is required')) isFormValid = false;
            if (!validateField('signup-major', 'error-signup-major', v => v !== '', 'Major is required')) isFormValid = false;
            if (!validateField('signup-password', 'error-signup-password', v => v.length >= 8, 'Password must be at least 8 characters')) isFormValid = false;
        }

        if (!isFormValid) {
            status.dataset.state = 'error';
            status.textContent = 'Please correct the errors in the form.';
            return;
        }

        status.dataset.state = '';
        status.textContent = 'Please wait…';
        submitButton.disabled = true;

        setTimeout(() => {
            try {
                const email = (payload.email || '').trim();
                if (!email) throw new Error('Email is required');

                const isLeadAdmin = email.includes('admin');
                const isEmployer = email.includes('recruiter') || email.includes('partner') || email.includes('employer');

                localStorage.setItem('user', isLeadAdmin ? 'admin' : (isEmployer ? 'employer' : 'student'));
                localStorage.setItem('role', isLeadAdmin ? 'admin' : (isEmployer ? 'employer' : 'student'));
                localStorage.setItem('auth_token', 'mock_jwt_session_token_' + Date.now());
                localStorage.setItem('user_email', email);

                status.dataset.state = 'success';
                const successMessages = {
                    login: isLeadAdmin ? 'Admin authenticated. Entering Console…' : 'Signed in successfully. Redirecting…',
                    register: 'Account created successfully. Redirecting…',
                    'password-reset': 'If that address is registered, a reset link will be sent.'
                };
                status.textContent = successMessages[mode] || 'Success.';

                if (window.gsap && typeof gsap.from === 'function') {
                    gsap.from(status, { scale: 0.96, opacity: 0.7, duration: 0.35, ease: 'power2.out' });
                }

                if (mode === 'login' || mode === 'register') {
                    setTimeout(() => {
                        window.location.href = isLeadAdmin ? 'admin.html' : 'index.html';
                    }, 2000);
                }
            } catch (error) {
                status.dataset.state = 'error';
                status.textContent = error.message;
            } finally {
                submitButton.disabled = false;
            }
        }, 400);
    });
});

function simulateGoogleAuth() {
    const status = document.getElementById('auth-status');
    status.dataset.state = 'info';
    status.textContent = 'Simulating Google OAuth flow…';

    setTimeout(() => {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('auth_token', 'google_mock_token_' + Date.now());
        localStorage.setItem('user_email', 'google.user@gmail.com');

        status.dataset.state = 'success';
        status.textContent = 'Google Auth Successful. Redirecting…';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1200);
}

function triggerJuryAccess() {
    localStorage.setItem('user', 'admin');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('auth_token', 'jury_demo_token_2026');
    localStorage.setItem('user_email', 'jury.demo@damanhour.edu.eg');
    alert('Jury Demonstration Mode Activated. Redirecting to Admin Console…');
    window.location.href = 'admin.html';
}

function quickFillCredentials(role) {
    if (activeAuthMode !== 'login') {
        switchTab('login');
    }
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const status = document.getElementById('auth-status');

    if (role === 'admin') {
        emailInput.value = 'admin@damanhour.edu.eg';
        passwordInput.value = 'HuntLead2026!';
        status.dataset.state = 'info';
        status.textContent = '🛡️ Filled Lead Admin credentials. Click "Enter Platform" to sign in.';
    } else if (role === 'employer') {
        emailInput.value = 'recruiter@vodafone.com';
        passwordInput.value = 'HuntPartner2026!';
        status.dataset.state = 'info';
        status.textContent = '🏢 Filled Corporate Employer credentials. Click "Enter Platform" to sign in.';
    } else {
        emailInput.value = 'student@damanhour.edu.eg';
        passwordInput.value = 'HuntStudent2026!';
        status.dataset.state = 'info';
        status.textContent = '🎓 Filled Demo Student credentials. Click "Enter Platform" to sign in.';
    }

    emailInput.classList.add('demo-highlight');
    passwordInput.classList.add('demo-highlight');
    setTimeout(() => {
        emailInput.classList.remove('demo-highlight');
        passwordInput.classList.remove('demo-highlight');
    }, 1200);

    emailInput.focus();
}
window.quickFillCredentials = quickFillCredentials;
window.simulateGoogleAuth = simulateGoogleAuth;
window.triggerJuryAccess = triggerJuryAccess;
window.togglePassword = togglePassword;
window.updateMajors = updateMajors;
