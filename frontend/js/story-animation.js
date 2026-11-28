/**
 * HuntYourTrack — Storytelling Motion Controller & Brand Hover Helper
 * Drives the 4-scene Lost Student -> Arrow -> Bullseye -> Career Ready animation at 60fps.
 */
(function (window) {
    'use strict';

    const SCENE_CAPTIONS = {
        1: '1. Study & Plan: Learning the rules and mapping your career track at your desk.',
        2: '2. Aim & Try: Drawing the bow with both hands and adjusting to the moving target.',
        3: '3. Bullseye Hit: Locking onto the target with confidence and celebration!',
        4: '4. Career Ready: Stepping through the JOBS door as a prepared professional.'
    };

    const THOUGHT_TEXT = {
        1: 'Learn the rules',
        2: 'Aim & adjust...',
        3: 'Bullseye! Hit!',
        4: 'Career ready!'
    };

    let currentScene = 1;
    let loopTimer = null;
    let isPaused = false;
    let soundEnabled = false;
    let audioCtx = null;

    function playTone(freq, duration, type) {
        if (!soundEnabled) return;
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            if (!audioCtx) audioCtx = new Ctx();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    function toggleStorySound() {
        soundEnabled = !soundEnabled;
        const btn = document.getElementById('story-sound-toggle');
        if (btn) btn.textContent = soundEnabled ? 'Sound: On' : 'Sound: Off';
        if (soundEnabled) playTone(523.25, 0.14, 'triangle');
    }
    window.toggleStorySound = toggleStorySound;

    function setStoryScene(sceneNum, manual) {
        const stage = document.getElementById('story-stage');
        if (!stage) return;

        currentScene = sceneNum;
        stage.setAttribute('data-scene', String(sceneNum));

        document.querySelectorAll('.story-scene-pill').forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.scene) === sceneNum);
        });

        const caption = document.getElementById('story-caption-text');
        if (caption && SCENE_CAPTIONS[sceneNum]) {
            caption.textContent = SCENE_CAPTIONS[sceneNum];
        }

        const thought = document.getElementById('story-thought-text');
        if (thought && THOUGHT_TEXT[sceneNum]) {
            thought.textContent = THOUGHT_TEXT[sceneNum];
        }

        if (sceneNum === 2) playTone(220, 0.12, 'triangle');
        if (sceneNum === 3) {
            playTone(587.33, 0.15, 'sine');
            setTimeout(() => playTone(880, 0.25, 'sine'), 140);
        }

        if (manual) {
            isPaused = true;
            if (loopTimer) clearInterval(loopTimer);
            const toggleBtn = document.getElementById('story-play-toggle');
            if (toggleBtn) toggleBtn.textContent = 'Play Loop';
        }
    }
    window.setStoryScene = setStoryScene;

    function toggleStoryLoop() {
        const toggleBtn = document.getElementById('story-play-toggle');
        if (isPaused) {
            isPaused = false;
            if (toggleBtn) toggleBtn.textContent = 'Pause';
            startLoop();
        } else {
            isPaused = true;
            if (loopTimer) clearInterval(loopTimer);
            if (toggleBtn) toggleBtn.textContent = 'Play Loop';
        }
    }
    window.toggleStoryLoop = toggleStoryLoop;

    function startLoop() {
        if (loopTimer) clearInterval(loopTimer);
        loopTimer = setInterval(() => {
            if (isPaused) return;
            const next = currentScene >= 4 ? 1 : currentScene + 1;
            setStoryScene(next, false);
        }, 2500);
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('story-stage')) {
            setStoryScene(1, false);
            startLoop();
        }

        // Allow mobile tap on navbar logo to preview the brand name smoothly
        document.querySelectorAll('.brand-wrapper').forEach(brand => {
            brand.addEventListener('touchstart', () => {
                brand.classList.toggle('is-expanded');
            }, { passive: true });
        });
    });
})(window);
