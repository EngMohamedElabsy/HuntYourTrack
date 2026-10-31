/**
 * HuntYourTrack - Authentication and Multi-Role Management Logic
 * Supports Student, Employer, and Administrator onboarding & RBAC session management.
 */

const DEPARTMENT_MAP = {
    computers: [
        { val: "cs", labelAr: "علوم الحاسب (Computer Science)", labelEn: "Computer Science (CS)" },
        { val: "ai", labelAr: "الذكاء الاصطناعي (AI)", labelEn: "Artificial Intelligence (AI)" },
        { val: "is", labelAr: "نظم المعلومات (Information Systems)", labelEn: "Information Systems (IS)" },
        { val: "it", labelAr: "تكنولوجيا المعلومات (IT)", labelEn: "Information Technology (IT)" },
        { val: "cyber", labelAr: "الأمن السيبراني (Cybersecurity)", labelEn: "Cybersecurity" }
    ],
    engineering: [
        { val: "cce", labelAr: "هندسة الحاسبات والتحكم (Computer Eng)", labelEn: "Computer & Control Engineering" },
        { val: "comm", labelAr: "هندسة الإلكترونيات والاتصالات", labelEn: "Electronics & Communications" },
        { val: "mecha", labelAr: "هندسة الميكاترونكس (Mechatronics)", labelEn: "Mechatronics Engineering" }
    ],
    commerce: [
        { val: "mis", labelAr: "نظم المعلومات الإدارية (MIS)", labelEn: "Management Info Systems (MIS)" },
        { val: "fintech", labelAr: "تكنولوجيا المعاملات المالية (FinTech)", labelEn: "Financial Technology (FinTech)" },
        { val: "analytics", labelAr: "تحليل الأعمال والبيانات (Business Analytics)", labelEn: "Business Analytics" }
    ],
    law: [
        { val: "cyberlaw", labelAr: "القانون الرقمي ومكافحة الجرائم الإلكترونية", labelEn: "Digital Law & Cybercrime Regulation" },
        { val: "techip", labelAr: "الملكية الفكرية في التكنولوجيا والذكاء الاصطناعي", labelEn: "Tech & AI Intellectual Property" }
    ]
};

function updateDepartmentOptions(facultyKey) {
    const deptSelect = document.getElementById('signup-dept');
    if (!deptSelect) return;

    const list = DEPARTMENT_MAP[facultyKey] || DEPARTMENT_MAP.computers;
    const isArabic = document.documentElement.lang === 'ar';

    deptSelect.innerHTML = list.map(item => {
        return `<option value="${item.val}">${isArabic ? item.labelAr : item.labelEn}</option>`;
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
    const isArabic = document.documentElement.lang === 'ar';

    if (status) status.textContent = '';

    if (mode === 'login') {
        loginForm.classList.remove('form-hidden');
        signupForm.classList.add('form-hidden');
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
        btnLogin.setAttribute('aria-selected', 'true');
        btnSignup.setAttribute('aria-selected', 'false');

        if (title) title.textContent = isArabic ? "تسجيل الدخول" : "Sign In";
        if (subtitle) subtitle.textContent = isArabic ? "سجّل دخولك للوصول إلى خارطة طريقك المخصصة." : "Access your personalized career path.";
    } else {
        loginForm.classList.add('form-hidden');
        signupForm.classList.remove('form-hidden');
        btnLogin.classList.remove('active');
        btnSignup.classList.add('active');
        btnLogin.setAttribute('aria-selected', 'false');
        btnSignup.setAttribute('aria-selected', 'true');

        if (title) title.textContent = isArabic ? "إنشاء حساب جديد" : "Create Account";
        if (subtitle) subtitle.textContent = isArabic ? "حدد كليتك وقسمك لبدء رحلة التخصص واصطياد المسار." : "Choose your faculty and track to start your journey.";
    }
}
window.switchAuthTab = switchAuthTab;

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword ? '🙈' : '👁️';
    btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
}
window.togglePasswordVisibility = togglePasswordVisibility;

function openJuryModal() {
    const dialog = document.getElementById('jury-dialog');
    if (dialog) dialog.showModal();
}
window.openJuryModal = openJuryModal;

function closeJuryModal() {
    const dialog = document.getElementById('jury-dialog');
    if (dialog) dialog.close();
}
window.closeJuryModal = closeJuryModal;

function selectJuryPersona(persona) {
    closeJuryModal();
    const isArabic = document.documentElement.lang === 'ar';

    if (persona === 'admin') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_email', 'elabsy@damanhour.edu.eg');
        localStorage.setItem('user_name', 'Mohamed Yasser Elabsy');
        localStorage.setItem('faculty', 'Computers & Artificial Intelligence');
        showToast(isArabic ? 'تم تفعيل حساب المشرف الأكاديمي (Admin) بنجاح 🛡️' : 'Admin Academic session activated 🛡️', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    } else if (persona === 'employer') {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', 'abdulrhman@damanhour.edu.eg');
        localStorage.setItem('user_name', 'TechCorp Organizer');
        localStorage.setItem('faculty', 'Corporate Partner Hub');
        showToast(isArabic ? 'تم تفعيل حساب جهة العمل (Employer Partner) 🏢' : 'Employer Organizer session activated 🏢', 'success');
        setTimeout(() => { window.location.href = 'index.html#opportunities'; }, 800);
    } else {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', 'hager@damanhour.edu.eg');
        localStorage.setItem('user_name', 'Hager Khaled');
        localStorage.setItem('faculty', 'كلية الحاسبات والذكاء الاصطناعي');
        localStorage.setItem('department', 'علوم الحاسب (CS)');
        showToast(isArabic ? 'تم تفعيل حساب الطالب الأكاديمي (Student) 🎓' : 'Student session activated 🎓', 'success');
        setTimeout(() => { window.location.href = 'student.html'; }, 800);
    }
}
window.selectJuryPersona = selectJuryPersona;

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const isArabic = document.documentElement.lang === 'ar';
    const status = document.getElementById('auth-status');

    if (email.includes('admin') || email === 'elabsy@damanhour.edu.eg') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', 'Mohamed Yasser');
        showToast(isArabic ? 'مرحباً بك في لوحة الإدارة الأكاديمية! 🛡️' : 'Welcome to Admin Console! 🛡️', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    } else if (email.includes('employer') || email.includes('partner') || email.includes('hr')) {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', 'Partner Organizer');
        showToast(isArabic ? 'مرحباً بك في منصة تنظيم ونشر الفرص! 🏢' : 'Welcome to Employer Portal! 🏢', 'success');
        setTimeout(() => { window.location.href = 'index.html#opportunities'; }, 800);
    } else {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', email.split('@')[0]);
        localStorage.setItem('faculty', 'كلية الحاسبات والذكاء الاصطناعي');
        localStorage.setItem('department', 'علوم الحاسب (CS)');
        showToast(isArabic ? 'تم تسجيل الدخول بنجاح! جاري توجيهك لخارطة طريقك 🎓' : 'Signed in! Redirecting to Student Hub 🎓', 'success');
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
    const isArabic = document.documentElement.lang === 'ar';

    localStorage.setItem('user', role);
    localStorage.setItem('role', role);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_email', email);
    localStorage.setItem('faculty', faculty);
    localStorage.setItem('department', dept);

    showToast(isArabic ? `أهلاً بك يا ${name}! تم إنشاء حسابك بنجاح 🚀` : `Welcome ${name}! Account created 🚀`, 'success');
    
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
