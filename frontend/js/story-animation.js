/**
 * HuntYourTrack — Storytelling Motion Controller & Brand Hover Helper
 * Drives the 4-scene Lost Student -> Arrow -> Bullseye -> Career Ready animation at 60fps.
 */
(function (window) {
    'use strict';

    const SCENE_CAPTIONS = {
        1: '1. Lost: Exploring open possibilities without a clear roadmap.',
        2: '2. Guidance: Spotting the HuntYourTrack arrow pointing to the right courses.',
        3: '3. Bullseye: Locking onto the exact skills & verified internships.',
        4: '4. Career Ready: Transformed into a confident, industry-ready professional.'
    };

    let currentScene = 1;
    let loopTimer = null;
    let isPaused = false;

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
