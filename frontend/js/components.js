/**
 * HuntYourTrack - Reusable UI Components & Dialogs (US28 & US29)
 * Modernized with Lovable & Stage Design System (Pure JavaScript ES6+ Architecture).
 * Includes Toast Notifications, Rich Opportunity Details Modal, and Interactive Apply Flow.
 */

// Demo modal hook for component showcase
const demoModal = document.getElementById('demo-modal');
if (document.getElementById('open-demo-modal') && demoModal) {
    document.getElementById('open-demo-modal').addEventListener('click', () => demoModal.showModal());
}

/**
 * Universal Toast Notification System
 */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button type="button" class="toast-close-btn" onclick="this.parentElement.remove()" aria-label="Dismiss">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}
window.showToast = showToast;
window.showDemoToast = showToast;

/**
 * US29: Interactive Opportunity Details Dialog
 */
function openOpportunityDetails(oppId) {
    if (!window.hytOpportunities) return;
    const opp = window.hytOpportunities.getById(oppId);
    if (!opp) return;

    const isArabic = document.documentElement.lang === 'ar';
    const title = isArabic ? (opp.titleAr || opp.title) : (opp.titleEn || opp.title);
    const orgName = isArabic ? (opp.orgNameAr || opp.orgName) : (opp.orgNameEn || opp.orgName);
    const desc = isArabic ? (opp.descAr || opp.desc) : (opp.descEn || opp.desc);
    const targetFaculty = isArabic ? (opp.targetFacultyAr || opp.targetFaculty) : (opp.targetFacultyEn || opp.targetFaculty);
    const stipend = isArabic ? (opp.stipendAr || opp.stipend) : (opp.stipendEn || opp.stipend);
    const term = isArabic ? (opp.termAr || opp.term || '8-12 weeks') : (opp.termEn || opp.term || '8-12 weeks');
    const location = isArabic ? (opp.locationAr || opp.location || 'Cairo') : (opp.locationEn || opp.location || 'Cairo');
    const countdown = window.hytOpportunities.calculateCountdown(opp.endDate);

    const requirements = isArabic 
        ? (opp.requirementsAr || ['إتقان أساسيات التخصص والمفاهيم الهندسية الأساسية', 'القدرة على العمل الجماعي وحل المشكلات', 'الالتزام التام بالجدول الزمني للبرنامج'])
        : (opp.requirementsEn || ['Strong conceptual foundations in the domain', 'Analytical problem solving & collaborative teamwork', 'Commitment to the program schedule']);

    const benefits = isArabic
        ? (opp.benefitsAr || ['مكافأة شهرية مجزية وبدل مواصلات', 'شهادة تدريب معتمدة لساعات التخرج الأكاديمية', 'إشراف مباشر وتوجيه مهني من كبار الخبراء'])
        : (opp.benefitsEn || ['Competitive stipend and travel compensation', 'Official university internship credit certificate', 'Direct 1-on-1 mentorship from senior practitioners']);

    // Remove any existing modal
    const existing = document.getElementById('hyt-opp-detail-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'hyt-opp-detail-modal';
    overlay.className = 'opp-modal-overlay';
    overlay.innerHTML = `
        <div class="opp-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-opp-title">
            <button type="button" class="opp-modal-close-btn" onclick="closeOpportunityDetails()" aria-label="Close dialog">&times;</button>
            
            <div class="opp-header-row" style="margin-bottom: 1.25rem;">
                <div class="opp-brand-info">
                    <div class="opp-brand-logo" style="width: 52px; height: 52px; font-size: 1.3rem;">
                        ${opp.orgLogoText || '🏢'}
                    </div>
                    <div>
                        <div class="opp-company-name" style="font-size: 0.95rem;">
                            ${orgName}
                            ${opp.verified ? '<span style="color: var(--color-accent); font-weight: 700;">✓ Accredited</span>' : ''}
                        </div>
                        <h2 id="modal-opp-title" style="margin: 0.25rem 0 0; font-size: 1.35rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-foreground);">
                            ${title}
                        </h2>
                    </div>
                </div>
                ${window.hytOpportunities.renderMatchRing(opp.matchScore || 92)}
            </div>

            <p style="font-size: 0.92rem; color: var(--color-muted-foreground); line-height: 1.6; margin-bottom: 1.25rem;">
                ${desc}
            </p>

            <!-- Facts Grid -->
            <div class="opp-facts-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.65rem; margin-bottom: 1.5rem;">
                <div class="opp-fact-pill" style="padding: 0.6rem 0.8rem;">
                    <span class="fact-label">${isArabic ? '💰 المكافأة:' : '💰 Stipend:'}</span>
                    <span style="font-weight: 700;">${stipend}</span>
                </div>
                <div class="opp-fact-pill" style="padding: 0.6rem 0.8rem;">
                    <span class="fact-label">${isArabic ? '⏱️ المدة:' : '⏱️ Term:'}</span>
                    <span style="font-weight: 700;">${term}</span>
                </div>
                <div class="opp-fact-pill" style="padding: 0.6rem 0.8rem;">
                    <span class="fact-label">${isArabic ? '📍 المقر:' : '📍 Location:'}</span>
                    <span style="font-weight: 700;">${location}</span>
                </div>
                <div class="opp-fact-pill" style="padding: 0.6rem 0.8rem;">
                    <span class="fact-label">${isArabic ? '👥 التنافس:' : '👥 Applicants:'}</span>
                    <span style="font-weight: 700;">${opp.applicantsCount || 24} ${isArabic ? 'مرشح' : 'candidates'}</span>
                </div>
            </div>

            <!-- Skills -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted-foreground); margin: 0 0 0.5rem;">
                    ${isArabic ? 'المهارات والتقنيات المطلوبة' : 'Required Competencies & Skills'}
                </h4>
                <div class="opp-skills-list">
                    ${(opp.skills || []).map(s => `<span class="opp-skill-chip" style="font-size: 0.8rem; padding: 0.25rem 0.7rem;">${s}</span>`).join('')}
                </div>
            </div>

            <!-- Prerequisites / Requirements -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted-foreground); margin: 0 0 0.5rem;">
                    ${isArabic ? 'متطلبات وشروط الالتحاق' : 'Prerequisites & Qualifications'}
                </h4>
                <ul class="opp-modal-checklist">
                    ${requirements.map(r => `
                        <li>
                            <span class="opp-check-icon">✓</span>
                            <span>${r}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Benefits -->
            <div style="margin-bottom: 1.75rem;">
                <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted-foreground); margin: 0 0 0.5rem;">
                    ${isArabic ? 'المزايا والاعتمادات الأكاديمية' : 'Perks & Academic Accreditations'}
                </h4>
                <ul class="opp-modal-checklist">
                    ${benefits.map(b => `
                        <li>
                            <span class="opp-check-icon" style="color: var(--color-primary);">★</span>
                            <span>${b}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Modal Actions -->
            <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid var(--color-border);">
                <button type="button" class="btn btn-secondary" onclick="closeOpportunityDetails()">
                    ${isArabic ? 'إغلاق' : 'Close'}
                </button>
                <button type="button" class="btn btn-primary" onclick="closeOpportunityDetails(); openOpportunityApply('${opp.id}')" style="font-weight: 700; padding: 0.65rem 1.4rem;">
                    ${isArabic ? 'التقديم الآن وبدء المسار ←' : 'Apply Now & Start Track →'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    // ESC to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeOpportunityDetails();
            window.removeEventListener('keydown', escHandler);
        }
    };
    window.addEventListener('keydown', escHandler);

    // Backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOpportunityDetails();
    });
}
window.openOpportunityDetails = openOpportunityDetails;

function closeOpportunityDetails() {
    const overlay = document.getElementById('hyt-opp-detail-modal');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 250);
    }
}
window.closeOpportunityDetails = closeOpportunityDetails;

/**
 * US29: Multi-Step Interactive Apply Flow Modal
 */
function openOpportunityApply(oppId) {
    if (!window.hytOpportunities) return;
    const opp = window.hytOpportunities.getById(oppId);
    if (!opp) return;

    const isArabic = document.documentElement.lang === 'ar';
    const title = isArabic ? (opp.titleAr || opp.title) : (opp.titleEn || opp.title);
    const orgName = isArabic ? (opp.orgNameAr || opp.orgName) : (opp.orgNameEn || opp.orgName);

    // Saved student data or defaults
    const studentName = localStorage.getItem('user_name') || (isArabic ? 'طالب جامعي متميز' : 'University Student');
    const studentEmail = localStorage.getItem('user_email') || 'student@damanhour.edu.eg';
    const studentFaculty = localStorage.getItem('faculty') || (isArabic ? 'كلية الحاسبات والذكاء الاصطناعي' : 'Faculty of Computers & AI');

    const existing = document.getElementById('hyt-opp-apply-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'hyt-opp-apply-modal';
    overlay.className = 'opp-modal-overlay';
    overlay.innerHTML = `
        <div class="opp-modal-dialog" style="max-width: 540px;" role="dialog" aria-modal="true">
            <button type="button" class="opp-modal-close-btn" onclick="closeOpportunityApply()" aria-label="Close">&times;</button>
            
            <div id="apply-step-form" class="apply-step active">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                    <div class="opp-brand-logo" style="width: 44px; height: 44px;">${opp.orgLogoText || '🏢'}</div>
                    <div>
                        <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-muted-foreground);">${orgName}</span>
                        <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; font-family: var(--font-heading); color: var(--color-foreground);">
                            ${title}
                        </h3>
                    </div>
                </div>

                <div class="panel" style="padding: 1rem; margin-bottom: 1.25rem; font-size: 0.86rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                        <span style="color: var(--color-muted-foreground);">${isArabic ? '👤 اسم المرشح:' : '👤 Candidate:'}</span>
                        <span style="font-weight: 600;">${studentName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                        <span style="color: var(--color-muted-foreground);">${isArabic ? '🎓 الكلية المقيد بها:' : '🎓 Faculty:'}</span>
                        <span style="font-weight: 600;">${studentFaculty}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--color-muted-foreground);">${isArabic ? '🎯 التوافق مع المتطلبات:' : '🎯 ATS Match:'}</span>
                        <span style="font-weight: 800; color: var(--color-accent);">${opp.matchScore || 94}% Compatibility</span>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.84rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--color-foreground);">
                        ${isArabic ? '📝 رسالة تعريفية موجزة للجهة (Cover Note):' : '📝 Brief Cover Note to Employer:'}
                    </label>
                    <textarea id="apply-cover-note" rows="3" class="form-control" style="width: 100%; border-radius: 10px; border: 1px solid var(--color-border); background: var(--color-muted); color: var(--color-foreground); padding: 0.65rem; font-family: inherit; font-size: 0.88rem;" placeholder="${isArabic ? 'وضح باختصار شغفك بالمسار وأهم المشاريع التي أنجزتها...' : 'Briefly describe your passion and relevant project experiences...'}"></textarea>
                </div>

                <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
                    <input type="checkbox" id="apply-cv-attached" checked style="width: 16px; height: 16px; accent-color: var(--color-primary);" />
                    <label for="apply-cv-attached" style="font-size: 0.82rem; color: var(--color-muted-foreground); cursor: pointer;">
                        ${isArabic ? '📄 إرفاق ملف السيرة الذاتية المحفوظ ومصفوفة المهارات المعتمدة' : '📄 Attach validated CV file and skill radar breakdown'}
                    </label>
                </div>

                <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" onclick="closeOpportunityApply()">
                        ${isArabic ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button type="button" id="confirm-apply-btn" class="btn btn-primary" onclick="submitApplication('${opp.id}')" style="font-weight: 700; padding: 0.65rem 1.4rem;">
                        ${isArabic ? 'تأكيد وإرسال الملف 🚀' : 'Confirm & Submit 🚀'}
                    </button>
                </div>
            </div>

            <div id="apply-step-success" class="apply-step" style="display: none;">
                <div class="apply-success-box">
                    <div class="apply-success-icon">✓</div>
                    <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0 0 0.5rem; font-family: var(--font-heading); color: var(--color-foreground);">
                        ${isArabic ? 'تم إرسال طلبك بنجاح!' : 'Application Successfully Sent!'}
                    </h3>
                    <p style="font-size: 0.9rem; color: var(--color-muted-foreground); margin-bottom: 1.5rem; line-height: 1.5;">
                        ${isArabic ? 'تم ربط ملفك الأكاديمي وإخطار مسؤولي التوظيف لدى ' + orgName + '. يمكنك متابعة حالة طلبك من لوحة الطالب.' : 'Your verified profile has been transmitted to ' + orgName + ' recruitment desk. You can track evaluation status in your Student Career Hub.'}
                    </p>
                    <button type="button" class="btn btn-primary" onclick="closeOpportunityApply()" style="padding: 0.65rem 1.5rem; font-weight: 700;">
                        ${isArabic ? 'حسناً، فهمت' : 'Done & Return'}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
}
window.openOpportunityApply = openOpportunityApply;

function closeOpportunityApply() {
    const overlay = document.getElementById('hyt-opp-apply-modal');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 250);
    }
}
window.closeOpportunityApply = closeOpportunityApply;

function submitApplication(oppId) {
    const submitBtn = document.getElementById('confirm-apply-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting...';
    }

    // Persist to localStorage
    const saved = JSON.parse(localStorage.getItem('hyt_student_applications') || '[]');
    if (!saved.includes(oppId)) {
        saved.push(oppId);
        localStorage.setItem('hyt_student_applications', JSON.stringify(saved));
    }

    setTimeout(() => {
        document.getElementById('apply-step-form').style.display = 'none';
        document.getElementById('apply-step-success').style.display = 'block';
        showToast(document.documentElement.lang === 'ar' ? 'تم تقديم الطلب وإخطار المؤسسة بنجاح! 🎯' : 'Application delivered to employer desk! 🎯', 'success');
    }, 700);
}
window.submitApplication = submitApplication;

/**
 * Bookmark Opportunity
 */
function toggleBookmarkOpportunity(oppId, btn) {
    const isArabic = document.documentElement.lang === 'ar';
    const bookmarks = JSON.parse(localStorage.getItem('hyt_saved_bookmarks') || '[]');
    const index = bookmarks.indexOf(oppId);

    if (index > -1) {
        bookmarks.splice(index, 1);
        localStorage.setItem('hyt_saved_bookmarks', JSON.stringify(bookmarks));
        if (btn) btn.style.color = '';
        showToast(isArabic ? 'تمت إزالة الفرصة من المحفوظات' : 'Removed from saved bookmarks', 'info');
    } else {
        bookmarks.push(oppId);
        localStorage.setItem('hyt_saved_bookmarks', JSON.stringify(bookmarks));
        if (btn) btn.style.color = 'var(--color-primary)';
        showToast(isArabic ? 'تم حفظ الفرصة في قائمة مفضلاتك 🔖' : 'Opportunity saved to bookmarks 🔖', 'success');
    }
}
window.toggleBookmarkOpportunity = toggleBookmarkOpportunity;
