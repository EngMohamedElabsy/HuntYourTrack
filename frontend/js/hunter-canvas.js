/**
 * HuntYourTrack - Interactive "Track Hunter" Radar & Skill Constellation Canvas
 * Custom bespoke motion graphics visual identity (Non-AI look).
 * Simulates a career explorer hunting skills and weaving a connected track network.
 */

class TrackHunterCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.nodes = [];
        this.mouse = { x: -1000, y: -1000, isHovering: false, targetX: 0, targetY: 0 };
        this.radarAngle = 0;
        this.radarRadius = 0;
        this.animationId = null;
        this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        this.careerCompetencies = [
            { label: "Frontend & UI/UX", track: "Web", xRel: 0.22, yRel: 0.32, color: "#6366F1", radius: 8 },
            { label: "Backend Cloud API", track: "Cloud", xRel: 0.40, yRel: 0.22, color: "#10B981", radius: 9 },
            { label: "AI & Machine Learning", track: "AI/ML", xRel: 0.65, yRel: 0.30, color: "#8B5CF6", radius: 11 },
            { label: "Cybersecurity SOC", track: "Security", xRel: 0.82, yRel: 0.42, color: "#EF4444", radius: 8 },
            { label: "Embedded & IoT", track: "Hardware", xRel: 0.28, yRel: 0.70, color: "#F59E0B", radius: 8 },
            { label: "DevOps & Docker", track: "DevOps", xRel: 0.50, yRel: 0.78, color: "#06B6D4", radius: 10 },
            { label: "Mobile Flutter", track: "Mobile", xRel: 0.74, yRel: 0.72, color: "#EC4899", radius: 8 },
            { label: "Data Analytics", track: "Data", xRel: 0.88, yRel: 0.25, color: "#3B82F6", radius: 7 },
            { label: "FinTech & Systems", track: "Business", xRel: 0.12, yRel: 0.55, color: "#14B8A6", radius: 8 }
        ];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse & Touch Tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.targetX = e.clientX - rect.left;
            this.mouse.targetY = e.clientY - rect.top;
            this.mouse.isHovering = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.isHovering = false;
        });

        // Theme sync
        window.addEventListener('hyt:themeChanged', (e) => {
            this.isDark = e.detail.theme === 'dark';
        });

        this.createNodes();
        this.animate();
    }

    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        this.width = this.canvas.width = parent ? parent.clientWidth : window.innerWidth;
        this.height = this.canvas.height = parent ? Math.max(380, parent.clientHeight) : 480;
        this.radarRadius = Math.min(this.width, this.height) * 0.48;
        this.updateNodePositions();
    }

    createNodes() {
        this.nodes = this.careerCompetencies.map((c, i) => {
            return {
                ...c,
                id: i,
                x: c.xRel * this.width,
                y: c.yRel * this.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                pulse: Math.random() * Math.PI,
                locked: false
            };
        });
    }

    updateNodePositions() {
        this.nodes.forEach(n => {
            n.x = n.xRel * this.width;
            n.y = n.yRel * this.height;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Center coordinates
        const cx = this.width / 2;
        const cy = this.height / 2;

        // Smooth Hunter cursor spring interpolation
        if (this.mouse.isHovering) {
            this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12;
            this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12;
        } else {
            // Autonomous patrol orbit when user is not hovering
            const autoRadius = this.radarRadius * 0.55;
            this.mouse.x = cx + Math.cos(this.radarAngle * 1.5) * autoRadius;
            this.mouse.y = cy + Math.sin(this.radarAngle * 1.5) * (autoRadius * 0.6);
        }

        this.drawRadarGrid(cx, cy);
        this.updateAndDrawNodes();
        this.drawConnections();
        this.drawHunterReticle(this.mouse.x, this.mouse.y);

        this.radarAngle += 0.015;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawRadarGrid(cx, cy) {
        this.ctx.save();
        const baseColor = this.isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';

        // Subtle radar concentric rings
        [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, this.radarRadius * ratio, 0, Math.PI * 2);
            this.ctx.strokeStyle = baseColor + (ratio === 1.0 ? '0.22)' : '0.10)');
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([4, 6]);
            this.ctx.stroke();
        });

        // Crosshairs
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.moveTo(cx - this.radarRadius, cy);
        this.ctx.lineTo(cx + this.radarRadius, cy);
        this.ctx.moveTo(cx, cy - this.radarRadius);
        this.ctx.lineTo(cx, cy + this.radarRadius);
        this.ctx.strokeStyle = baseColor + '0.07)';
        this.ctx.stroke();

        // Rotating radar beam
        const sweepX = cx + Math.cos(this.radarAngle) * this.radarRadius;
        const sweepY = cy + Math.sin(this.radarAngle) * this.radarRadius;

        const grad = this.ctx.createLinearGradient(cx, cy, sweepX, sweepY);
        grad.addColorStop(0, baseColor + '0.25)');
        grad.addColorStop(1, baseColor + '0.0)');

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy);
        this.ctx.arc(cx, cy, this.radarRadius, this.radarAngle - 0.25, this.radarAngle);
        this.ctx.closePath();
        this.ctx.fillStyle = grad;
        this.ctx.fill();

        this.ctx.restore();
    }

    updateAndDrawNodes() {
        this.nodes.forEach(node => {
            // Gentle floating drift
            node.x += node.vx;
            node.y += node.vy;

            // Soft bounds bounce
            if (node.x < 40 || node.x > this.width - 40) node.vx *= -1;
            if (node.y < 40 || node.y > this.height - 40) node.vy *= -1;

            // Distance to hunter cursor
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            node.locked = dist < 120;

            node.pulse += 0.04;
            const pulseFactor = 1 + Math.sin(node.pulse) * 0.25;

            // Draw Node Glow
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, (node.radius + (node.locked ? 6 : 0)) * pulseFactor, 0, Math.PI * 2);
            this.ctx.fillStyle = node.locked ? node.color : (this.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(99, 102, 241, 0.2)');
            this.ctx.shadowColor = node.color;
            this.ctx.shadowBlur = node.locked ? 16 : 8;
            this.ctx.fill();

            // Inner Core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();

            // Text Label
            this.ctx.font = `${node.locked ? 'bold 12px' : '500 11px'} Poppins, Cairo, sans-serif`;
            this.ctx.fillStyle = this.isDark ? '#F1F5F9' : '#1E293B';
            this.ctx.shadowBlur = 0;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.label, node.x, node.y + node.radius + 16);

            if (node.locked) {
                this.ctx.font = 'bold 9px Poppins, sans-serif';
                this.ctx.fillStyle = '#10B981';
                this.ctx.fillText('🎯 TARGET LOCKED', node.x, node.y - node.radius - 8);
            }
            this.ctx.restore();
        });
    }

    drawConnections() {
        this.ctx.save();
        // Connect nearby nodes to form the constellation network
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const ni = this.nodes[i];
                const nj = this.nodes[j];
                const dx = ni.x - nj.x;
                const dy = ni.y - nj.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    const alpha = (1 - dist / 180) * (ni.locked || nj.locked ? 0.65 : 0.2);
                    this.ctx.beginPath();
                    this.ctx.moveTo(ni.x, ni.y);
                    this.ctx.lineTo(nj.x, nj.y);
                    this.ctx.strokeStyle = this.isDark ? `rgba(165, 180, 252, ${alpha})` : `rgba(99, 102, 241, ${alpha})`;
                    this.ctx.lineWidth = ni.locked && nj.locked ? 2 : 1;
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }

    drawHunterReticle(x, y) {
        this.ctx.save();
        this.ctx.translate(x, y);

        // Rotate reticle outer brackets
        this.ctx.rotate(this.radarAngle * 0.7);

        const r = 26;
        this.ctx.strokeStyle = '#10B981'; // Emerald Hunter Green
        this.ctx.lineWidth = 2;
        this.ctx.shadowColor = '#10B981';
        this.ctx.shadowBlur = 10;

        // 4 Reticle Brackets
        for (let i = 0; i < 4; i++) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, r, 0, Math.PI / 4);
            this.ctx.stroke();
        }

        // Center crosshair dot
        this.ctx.rotate(-this.radarAngle * 0.7);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#EF4444'; // Red laser center
        this.ctx.fill();

        // Connect Hunter reticle with nearest locked nodes
        this.nodes.forEach(node => {
            if (node.locked) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(node.x - x, node.y - y);
                this.ctx.strokeStyle = 'rgba(16, 185, 129, 0.75)';
                this.ctx.lineWidth = 1.5;
                this.ctx.setLineDash([3, 3]);
                this.ctx.stroke();
                this.ctx.restore();
            }
        });

        this.ctx.restore();
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }
}

// Auto-mount if canvas exists
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hunter-radar-canvas');
    if (canvas) {
        window.hytHunterCanvas = new TrackHunterCanvas('hunter-radar-canvas');
    }
});
