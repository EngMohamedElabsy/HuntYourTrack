/**
 * HuntYourTrack - Realistic Starfield Galaxy Background
 * Multi-layer parallax starfield · Pure Black & White · 60fps target · Canvas 2D
 */

(function() {
    'use strict';

    // ========================================
    // CONFIGURATION
    // ========================================
    const CONFIG = {
        // Star layers (back to front for parallax)
        layers: [
            { count: 200, minSize: 0.3, maxSize: 0.8, minOpacity: 0.1, maxOpacity: 0.4, speed: 0.02, twinkleSpeed: 0.0001, parallax: 0.05 },  // Far background
            { count: 150, minSize: 0.5, maxSize: 1.2, minOpacity: 0.2, maxOpacity: 0.6, speed: 0.04, twinkleSpeed: 0.0003, parallax: 0.15 },  // Mid ground
            { count: 80,  minSize: 0.8, maxSize: 2.0, minOpacity: 0.3, maxOpacity: 0.8, speed: 0.08, twinkleSpeed: 0.0005, parallax: 0.30 },  // Foreground
        ],
        // Shooting stars
        shootingStars: {
            maxCount: 3,
            minInterval: 8000,
            maxInterval: 20000,
            minLength: 100,
            maxLength: 300,
            minSpeed: 8,
            maxSpeed: 15,
        },
        // Mouse parallax
        mouseParallaxFactor: 0.15,
        // Scroll parallax
        scrollParallaxFactor: 0.3,
        // Reduced motion
        respectReducedMotion: true,
    };

    // ========================================
    // STATE
    // ========================================
    let canvas = null;
    let ctx = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let layers = [];
    let shootingStars = [];
    let mouse = { x: width / 2, y: height / 2, active: false };
    let scrollY = 0;
    let lastTime = 0;
    let animationId = null;
    let reducedMotion = false;
    let nextShootingStarTime = 0;

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
            star: isDarkMode ? '#FFFFFF' : '#000000',
            shootingStar: isDarkMode ? '#FFFFFF' : '#000000',
        };
    }

    // ========================================
    // STAR CLASS
    // ========================================
    class Star {
        constructor(layerConfig, layerIndex) {
            this.layerIndex = layerIndex;
            this.layerConfig = layerConfig;
            this.reset();
        }

        reset() {
            this.x = rand(-width * 0.2, width * 1.2);
            this.y = rand(-height * 0.2, height * 1.2);
            this.size = rand(this.layerConfig.minSize, this.layerConfig.maxSize);
            this.baseOpacity = rand(this.layerConfig.minOpacity, this.layerConfig.maxOpacity);
            this.opacity = this.baseOpacity;
            this.twinklePhase = rand(0, Math.PI * 2);
            this.twinkleSpeed = this.layerConfig.twinkleSpeed * rand(0.5, 1.5);
            // Some stars have more dramatic twinkling
            this.twinkleAmount = rand(0.1, 0.4);
        }

        update(deltaTime, colors, mouseParallaxX, mouseParallaxY, scrollParallaxY) {
            this.twinklePhase += this.twinkleSpeed * deltaTime;
            this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * this.twinkleAmount * this.baseOpacity;
            this.opacity = clamp(this.opacity, this.layerConfig.minOpacity * 0.3, this.layerConfig.maxOpacity);

            // Parallax movement
            this.x += mouseParallaxX * this.layerConfig.parallax;
            this.y += mouseParallaxY * this.layerConfig.parallax;
            this.y += scrollParallaxY * this.layerConfig.parallax;

            // Wrap around
            const margin = Math.max(width, height) * 0.2;
            if (this.x < -margin) this.x = width + margin;
            if (this.x > width + margin) this.x = -margin;
            if (this.y < -margin) this.y = height + margin;
            if (this.y > height + margin) this.y = -margin;
        }

        draw(ctx, colors) {
            const alpha = clamp(this.opacity, 0.02, 1.0);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.star;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // ========================================
    // SHOOTING STAR CLASS
    // ========================================
    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            // Start from random edge
            const edge = randInt(0, 3);
            const margin = 100;
            switch (edge) {
                case 0: // Top
                    this.x = rand(-margin, width + margin);
                    this.y = -margin;
                    break;
                case 1: // Right
                    this.x = width + margin;
                    this.y = rand(-margin, height + margin);
                    break;
                case 2: // Bottom
                    this.x = rand(-margin, width + margin);
                    this.y = height + margin;
                    break;
                case 3: // Left
                    this.x = -margin;
                    this.y = rand(-margin, height + margin);
                    break;
            }

            // Direction towards center with some variance
            const centerX = width / 2 + rand(-width * 0.3, width * 0.3);
            const centerY = height / 2 + rand(-height * 0.3, height * 0.3);
            const dx = centerX - this.x;
            const dy = centerY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            this.speed = rand(CONFIG.shootingStars.minSpeed, CONFIG.shootingStars.maxSpeed);
            this.vx = (dx / dist) * this.speed;
            this.vy = (dy / dist) * this.speed;

            this.length = rand(CONFIG.shootingStars.minLength, CONFIG.shootingStars.maxLength);
            this.opacity = 1.0;
            this.life = 0;
            this.maxLife = dist / this.speed;
        }

        update(deltaTime, colors) {
            this.x += this.vx * (deltaTime / 16.67); // Normalize to 60fps
            this.y += this.vy * (deltaTime / 16.67);
            this.life += deltaTime;
            this.opacity = 1.0 - (this.life / this.maxLife);
        }

        draw(ctx, colors) {
            if (this.opacity <= 0) return;

            const alpha = clamp(this.opacity, 0, 1);
            const endX = this.x - this.vx * (this.length / this.speed);
            const endY = this.y - this.vy * (this.length / this.speed);

            const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
            gradient.addColorStop(0, colors.shootingStar);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Head glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = colors.shootingStar;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        isDead() {
            return this.opacity <= 0 || this.life >= this.maxLife;
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
        createStars();
        nextShootingStarTime = performance.now() + rand(CONFIG.shootingStars.minInterval, CONFIG.shootingStars.maxInterval);

        window.addEventListener('resize', debounce(resize, 150));
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('visibilitychange', onVisibilityChange);

        // Theme change observer
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

        // Recreate stars on resize
        createStars();
    }

    function createStars() {
        layers = [];
        for (let i = 0; i < CONFIG.layers.length; i++) {
            const layerConfig = CONFIG.layers[i];
            const layerStars = [];
            for (let j = 0; j < layerConfig.count; j++) {
                layerStars.push(new Star(layerConfig, i));
            }
            layers.push(layerStars);
        }
        shootingStars = [];
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

        // Calculate parallax offsets
        const centerX = width / 2;
        const centerY = height / 2;
        const mouseParallaxX = mouse.active ? (mouse.x - centerX) * CONFIG.mouseParallaxFactor : 0;
        const mouseParallaxY = mouse.active ? (mouse.y - centerY) * CONFIG.mouseParallaxFactor : 0;
        const scrollParallaxY = scrollY * CONFIG.scrollParallaxFactor * 0.01;

        // Update star layers
        for (const layerStars of layers) {
            for (const star of layerStars) {
                star.update(dt, colors, mouseParallaxX, mouseParallaxY, scrollParallaxY);
            }
        }

        // Update shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            shootingStars[i].update(dt, colors);
            if (shootingStars[i].isDead()) {
                shootingStars.splice(i, 1);
            }
        }

        // Spawn new shooting stars
        if (!reducedMotion && currentTime >= nextShootingStarTime && shootingStars.length < CONFIG.shootingStars.maxCount) {
            shootingStars.push(new ShootingStar());
            nextShootingStarTime = currentTime + rand(CONFIG.shootingStars.minInterval, CONFIG.shootingStars.maxInterval);
        }
    }

    function draw() {
        const colors = getThemeColors();
        ctx.clearRect(0, 0, width, height);

        // Draw layers back to front
        for (const layerStars of layers) {
            for (const star of layerStars) {
                star.draw(ctx, colors);
            }
        }

        // Draw shooting stars on top
        for (const shootingStar of shootingStars) {
            shootingStar.draw(ctx, colors);
        }
    }

    function drawStatic() {
        const colors = getThemeColors();
        ctx.clearRect(0, 0, width, height);

        for (const layerStars of layers) {
            for (const star of layerStars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = colors.star;
                ctx.globalAlpha = star.baseOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
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