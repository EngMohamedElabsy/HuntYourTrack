/**
 * HuntYourTrack — Shared Route Guard (US35)
 * Usage: <script src="../js/api.js"></script>
 *        <script src="../js/guard.js" data-allowed-roles="student"></script>
 * Resolves the session with /auth/me before revealing the page.
 */

(function () {
    'use strict';

    const html = document.documentElement;
    const script = document.currentScript;
    const allowedRoles = (script && script.getAttribute('data-allowed-roles') ? script.getAttribute('data-allowed-roles') : '')
        .split(',')
        .map((role) => role.trim().toLowerCase())
        .filter(Boolean);

    html.classList.add('hyt-auth-pending');
    const pendingStyle = document.createElement('style');
    pendingStyle.id = 'hyt-auth-pending-style';
    pendingStyle.textContent = 'html.hyt-auth-pending body{visibility:hidden !important;}';
    (document.head || html).appendChild(pendingStyle);

    function revealPage() {
        html.classList.remove('hyt-auth-pending');
        const style = document.getElementById('hyt-auth-pending-style');
        if (style) style.remove();
    }

    function redirectToAuth(errorCode) {
        try {
            window.sessionStorage.removeItem('hyt_token');
        } catch (err) {
            // Session storage may be unavailable; redirect still applies.
        }

        let pageName = window.location.pathname.split('/').pop() || 'index.html';
        pageName = pageName.replace(/\.html?$/i, '') || 'index';

        const params = new URLSearchParams();
        params.set('redirect', pageName);
        if (errorCode) params.set('error', errorCode);

        window.location.replace(`auth.html?${params.toString()}`);
    }

    async function enforceGuard() {
        const api = window.HYT_API;
        if (!api || typeof api.me !== 'function' || !api.getToken()) {
            redirectToAuth('login_required');
            return null;
        }

        let user;
        try {
            user = await Promise.race([
                api.me(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const timeoutError = new Error('Session verification timed out.');
                        timeoutError.status = 0;
                        reject(timeoutError);
                    }, 10000);
                })
            ]);
        } catch (err) {
            const status = err && err.status;
            redirectToAuth(status === 401 ? 'session_expired' : 'auth_unavailable');
            return null;
        }

        const role = user && user.role ? String(user.role).toLowerCase() : '';
        if (!user || !allowedRoles.includes(role)) {
            redirectToAuth('unauthorized');
            return null;
        }

        window.HYT_SESSION = user;
        revealPage();
        document.dispatchEvent(new CustomEvent('hyt:session-ready', { detail: user }));
        return user;
    }

    const ready = enforceGuard().catch(() => null);
    window.HYT_AUTH_READY = ready;
    window.HYTGuard = {
        ready,
        getSession: () => window.HYT_SESSION || null
    };
})();
