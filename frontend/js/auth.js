/**
 * HuntYourTrack - Authentication and Multi-Role Management Logic
 * Supports Student, Employer, Organizer, and Administrator onboarding & RBAC session management.
 * Includes Interactive Onboarding Wizard with Role Selection, Academic Profile, Resume Upload (AI Keyword Extraction)
 */

// Department mapping for all 5 faculties
const DEPARTMENT_MAP = {
    computing: [
        { val: "cs", labelAr: "علوم الحاسب (CS)", labelEn: "Computer Science (CS)" },
        { val: "ai", labelAr: "الذكاء الاصطناعي (AI)", labelEn: "Artificial Intelligence (AI)" },
        { val: "is", labelAr: "نظم المعلومات (IS)", labelEn: "Information Systems (IS)" },
        { val: "it", labelAr: "تكنولوجيا المعلومات (IT)", labelEn: "Information Technology (IT)" },
        { val: "cyber", labelAr: "الأمن السيبراني (Cybersecurity)", labelEn: "Cybersecurity" }
    ],
    engineering: [
        { val: "cce", labelAr: "هندسة الحاسبات والتحكم", labelEn: "Computer & Control Engineering" },
        { val: "comm", labelAr: "هندسة الإلكترونيات والاتصالات", labelEn: "Electronics & Communications" },
        { val: "mecha", labelAr: "هندسة الميكاترونكس", labelEn: "Mechatronics Engineering" }
    ],
    science: [
        { val: "bioinfo", labelAr: "المعلوماتية الحيوية", labelEn: "Bioinformatics" },
        { val: "chem", labelAr: "الكيمياء الحاسوبية", labelEn: "Computational Chemistry" },
        { val: "physics", labelAr: "الفيزياء الحاسوبية", labelEn: "Computational Physics" },
        { val: "env", labelAr: "النمذجة البيئية", labelEn: "Environmental Modeling" }
    ],
    business: [
        { val: "fintech", labelAr: "تكنولوجيا المعاملات المالية (FinTech)", labelEn: "Financial Technology (FinTech)" },
        { val: "analytics", labelAr: "تحليل بيانات الأعمال", labelEn: "Business Analytics" },
        { val: "marketing", labelAr: "التسويق الرقمي والنمو", labelEn: "Digital Marketing & Growth" },
        { val: "product", labelAr: "إدارة المنتجات", labelEn: "Product Management" }
    ],
    law: [
        { val: "cyberlaw", labelAr: "القانون السيبراني والأدلة الرقمية", labelEn: "Cyber Law & Digital Evidence" },
        { val: "ip", labelAr: "الملكية الفكرية في التكنولوجيا", labelEn: "Tech & AI Intellectual Property" },
        { val: "fintech-law", labelAr: "الامتثال المالي والتنظيمي", labelEn: "FinTech Regulatory Compliance" },
        { val: "digital-rights", labelAr: "الحقوق والسياسات الرقمية", labelEn: "Digital Rights & Policy" }
    ]
};

// Onboarding state
let onboardingState = {
    currentStep: 1,
    selectedRole: null,
    academicData: {},
    resumeKeywords: [],
    recommendedTracks: []
};

// Keyword extraction simulation - maps keywords to tracks
const KEYWORD_TRACK_MAP = {
    // Computing tracks
    'python': ['cs-ai', 'cs-cloud', 'cs-sec'],
    'pytorch': ['cs-ai'],
    'tensorflow': ['cs-ai'],
    'machine learning': ['cs-ai'],
    'deep learning': ['cs-ai'],
    'nlp': ['cs-ai'],
    'transformers': ['cs-ai'],
    'llm': ['cs-ai'],
    'react': ['cs-cloud'],
    'typescript': ['cs-cloud'],
    'node.js': ['cs-cloud'],
    'docker': ['cs-cloud'],
    'kubernetes': ['cs-cloud'],
    'aws': ['cs-cloud'],
    'ci/cd': ['cs-cloud'],
    'microservices': ['cs-cloud'],
    'network security': ['cs-sec'],
    'wireshark': ['cs-sec'],
    'siem': ['cs-sec'],
    'linux hardening': ['cs-sec'],
    'penetration testing': ['cs-sec'],

    // Engineering tracks
    'ros2': ['eng-mecha'],
    'c++': ['eng-mecha', 'eng-auto'],
    'control systems': ['eng-mecha'],
    'solidworks': ['eng-mecha'],
    'matlab': ['eng-mecha', 'eng-energy'],
    'embedded c': ['eng-auto'],
    'autosar': ['eng-auto'],
    'can-bus': ['eng-auto'],
    'rtos': ['eng-auto'],
    'arm cortex': ['eng-auto'],
    'scada': ['eng-energy'],
    'power electronics': ['eng-energy'],
    'solar pv': ['eng-energy'],
    'smart grid': ['eng-energy'],

    // Science tracks
    'biopython': ['sci-bio'],
    'nextflow': ['sci-bio'],
    'blast': ['sci-bio'],
    'bioconductor': ['sci-bio'],
    'genomics': ['sci-bio'],
    'ngs': ['sci-bio'],
    'gromacs': ['sci-chem'],
    'pymol': ['sci-chem'],
    'molecular dynamics': ['sci-chem'],
    'qsar': ['sci-chem'],

    // Business tracks
    'financial modeling': ['bus-fintech'],
    'pandas': ['bus-fintech', 'bus-analytics'],
    'sql': ['bus-fintech', 'bus-analytics'],
    'risk management': ['bus-fintech'],
    'algorithmic trading': ['bus-fintech'],
    'power bi': ['bus-analytics'],
    'tableau': ['bus-analytics'],
    'dax': ['bus-analytics'],
    'excel advanced': ['bus-analytics'],
    'data warehousing': ['bus-analytics'],

    // Law tracks
    'cybercrime law': ['law-cyber'],
    'gdpr': ['law-cyber'],
    'digital evidence': ['law-cyber'],
    'compliance': ['law-cyber', 'law-fintech-law'],
    'patents': ['law-ip'],
    'software licensing': ['law-ip'],
    'ai ethics': ['law-ip'],
    'ndas': ['law-ip']
};

function updateDepartmentOptions(facultyKey) {
    const deptSelect = document.getElementById('signup-dept') || document.getElementById('onboard-dept');
    if (!deptSelect) return;

    const list = DEPARTMENT_MAP[facultyKey] || DEPARTMENT_MAP.computing;
    const isArabic = document.documentElement.lang === 'ar';

    deptSelect.innerHTML = list.map(item => {
        return `<option value="${item.val}">${isArabic ? item.labelAr : item.labelEn}</option>`;
    }).join('');

    deptSelect.disabled = false;
}
window.updateDepartmentOptions = updateDepartmentOptions;

// Onboarding-specific department update
function updateOnboardDepartmentOptions(facultyKey) {
    updateDepartmentOptions(facultyKey);
    const academicNext = document.getElementById('btn-academic-next');
    if (academicNext) academicNext.disabled = false;
}
window.updateOnboardDepartmentOptions = updateOnboardDepartmentOptions;

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
    btn.innerHTML = isPassword ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
    btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
}
window.togglePasswordVisibility = togglePasswordVisibility;

// Role Selection for Onboarding
function selectRole(role) {
    onboardingState.selectedRole = role;

    // Update UI
    document.querySelectorAll('.role-card.enhanced').forEach(card => {
        card.classList.toggle('selected', card.dataset.role === role);
        card.setAttribute('aria-checked', card.dataset.role === role);
    });

    // Enable next button
    const nextBtn = document.getElementById('btn-role-next');
    if (nextBtn) nextBtn.disabled = false;
}
window.selectRole = selectRole;

// Step Navigation
function goToStep(step) {
    if (step < 1 || step > 4) return;

    const currentStepEl = document.querySelector(`.onboarding-step.active`);
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
        currentStepEl.hidden = true;
    }

    const nextStepEl = document.getElementById(`step-${step === 1 ? 'role' : step === 2 ? 'academic' : step === 3 ? 'resume' : 'complete'}`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
        nextStepEl.hidden = false;
    }

    // Update progress indicator
    document.querySelectorAll('.progress-step').forEach((stepEl, idx) => {
        if (idx + 1 <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });

    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${(step / 4) * 100}%`;
    }

    onboardingState.currentStep = step;

    // Update progress bar aria-valuenow
    const progressBar = document.querySelector('.onboarding-progress');
    if (progressBar) progressBar.setAttribute('aria-valuenow', step);
}
window.goToStep = goToStep;

function nextStep() {
    if (onboardingState.currentStep < 4) {
        goToStep(onboardingState.currentStep + 1);
    }
}
window.nextStep = nextStep;

// Handle Academic Form Submission
function handleAcademicSubmit(e) {
    e.preventDefault();

    const faculty = document.getElementById('onboard-faculty').value;
    const dept = document.getElementById('onboard-dept').value;
    const name = document.getElementById('onboard-name').value.trim();
    const email = document.getElementById('onboard-email').value.trim().toLowerCase();
    const password = document.getElementById('onboard-password').value;

    if (!faculty || !dept || !name || !email || !password) {
        showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    onboardingState.academicData = { faculty, dept, name, email, password };

    // If student, go to resume step; otherwise go to completion
    if (onboardingState.selectedRole === 'student') {
        goToStep(3);
    } else {
        completeOnboarding();
    }
}
window.handleAcademicSubmit = handleAcademicSubmit;

// Resume Upload & AI Keyword Extraction Simulation
function handleResumeUpload(file) {
    if (!file) return;

    // Validate file type and size
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        showToast('نوع الملف غير مدعوم. يرجى رفع ملف PDF أو DOCX', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showToast('حجم الملف يتجاوز 5 ميجابايت', 'error');
        return;
    }

    showToast('جاري تحليل السيرة الذاتية...', 'info');

    // Simulate AI processing delay
    setTimeout(() => {
        const keywords = simulateKeywordExtraction(file.name);
        onboardingState.resumeKeywords = keywords;

        // Show AI analysis results
        showAIAnalysisResults(keywords);

        // Enable next button
        const nextBtn = document.getElementById('btn-resume-next');
        const skipBtn = document.getElementById('btn-skip-resume');
        if (nextBtn) nextBtn.disabled = false;
        if (skipBtn) skipBtn.style.display = 'none';
    }, 1500);
}
window.handleResumeUpload = handleResumeUpload;

// Simulate keyword extraction from resume
function simulateKeywordExtraction(fileName) {
    // In production, this would parse the actual PDF/DOCX content
    // For demo, we'll simulate based on filename and random selection
    const allKeywords = Object.keys(KEYWORD_TRACK_MAP);

    // Select 5-8 random keywords
    const count = Math.floor(Math.random() * 4) + 5;
    const shuffled = [...allKeywords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Display AI Analysis Results
function showAIAnalysisResults(keywords) {
    const resultsEl = document.getElementById('ai-analysis-results');
    const keywordsEl = document.getElementById('extracted-keywords');
    const tracksEl = document.getElementById('track-recommendations');

    if (!resultsEl || !keywordsEl) return;

    // Show results container
    resultsEl.hidden = false;

    // Display extracted keywords
    const isArabic = document.documentElement.lang === 'ar';
    keywordsEl.innerHTML = `
        <h4 style="margin-bottom: 0.75rem;" data-i18n="extractedKeywordsTitle">${isArabic ? 'الكلمات المفتاحية المستخرجة:' : 'Extracted Keywords:'}</h4>
        <div class="keyword-pills">
            ${keywords.map(kw => `<span class="skill-pill" style="font-size: 0.8rem; padding: 0.3rem 0.7rem;">${kw}</span>`).join('')}
        </div>
    `;

    // Calculate recommended tracks
    const trackScores = {};
    keywords.forEach(kw => {
        const tracks = KEYWORD_TRACK_MAP[kw.toLowerCase()] || [];
        tracks.forEach(t => {
            trackScores[t] = (trackScores[t] || 0) + 1;
        });
    });

    // Sort tracks by score
    const sortedTracks = Object.entries(trackScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    onboardingState.recommendedTracks = sortedTracks.map(([id]) => id);

    // Get track data from hunter canvas if available
    const trackData = window.hytHunter?.nodes || [];

    tracksEl.innerHTML = sortedTracks.map(([trackId, score]) => {
        const track = trackData.find(n => n.id === trackId);
        if (!track) return '';

        const label = isArabic ? (track.labelAr || track.label) : track.label;
        const faculty = isArabic ? (track.facultyAr || track.faculty) : track.faculty;
        const matchPercent = Math.min(95, 60 + score * 8);

        return `
            <div class="track-recommendation-card" style="padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-bg); margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <div>
                        <h5 style="font-weight: 700; color: var(--color-fg);">${label}</h5>
                        <p style="font-size: 0.8rem; color: var(--color-fg-muted);">${faculty}</p>
                    </div>
                    <span class="badge-tag" style="background: var(--color-primary); color: var(--color-bg); font-size: 0.7rem;">
                        ${matchPercent}% ${isArabic ? 'توافق' : 'Match'}
                    </span>
                </div>
                <div style="font-size: 0.8rem; color: var(--color-fg-muted);">
                    ${isArabic ? 'المهارات المطابقة: ' : 'Matching skills: '}${keywords.filter(kw => (KEYWORD_TRACK_MAP[kw] || []).includes(trackId)).join(', ')}
                </div>
            </div>
        `;
    }).join('');
}

// Skip Resume Step
function skipResumeStep() {
    goToStep(4);
}
window.skipResumeStep = skipResumeStep;

// Complete Onboarding
function completeOnboarding() {
    const { selectedRole, academicData, resumeKeywords, recommendedTracks } = onboardingState;

    // Save to localStorage
    const isArabic = document.documentElement.lang === 'ar';

    if (selectedRole === 'student') {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_name', academicData.name);
        localStorage.setItem('user_email', academicData.email);
        localStorage.setItem('faculty', academicData.faculty);
        localStorage.setItem('department', academicData.dept);
        if (resumeKeywords.length > 0) {
            localStorage.setItem('resume_keywords', JSON.stringify(resumeKeywords));
        }
        if (recommendedTracks.length > 0) {
            localStorage.setItem('recommended_tracks', JSON.stringify(recommendedTracks));
        }
    } else if (selectedRole === 'organizer') {
        localStorage.setItem('user', 'organizer');
        localStorage.setItem('role', 'organizer');
        localStorage.setItem('user_name', academicData.name);
        localStorage.setItem('user_email', academicData.email);
        localStorage.setItem('faculty', 'Organizer Hub');
    } else if (selectedRole === 'employer') {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_name', academicData.name);
        localStorage.setItem('user_email', academicData.email);
        localStorage.setItem('faculty', 'Corporate Partner');
    } else if (selectedRole === 'admin') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_name', academicData.name);
        localStorage.setItem('user_email', academicData.email);
        localStorage.setItem('faculty', 'Admin Console');
    }

    // Show completion step
    goToStep(4);

    // Populate completion summary
    const summaryEl = document.getElementById('completion-summary');
    if (summaryEl) {
        let roleLabel = '';
        switch (selectedRole) {
            case 'student': roleLabel = isArabic ? 'طالب أكاديمي' : 'Academic Student'; break;
            case 'organizer': roleLabel = isArabic ? 'منظم / شركة' : 'Organizer / Company'; break;
            case 'employer': roleLabel = isArabic ? 'جهة عمل / شريك' : 'Employer Partner'; break;
            case 'admin': roleLabel = isArabic ? 'مشرف أكاديمي' : 'Academic Admin'; break;
        }

        summaryEl.innerHTML = `
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryRole">${isArabic ? 'الدور' : 'Role'}:</span>
                <span class="summary-value">${roleLabel}</span>
            </div>
            ${selectedRole === 'student' ? `
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryName">${isArabic ? 'الاسم' : 'Name'}:</span>
                <span class="summary-value">${academicData.name}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryFaculty">${isArabic ? 'الكلية' : 'Faculty'}:</span>
                <span class="summary-value">${isArabic ? DEPARTMENT_MAP[academicData.faculty]?.[0]?.labelAr : academicData.faculty}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryDept">${isArabic ? 'القسم' : 'Department'}:</span>
                <span class="summary-value">${academicData.dept}</span>
            </div>
            ${resumeKeywords.length > 0 ? `
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryKeywords">${isArabic ? 'الكلمات المفتاحية' : 'Keywords'}:</span>
                <span class="summary-value">${resumeKeywords.length} ${isArabic ? 'كلمة مفتاحية' : 'keywords extracted'}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label" data-i18n="summaryTracks">${isArabic ? 'المسارات المقترحة' : 'Suggested Tracks'}:</span>
                <span class="summary-value">${recommendedTracks.length}</span>
            </div>
            ` : ''}
            ` : ''}
        `;
    }

    showToast(isArabic ? 'تم إعداد حسابك بنجاح! مرحباً بك في HuntYourTrack' : 'Account setup complete! Welcome to HuntYourTrack', 'success');
}
window.completeOnboarding = completeOnboarding;

// Legacy functions for jury modal and demo personas
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
        localStorage.setItem('user_email', 'admin@damanhour.edu.eg');
        localStorage.setItem('user_name', isArabic ? 'المشرف الأكاديمي' : 'Academic Admin');
        localStorage.setItem('faculty', 'Computers & Artificial Intelligence');
        showToast(isArabic ? 'تم تفعيل حساب المشرف الأكاديمي (Admin) بنجاح' : 'Admin Academic session activated', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    } else if (persona === 'employer') {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', 'partner@techcorp.eg');
        localStorage.setItem('user_name', 'TechCorp Organizer');
        localStorage.setItem('faculty', 'Corporate Partner Hub');
        showToast(isArabic ? 'تم تفعيل حساب جهة العمل (Employer Partner)' : 'Employer Organizer session activated', 'success');
        setTimeout(() => { window.location.href = 'index.html#opportunities'; }, 800);
    } else {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', 'student@damanhour.edu.eg');
        localStorage.setItem('user_name', isArabic ? 'طالب أكاديمي' : 'Academic Student');
        localStorage.setItem('faculty', 'Faculty of Computers & Artificial Intelligence');
        localStorage.setItem('department', 'Computer Science (CS)');
        showToast(isArabic ? 'تم تفعيل حساب الطالب الأكاديمي (Student)' : 'Student session activated', 'success');
        setTimeout(() => { window.location.href = 'student.html'; }, 800);
    }
}
window.selectJuryPersona = selectJuryPersona;

// Demo persona selection (for quick access cards)
function selectDemoPersona(role) {
    const isArabic = document.documentElement.lang === 'ar';

    if (role === 'student') {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', 'student@damanhour.edu.eg');
        localStorage.setItem('user_name', isArabic ? 'طالب أكاديمي' : 'Academic Student');
        localStorage.setItem('faculty', 'Faculty of Computers & Artificial Intelligence');
        localStorage.setItem('department', 'Computer Science (CS)');
        showToast(isArabic ? 'تم تفعيل لوحة الطالب (Demo)' : 'Student Dashboard activated (Demo)', 'success');
        setTimeout(() => { window.location.href = 'student.html'; }, 800);
    } else if (role === 'organizer') {
        localStorage.setItem('user', 'organizer');
        localStorage.setItem('role', 'organizer');
        localStorage.setItem('user_email', 'organizer@damanhour.edu.eg');
        localStorage.setItem('user_name', 'Organizer Demo');
        localStorage.setItem('faculty', 'Organizer Hub');
        showToast(isArabic ? 'تم تفعيل لوحة المنظم (Demo)' : 'Organizer Dashboard activated (Demo)', 'success');
        setTimeout(() => { window.location.href = 'index.html#opportunities'; }, 800);
    } else if (role === 'employer') {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', 'partner@techcorp.eg');
        localStorage.setItem('user_name', 'TechCorp Partner Demo');
        localStorage.setItem('faculty', 'Corporate Partner Hub');
        showToast(isArabic ? 'تم تفعيل لوحة الشريك (Demo)' : 'Employer Partner Dashboard activated (Demo)', 'success');
        setTimeout(() => { window.location.href = 'index.html#opportunities'; }, 800);
    } else if (role === 'admin') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_email', 'admin@damanhour.edu.eg');
        localStorage.setItem('user_name', isArabic ? 'المشرف الأكاديمي' : 'Academic Admin');
        localStorage.setItem('faculty', 'Admin Console');
        showToast(isArabic ? 'تم تفعيل لوحة الإدارة (Demo)' : 'Admin Console activated (Demo)', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    }
}
window.selectDemoPersona = selectDemoPersona;

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const isArabic = document.documentElement.lang === 'ar';
    const status = document.getElementById('auth-status');

    if (email.includes('admin') || email === 'admin@damanhour.edu.eg') {
        localStorage.setItem('user', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', isArabic ? 'المشرف الأكاديمي' : 'Academic Admin');
        showToast(isArabic ? 'مرحباً بك في لوحة الإدارة الأكاديمية!' : 'Welcome to Admin Console!', 'success');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
    } else if (email.includes('employer') || email.includes('partner') || email.includes('hr')) {
        localStorage.setItem('user', 'employer');
        localStorage.setItem('role', 'employer');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', 'Partner Organizer');
        showToast(isArabic ? 'مرحباً بك في منصة تنظيم ونشر الفرص!' : 'Welcome to Employer Portal!', 'success');
        setTimeout(() => { window.location.href = 'employer.html'; }, 800);
    } else {
        localStorage.setItem('user', 'student');
        localStorage.setItem('role', 'student');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', email.split('@')[0]);
        localStorage.setItem('faculty', 'Faculty of Computers & Artificial Intelligence');
        localStorage.setItem('department', 'Computer Science (CS)');
        showToast(isArabic ? 'تم تسجيل الدخول بنجاح! جاري توجيهك لخارطة طريقك' : 'Signed in! Redirecting to Student Hub', 'success');
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

    showToast(isArabic ? `أهلاً بك يا ${name}! تم إنشاء حسابك بنجاح` : `Welcome ${name}! Account created`, 'success');

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
    const facultySelect = document.getElementById('signup-faculty') || document.getElementById('onboard-faculty');
    if (facultySelect) {
        updateDepartmentOptions(facultySelect.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const facultySelect = document.getElementById('signup-faculty') || document.getElementById('onboard-faculty');
    if (facultySelect) {
        updateDepartmentOptions(facultySelect.value);
    }

    // Setup resume file input
    const resumeInput = document.getElementById('resume-file-input');
    const dropZone = document.getElementById('resume-drop-zone');

    if (resumeInput) {
        resumeInput.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                handleResumeUpload(e.target.files[0]);
            }
        });
    }

    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files[0]) {
                handleResumeUpload(files[0]);
            }
        }, false);
    }

    // Setup role card selection
    document.querySelectorAll('.role-card.enhanced').forEach(card => {
        card.addEventListener('click', () => {
            selectRole(card.dataset.role);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectRole(card.dataset.role);
            }
        });
    });

    // Setup academic form
    const academicForm = document.getElementById('academic-form');
    if (academicForm) {
        academicForm.addEventListener('submit', handleAcademicSubmit);
    }

    // Setup resume next button
    const resumeNextBtn = document.getElementById('btn-resume-next');
    if (resumeNextBtn) {
        resumeNextBtn.addEventListener('click', completeOnboarding);
    }

    // Setup skip resume button
    const skipResumeBtn = document.getElementById('btn-skip-resume');
    if (skipResumeBtn) {
        skipResumeBtn.addEventListener('click', skipResumeStep);
    }

    // Setup role next button
    const roleNextBtn = document.getElementById('btn-role-next');
    if (roleNextBtn) {
        roleNextBtn.addEventListener('click', () => {
            if (onboardingState.selectedRole === 'student') {
                goToStep(2);
            } else {
                // For non-student roles, go directly to academic form (step 2)
                goToStep(2);
            }
        });
    }

    // Setup academic next button
    const academicNextBtn = document.getElementById('btn-academic-next');
    if (academicNextBtn) {
        academicNextBtn.addEventListener('click', () => {
            if (onboardingState.selectedRole === 'student') {
                goToStep(3);
            } else {
                completeOnboarding();
            }
        });
    }
});