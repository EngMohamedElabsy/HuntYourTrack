/**
 * HuntYourTrack - 3D Perspective Ocean Wave Mesh & Stardust Engine
 * Inspired by the v0 Cyber-Ocean atmospheric runtime.
 * Pure Vanilla JavaScript implementation:
 * - 44 rows x 72 cols undulating 3D perspective wireframe mesh
 * - Depth-attenuated neon crests with dynamic color mixing
 * - Twinkling ambient stardust with mouse parallax yaw
 * - Real-time theme synchronization (abyss, reef, nebula, ember, daylight)
 */

(function() {
    function toRgb(value, fallback) {
        if (!value) return fallback;
        const hex = value.trim().replace('#', '');
        if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
        const n = parseInt(hex, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function mix(a, b, t) {
        return [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
            a[2] + (b[2] - a[2]) * t
        ];
    }

    class OceanBackgroundEngine {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.COLS = 68;
            this.ROWS = 40;
            this.w = 0;
            this.h = 0;
            this.t = 0;
            this.raf = null;
            this.theme = '';
            this.colors = {
                a: [0, 242, 254],
                b: [16, 185, 129],
                c: [99, 102, 241],
                light: false
            };
            this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
            this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            this.dust = Array.from({ length: 70 }, () => ({
                x: Math.random(),
                y: Math.random(),
                z: Math.random() * 0.8 + 0.2,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.00022 + 0.00006,
                phase: Math.random() * Math.PI * 2
            }));

            this.init();
        }

        init() {
            // Create fixed background container if not present
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
                this.mouse.tx = (e.clientX / this.w) * 2 - 1;
                this.mouse.ty = (e.clientY / this.h) * 2 - 1;
            }, { passive: true });

            window.addEventListener('hyt:themeChanged', () => this.readTheme());

            this.draw = this.draw.bind(this);
            this.draw();
        }

        resize() {
            if (!this.canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.canvas.width = this.w * dpr;
            this.canvas.height = this.h * dpr;
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        readTheme() {
            const current = document.documentElement.getAttribute('data-theme') || 'abyss';
            this.theme = current;
            const style = getComputedStyle(document.documentElement);
            this.colors = {
                a: toRgb(style.getPropertyValue('--primary'), [0, 242, 254]),
                b: toRgb(style.getPropertyValue('--glow-2'), [16, 185, 129]),
                c: toRgb(style.getPropertyValue('--glow-3'), [99, 102, 241]),
                light: current === 'daylight' || current === 'light'
            };
        }

        draw() {
            this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.04;
            this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.04;

            this.ctx.clearRect(0, 0, this.w, this.h);
            this.ctx.globalCompositeOperation = this.colors.light ? 'source-over' : 'lighter';
            const intensity = this.colors.light ? 0.45 : 0.95;

            const focal = Math.max(this.w, this.h) * 0.55;
            const horizon = this.h * 0.45 - this.mouse.y * 22;
            const yaw = this.mouse.x * 0.14;
            const cos = Math.cos(yaw);
            const sin = Math.sin(yaw);
            const camY = 2.4;

            for (let r = this.ROWS - 1; r >= 0; r--) {
                const z0 = 1.6 + r * 0.95;
                const depth = 1 - r / this.ROWS;
                const rowColor = mix(this.colors.a, this.colors.c, r / this.ROWS);
                this.ctx.beginPath();
                let started = false;

                for (let c = 0; c < this.COLS; c++) {
                    const x0 = (c - (this.COLS - 1) / 2) * 1.0;
                    const y =
                        Math.sin(x0 * 0.22 + this.t) * 0.42 +
                        Math.cos(z0 * 0.18 - this.t * 1.2) * 0.52 +
                        Math.sin((x0 + z0) * 0.12 + this.t * 0.6) * 0.32;
                    const zc = z0 - 12;

                    const x = x0 * cos - zc * sin;
                    const z = x0 * sin + zc * cos + 12;
                    if (z < 0.8) continue;

                    const sx = this.w / 2 + (x / z) * focal;
                    const sy = horizon + ((camY - y) / z) * focal * 0.9;
                    if (sx < -20 || sx > this.w + 20 || sy > this.h + 20) {
                        started = false;
                        continue;
                    }

                    const crest = Math.min(1, Math.max(0, (y + 1.35) / 2.7));
                    const color = crest > 0.72 ? mix(rowColor, this.colors.b, (crest - 0.72) / 0.28) : rowColor;
                    const alpha = depth * (0.2 + crest * 0.8) * intensity;
                    const size = Math.max(0.6, (2.4 / z) * 2.8);

                    this.ctx.fillStyle = `rgba(${color[0] | 0},${color[1] | 0},${color[2] | 0},${alpha})`;
                    this.ctx.fillRect(sx - size / 2, sy - size / 2, size, size);

                    if (started) {
                        this.ctx.lineTo(sx, sy);
                    } else {
                        this.ctx.moveTo(sx, sy);
                        started = true;
                    }
                }
                this.ctx.strokeStyle = `rgba(${rowColor[0] | 0},${rowColor[1] | 0},${rowColor[2] | 0},${depth * 0.08 * intensity})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }

            // Twinkling Stardust
            for (const p of this.dust) {
                p.y -= p.speed * (this.reduceMotion ? 0 : 1);
                if (p.y < -0.05) p.y = 1.05;
                const sx = p.x * this.w - this.mouse.x * 40 * p.z;
                const sy = p.y * this.h - this.mouse.y * 30 * p.z;
                const twinkle = 0.35 + 0.45 * Math.sin(this.t * 2 + p.phase);
                const color = p.z > 0.6 ? this.colors.b : this.colors.a;

                this.ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${twinkle * 0.12 * intensity})`;
                this.ctx.beginPath();
                this.ctx.arc(sx, sy, p.size * 3.5 * p.z, 0, Math.PI * 2);
                this.ctx.fill();

                this.ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${twinkle * intensity})`;
                this.ctx.beginPath();
                this.ctx.arc(sx, sy, p.size * p.z, 0, Math.PI * 2);
                this.ctx.fill();
            }

            if (!this.reduceMotion) {
                this.t += 0.014;
                this.raf = requestAnimationFrame(this.draw);
            }
        }
    }

    // Auto initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new OceanBackgroundEngine());
    } else {
        new OceanBackgroundEngine();
    }
})();
