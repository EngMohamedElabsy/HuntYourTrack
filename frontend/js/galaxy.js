/**
 * HuntYourTrack - Galaxy Background System
 * Fluid, organic particle system with scroll/mouse parallax
 * Pure Black & White · 60fps target · Canvas 2D
 */

(function() {
    'use strict';

    // ========================================
    // CONFIGURATION
    // ========================================
    const CONFIG = {
        particleCount: 180,
        maxConnections: 3,
        connectionDistance: 140,
        mouseAttractionRadius: 200,
        mouseAttractionForce: 0.008,
        scrollParallaxFactor: 0.3,
        particleMinSize: 0.8,
        particleMaxSize: 2.5,
        particleMinSpeed: 0.15,
        particleMaxSpeed: 0.5,
        fadeEdge: 0.15,
        backgroundStars: 60,
        nebulaBlobs: 3,
        animationDuration: 20000,
    };

    // ========================================
    // STATE
    // ========================================
    let canvas = null;
    let ctx = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let backgroundStars = [];
    let nebulaBlobs = [];
    let mouse = { x: -10000, y: -10000, active: false };
    let scrollY = 0;
    let lastTime = 0;
    let animationId = null;
    let reducedMotion = false;

    // ========================================
    // UTILITIES
    // ========================================
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(rand(min, max + 1));

    function getThemeColors() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            particle: isDarkMode ? '#FFFFFF' : '#000000',
            particleDim: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
            connection: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            connectionStrong: isDarkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)',
            star: isDarkMode ? '#FFFFFF' : '#000000',
            nebula: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            nebulaEdge: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        };
    }

    // ========================================
    // PARTICLE CLASS
    // ========================================
    class Particle {
        constructor() {
            this.reset(true);
        }

        reset(init = false) {
            const margin = 100;
            this.x = rand(-margin, width + margin);
            this.y = rand(-margin, height + margin);
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = rand(CONFIG.particleMinSize, CONFIG.particleMaxSize);
            this.speedX = rand(-CONFIG.particleMaxSpeed, CONFIG.particleMaxSpeed);
            this.speedY = rand(-CONFIG.particleMaxSpeed, CONFIG.particleMaxSpeed);
            this.opacity = rand(0.2, 0.8);
            this.targetOpacity = this.opacity;
            this.phase = rand(0, Math.PI * 2);
            this.phaseSpeed = rand(0.0005, 0.002);
            this.connections = [];

            if (init) {
                this.x = rand(0, width);
                this.y = rand(0, height);
            }
        }

        update(deltaTime, colors) {
            this.phase += this.phaseSpeed * deltaTime;
            this.x = this.baseX + Math.sin(this.phase) * 30 + Math.cos(this.phase * 0.7) * 20;
            this.y = this.baseY + Math.cos(this.phase * 0.9) * 25 + Math.sin(this.phase * 1.3) * 15;

            if (mouse.active) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.mouseAttractionRadius && dist > 1) {
                    const force = (1 - dist / CONFIG.mouseAttractionRadius) * CONFIG.mouseAttractionForce;
                    this.baseX += dx * force;
                    this.baseY += dy * force;
                }
            }

            this.y += scrollY * CONFIG.scrollParallaxFactor * 0.01;

            const edge = Math.max(width, height) * CONFIG.fadeEdge;
            if (this.x < -edge) { this.baseX = width + edge; this.x = this.baseX; }
            if (this.x > width + edge) { this.baseX = -edge; this.x = this.baseX; }
            if (this.y < -edge) { this.baseY = height + edge; this.y = this.baseY; }
            if (this.y > height + edge) { this.baseY = -edge; this.y = this.baseY; }

            this.opacity = lerp(this.opacity, this.targetOpacity, 0.02 * deltaTime);
        }

        draw(ctx, colors) {
            const alpha = clamp(this.opacity, 0.05, 0.9);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.particle;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // ========================================
    // BACKGROUND STAR CLASS
    // ========================================
    class BackgroundStar {
        constructor() {
            this.x = rand(0, width);
            this.y = rand(0, height);
            this.size = rand(0.4, 1.5);
            this.opacity = rand(0.1, 0.4);
            this.twinklePhase = rand(0, Math.PI * 2);
            this.twinkleSpeed = rand(0.0002, 0.0008);
        }

        update(deltaTime) {
            this.twinklePhase += this.twinkleSpeed * deltaTime;
            this.y += scrollY * CONFIG.scrollParallaxFactor * 0.005;
        }

        draw(ctx, colors) {
            const alpha = this.opacity + Math.sin(this.twinklePhase) * 0.15;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.star;
            ctx.globalAlpha = clamp(alpha, 0.02, 0.6);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // ========================================
    // NEBULA BLOB CLASS
    // ========================================
    class NebulaBlob {
        constructor(index) {
            this.index = index;
            this.reset();
        }

        reset() {
            this.x = rand(-width * 0.3, width * 1.3);
            this.y = rand(-height * 0.3, height * 1.3);
            this.baseRadius = rand(Math.min(width, height) * 0.25, Math.min(width, height) * 0.5);
            this.radius = this.baseRadius;
            this.phase = rand(0, Math.PI * 2);
            this.phaseSpeed = rand(0.00005, 0.00015);
            this.driftX = rand(-0.02, 0.02);
            this.driftY = rand(-0.02, 0.02);
            this.opacity = rand(0.15, 0.35);
        }

        update(deltaTime, colors) {
            this.phase += this.phaseSpeed * deltaTime;
            this.radius = this.baseRadius * (0.85 + Math.sin(this.phase) * 0.15);
            this.x += this.driftX * deltaTime;
            this.y += this.driftY * deltaTime;
            this.y += scrollY * CONFIG.scrollParallaxFactor * 0.002;

            if (this.x - this.radius > width * 1.5) this.x = -width * 0.5;
            if (this.x + this.radius < -width * 0.5) this.x = width * 1.5;
            if (this.y - this.radius > height * 1.5) this.y = -height * 0.5;
            if (this.y + this.radius < -height * 0.5) this.y = height * 1.5;
        }

        draw(ctx, colors) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, colors.nebulaEdge);
            gradient.addColorStop(0.5, colors.nebula);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        canvas = document.getElementById('galaxy-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        if (!ctx) return;

        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        resize();
        createParticles();
        createBackgroundStars();
        createNebulaBlobs();

        window.addEventListener('resize', debounce(resize, 150));
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('visibilitychange', onVisibilityChange);

        const observer = new MutationObserver(() => {});
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        if (!reducedMotion) {
            lastTime = performance.now();
            animationId = requestAnimationFrame(animate);
        } else {
            drawStatic();
        }
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (particles.length !== CONFIG.particleCount) {
            createParticles();
            createBackgroundStars();
            createNebulaBlobs();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function createBackgroundStars() {
        backgroundStars = [];
        for (let i = 0; i < CONFIG.backgroundStars; i++) {
            backgroundStars.push(new BackgroundStar());
        }
    }

    function createNebulaBlobs() {
        nebulaBlobs = [];
        for (let i = 0; i < CONFIG.nebulaBlobs; i++) {
            nebulaBlobs.push(new NebulaBlob(i));
        }
    }

    // ========================================
    // EVENT HANDLERS
    // ========================================
    function onScroll() {
        scrollY = window.scrollY || window.pageYOffset;
    }

    function onMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    }

    function onMouseLeave() {
        mouse.active = false;
    }

    function onVisibilityChange() {
        if (document.hidden) {
            if (animationId) cancelAnimationFrame(animationId);
            animationId = null;
        } else if (!reducedMotion && !animationId) {
            lastTime = performance.now();
            animationId = requestAnimationFrame(animate);
        }
    }

    // ========================================
    // ANIMATION LOOP
    // ========================================
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        const dt = Math.min(deltaTime, 50);

        update(dt);
        draw();

        animationId = requestAnimationFrame(animate);
    }

    function update(dt) {
        const colors = getThemeColors();
        nebulaBlobs.forEach(blob => blob.update(dt, colors));
        backgroundStars.forEach(star => star.update(dt));
        particles.forEach(p => p.update(dt, colors));
        buildConnections();
    }

    function buildConnections() {
        const maxDistSq = CONFIG.connectionDistance * CONFIG.connectionDistance;

        for (let i = 0; i < particles.length; i++) {
            particles[i].connections = [];

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    const opacity = 1 - dist / CONFIG.connectionDistance;

                    if (particles[i].connections.length < CONFIG.maxConnections) {
                        particles[i].connections.push({ particle: particles[j], dist, opacity });
                    }
                    if (particles[j].connections.length < CONFIG.maxConnections) {
                        particles[j].connections.push({ particle: particles[i], dist, opacity });
                    }
                }
            }
        }
    }

    function draw() {
        const colors = getThemeColors();
        ctx.clearRect(0, 0, width, height);
        nebulaBlobs.forEach(blob => blob.draw(ctx, colors));
        backgroundStars.forEach(star => star.draw(ctx, colors));
        drawConnections(colors);
        particles.forEach(p => p.draw(ctx, colors));
    }

    function drawConnections(colors) {
        ctx.lineWidth = 0.8;
        ctx.lineCap = 'round';

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            for (const conn of p.connections) {
                if (conn.particle.baseX < p.baseX) continue;

                const alpha = conn.opacity * 0.6 * p.opacity * conn.particle.opacity;
                if (alpha < 0.01) continue;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(conn.particle.x, conn.particle.y);

                const gradient = ctx.createLinearGradient(p.x, p.y, conn.particle.x, conn.particle.y);
                gradient.addColorStop(0, colors.connection);
                gradient.addColorStop(0.5, colors.connectionStrong);
                gradient.addColorStop(1, colors.connection);

                ctx.strokeStyle = gradient;
                ctx.globalAlpha = alpha;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }

    function drawStatic() {
        const colors = getThemeColors();
        ctx.clearRect(0, 0, width, height);
        nebulaBlobs.forEach(blob => blob.draw(ctx, colors));
        backgroundStars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.star;
            ctx.globalAlpha = star.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.particle;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    function debounce(fn, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), wait);
        };
    }

    // ========================================
    // PUBLIC API
    // ========================================
    window.Galaxy = {
        init,
        destroy: () => {
            if (animationId) cancelAnimationFrame(animationId);
            window.removeEventListener('resize', debounce);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
        },
        setReducedMotion: (val) => {
            reducedMotion = val;
            if (val && animationId) {
                cancelAnimationFrame(animationId);
                drawStatic();
            } else if (!val && !animationId) {
                lastTime = performance.now();
                animationId = requestAnimationFrame(animate);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();