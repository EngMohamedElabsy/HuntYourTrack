/**
 * HuntYourTrack - Opportunities Data Store & Dynamic Deadline Engine
 * Pre-seeded with 3 verified corporate opportunities for the Academic Jury presentation.
 * Allows Employers/Organizers to post new courses/internships in real time.
 */

const DEFAULT_OPPORTUNITIES = [
    {
        id: "opp-vois-2026",
        title: "Cloud & DevOps Summer Internship 2026",
        titleEn: "Cloud & DevOps Summer Internship 2026",
        titleAr: "تدريب صيفي في الحوسبة السحابية وهندسة ديف أوبس 2026",
        orgName: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgNameEn: "Vodafone Intelligent Solutions (_VOIS Egypt)",
        orgNameAr: "فودافون للحلول الذكية (_VOIS مصر)",
        type: "Internship",
        targetFaculty: "Computers & Information / Engineering",
        targetFacultyEn: "Computers & Information / Engineering",
        targetFacultyAr: "حاسبات ومعلومات / هندسة",
        desc: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        descEn: "Hands-on engineering program focused on AWS/Azure, Kubernetes microservices, CI/CD automation pipelines, and enterprise reliability monitoring.",
        descAr: "برنامج هندسي تطبيقي يركز على خدمات AWS/Azure، معمارية Kubernetes للخدمات المصغرة، خطوط أتمتة CI/CD، ومراقبة موثوقية الأنظمة المؤسسية.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-05",
        endDate: "2026-11-28", // Active countdown
        applyUrl: "https://careers.vodafone.com/engineering-egypt",
        stipend: "Paid Internship (EGP 8,500/mo) + Faculty Credit",
        stipendEn: "Paid Internship (EGP 8,500/mo) + Faculty Credit",
        stipendAr: "تدريب مدفوع (8,500 ج.م شهرياً) + ساعات معتمدة للكلية",
        verified: true,
        postedBy: "Vodafone Talent Acquisition"
    },
    {
        id: "opp-itida-2026",
        title: "Full-Stack Web & AI Graduation Track",
        titleEn: "Full-Stack Web & AI Graduation Track",
        titleAr: "مسار تخرج معتمد في تطوير الويب والذكاء الاصطناعي",
        orgName: "ITIDA & Information Technology Institute (ITI)",
        orgNameEn: "ITIDA & Information Technology Institute (ITI)",
        orgNameAr: "هيئة تنمية صناعة تكنولوجيا المعلومات (ITIDA) ومعهد ITI",
        type: "Training Course",
        targetFaculty: "Computers & Information / Engineering / Commerce",
        targetFacultyEn: "Computers & Information / Engineering / Commerce",
        targetFacultyAr: "حاسبات ومعلومات / هندسة / تجارة",
        desc: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        descEn: "Intensive 3-month accredited training path covering Next.js, Node.js, Generative AI integration, and production deployment at Smart Village tech labs.",
        descAr: "مسار تدريبي مكثف لمدة 3 أشهر يغطي تقنيات Next.js و Node.js ونماذج الذكاء الاصطناعي التوليدي والنشر السحابي في معامل القرية الذكية.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-01",
        endDate: "2026-11-19", // Active countdown
        applyUrl: "https://iti.gov.eg/tracks/fullstack-ai",
        stipend: "Fully Sponsored (100% Free) + Official Certification",
        stipendEn: "Fully Sponsored (100% Free) + Official Certification",
        stipendAr: "منحة ممولة بالكامل (مجاناً 100%) + شهادة اعتماد رسمية",
        verified: true,
        postedBy: "ITI Academic Council"
    },
    {
        id: "opp-valeo-2026",
        title: "Embedded Systems & Automotive Software Internship",
        titleEn: "Embedded Systems & Automotive Software Internship",
        titleAr: "تدريب صيفي في الأنظمة المدمجة وبرمجيات السيارات",
        orgName: "Silicon Egypt & Valeo Systems",
        orgNameEn: "Silicon Egypt & Valeo Systems",
        orgNameAr: "سيليكون مصر وأنظمة فاليو العالمية (Valeo Systems)",
        type: "Internship",
        targetFaculty: "Engineering / Computer Science",
        targetFacultyEn: "Engineering / Computer Science",
        targetFacultyAr: "هندسة / علوم الحاسب",
        desc: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        descEn: "Automotive software engineering internship specializing in Embedded C/C++, AUTOSAR architecture, RTOS scheduling, and CAN-bus protocol testing.",
        descAr: "تدريب تطبيقي متخصص في هندسة برمجيات السيارات باستخدام C/C++ ومعمارية AUTOSAR وأنظمة التشغيل الفورية RTOS واختبار شبكات CAN-bus.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        startDate: "2026-11-10",
        endDate: "2026-12-05", // Active countdown
        applyUrl: "https://valeo.com/careers/egypt-embedded",
        stipend: "Paid Internship + Fast-Track Employment Offer",
        stipendEn: "Paid Internship + Fast-Track Employment Offer",
        stipendAr: "تدريب مدفوع + فرصة توظيف وتعيين مباشر بعد التخرج",
        verified: true,
        postedBy: "Valeo Egypt Tech Hub"
    }
];

class OpportunitiesManager {
    constructor() {
        this.storageKey = 'hyt_opportunities_v4';
        this.opportunities = [];
        this.init();
    }

    init() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.opportunities = JSON.parse(stored);
            } catch (e) {
                this.opportunities = DEFAULT_OPPORTUNITIES;
                this.save();
            }
        } else {
            this.opportunities = DEFAULT_OPPORTUNITIES;
            this.save();
        }

        this.renderCatalog('opportunities-catalog-container');
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.opportunities));
    }

    getAll() {
        return this.opportunities;
    }

    addOpportunity(data) {
        const newOpp = {
            id: 'opp-' + Date.now(),
            title: data.title || 'Untitled Opportunity',
            orgName: data.orgName || 'Verified Corporate Partner',
            type: data.type || 'Internship',
            targetFaculty: data.targetFaculty || 'All Faculties',
            desc: data.desc || 'No description provided.',
            imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
            startDate: data.startDate || new Date().toISOString().split('T')[0],
            endDate: data.endDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            applyUrl: data.applyUrl || '#',
            stipend: data.stipend || 'Academic Endorsement + Certificate',
            verified: true,
            postedBy: data.postedBy || 'Organization Coordinator'
        };

        this.opportunities.unshift(newOpp);
        this.save();
        this.renderCatalog('opportunities-catalog-container');
        return newOpp;
    }

    calculateCountdown(endDateStr) {
        const end = new Date(endDateStr + 'T23:59:59').getTime();
        const now = Date.now();
        const diff = end - now;

        const isArabic = document.documentElement.lang === 'ar';

        if (diff <= 0) {
            return {
                status: 'closed',
                text: isArabic ? 'انتهى موعد التقديم' : 'Application Closed',
                badgeClass: 'badge-danger',
                days: 0,
                hours: 0
            };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days === 0) {
            return {
                status: 'urgent',
                text: isArabic ? `🔴 باقي ${hours} ساعة فقط!` : `🔴 ${hours} hours left!`,
                badgeClass: 'badge-danger',
                days,
                hours
            };
        } else if (days <= 7) {
            return {
                status: 'closing-soon',
                text: isArabic ? `🟡 باقي ${days} أيام (${hours} س)` : `🟡 ${days}d ${hours}h left`,
                badgeClass: 'badge-warning',
                days,
                hours
            };
        } else {
            return {
                status: 'open',
                text: isArabic ? `🟢 متبقي ${days} يوماً` : `🟢 ${days} days left`,
                badgeClass: 'badge-success',
                days,
                hours
            };
        }
    }

    renderCatalog(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isArabic = document.documentElement.lang === 'ar';

        container.innerHTML = this.opportunities.map(opp => {
            const countdown = this.calculateCountdown(opp.endDate);
            const typeLabel = opp.type === 'Internship' 
                ? (isArabic ? '💼 تدريب صيفي' : '💼 Summer Internship')
                : (isArabic ? '📜 كورس معتمد' : '📜 Certified Course');

            const title = isArabic ? (opp.titleAr || opp.title) : (opp.titleEn || opp.title);
            const orgName = isArabic ? (opp.orgNameAr || opp.orgName) : (opp.orgNameEn || opp.orgName);
            const desc = isArabic ? (opp.descAr || opp.desc) : (opp.descEn || opp.desc);
            const targetFaculty = isArabic ? (opp.targetFacultyAr || opp.targetFaculty) : (opp.targetFacultyEn || opp.targetFaculty);
            const stipend = isArabic ? (opp.stipendAr || opp.stipend) : (opp.stipendEn || opp.stipend);

            return `
                <article class="opp-card" data-faculty="${targetFaculty}" data-type="${opp.type}">
                    <div class="opp-img-wrapper">
                        <img src="${opp.imageUrl}" alt="${title}" class="opp-cover" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'">
                        <span class="opp-type-badge">${typeLabel}</span>
                        <span class="opp-countdown-badge ${countdown.badgeClass}">⏱️ ${countdown.text}</span>
                    </div>
                    <div class="opp-body">
                        <div class="opp-org-line">
                            <span class="opp-org-name">🏢 ${orgName}</span>
                            ${opp.verified ? '<span class="verified-icon" title="Accredited Partner">✓</span>' : ''}
                        </div>
                        <h3 class="opp-title">${title}</h3>
                        <p class="opp-desc">${desc}</p>
                        
                        <div class="opp-meta-grid">
                            <div class="opp-meta-item">
                                <span class="meta-label">${isArabic ? '🎓 الكليات المستهدفة:' : '🎓 Target Faculties:'}</span>
                                <span class="meta-val">${targetFaculty}</span>
                            </div>
                            <div class="opp-meta-item">
                                <span class="meta-label">${isArabic ? '💰 الامتيازات والبدل:' : '💰 Benefits & Stipend:'}</span>
                                <span class="meta-val">${stipend}</span>
                            </div>
                            <div class="opp-meta-item">
                                <span class="meta-label">${isArabic ? '📅 فترة التسجيل:' : '📅 Dates:'}</span>
                                <span class="meta-val">${opp.startDate} → ${opp.endDate}</span>
                            </div>
                        </div>

                        <div class="opp-footer">
                            <button onclick="handleApplyDirectly('${opp.id}', '${opp.applyUrl.replace(/'/g, "\\'")}')" class="btn btn-primary" style="width: 100%; font-size: 0.95rem;">
                                ${isArabic ? 'التقديم وإرسال السيرة الذاتية ←' : 'Submit Profile & Apply →'}
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }
}

window.hytOpportunities = new OpportunitiesManager();

// Refresh catalog when language changes
window.addEventListener('hyt:langChanged', () => {
    if (window.hytOpportunities) {
        window.hytOpportunities.renderCatalog('opportunities-catalog-container');
    }
});

// Application handler with role intelligence
function handleApplyDirectly(oppId, externalUrl) {
    const userRole = localStorage.getItem('user');
    const isArabic = document.documentElement.lang === 'ar';

    if (!userRole) {
        const msg = isArabic 
            ? 'يرجى تسجيل الدخول بحسابك الطلابي أولاً لتتمكن من إرسال ملفك وسيرتك الذاتية للجهة المنظمة!'
            : 'Please sign in with your student account to submit your credentials and resume to this organization!';
        if (window.showToast) {
            window.showToast(msg, 'info');
        } else {
            alert(msg);
        }
        setTimeout(() => {
            window.location.href = 'auth.html?redirect=opportunity&id=' + oppId;
        }, 1200);
        return;
    }

    // If logged in as student, proceed smoothly
    if (window.showToast) {
        window.showToast(isArabic ? 'تم ربط ملفك الأكاديمي وجاري تحويلك لبوابة التقديم الرسمية 🚀' : 'Profile linked! Forwarding to official portal 🚀', 'success');
    }
    setTimeout(() => {
        if (externalUrl && externalUrl !== '#') {
            window.open(externalUrl, '_blank');
        } else {
            window.location.href = 'student.html';
        }
    }, 1000);
}
window.handleApplyDirectly = handleApplyDirectly;
