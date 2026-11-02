# HuntYourTrack — Project Concept, Vision & Technical Stack 🎯

> **Academic Course:** Software Engineering · Graduation Project Evaluation 2026  
> **Institution:** Faculty of Computers and Information, Damanhour University (Computer Science Department)  
> **Course Supervisor:** Teaching Assistant Eng. Menna  
> **Project Lead & Software Architect:** Mohamed Yasser Elabsy ([@EngMohamedElabsy](https://github.com/EngMohamedElabsy))  
> **Team Members:** Hager Khaled ([@hager678](https://github.com/hager678)), Abdulrahman Masoud ([@abdulrhman-masoud](https://github.com/abdulrhman-masoud))  
> **Canonical Live Platform:** [https://engmohamedelabsy.github.io/HuntYourTrack/](https://engmohamedelabsy.github.io/HuntYourTrack/)  
> **Sprint Project Board:** [HuntYourTrack - Graduation Sprint 1 & 2 (Project #5)](https://github.com/users/EngMohamedElabsy/projects/5)  
> **Figma UI/UX Design File:** [HuntYourTrack Figma Wireframes & Mockups](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)  
> **FigJam Architecture & Diagrams:** [HuntYourTrack FigJam System Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)

---

## 1. فكرة المشروع باختصار في نقاط (Core Project Concept in Bullet Points)

- **منصة توجيه مهني ذكية (AI-Assisted Career Navigator):** منصة رقمية متكاملة تهدف إلى إرشاد طلاب وخريجي الجامعات لبناء مساراتهم المهنية خطوة بخطوة، والإجابة عن السؤال المحوري لأي طالب: *"أنا خلصت كورس أو مهارة معينة.. أعمل إيه بعد كده؟"* ("Hunt Your Track").
- **تغطية شاملة لمتعدد الكليات (Universal Multi-Faculty Coverage):** لا تقتصر على مجال الحاسبات فقط، بل تمتد لتغطي 5 تخصصات أكاديمية رئيسية (الحاسبات والذكاء الاصطناعي، الهندسة، العلوم، التجارة وإدارة الأعمال، والحقوق).
- **مجمع ذكي لفرص التدريب الصيفي والكورسات المعتمدة (Corporate Opportunity Aggregator):** جمع وتنظيم الشراكات مع كبرى الشركات والمؤسسات المعتمدة (مثل ITI, Vodafone, Valeo, ITIDA) وتقديم تفاصيل التقديم، مواعيد الإغلاق، وحساب تنازلي فوري للمواعيد النهائية.
- **محرك مواءمة السير الذاتية بالكلمات المفتاحية (ATS Resume Parsing Simulation):** قراءة وفحص ملفات السير الذاتية (Word, PDF, Excel)، واستخراج الكلمات المفتاحية لمطابقتها مع متطلبات سوق العمل ونسبة التوافق (ATS Match %).
- **فصل الأدوار والصلاحيات (Role-Based Workspaces):** تجربة استخدام مخصصة ومحمية لكل فئة: بوابة الطالب (Student Hub)، لوحة المنظم والشركات (Employer Workspace)، ولوحة التحكم والاعتماد الأكاديمي (Admin Console).
- **أداء خفيف وبدون اعتماديات معقدة (Lightweight Zero-Runtime Frontend):** واجهة ويب أحادية النشر (Single-Portal Architecture) تعمل بالكامل في المتصفح، بتصميم متجاوب 100% وداعم للغتين (عربي/إنجليزي) والوضع الليلي/النهاري.

---

## 2. المشكلة التي يعالجها المشروع (The Problem Statement)

1. **تشتت الطلاب وغياب خارطة طريق واضحة (Career Roadblock & Disorientation):** يعاني غالبية طلاب الجامعات المصرية من فجوة كبيرة بين المقررات الأكاديمية النظرية ومتطلبات سوق العمل، مما يؤدي إلى الحيرة في اختيار التخصص وتحديد الخطوة التالية.
2. **صعوبة متابعة مواعيد التدريب الصيفي (Scattered Opportunities & Missed Deadlines):** إعلانات التدريب والمنح الصيفية تكون مبعثرة على منصات التواصل الاجتماعي ومواقع التوظيف، مما يفوت على الطلاب المواعيد النهائية للتقديم (Application Deadlines).
3. **ضعف جودة السير الذاتية وغياب الفرز الآلي للشركات (Manual Review Overhead & ATS Rejection):** تفتقر الشركات ومسؤولو التوظيف إلى أدوات فرز ذكية تربط مهارات المتقدمين بمتطلبات الفرصة، مما يسبب عبئاً إدارياً كبيراً ويحرم الطلاب المتميزين من الوصول للفرصة المناسبة.
4. **عزلة الكليات غير التكنولوجية (Neglected Non-Tech Disciplines):** معظم منصات التطوير تركز فقط على البرمجة، مع إهمال تخصصات الهندسة الحيوية، العلوم، التحكيم التجاري والقانوني، والمحاسبة والتحليل المالي.

---

## 3. الحل المقترح والقيمة المضافة (The Proposed Solution & Value Proposition)

يقدم مشروع **HuntYourTrack** حلاً معمارياً وبرمجياً شاملاً يعالج هذه التحديات عبر:

1. **رادار اصطياد المسار (Track Hunter Interactive Radar):**
   - رسم خرائط تفاعلية تعتمد على HTML5 Canvas و Web Graphics لعرض المهارات كأبراج نجمية ومسارات متسلسلة توضح المراحل الأساسية والمتقدمة لكل تخصص.
2. **مركز الطالب المخصص (Personalized Student Hub):**
   - مخصص أكاديمي يتيح للطالب اختيار كليته وقسمه، مع لوحة متابعة للإنجازات، ومنطقة سحب وإفلات للسيرة الذاتية (Resume Dropzone)، وتوصيات شخصية فورية.
3. **محرك الفترات الزمنية والعد التنازلي للفرص (Dynamic Deadline Countdown Engine):**
   - تصنيف تلقائي لفرص التدريب إلى 3 حالات (`🔥 Active Opportunities`, `⏳ Closing Soon`, `📁 Past Archive`) مع عد تنازلي حي للأيام والساعات لمنع تفويت أي فرصة.
4. **مصفوفة فحص المتقدمين ومطابقة الـ ATS للشركات (Applicant Review Matrix):**
   - لوحة تحكم لأصحاب الأعمال والشركات تمكنهم من نشر التدريبات، واستقبال طلبات التقديم، ومعاينة نسبة التطابق، وفرز المرشحين (Accept, Shortlist, Reject).
5. **نظام اعتماد أكاديمي وحوكمة (Academic Verification & Governance):**
   - لوحة تحكم للإدارة الجامعية لمراجعة الشركات المتقدمة، واعتماد هويتها الرسمية، وضمان مصداقية الفرص التدريبية المنشورة.

---

## 4. الجمهور المستهدف والشخصيات (Target Audience & Personas)

| الفئة المستهدفة | الوصف والدور في المنظومة | الاحتياج الأساسي |
| :--- | :--- | :--- |
| 🎓 **طلاب الجامعات والخريجون الجدد (Students & Fresh Grads)** | طلاب الكليات الـ 5 (حاسبات، هندسة، علوم، تجارة، حقوق) من الفرق المختلفة. | معرفة خارطة الطريق المهنية، رفع السيرة الذاتية وفحصها، والتقديم السريع على تدريب صيفي معتمد. |
| 🏢 **الشركات وجهات التدريب (Corporate Partners & Employers)** | مسؤولو التوظيف (HR) والشركات التقنية والمؤسسات الوطنية (مثل ITI, Telecom, Engineering Labs). | نشر فرص التدريب، استهداف طلاب كليات محددة، وفرز المتقدمين آلياً عبر مطابقة الكلمات المفتاحية. |
| 🛡️ **إدارة الكلية والجامعة (Academic Administration)** | عمداء الكليات، وكلاء شؤون التعليم والطلاب، وأعضاء هيئة التدريس ولجان التحكيم. | متابعة توظيف وتدريب الطلاب، اعتماد الشركات الخارجية، ومراقبة جودة البرامج التدريبية المعتمدة. |

---

## 5. قائمة الأدوات والتقنيات المستخدمة في التنفيذ (Comprehensive Tech Stack)

تم اختيار حزمة التقنيات بدقة لتحقيق معمارية خفيفة، سريعة الاستجابة، خالية من التعقيدات، ومتوافقة 100% مع معايير الويب القياسية:

### 🎨 أ. التصميم وتجربة المستخدم (UI & UX Design Tools)
- **Figma (Dev Mode & Design Systems):** تصميم الواجهات التفاعلية، الـ Wireframes والـ High-Fidelity Mockups، وإدارة الألوان والخطوط.
  - الرابط المباشر: [Figma Design File](https://www.figma.com/design/1IRQUalpMLnDSrWdByB0uW)
- **FigJam (Collaborative Whiteboarding & UML):** رسم المخططات الهندسية (State Machine, Flowchart, Lifecycle).
  - الرابط المباشر: [FigJam Diagrams Board](https://www.figma.com/board/LZD5TcXR4hOkupzCyXfzoq)
- **PlantUML & Mermaid.js:** بناء مخططات هندسة البرمجيات (Class Diagram, Use Case, ERD, Sequence) ككود موثق قابل للتحكم في الإصدارات (Diagrams as Code).

### 💻 ب. بنية وتطوير الواجهة الأمامية (Frontend Core Stack)
- **Semantic HTML5:** هيكلية دلالية معيارية تفصل بين الصفحات (`frontend/index.html` و `frontend/pages/*.html`) لضمان سهولة الوصول (Accessibility) وتوافق محركات البحث.
- **CSS3 Design Tokens & CSS Variables:** نظام تصميم متقدم (`frontend/css/style.css`) يدعم الألوان، التباعد، والتحويل الفوري بين الوضع الليلي (Dark Mode) والنهاري (Light Mode).
- **Modular ES6+ JavaScript:** برمجة خالية من أطر العمل الثقيلة، مقسمة إلى وحدات برمجية موديلار (`auth.js`, `admin.js`, `opportunities.js`, `i18n.js`).
- **HTML5 Canvas API:** رسم رادار اصطياد المسار (Track Hunter Radar) بمعدل تحديث سلس (60fps) وتفاعل كامل مع مؤشر الفأرة واللمس.
- **Client-Side Storage Engine (`localStorage`):** محاكاة حفظ جلسات المستخدمين (RBAC Authentication)، ومطابقة الـ ATS، ونشر وتعديل الفرص بدون خادم خارجي معقد.
- **Bilingual Engine (`i18n.js`):** محرك لغات فوري يدعم التبديل السلس بين العربية (RTL) والإنجليزية (LTR) بنسبة تغطية 100%.

### ⚙️ ج. إدارة الجودة وضمان الاعتمادية (Testing & Quality Assurance)
- **Playwright Test Automation Suite:** حزمة فحص متطورة لمحاكاة تصفح المستخدم واختبار كافة المسارات (E2E Browser Audit).
- **Smoke Testing Engine (`tests/frontend-smoke-test.js`):** فحص فوري لحماية المسارات (Route Guarding)، وعزل صلاحيات الأدوار، واستجابة النماذج.
- **Rigorous E2E Audit (`tests/rigorous-e2e-audit.js`):** تدقيق معماري متقدم عبر 5 محاور: التوافق اللغوي، منع تسريب الأدوار، جودة الرادار، أمان الـ Route Guards، وتجاوب الشاشات على أحجام (375px موبايل و 1440px ديسكتوب).

### 🚀 د. خطوط الأتمتة والنشر وهندسة البرمجيات (DevOps & CI/CD Pipeline)
- **GitHub Actions (5-Stage DAG Workflow):** خط أنابيب آلي متكامل في `.github/workflows/ci.yml`:
  1. *Architecture & Asset Standards:* فحص وجود وتكامل شجرة الملفات والأصول.
  2. *Security & Access Audit:* فحص حماية الصفحات وعزل أدوات الإدارة.
  3. *Playwright Browser Suite:* تشغيل حزمة الاختبارات على متصفح Chromium Headless.
  4. *Team Velocity & Deadline Monitor:* مراقبة مواعيد تسليم المهام وبناء جدول الأداء.
  5. *Executive Quality Gate:* إصدار بطاقة الاعتماد وإعطاء الإشارة الخضراء للدمج.
- **GitHub Projects (V2 Kanban Board):** متابعة المهام وتوزيع الـ User Stories حسب نموذج Agile/Scrum.
- **GitHub Pages:** النشر السحابي التلقائي للمنصة المباشرة.

---

*تم إعداد هذا الملف خصيصاً للتقييم الأكاديمي الشامل وفق توجيهات قسم هندسة البرمجيات بكلية الحاسبات والذكاء الاصطناعي — جامعة دمنهور.*
