const demoModal = document.getElementById('demo-modal');
if (document.getElementById('open-demo-modal') && demoModal) {
    document.getElementById('open-demo-modal').addEventListener('click', () => demoModal.showModal());
}

/**
 * Component Library Toast Notification Demonstration (US16)
 */
function showDemoToast(message, type = 'success') {
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
    }, 3500);
}
window.showDemoToast = showDemoToast;
