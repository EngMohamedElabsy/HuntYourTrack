window.addEventListener('DOMContentLoaded', () => {
    gsap.from(".visual-panel h1", { opacity: 0, x: -50, duration: 1, ease: "power4.out" });
    gsap.from(".visual-panel p", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.3 });
    gsap.from(".auth-card", { opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 });
});

let activeAuthMode = 'login';
let authAnimation;
const mobileLayout = window.matchMedia('(max-width: 700px)');

function setPanelPositions(mode) {
    const signup = mode === 'signup';
    const axis = mobileLayout.matches ? 'yPercent' : 'xPercent';
    const visual = document.getElementById('visual-panel');
    const form = document.getElementById('form-panel');
    gsap.set([visual, form], { xPercent: 0, yPercent: 0 });
    if (signup) {
        gsap.set(visual, { [axis]: 100 });
        gsap.set(form, { [axis]: -100 });
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

    gsap.killTweensOf([visualPanel, formPanel, fromForm, toForm]);
    if (authAnimation) authAnimation.kill();

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
}

const resetDialog = document.getElementById('forgot-password-dialog');
document.getElementById('forgot-password-link').addEventListener('click', (event) => {
    event.preventDefault();
    resetDialog.showModal();
    document.getElementById('reset-email').focus();
});
document.getElementById('close-reset-dialog').addEventListener('click', () => resetDialog.close());

document.querySelectorAll('form[data-auth-mode]').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = form.querySelector('.auth-status') || document.getElementById('auth-status');
        const submitButton = form.querySelector('.auth-submit');
        const mode = form.dataset.authMode;
        const payload = Object.fromEntries(new FormData(form).entries());

        status.dataset.state = '';
        status.textContent = 'Please wait…';
        submitButton.disabled = true;

        // Simulate asynchronous authentication processing
        setTimeout(() => {
            try {
                const email = (payload.email || '').trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    throw new Error('Please enter a valid university email address.');
                }

                if (mode === 'register') {
                    if (!payload.name || !payload.name.trim()) {
                        throw new Error('Full Name is required.');
                    }
                    if (!payload.faculty || !payload.faculty.trim()) {
                        throw new Error('Faculty is required.');
                    }
                    if (!payload.password || payload.password.length < 8) {
                        throw new Error('Password must be at least 8 characters long.');
                    }
                } else if (mode === 'login') {
                    if (!payload.password) {
                        throw new Error('Password is required.');
                    }
                }

                // Establish simulated frontend session in localStorage
                localStorage.setItem('user', 'student');
                localStorage.setItem('auth_token', 'mock_jwt_session_token_' + Date.now());
                if (payload.email) {
                    localStorage.setItem('user_email', payload.email);
                }

                status.dataset.state = 'success';
                const successMessages = {
                    login: 'Signed in successfully. Redirecting…',
                    register: 'Account created successfully. Redirecting…',
                    'password-reset': 'If that address is registered, a reset link will be sent.'
                };
                status.textContent = successMessages[mode] || 'Success.';

                // Smooth feedback animation
                if (window.gsap && typeof gsap.from === 'function') {
                    gsap.from(status, { scale: 0.96, opacity: 0.7, duration: 0.35, ease: 'power2.out' });
                }

                // Simulate redirect to dashboard
                if (mode === 'login' || mode === 'register') {
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
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
