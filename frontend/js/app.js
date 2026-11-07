/**
 * HuntYourTrack - Main Application Logic
 * Theme system, Auth modal, Navigation, Scroll animations
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
        });
    }

    // Close mobile drawer when clicking a link
    document.querySelectorAll('.mobile-drawer .nav-drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // Close mobile drawer on outside click
    document.addEventListener('click', (e) => {
        if (mobileDrawer && mobileDrawer.classList.contains('open') &&
            !mobileDrawer.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            mobileDrawer.classList.remove('open');
        }
    });

    // ========================================
    // THEME SYSTEM
    // ========================================
    const THEME_KEY = 'hyt_theme';
    const LANG_KEY = 'hyt_lang';

    function getTheme() {
        return localStorage.getItem(THEME_KEY) || 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeToggle(theme);
        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('hyt:themeChanged', { detail: { theme } }));
    }

    function toggleTheme() {
        const current = getTheme();
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    function updateThemeToggle(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const isDark = theme === 'dark';
        btn.querySelector('.icon-sun').style.display = isDark ? 'none' : 'block';
        btn.querySelector('.icon-moon').style.display = isDark ? 'block' : 'none';
        btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Initialize theme
    setTheme(getTheme());

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // ========================================
    // TOP BAR SCROLL EFFECT
    // ========================================
    const topBar = document.getElementById('top-bar');
    let lastScrollY = 0;

    function onScroll() {
        const scrollY = window.scrollY;
        if (topBar) {
            topBar.classList.toggle('scrolled', scrollY > 20);
        }
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[style*="opacity:0"]').forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 2000;
        const start = performance.now();
        const isArabic = document.documentElement.lang === 'ar';

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            el.textContent = current.toLocaleString(isArabic ? 'ar-EG' : 'en-US');
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    document.querySelectorAll('.trust-num[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ========================================
    // AUTH MODAL SYSTEM
    // ========================================
    const authModal = document.getElementById('auth-modal');
    const authEntry = document.getElementById('auth-entry');
    const roleSelector = document.getElementById('role-selector');
    const authTabs = document.getElementById('auth-tabs');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    function openAuthModal(startWithRoleSelector = true) {
        if (!authModal) return;
        if (startWithRoleSelector && !isUserLoggedIn()) {
            showRoleSelector();
        } else {
            showAuthTabs('login');
        }
        authModal.showModal();
        document.body.style.overflow = 'hidden';
    }

    function closeAuthModal() {
        if (!authModal) return;
        authModal.close();
        document.body.style.overflow = '';
        resetAuthModal();
    }

    function resetAuthModal() {
        if (roleSelector) roleSelector.style.display = 'none';
        if (authTabs) authTabs.style.display = 'block';
        if (loginForm) loginForm.style.display = 'block';
        if (signupForm) signupForm.style.display = 'none';
        document.getElementById('tab-login')?.classList.add('active');
        document.getElementById('tab-signup')?.classList.remove('active');
        document.getElementById('tab-login')?.setAttribute('aria-selected', 'true');
        document.getElementById('tab-signup')?.setAttribute('aria-selected', 'false');
    }

    function showRoleSelector() {
        if (roleSelector) roleSelector.style.display = 'block';
        if (authTabs) authTabs.style.display = 'none';
    }

    function showAuthTabs(tab = 'login') {
        if (roleSelector) roleSelector.style.display = 'none';
        if (authTabs) authTabs.style.display = 'block';
        switchAuthTab(tab);
    }

    function selectAuthRole(role) {
        // Store selected role for signup
        sessionStorage.setItem('hyt_selected_role', role);
        showAuthTabs('signup');
        // Pre-select role in signup form
        const roleSelect = document.getElementById('signup-role');
        if (roleSelect) roleSelect.value = role;
        toggleSignupFields(role);
    }

    function selectDemoRole(role) {
        const isArabic = document.documentElement.lang === 'ar';
        const demoData = {
            student: { role: 'student', email: 'student@damanhour.edu.eg', name: isArabic ? 'طالب أكاديمي' : 'Academic Student', faculty: 'Faculty of Computers & AI', department: 'Computer Science (CS)' },
            organizer: { role: 'organizer', email: 'organizer@event.com', name: 'Event Organizer', org: 'Tech Events Co.', orgType: 'company' },
            employer: { role: 'employer', email: 'partner@techcorp.eg', name: 'TechCorp Partner', org: 'TechCorp Egypt', orgType: 'company' },
            admin: { role: 'admin', email: 'admin@damanhour.edu.eg', name: isArabic ? 'المشرف الأكاديمي' : 'Academic Admin', adminCode: 'HYT-ADMIN-2026' }
        };

        const data = demoData[role];
        if (!data) return;

        localStorage.setItem('user', data.role);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user_email', data.email);
        localStorage.setItem('user_name', data.name);
        if (data.faculty) localStorage.setItem('faculty', data.faculty);
        if (data.department) localStorage.setItem('department', data.department);
        if (data.org) localStorage.setItem('organization', data.org);
        if (data.orgType) localStorage.setItem('org_type', data.orgType);
        if (data.adminCode) localStorage.setItem('admin_code', data.adminCode);

        showToast(isArabic ? `تم تفعيل الحساب التجريبي: ${data.name}` : `Demo account activated: ${data.name}`, 'success');
        closeAuthModal();
        setTimeout(() => redirectToDashboard(data.role), 500);
    }

    window.selectDemoRole = selectDemoRole;
    window.selectAuthRole = selectAuthRole;
    window.closeAuthModal = closeAuthModal;

    // Auth tab switching
    function switchAuthTab(mode) {
        const isLogin = mode === 'login';
        if (loginForm) loginForm.style.display = isLogin ? 'block' : 'none';
        if (signupForm) signupForm.style.display = isLogin ? 'none' : 'block';
        document.getElementById('tab-login')?.classList.toggle('active', isLogin);
        document.getElementById('tab-signup')?.classList.toggle('active', !isLogin);
        document.getElementById('tab-login')?.setAttribute('aria-selected', isLogin);
        document.getElementById('tab-signup')?.setAttribute('aria-selected', !isLogin);

        const title = document.getElementById('auth-modal-title');
        if (title) {
            const isArabic = document.documentElement.lang === 'ar';
            title.textContent = isLogin
                ? (isArabic ? 'تسجيل الدخول' : 'Sign In')
                : (isArabic ? 'إنشاء حساب جديد' : 'Create Account');
        }
    }

    window.switchAuthTab = switchAuthTab;

    // Signup dynamic fields
    function toggleSignupFields(role) {
        const studentFields = document.getElementById('student-fields');
        const orgFields = document.getElementById('org-fields');
        const adminFields = document.getElementById('admin-fields');

        [studentFields, orgFields, adminFields].forEach(f => f?.style.setProperty('display', 'none', 'important'));

        if (role === 'student' && studentFields) studentFields.style.display = 'block';
        else if ((role === 'organizer' || role === 'employer') && orgFields) orgFields.style.display = 'block';
        else if (role === 'admin' && adminFields) adminFields.style.display = 'block';
    }

    window.toggleSignupFields = toggleSignupFields;

    // Login handler
    function handleLoginSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value?.trim()?.toLowerCase();
        const isArabic = document.documentElement.lang === 'ar';

        if (!email) return;

        let role = 'student';
        if (email.includes('admin') || email === 'admin@damanhour.edu.eg') role = 'admin';
        else if (email.includes('employer') || email.includes('partner') || email.includes('hr')) role = 'employer';
        else if (email.includes('organizer') || email.includes('event')) role = 'organizer';

        localStorage.setItem('user', role);
        localStorage.setItem('role', role);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', email.split('@')[0]);

        if (role === 'student') {
            localStorage.setItem('faculty', 'Faculty of Computers & AI');
            localStorage.setItem('department', 'Computer Science (CS)');
        }

        showToast(isArabic ? 'مرحباً بك! جاري توجيهك...' : 'Welcome! Redirecting...', 'success');
        closeAuthModal();
        setTimeout(() => redirectToDashboard(role), 500);
    }

    window.handleLoginSubmit = handleLoginSubmit;

    // Signup handler
    function handleSignupSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name')?.value?.trim();
        const email = document.getElementById('signup-email')?.value?.trim()?.toLowerCase();
        const role = document.getElementById('signup-role')?.value;
        const isArabic = document.documentElement.lang === 'ar';

        if (!name || !email || !role) return;

        localStorage.setItem('user', role);
        localStorage.setItem('role', role);
        localStorage.setItem('user_name', name);
        localStorage.setItem('user_email', email);

        if (role === 'student') {
            const faculty = document.getElementById('signup-faculty')?.value;
            const dept = document.getElementById('signup-dept')?.value;
            if (faculty) localStorage.setItem('faculty', faculty);
            if (dept) localStorage.setItem('department', dept);
        } else if (role === 'organizer' || role === 'employer') {
            const org = document.getElementById('signup-org')?.value?.trim();
            const orgType = document.getElementById('signup-org-type')?.value;
            if (org) localStorage.setItem('organization', org);
            if (orgType) localStorage.setItem('org_type', orgType);
        } else if (role === 'admin') {
            const code = document.getElementById('signup-admin-code')?.value;
            if (code) localStorage.setItem('admin_code', code);
        }

        showToast(isArabic ? `أهلاً ${name}! تم إنشاء حسابك` : `Welcome ${name}! Account created`, 'success');
        closeAuthModal();
        setTimeout(() => redirectToDashboard(role), 500);
    }

    window.handleSignupSubmit = handleSignupSubmit;

    // Redirect based on role
    function redirectToDashboard(role) {
        switch (role) {
            case 'admin': window.location.href = 'pages/admin.html'; break;
            case 'employer': window.location.href = 'pages/employer.html'; break;
            case 'organizer': window.location.href = 'pages/employer.html'; break;
            default: window.location.href = 'pages/student.html'; break;
        }
    }

    // Check if user is logged in
    function isUserLoggedIn() {
        return !!localStorage.getItem('user');
    }

    // Update auth entry in top bar
    function updateAuthEntry() {
        if (!authEntry) return;
        const userRole = localStorage.getItem('user');
        const userName = localStorage.getItem('user_name');
        const userEmail = localStorage.getItem('user_email');
        const isArabic = document.documentElement.lang === 'ar';

        if (userRole) {
            const roleLabels = {
                student: isArabic ? 'طالب' : 'Student',
                organizer: isArabic ? 'منظم' : 'Organizer',
                employer: isArabic ? 'شريك' : 'Partner',
                admin: isArabic ? 'مشرف' : 'Admin'
            };
            const portalLinks = {
                student: 'pages/student.html',
                organizer: 'pages/employer.html',
                employer: 'pages/employer.html',
                admin: 'pages/admin.html'
            };

            const displayName = userName?.split(' ')[0] || roleLabels[userRole];
            const portalUrl = portalLinks[userRole] || 'pages/student.html';
            const signOutLabel = isArabic ? 'خروج' : 'Sign Out';

            authEntry.innerHTML = `
                <div class="user-menu-wrapper" id="user-menu-wrapper">
                    <button class="user-pill" type="button" onclick="toggleUserMenu(event)" aria-label="User menu" aria-expanded="false">
                        <span class="user-avatar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                        </span>
                        <span class="user-name">${displayName}</span>
                        <span class="user-caret">▾</span>
                    </button>
                    <button type="button" id="logout-btn" class="btn btn-secondary btn-sm" onclick="signOut()" style="margin-inline-start: 0.5rem;" data-i18n="navSignOut">${signOutLabel}</button>
                    <div class="user-dropdown" id="user-dropdown" style="display:none;">
                        <a href="${portalUrl}" class="user-dropdown-item">${isArabic ? 'لوحة التحكم' : 'Dashboard'}</a>
                        <button type="button" class="user-dropdown-item signout" onclick="signOut()">${signOutLabel}</button>
                    </div>
                </div>
            `;
        } else {
            authEntry.innerHTML = `
                <button type="button" class="btn btn-primary btn-sm" onclick="openAuthModal()" data-i18n="navSignIn">
                    ${isArabic ? 'دخول' : 'Sign In'}
                </button>
            `;
        }
    }

    // User dropdown
    function toggleUserMenu(e) {
        e.stopPropagation();
        const dropdown = document.getElementById('user-dropdown');
        const btn = document.querySelector('.user-pill');
        if (dropdown && btn) {
            const isOpen = dropdown.style.display !== 'none';
            dropdown.style.display = isOpen ? 'none' : 'block';
            btn.setAttribute('aria-expanded', !isOpen);
        }
    }

    function signOut() {
        const keysToKeep = [THEME_KEY, LANG_KEY];
        const saved = {};
        keysToKeep.forEach(k => saved[k] = localStorage.getItem(k));
        localStorage.clear();
        Object.entries(saved).forEach(([k, v]) => { if (v) localStorage.setItem(k, v); });
        updateAuthEntry();
        showToast(document.documentElement.lang === 'ar' ? 'تم تسجيل الخروج' : 'Signed out', 'info');
    }

    window.toggleUserMenu = toggleUserMenu;
    window.signOut = signOut;

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('user-dropdown');
        const wrapper = document.getElementById('user-menu-wrapper');
        if (dropdown && wrapper && !wrapper.contains(e.target)) {
            dropdown.style.display = 'none';
            document.querySelector('.user-pill')?.setAttribute('aria-expanded', 'false');
        }
    });

    // ========================================
    // AUTH MODAL TRIGGERS
    // ========================================
    const startJourneyBtn = document.getElementById('start-journey-btn');
    const exploreFirstBtn = document.getElementById('explore-first-btn');

    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => openAuthModal(true));
    }
    if (exploreFirstBtn) {
        exploreFirstBtn.addEventListener('click', () => {
            // Smooth scroll to value props
            const valueProps = document.getElementById('value-props');
            if (valueProps) valueProps.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Close auth modal on backdrop click
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeAuthModal();
        });
    }

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && authModal?.open) closeAuthModal();
    });

    // ========================================
    // PUBLISH OPPORTUNITY MODAL
    // ========================================
    function openPublishOpportunityModal() {
        const modal = document.getElementById('publish-opportunity-modal');
        if (!modal) return;

        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        const defaultEnd = new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0];
        document.getElementById('opp-form-start').value = today;
        document.getElementById('opp-form-end').value = defaultEnd;

        modal.showModal();
        document.body.style.overflow = 'hidden';
    }

    function closePublishOpportunityModal() {
        const modal = document.getElementById('publish-opportunity-modal');
        if (modal) {
            modal.close();
            document.body.style.overflow = '';
        }
    }

    function handlePublishOpportunitySubmit(e) {
        e.preventDefault();
        const title = document.getElementById('opp-form-title')?.value?.trim();
        const orgName = document.getElementById('opp-form-org')?.value?.trim();
        const type = document.getElementById('opp-form-type')?.value;
        const targetFaculty = document.getElementById('opp-form-faculty')?.value;
        const desc = document.getElementById('opp-form-desc')?.value?.trim();
        const startDate = document.getElementById('opp-form-start')?.value;
        const endDate = document.getElementById('opp-form-end')?.value;
        const applyUrl = document.getElementById('opp-form-link')?.value?.trim();
        const isArabic = document.documentElement.lang === 'ar';

        if (!title || !orgName || !desc || !applyUrl) return;

        if (window.hytOpportunities) {
            window.hytOpportunities.addOpportunity({
                title, orgName, type, targetFaculty, desc, startDate, endDate, applyUrl,
                stipend: isArabic ? 'معتمد أكاديمياً + شهادة' : 'Accredited + Certificate',
                imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
            });
        }

        closePublishOpportunityModal();
        showToast(isArabic ? 'تم اعتماد ونشر الفرصة!' : 'Opportunity published!', 'success');
    }

    window.openPublishOpportunityModal = openPublishOpportunityModal;
    window.closePublishOpportunityModal = closePublishOpportunityModal;
    window.handlePublishOpportunitySubmit = handlePublishOpportunitySubmit;

    // Close publish modal on backdrop
    const pubModal = document.getElementById('publish-opportunity-modal');
    if (pubModal) {
        pubModal.addEventListener('click', (e) => {
            if (e.target === pubModal) closePublishOpportunityModal();
        });
    }

    // ========================================
    // TOAST SYSTEM
    // ========================================
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

    // ========================================
    // HUNTER RADAR INTEGRATION HELPERS
    // ========================================
    function setHunterFaculty(faculty, btn) {
        document.querySelectorAll('.dock-pill').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        if (window.hytHunter) window.hytHunter.filterFaculty(faculty);
    }
    window.setHunterFaculty = setHunterFaculty;

    function handleHunterSearch(query) {
        if (window.hytHunter) window.hytHunter.searchTrack(query);
    }
    window.handleHunterSearch = handleHunterSearch;

    function hookQuickChip(trackId, chipBtn) {
        document.querySelectorAll('.hunter-quick-chip').forEach(c => c.classList.remove('active'));
        if (chipBtn) chipBtn.classList.add('active');
        if (window.hytHunter) {
            if (trackId === 'all') window.hytHunter.searchTrack('');
            else window.hytHunter.focusTrack(trackId);
        }
    }
    window.hookQuickChip = hookQuickChip;

    // Update hunter autocomplete (called from hunter-canvas.js)
    function updateHunterAutocomplete(query, matches) {
        const dropdown = document.getElementById('hunter-autocomplete-dropdown');
        if (!dropdown) return;
        if (!query) { dropdown.style.display = 'none'; dropdown.innerHTML = ''; return; }

        const isAr = document.documentElement.lang === 'ar';
        if (!matches || matches.length === 0) {
            dropdown.style.display = 'block';
            dropdown.innerHTML = `<div class="no-track-match-banner"><span>${isAr ? 'المسار غير موجود — اختر من المسارات المعتمدة' : 'Track not found — select from accredited tracks'}</span></div>`;
            return;
        }

        dropdown.style.display = 'block';
        dropdown.innerHTML = matches.map(track => `
            <div class="hunter-autocomplete-item" onclick="selectHunterTrack('${track.id}')">
                <div>
                    <div class="hunter-autocomplete-track-title">${isAr ? (track.labelAr || track.label) : track.label}</div>
                    <div style="font-size:0.75rem; color:var(--color-fg-muted); margin-top:2px;">${track.weeks || ''} · ${(track.skills || []).slice(0,3).join(', ')}</div>
                </div>
                <span class="hunter-autocomplete-faculty-tag">${(track.faculty || '').toUpperCase()}</span>
            </div>
        `).join('');
    }
    window.updateHunterAutocomplete = updateHunterAutocomplete;

    function selectHunterTrack(trackId) {
        const dropdown = document.getElementById('hunter-autocomplete-dropdown');
        if (dropdown) dropdown.style.display = 'none';
        const input = document.getElementById('hunter-quick-search');
        if (window.hytHunter) {
            const track = window.hytHunter.nodes.find(n => n.id === trackId);
            if (track && input) {
                input.value = document.documentElement.lang === 'ar' ? (track.labelAr || track.label) : track.label;
            }
            window.hytHunter.focusTrack(trackId);
        }
    }
    window.selectHunterTrack = selectHunterTrack;

    // ========================================
    // TRACK DATA & RENDERING
    // ========================================
    const TRACKS_DATA = [
        {
            id: 'cs-ai',
            label: 'AI & Deep Learning',
            labelAr: 'الذكاء الاصطناعي والتعلم العميق',
            faculty: 'computing',
            facultyAr: 'الحاسبات والذكاء الاصطناعي',
            weeks: '20 أسبوعاً',
            weeksEn: '20 weeks',
            skills: ['Python', 'PyTorch', 'TensorFlow', 'MLOps'],
            descriptionEn: 'Master neural architectures, transformers, and production ML pipelines.',
            descriptionAr: 'إتقان معماريات الشبكات العصبية، المحولات، وخطوط إنتاج تعلم الآلة.',
            syllabus: [
                'Mathematical Foundations & Python Engineering',
                'Classical Machine Learning & Feature Science',
                'Deep Neural Architectures & PyTorch',
                'Generative AI, Transformers & LLM Engineering',
                'MLOps, High-Throughput Serving & Production'
            ],
            syllabusAr: [
                'الأساسيات الرياضية وهندسة بايثون',
                'تعلم الآلة الكلاسيكي وهندسة الخصائص',
                'الشبكات العصبية العميقة وبيئة PyTorch',
                'الذكاء الاصطناعي التوليدي والـ LLMs والـ RAG',
                'عمليات تعلم الآلة MLOps والنشر السحابي'
            ]
        },
        {
            id: 'cs-cloud',
            label: 'Full-Stack Cloud',
            labelAr: 'تطوير السحابة الكاملة (Full-Stack Cloud)',
            faculty: 'computing',
            facultyAr: 'الحاسبات والذكاء الاصطناعي',
            weeks: '16 أسبوعاً',
            weeksEn: '16 weeks',
            skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
            descriptionEn: 'Build scalable cloud-native applications with modern DevOps practices.',
            descriptionAr: 'بناء تطبيقات سحابية قابلة للتوسع بممارسات DevOps الحديثة.',
            syllabus: [
                'Modern React Architecture & TypeScript Patterns',
                'Node.js APIs & Distributed PostgreSQL',
                'Docker Containers & CI/CD Automation',
                'Graduation Project with Industry Standards'
            ],
            syllabusAr: [
                'معمارية React 18 الحديثة والأنماط المؤسسية',
                'واجهات Node.js وقواعد البيانات الموزعة',
                'حاويات Docker وأتمتة CI/CD والنشر السحابي',
                'مشروع تخرج تطبيقي متوافق مع معايير الشركات'
            ]
        },
        {
            id: 'eng-mecha',
            label: 'Mechatronics & Robotics',
            labelAr: 'الميكاترونكس والروبوتات',
            faculty: 'engineering',
            facultyAr: 'الهندسة والتكنولوجيا',
            weeks: '18 أسبوعاً',
            weeksEn: '18 weeks',
            skills: ['Embedded C/C++', 'AUTOSAR', 'RTOS', 'ROS2'],
            descriptionEn: 'Embedded systems, robotics, and real-time control for autonomous systems.',
            descriptionAr: 'الأنظمة المدمجة، الروبوتات، والتحكم الآني للأنظمة المستقلة.',
            syllabus: [
                'Embedded C/C++ & Hardware Programming',
                'AUTOSAR Architecture & CAN/LIN Protocols',
                'FreeRTOS & Real-Time Scheduling',
                'MISRA-C & ISO 26262 Functional Safety'
            ],
            syllabusAr: [
                'أساسيات Embedded C/C++ وبرمجة العتاد المباشر',
                'معمارية AUTOSAR وبروتوكولات CAN/LIN',
                'أنظمة التشغيل الفورية FreeRTOS وجدولة المهام',
                'معايير MISRA-C والأمان الوظيفي ISO 26262'
            ]
        },
        {
            id: 'bus-fintech',
            label: 'FinTech Trading',
            labelAr: 'تكنولوجيا التداول المالي (FinTech)',
            faculty: 'business',
            facultyAr: 'التجارة وإدارة الأعمال',
            weeks: '14 أسبوعاً',
            weeksEn: '14 weeks',
            skills: ['FinTech APIs', 'Business Analytics', 'SQL', 'Python'],
            descriptionEn: 'Financial systems, algorithmic trading, and digital payment infrastructure.',
            descriptionAr: 'الأنظمة المالية، التداول الخوارزمي، والبنية التحتية للمدفوعات الرقمية.',
            syllabus: [
                'Financial Markets & Time Series Analysis',
                'Electronic Payment Gateways & Banking APIs',
                'Data Warehousing & Power BI Dashboards',
                'ERP Systems & PCI-DSS Compliance'
            ],
            syllabusAr: [
                'الأسواق المالية والمشتقات وتحليل السلاسل الزمنية',
                'بناء بوابات الدفع الإلكتروني وتكامل APIs المصرفية',
                'مستودعات البيانات ونمذجة لوحات التحكم Power BI',
                'أنظمة ERP والامتثال المالي PCI-DSS'
            ]
        },
        {
            id: 'sci-bio',
            label: 'Bioinformatics',
            labelAr: 'المعلوماتية الحيوية',
            faculty: 'science',
            facultyAr: 'العلوم الأساسية',
            weeks: '16 أسبوعاً',
            weeksEn: '16 weeks',
            skills: ['Python', 'Genomics', 'Statistics', 'ML'],
            descriptionEn: 'Computational biology, genomics, and bio-data analytics.',
            descriptionAr: 'علم الأحياء الحاسوبي، الجينوميات، وتحليل البيانات الحيوية.',
            syllabus: [
                'Molecular Biology & Genomics Foundations',
                'Next-Generation Sequencing & Data Analysis',
                'Statistical Computing & Machine Learning',
                'Clinical Bioinformatics & Research Ethics'
            ],
            syllabusAr: [
                'أساسيات علم الأحياء الجزيئي والجينوميات',
                'تسلسل الجيل التالي وتحليل البيانات',
                'الحوسبة الإحصائية وتعلم الآلة',
                'المعلوماتية الحيوية السريرية وأخلاقيات البحث'
            ]
        },
        {
            id: 'cs-sec',
            label: 'Cybersecurity SOC',
            labelAr: 'الأمن السيبراني (SOC)',
            faculty: 'computing',
            facultyAr: 'الحاسبات والذكاء الاصطناعي',
            weeks: '16 أسبوعاً',
            weeksEn: '16 weeks',
            skills: ['Linux', 'SIEM', 'Network Security', 'Python'],
            descriptionEn: 'Security operations, threat hunting, and incident response.',
            descriptionAr: 'عمليات الأمن، صيد التهديدات، والاستجابة للحوادث.',
            syllabus: [
                'Network Security & Protocol Analysis',
                'SIEM Architecture & Log Correlation',
                'Threat Intelligence & Hunting',
                'Incident Response & Digital Forensics'
            ],
            syllabusAr: [
                'أمن الشبكات وتحليل البروتوكولات',
                'معمارية SIEM وربط السجلات',
                'استخبارات التهديدات وصيدها',
                'الاستجابة للحوادث والتحقيق الجنائي الرقمي'
            ]
        },
        {
            id: 'eng-embedded',
            label: 'Embedded Systems',
            labelAr: 'الأنظمة المدمجة (Embedded)',
            faculty: 'engineering',
            facultyAr: 'الهندسة والتكنولوجيا',
            weeks: '18 أسبوعاً',
            weeksEn: '18 weeks',
            skills: ['C/C++', 'RTOS', 'Microcontrollers', 'AUTOSAR'],
            descriptionEn: 'Real-time embedded software for automotive and IoT.',
            descriptionAr: 'برمجيات الأنظمة المدمجة في الوقت الحقيقي للسيارات وإنترنت الأشياء.',
            syllabus: [
                'Embedded C/C++ & Hardware Interfacing',
                'AUTOSAR Classic & CAN/LIN Protocols',
                'FreeRTOS Scheduling & RTOS',
                'MISRA-C & ISO 26262 Safety'
            ],
            syllabusAr: [
                'أساسيات Embedded C/C++ وبرمجة العتاد',
                'معمارية AUTOSAR وبروتوكولات CAN/LIN',
                'أنظمة FreeRTOS والجدولة الفورية',
                'معايير MISRA-C والأمان الوظيفي ISO 26262'
            ]
        },
        {
            id: 'bus-analytics',
            label: 'Business Analytics',
            labelAr: 'تحليل الأعمال (Business Analytics)',
            faculty: 'business',
            facultyAr: 'التجارة وإدارة الأعمال',
            weeks: '12 أسبوعاً',
            weeksEn: '12 weeks',
            skills: ['SQL', 'Power BI', 'Excel', 'Statistics'],
            descriptionEn: 'Data-driven decision making and business intelligence.',
            descriptionAr: 'اتخاذ القرارات المبنية على البيانات وذكاء الأعمال.',
            syllabus: [
                'Data Modeling & Warehouse Design',
                'Advanced DAX & Power BI Visualization',
                'Statistical Analysis & Forecasting',
                'Executive Dashboard & Storytelling'
            ],
            syllabusAr: [
                'نمذجة البيانات وتصميم المستودعات',
                'DAX المتقدم وتصورات Power BI',
                'التحليل الإحصائي والتنبؤ',
                'لوحات التحكم التنفيذية وسرد البيانات'
            ]
        },
        {
            id: 'sci-chem',
            label: 'Computational Chemistry',
            labelAr: 'الكيمياء الحاسوبية',
            faculty: 'science',
            facultyAr: 'العلوم الأساسية',
            weeks: '16 أسبوعاً',
            weeksEn: '16 weeks',
            skills: ['Python', 'DFT', 'Molecular Dynamics', 'HPC'],
            descriptionEn: 'Molecular modeling, quantum chemistry, and materials simulation.',
            descriptionAr: 'نمذجة الجزيئات، الكيمياء الكمية، ومحاكاة المواد.',
            syllabus: [
                'Quantum Mechanics & DFT Fundamentals',
                'Molecular Dynamics & Monte Carlo',
                'High-Performance Computing for Chemistry',
                'Materials Discovery & Drug Design'
            ],
            syllabusAr: [
                'أساسيات ميكانيكا الكم ونظرية الدالة الكثافة',
                'الديناميكا الجزيئية ومحاكاة مونت كارلو',
                'الحوسبة عالية الأداء للكيمياء',
                'اكتشاف المواد وتصميم الأدوية'
            ]
        },
        {
            id: 'law-cyber',
            label: 'Digital Law & Cybercrime',
            labelAr: 'القانون الرقمي والجرائم الإلكترونية',
            faculty: 'law',
            facultyAr: 'الحقوق والتشريعات الرقمية',
            weeks: '14 أسبوعاً',
            weeksEn: '14 weeks',
            skills: ['Legal Tech', 'Data Privacy', 'Cyber Law', 'Compliance'],
            descriptionEn: 'Legal frameworks for digital transformation and cybersecurity.',
            descriptionAr: 'الأطر القانونية للتحول الرقمي والأمن السيبراني.',
            syllabus: [
                'Cybercrime Legislation & Digital Evidence',
                'GDPR & Data Protection Compliance',
                'Smart Contracts & Blockchain Regulation',
                'AI Ethics & Algorithmic Accountability'
            ],
            syllabusAr: [
                'تشريعات الجرائم الإلكترونية والأدلة الرقمية',
                'الامتثال لـ GDPR وحماية البيانات',
                'العقود الذكية وتنظيم البلوكشين',
                'أخلاقيات الذكاء الاصطناعي ومحاسبة الخوارزميات'
            ]
        },
        {
            id: 'law-ip',
            label: 'Tech & AI Intellectual Property',
            labelAr: 'الملكية الفكرية في التكنولوجيا والذكاء الاصطناعي',
            faculty: 'law',
            facultyAr: 'الحقوق والتشريعات الرقمية',
            weeks: '12 أسبوعاً',
            weeksEn: '12 weeks',
            skills: ['Patent Law', 'Copyright', 'AI & IP', 'Licensing'],
            descriptionEn: 'IP strategy for software, AI models, and digital innovations.',
            descriptionAr: 'استراتيجية الملكية الفكرية للبرمجيات، نماذج الذكاء الاصطناعي، والابتكارات الرقمية.',
            syllabus: [
                'Software Patents & Open Source Licensing',
                'AI-Generated Content & Copyright',
                'Trade Secrets & Data Protection',
                'IP Portfolio Management & Enforcement'
            ],
            syllabusAr: [
                'براءات اختراع البرمجيات وترخيص المصادر المفتوحة',
                'المحتوى المولد بالذكاء الاصطناعي وحقوق النشر',
                'الأسرار التجارية وحماية البيانات',
                'إدارة محفظة الملكية الفكرية وإنفاذها'
            ]
        }
    ];

    // Render track cards with 3D flip
    function renderTrackCards() {
        const container = document.getElementById('tracks-grid-container');
        if (!container) return;

        const isArabic = document.documentElement.lang === 'ar';

        container.innerHTML = TRACKS_DATA.map(track => `
            <div class="track-card-3d-wrapper">
                <article class="track-card" data-track-id="${track.id}">
                    <div class="track-card-face track-card-front">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div class="track-icon-box" style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); background: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-fg); margin-bottom: 1rem;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        ${getTrackIcon(track.id)}
                                    </svg>
                                </div>
                                <button type="button" class="btn-flip-card" onclick="toggleTrackFlip(this)" aria-label="${isArabic ? 'عرض المنهج' : 'View Syllabus'}" style="font-size: 0.7rem; font-weight: 600; padding: 0.375rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-fg-muted); transition: all var(--transition-fast);">
                                    ${isArabic ? 'الخطة والمناهج' : 'View Syllabus'}
                                </button>
                            </div>
                            <h3 class="track-title" style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--color-fg); margin-bottom: 0.5rem; line-height: 1.3;">${isArabic ? track.labelAr : track.label}</h3>
                            <p class="track-desc" style="font-size: 0.85rem; color: var(--color-fg-muted); line-height: 1.6; flex: 1; margin-bottom: 1rem;">${isArabic ? track.descriptionAr : track.descriptionEn}</p>
                            <div class="skills-pill-group" style="display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1rem;">
                                ${track.skills.map(skill => `<span class="skill-pill" style="font-size: 0.65rem; font-weight: 500; padding: 0.25rem 0.625rem; border-radius: var(--radius-full); background: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-fg-muted);">${skill}</span>`).join('')}
                            </div>
                        </div>
                        <div class="track-footer" style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--color-border);">
                            <span class="track-duration" style="font-size: 0.75rem; font-weight: 500; color: var(--color-fg-muted);">${isArabic ? track.weeks : track.weeksEn}</span>
                            <button type="button" class="btn btn-primary" onclick="hookTrack('${track.id}')" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;" data-i18n="enrollTrackBtn">${isArabic ? 'بدء المسار ←' : 'Start Track ←'}</button>
                        </div>
                    </div>

                    <div class="track-card-face track-card-back">
                        <div>
                            <div class="card-back-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border);">
                                <span class="card-back-title" style="font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--color-fg);">${isArabic ? 'المنهج والمخرجات المهنية' : 'Curriculum & Career Outcomes'}</span>
                                <button type="button" class="btn-flip-card-back" onclick="toggleTrackFlip(this)" aria-label="${isArabic ? 'إغلاق' : 'Back'}" style="font-size: 0.7rem; font-weight: 600; padding: 0.375rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-fg-muted);">${isArabic ? 'العودة' : 'Back'}</button>
                            </div>
                            <ul class="card-syllabus-list" style="list-style: none; flex: 1; margin-bottom: 1rem;">
                                ${(isArabic ? track.syllabusAr : track.syllabus).map(item => `
                                    <li class="card-syllabus-item" style="padding: 0.5rem 0; font-size: 0.8rem; color: var(--color-fg-muted); border-bottom: 1px solid var(--color-border); position: relative; padding-inline-start: 1.25rem;">
                                        ${item}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="track-footer" style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--color-border);">
                            <span class="track-duration" style="font-size: 0.75rem; font-weight: 500; color: var(--color-fg-muted);">${isArabic ? 'مخرج مهني' : 'Career Outcome'}</span>
                            <button type="button" class="btn btn-primary" onclick="hookTrack('${track.id}')" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;" data-i18n="enrollTrackBtn">${isArabic ? 'بدء المسار ←' : 'Start Track ←'}</button>
                        </div>
                    </div>
                </article>
            </div>
        `).join('');

        // Add 3D flip styles if not present
        if (!document.getElementById('track-flip-styles')) {
            const style = document.createElement('style');
            style.id = 'track-flip-styles';
            style.textContent = `
                .track-card-3d-wrapper {
                    perspective: 1000px;
                    height: 400px;
                }
                .track-card {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .track-card.flipped { transform: rotateY(180deg); }
                .track-card-face {
                    position: absolute;
                    inset: 0;
                    backface-visibility: hidden;
                    border-radius: var(--radius-xl);
                    border: 1px solid var(--color-border);
                    background: var(--color-bg);
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    box-shadow: var(--shadow-md);
                }
                .track-card-back { transform: rotateY(180deg); }
                .card-back-header {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 1rem; padding-bottom: 1rem;
                    border-bottom: 1px solid var(--color-border);
                }
                .card-back-title { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--color-fg); }
                .card-syllabus-list { list-style: none; flex: 1; margin-bottom: 1rem; }
                .card-syllabus-item {
                    padding: 0.5rem 0; font-size: 0.8rem; color: var(--color-fg-muted);
                    border-bottom: 1px solid var(--color-border);
                    position: relative; padding-inline-start: 1.25rem;
                }
                .card-syllabus-item::before {
                    content: '\\2192';
                    position: absolute; left: 0; color: var(--color-fg); font-weight: 700;
                }
                .card-syllabus-item:last-child { border-bottom: none; }
                .btn-flip-card, .btn-flip-card-back {
                    font-size: 0.7rem; font-weight: 600;
                    padding: 0.375rem 0.75rem; border-radius: var(--radius-full);
                    border: 1px solid var(--color-border); background: var(--color-bg);
                    color: var(--color-fg-muted); transition: all var(--transition-fast);
                }
                .btn-flip-card:hover, .btn-flip-card-back:hover {
                    border-color: var(--color-fg); color: var(--color-fg);
                }
            `;
            document.head.appendChild(style);
        }
    }

    function getTrackIcon(trackId) {
        const icons = {
            'cs-ai': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/>',
            'cs-cloud': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
            'eng-mecha': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
            'bus-fintech': '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
            'sci-bio': '<path d="M12 2L2 7h20L12 2z"/><path d="M5 10v11M9 10v11M15 10v11M19 10v11"/>',
            'cs-sec': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/>',
            'eng-embedded': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
            'bus-analytics': '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
            'sci-chem': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
            'law-cyber': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/>',
            'law-ip': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/>'
        };
        return icons[trackId] || icons['cs-ai'];
    }

    function toggleTrackFlip(btn) {
        const card = btn.closest('.track-card');
        if (card) {
            card.classList.toggle('flipped');
        }
    }
    window.toggleTrackFlip = toggleTrackFlip;

    function hookTrack(trackId) {
        if (window.hytHunter) {
            window.hytHunter.toggleTrackHook(trackId);
            const radarSection = document.getElementById('hunter-radar-section');
            if (radarSection) radarSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    window.hookTrack = hookTrack;

    // ========================================
    // LANGUAGE TOGGLE (if not in i18n.js)
    // ========================================
    if (window.hytI18n && typeof window.hytI18n.toggleLanguage === 'function') {
        window.addEventListener('hyt:langChanged', () => {
            updateAuthEntry();
            // Update any dynamic text
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                const translation = window.hytI18n?.t?.(key);
                if (translation && el.tagName === 'INPUT') el.placeholder = translation;
                else if (translation) el.textContent = translation;
            });
        });
    }

    // ========================================
    // INIT
    // ========================================
    function init() {
        updateAuthEntry();
        renderTrackCards();

        // Listen for auth changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'user' || e.key === 'role' || e.key === 'user_name') {
                updateAuthEntry();
            }
        });

        // Language change updates auth entry
        window.addEventListener('hyt:langChanged', updateAuthEntry);

        console.log('[HuntYourTrack] App initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();