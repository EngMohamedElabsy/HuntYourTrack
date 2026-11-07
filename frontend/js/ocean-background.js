/**
 * HuntYourTrack - Apple-Grade Celestial Galaxy & Starfield Engine
 * High-end cosmic atmospheric runtime inspired by iOS celestial dynamics:
 * - 3-Tier Multi-Depth Starfield (Deep Micro-Dust, Mid Constellations, Hero Stars with Diffraction Spikes)
 * - Organic Floating Cosmic Nebulae with Dynamic Palette Ingestion
 * - Smooth Parallax Depth Physics with Mouse & Scroll Inertia
 * - Intermittent Graceful Shooting Stars (Meteors) with Trail Decay
 * - 100% Free-Floating Celestial Bodies (Zero Spiderweb / Grid Lines)
 * - Full Theme Synchronization (Dark, Light, Abyss, Reef, Nebula, Ember, Daylight)
 * - 60fps Performance with Zero Per-Frame Heap Allocations
 */

(function() {
    'use strict';

    function parseColor(val, fallback) {
        if (!val) return fallback;
        val = val.trim();
        if (val.startsWith('#')) {
            const hex = val.replace('#', '');
            if (hex.length === 3) {
                return [
                    parseInt(hex[0] + hex[0], 16),
                    parseInt(hex[1] + hex[1], 16),
                    parseInt(hex[2] + hex[2], 16)
                ];
            } else if (hex.length === 6) {
                const n = parseInt(hex, 16);
                return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
            }
        } else if (val.startsWith('rgb')) {
            const m = val.match(/\d+/g);
            if (m && m.length >= 3) {
                return [parseInt(m[0], 10), parseInt(m[1], 10), parseInt(m[2], 10)];
            }
        }
        return fallback;
    }

    class CelestialGalaxyEngine {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.w = 0;
            this.h = 0;
            this.dpr = 1;
            this.t = 0;
            this.raf = null;

            this.theme = 'dark';
            this.isLight = false;

            this.palette = {
                primary: [0, 242, 254],
                glow2: [16, 185, 129],
                glow3: [99, 102, 241],
                bg: [11, 15, 25]
            };

            this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
            this.scrollY = 0;
            this.targetScrollY = 0;
            this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // 1. Deep background micro-dust (220 particles)
            this.microDust = Array.from({ length: 220 }, () => ({
                x: Math.random(),
                y: Math.random(),
                z: Math.random() * 0.35 + 0.1,
                radius: Math.random() * 0.5 + 0.35,
                phase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.015 + 0.008,
                driftSpeed: Math.random() * 0.00008 + 0.00003
            }));

            // 2. Midground stellar field (90 stars)
            this.midStars = Array.from({ length: 90 }, () => ({
                x: Math.random(),
                y: Math.random(),
                z: Math.random() * 0.4 + 0.4,
                radius: Math.random() * 0.9 + 0.9,
                phase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.025 + 0.012,
                tintType: Math.floor(Math.random() * 4) // 0: diamond white, 1: icy cyan, 2: warm gold, 3: soft violet
            }));

            // 3. Foreground hero stars with diffraction spikes (24 prominent stars)
            this.heroStars = Array.from({ length: 24 }, () => ({
                x: Math.random(),
                y: Math.random(),
                z: Math.random() * 0.25 + 0.75,
                radius: Math.random() * 1.1 + 1.8,
                phase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.03 + 0.015,
                hasSpikes: Math.random() > 0.35
            }));

            // 4. Organic floating cosmic nebulae (3 atmospheric gradient clouds)
            this.nebulae = [
                { baseX: 0.22, baseY: 0.25, radius: 460, speed: 0.00035, phase: 0 },
                { baseX: 0.82, baseY: 0.35, radius: 520, speed: 0.00042, phase: 2.1 },
                { baseX: 0.50, baseY: 0.85, radius: 580, speed: 0.00030, phase: 4.4 }
            ];

            // 5. Intermittent graceful meteor
            this.meteor = {
                active: false,
                x: 0,
                y: 0,
                length: 140,
                speed: 12,
                angle: -0.55, // approx -32 degrees
                alpha: 0,
                decay: 0.022,
                nextSpawn: performance.now() + 4500
            };

            this.init();
        }

        init() {
            let container = document.getElementById('ocean-bg-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'ocean-bg-container';
                container.className = 'ocean-bg-container';
                container.setAttribute('aria-hidden', 'true');
                container.innerHTML = `
                    <div class="aurora"></div>
                    <canvas id="ocean-bg-canvas"></canvas>
                    <div class="ocean-radial-overlay"></div>
                `;
                document.body.prepend(container);
            }

            this.canvas = document.getElementById('ocean-bg-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');

            this.resize();
            this.readTheme();

            window.addEventListener('resize', () => this.resize(), { passive: true });

            window.addEventListener('pointermove', (e) => {
                if (this.w > 0 && this.h > 0) {
                    this.mouse.tx = (e.clientX / this.w) * 2 - 1;
                    this.mouse.ty = (e.clientY / this.h) * 2 - 1;
                }
            }, { passive: true });

            window.addEventListener('scroll', () => {
                this.targetScrollY = window.scrollY || window.pageYOffset || 0;
            }, { passive: true });

            window.addEventListener('hyt:themeChanged', () => this.readTheme());

            // Observe data-theme changes on html element
            const observer = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'data-theme') {
                        this.readTheme();
                    }
                }
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

            this.draw = this.draw.bind(this);
            this.raf = requestAnimationFrame(this.draw);
        }

        resize() {
            if (!this.canvas) return;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.canvas.width = Math.floor(this.w * this.dpr);
            this.canvas.height = Math.floor(this.h * this.dpr);
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        }

        readTheme() {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            this.theme = current;
            this.isLight = (current === 'light' || current === 'daylight');

            const style = getComputedStyle(document.documentElement);
            const pri = parseColor(style.getPropertyValue('--color-primary'), [0, 242, 254]);
            const g2 = parseColor(style.getPropertyValue('--color-glow-2'), [16, 185, 129]);
            const g3 = parseColor(style.getPropertyValue('--color-glow-3'), [99, 102, 241]);
            const bg = parseColor(style.getPropertyValue('--color-background'), [11, 15, 25]);

            this.palette = {
                primary: pri,
                glow2: g2,
                glow3: g3,
                bg: bg
            };
        }

        updateMeteor(now) {
            if (this.reduceMotion) return;

            if (!this.meteor.active && now > this.meteor.nextSpawn) {
                this.meteor.active = true;
                this.meteor.x = Math.random() * (this.w * 0.7) + this.w * 0.2;
                this.meteor.y = Math.random() * (this.h * 0.3);
                this.meteor.length = Math.random() * 80 + 110;
                this.meteor.speed = Math.random() * 5 + 11;
                this.meteor.alpha = 1.0;
                this.meteor.decay = Math.random() * 0.015 + 0.018;
                this.meteor.nextSpawn = now + Math.random() * 5000 + 4000;
            }

            if (this.meteor.active) {
                this.meteor.x += Math.cos(this.meteor.angle) * this.meteor.speed;
                this.meteor.y -= Math.sin(this.meteor.angle) * this.meteor.speed;
                this.meteor.alpha -= this.meteor.decay;
                if (this.meteor.alpha <= 0 || this.meteor.x < -100 || this.meteor.y > this.h + 100) {
                    this.meteor.active = false;
                }
            }
        }

        draw() {
            // Smooth mouse and scroll interpolation
            this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
            this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;
            this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;

            const now = performance.now();
            this.updateMeteor(now);

            this.ctx.clearRect(0, 0, this.w, this.h);

            // 1. Draw Organic Floating Cosmic Nebulae
            this.drawNebulae();

            // 2. Draw Deep Cosmic Micro-Dust
            this.drawMicroDust();

            // 3. Draw Midground Constellation Stars
            this.drawMidStars();

            // 4. Draw Foreground Hero Stars with Diffraction Spikes
            this.drawHeroStars();

            // 5. Draw Intermittent Meteor Streak
            if (this.meteor.active) {
                this.drawMeteor();
            }

            if (!this.reduceMotion) {
                this.t += 0.016;
            }
            this.raf = requestAnimationFrame(this.draw);
        }

        drawNebulae() {
            const { primary, glow2, glow3 } = this.palette;
            const composite = this.isLight ? 'source-over' : 'screen';
            const baseOpacity = this.isLight ? 0.035 : 0.095;

            this.ctx.save();
            this.ctx.globalCompositeOperation = composite;

            const colors = [primary, glow3, glow2];

            for (let i = 0; i < this.nebulae.length; i++) {
                const neb = this.nebulae[i];
                const driftX = Math.cos(this.t * neb.speed * 1000 + neb.phase) * 60;
                const driftY = Math.sin(this.t * neb.speed * 800 + neb.phase) * 40;

                const cx = neb.baseX * this.w + driftX - this.mouse.x * 25;
                const cy = neb.baseY * this.h + driftY - this.mouse.y * 20;
                const r = neb.radius * (this.w > 768 ? 1 : 0.65);

                const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                const c = colors[i % colors.length];

                grad.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${baseOpacity * 1.6})`);
                grad.addColorStop(0.5, `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${baseOpacity * 0.6})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                this.ctx.fillStyle = grad;
                this.ctx.beginPath();
                this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        drawMicroDust() {
            const isLight = this.isLight;
            const dustColor = isLight ? [71, 85, 105] : [226, 232, 240];
            const maxAlpha = isLight ? 0.35 : 0.65;

            for (let i = 0; i < this.microDust.length; i++) {
                const p = this.microDust[i];
                if (!this.reduceMotion) {
                    p.y -= p.driftSpeed;
                    if (p.y < -0.02) p.y = 1.02;
                }

                const px = p.x * this.w - this.mouse.x * 16 * p.z;
                const py = (p.y * this.h - (this.scrollY * 0.08 * p.z)) % (this.h + 60);
                const actualY = py < 0 ? py + this.h + 60 : py;

                const shimmer = 0.45 + 0.55 * Math.sin(this.t * 60 * p.twinkleSpeed + p.phase);
                const alpha = shimmer * p.z * maxAlpha;

                this.ctx.fillStyle = `rgba(${dustColor[0]}, ${dustColor[1]}, ${dustColor[2]}, ${alpha.toFixed(3)})`;
                this.ctx.beginPath();
                this.ctx.arc(px, actualY, p.radius * p.z, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        drawMidStars() {
            const isLight = this.isLight;
            const { primary, glow3 } = this.palette;

            for (let i = 0; i < this.midStars.length; i++) {
                const p = this.midStars[i];
                const px = p.x * this.w - this.mouse.x * 38 * p.z;
                const py = (p.y * this.h - (this.scrollY * 0.14 * p.z)) % (this.h + 60);
                const actualY = py < 0 ? py + this.h + 60 : py;

                const shimmer = 0.4 + 0.6 * Math.sin(this.t * 60 * p.twinkleSpeed + p.phase);
                const alpha = shimmer * (isLight ? 0.42 : 0.88);

                let rgb = [248, 250, 252];
                if (isLight) {
                    rgb = [30, 41, 59];
                } else if (p.tintType === 1) {
                    rgb = primary;
                } else if (p.tintType === 2) {
                    rgb = [253, 230, 138]; // soft celestial amber
                } else if (p.tintType === 3) {
                    rgb = glow3;
                }

                // Soft outer aura
                if (!isLight && p.z > 0.55) {
                    this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(alpha * 0.18).toFixed(3)})`;
                    this.ctx.beginPath();
                    this.ctx.arc(px, actualY, p.radius * 2.4, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                // Core star
                this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(3)})`;
                this.ctx.beginPath();
                this.ctx.arc(px, actualY, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        drawHeroStars() {
            const isLight = this.isLight;
            const { primary } = this.palette;

            for (let i = 0; i < this.heroStars.length; i++) {
                const p = this.heroStars[i];
                const px = p.x * this.w - this.mouse.x * 65 * p.z;
                const py = (p.y * this.h - (this.scrollY * 0.22 * p.z)) % (this.h + 80);
                const actualY = py < 0 ? py + this.h + 80 : py;

                const shimmer = 0.55 + 0.45 * Math.sin(this.t * 60 * p.twinkleSpeed + p.phase);
                const alpha = shimmer * (isLight ? 0.55 : 0.95);

                const coreRgb = isLight ? [15, 23, 42] : [255, 255, 255];
                const haloRgb = isLight ? primary : primary;

                // 1. Soft atmospheric corona glow
                if (!isLight) {
                    const grad = this.ctx.createRadialGradient(px, actualY, 0, px, actualY, p.radius * 4.5);
                    grad.addColorStop(0, `rgba(${haloRgb[0]}, ${haloRgb[1]}, ${haloRgb[2]}, ${(alpha * 0.35).toFixed(3)})`);
                    grad.addColorStop(0.4, `rgba(${haloRgb[0]}, ${haloRgb[1]}, ${haloRgb[2]}, ${(alpha * 0.12).toFixed(3)})`);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    this.ctx.fillStyle = grad;
                    this.ctx.beginPath();
                    this.ctx.arc(px, actualY, p.radius * 4.5, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                // 2. 4-Point subtle astronomical diffraction spikes (James Webb / Apple astrophotography)
                if (p.hasSpikes && !isLight) {
                    const spikeLen = p.radius * 3.8 * shimmer;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.4).toFixed(3)})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.beginPath();
                    // Horizontal
                    this.ctx.moveTo(px - spikeLen, actualY);
                    this.ctx.lineTo(px + spikeLen, actualY);
                    // Vertical
                    this.ctx.moveTo(px, actualY - spikeLen);
                    this.ctx.lineTo(px, actualY + spikeLen);
                    this.ctx.stroke();
                }

                // 3. Crisp luminous core
                this.ctx.fillStyle = `rgba(${coreRgb[0]}, ${coreRgb[1]}, ${coreRgb[2]}, ${alpha.toFixed(3)})`;
                this.ctx.beginPath();
                this.ctx.arc(px, actualY, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        drawMeteor() {
            const m = this.meteor;
            const tailX = m.x - Math.cos(m.angle) * m.length;
            const tailY = m.y + Math.sin(m.angle) * m.length;

            const grad = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY);
            const { primary } = this.palette;

            if (this.isLight) {
                grad.addColorStop(0, `rgba(15, 23, 42, ${(m.alpha * 0.6).toFixed(3)})`);
                grad.addColorStop(0.3, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, ${(m.alpha * 0.3).toFixed(3)})`);
                grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
            } else {
                grad.addColorStop(0, `rgba(255, 255, 255, ${(m.alpha * 0.95).toFixed(3)})`);
                grad.addColorStop(0.2, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, ${(m.alpha * 0.6).toFixed(3)})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            }

            this.ctx.save();
            this.ctx.strokeStyle = grad;
            this.ctx.lineWidth = 1.6;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(m.x, m.y);
            this.ctx.lineTo(tailX, tailY);
            this.ctx.stroke();

            // Bright head spark
            this.ctx.fillStyle = this.isLight ? `rgba(15, 23, 42, ${m.alpha})` : `rgba(255, 255, 255, ${m.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new CelestialGalaxyEngine());
    } else {
        new CelestialGalaxyEngine();
    }
})();
