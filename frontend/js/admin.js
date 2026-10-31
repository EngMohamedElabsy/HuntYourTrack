/**
 * HuntYourTrack - Admin Control Panel Logic (US04 & US05)
 * Pure JavaScript Client-Side State Management & Verification Simulation
 */

// Initial Mock Database
let usersData = [
    { id: 1, name: "Mohamed Yasser Elabsy", email: "elabsy@damanhour.edu.eg", role: "Admin", faculty: "Computers & Information (CS)", status: "Active", joined: "2026-09-01" },
    { id: 2, name: "Hager Khaled", email: "hager@damanhour.edu.eg", role: "Student", faculty: "Computers & Information (CS)", status: "Active", joined: "2026-09-15" },
    { id: 3, name: "Abdulrahman Masoud", email: "abdulrhman@damanhour.edu.eg", role: "Employer", faculty: "TechCorp Labs Partner", status: "Active", joined: "2026-09-20" },
    { id: 4, name: "Ahmed Mostafa", email: "ahmed.m@damanhour.edu.eg", role: "Student", faculty: "Computers & Information (AI)", status: "Active", joined: "2026-10-02" },
    { id: 5, name: "Salma Hassan", email: "salma.h@damanhour.edu.eg", role: "Student", faculty: "Computers & Information (IS)", status: "Suspended", joined: "2026-10-10" },
    { id: 6, name: "NextGen Analytics HR", email: "hr@nextgen-analytics.com", role: "Employer", faculty: "Alexandria Tech Hub", status: "Active", joined: "2026-10-12" },
    { id: 7, name: "DesignCraft Studio", email: "careers@designcraft.io", role: "Employer", faculty: "Remote Creative Agency", status: "Active", joined: "2026-10-18" },
    { id: 8, name: "Youssef Ibrahim", email: "youssef.i@damanhour.edu.eg", role: "Student", faculty: "Computers & Information (CS)", status: "Active", joined: "2026-10-22" }
];

let pendingEmployers = [
    {
        id: "emp-101",
        name: "CloudScale Systems Egypt",
        taxId: "EG-94827104",
        crNumber: "CR-883921",
        domain: "cloudscale.eg",
        contactEmail: "partners@cloudscale.eg",
        industry: "Cloud Infrastructure & DevOps",
        submittedDate: "2026-10-26",
        docs: "Commercial Registration (PDF), Tax Card 2026, National ID of Delegate"
    },
    {
        id: "emp-102",
        name: "DataMind AI Solutions",
        taxId: "EG-33918274",
        crNumber: "CR-774019",
        domain: "datamind.ai",
        contactEmail: "hr@datamind.ai",
        industry: "Generative AI & Data Analytics",
        submittedDate: "2026-10-27",
        docs: "Commercial Register Certificate, Smart Village License"
    },
    {
        id: "emp-103",
        name: "CyberShield Security MEA",
        taxId: "EG-55109283",
        crNumber: "CR-992014",
        domain: "cybershield.org",
        contactEmail: "recruitment@cybershield.org",
        industry: "Information Security & SOC",
        submittedDate: "2026-10-28",
        docs: "Cybersecurity Vendor License, Ministry of Communications Approval"
    }
];

let activeFilter = 'All';
let searchQuery = '';
let currentRejectEmployerId = null;

/**
 * Role Authorization Guard (US14)
 * Restricts access to administrative console for non-admin accounts
 */
function enforceAdminAuthorization() {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const isAdmin = (user === 'admin' || role === 'admin');

    const barrier = document.getElementById('admin-guard-barrier');
    const mainContainer = document.querySelector('.admin-container');

    if (!isAdmin) {
        if (barrier) {
            barrier.style.display = 'flex';
        }
        if (mainContainer) {
            mainContainer.setAttribute('aria-hidden', 'true');
            mainContainer.style.filter = 'blur(6px)';
            mainContainer.style.pointerEvents = 'none';
        }
        return false;
    } else {
        if (barrier) {
            barrier.style.display = 'none';
        }
        if (mainContainer) {
            mainContainer.removeAttribute('aria-hidden');
            mainContainer.style.filter = 'none';
            mainContainer.style.pointerEvents = 'auto';
        }
        const userEmail = localStorage.getItem('user_email');
        const userDisplay = document.getElementById('admin-user-display');
        if (userDisplay && userEmail) {
            userDisplay.textContent = `Mohamed Yasser (${userEmail})`;
        }
        return true;
    }
}
window.enforceAdminAuthorization = enforceAdminAuthorization;

function handleAdminLogout(event) {
    if (event) event.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    window.location.href = 'auth.html';
}
window.handleAdminLogout = handleAdminLogout;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const isAuthorized = enforceAdminAuthorization();
    if (isAuthorized) {
        renderKPIs();
        renderUsersTable();
        renderVerificationQueue();
        setupEventListeners();
    }
});

// Setup Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-users');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderUsersTable();
        });
    }

    // Settings Form
    const settingsForm = document.getElementById('platform-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Platform settings saved and broadcasted successfully!', 'success');
        });
    }
}

// Switch Tabs
function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${tabName}`);
    });
}

// Filter Users by Role
function filterByRole(role) {
    activeFilter = role;
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.role === role);
    });
    renderUsersTable();
}

// Render KPI Cards
function renderKPIs() {
    const studentsCount = usersData.filter(u => u.role === 'Student').length + 1416;
    const employersCount = usersData.filter(u => u.role === 'Employer').length + 80;
    
    document.getElementById('kpi-students').textContent = studentsCount.toLocaleString();
    document.getElementById('kpi-employers').textContent = employersCount.toLocaleString();
    document.getElementById('kpi-queue-count').textContent = pendingEmployers.length;
    document.getElementById('badge-queue-count').textContent = pendingEmployers.length;
}

// Render Users Data Table
function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    if (!tbody) return;

    let filtered = usersData.filter(user => {
        const matchesRole = (activeFilter === 'All') || (user.role === activeFilter);
        const matchesSearch = user.name.toLowerCase().includes(searchQuery) ||
                              user.email.toLowerCase().includes(searchQuery) ||
                              user.faculty.toLowerCase().includes(searchQuery);
        return matchesRole && matchesSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #94A3B8;">No users found matching your search.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(user => {
        const statusClass = user.status.toLowerCase();
        const actionLabel = user.status === 'Active' ? 'Suspend' : 'Activate';
        const actionBtnClass = user.status === 'Active' ? 'btn-reject' : 'btn-approve';

        return `
            <tr>
                <td><strong>#${user.id}</strong></td>
                <td>
                    <div style="font-weight: 600; color: #1E293B;">${user.name}</div>
                    <div style="font-size: 0.8rem; color: #64748B;">${user.email}</div>
                </td>
                <td><span class="role-tag">${user.role}</span></td>
                <td>${user.faculty}</td>
                <td><span class="status-badge ${statusClass}">● ${user.status}</span></td>
                <td>
                    <button class="btn-sm ${actionBtnClass}" onclick="toggleUserStatus(${user.id})">${actionLabel}</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Toggle User Status
function toggleUserStatus(userId) {
    const user = usersData.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${user.name} is now ${user.status}.`, user.status === 'Active' ? 'success' : 'danger');
        renderUsersTable();
    }
}

// Render Verification Queue (US05)
function renderVerificationQueue() {
    const grid = document.getElementById('queue-grid');
    if (!grid) return;

    if (pendingEmployers.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 16px;">
                <h3 style="font-size: 1.1rem; color: #15803D; margin-bottom: 0.5rem;">🎉 All Caught Up!</h3>
                <p style="color: #64748B; font-size: 0.9rem;">There are no pending employer registrations awaiting review.</p>
            </div>
        `;
        renderKPIs();
        return;
    }

    grid.innerHTML = pendingEmployers.map(emp => `
        <div class="queue-card" id="card-${emp.id}">
            <div>
                <div class="queue-header">
                    <div>
                        <div class="queue-title">${emp.name}</div>
                        <div class="queue-industry">${emp.industry}</div>
                    </div>
                    <span class="status-badge pending">● Review</span>
                </div>
                <div class="queue-details">
                    <div><strong>Tax Card:</strong> ${emp.taxId}</div>
                    <div><strong>CR No:</strong> ${emp.crNumber}</div>
                    <div><strong>Official Domain:</strong> <a href="https://${emp.domain}" target="_blank" style="color: #6366F1;">${emp.domain}</a></div>
                    <div><strong>Submitted:</strong> ${emp.submittedDate}</div>
                </div>
                <button class="doc-link-btn" onclick="viewEmployerDocs('${emp.id}')">
                    📄 View Submitted Credentials
                </button>
            </div>
            <div class="queue-actions">
                <button class="btn-sm btn-approve" onclick="approveEmployer('${emp.id}')">✓ Approve Partner</button>
                <button class="btn-sm btn-reject" onclick="openRejectModal('${emp.id}')">✕ Reject</button>
            </div>
        </div>
    `).join('');

    renderKPIs();
}

// View Employer Docs Modal
function viewEmployerDocs(empId) {
    const emp = pendingEmployers.find(e => e.id === empId);
    if (!emp) return;

    document.getElementById('doc-modal-title').textContent = `${emp.name} · Credentials`;
    document.getElementById('doc-modal-body').innerHTML = `
        <div style="font-size: 0.9rem; line-height: 1.6; color: #334155;">
            <p><strong>Official Entity:</strong> ${emp.name}</p>
            <p><strong>Commercial Registration:</strong> ${emp.crNumber}</p>
            <p><strong>Tax Card ID:</strong> ${emp.taxId}</p>
            <p><strong>Corporate Domain:</strong> ${emp.domain} (DNS verified)</p>
            <p><strong>Uploaded Files:</strong> ${emp.docs}</p>
            <div style="background: #F1F5F9; border-radius: 8px; padding: 1rem; margin-top: 1rem; border: 1px dashed #CBD5E1;">
                <span style="color: #16A34A; font-weight: 700;">✓ Automated Pre-check Passed:</span> Corporate domain matches applicant email domain.
            </div>
        </div>
    `;
    document.getElementById('doc-modal').classList.add('active');
}

// Approve Employer
function approveEmployer(empId) {
    const empIndex = pendingEmployers.findIndex(e => e.id === empId);
    if (empIndex === -1) return;

    const emp = pendingEmployers[empIndex];
    pendingEmployers.splice(empIndex, 1);

    // Add to active users
    usersData.push({
        id: usersData.length + 1,
        name: emp.name,
        email: emp.contactEmail,
        role: "Employer",
        faculty: emp.name + " (" + emp.industry + ")",
        status: "Active",
        joined: new Date().toISOString().split('T')[0]
    });

    renderVerificationQueue();
    renderUsersTable();
    showToast(`✓ Company ${emp.name} has been officially accredited as a Partner!`, 'success');
}

// Open Reject Modal
function openRejectModal(empId) {
    currentRejectEmployerId = empId;
    const emp = pendingEmployers.find(e => e.id === empId);
    if (!emp) return;

    document.getElementById('reject-company-name').textContent = emp.name;
    document.getElementById('reject-reason-input').value = '';
    document.getElementById('reject-modal').classList.add('active');
}

// Confirm Reject
function confirmRejectEmployer() {
    const reason = document.getElementById('reject-reason-input').value.trim();
    if (!reason) {
        showToast('Please specify the reason for rejection before confirming.', 'danger');
        return;
    }

    const empIndex = pendingEmployers.findIndex(e => e.id === currentRejectEmployerId);
    if (empIndex !== -1) {
        const emp = pendingEmployers[empIndex];
        pendingEmployers.splice(empIndex, 1);
        closeModal('reject-modal');
        renderVerificationQueue();
        showToast(`Rejected registration for ${emp.name}. Notification sent.`, 'danger');
    }
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Toast Notification
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
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Mobile Drawer Handlers (US15)
function toggleAdminDrawer() {
    const drawer = document.getElementById('admin-mobile-drawer');
    if (drawer) drawer.classList.toggle('open');
}
window.toggleAdminDrawer = toggleAdminDrawer;

function closeAdminDrawer() {
    const drawer = document.getElementById('admin-mobile-drawer');
    if (drawer) drawer.classList.remove('open');
}
window.closeAdminDrawer = closeAdminDrawer;
