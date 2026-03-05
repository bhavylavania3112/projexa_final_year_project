/**
 * SmartReception — Frame-Sequence Intro Animation
 *
 * Plays a 50-frame PNG sequence on a full-screen canvas, triggered by
 * scroll / click / keyboard. Replaces the old CSS shutter-slat approach.
 */

import gsap from 'gsap';

const FRAME_COUNT = 50;
const FPS = 30;

/** Build the URL for a frame number 1…50 */
function frameSrc(n: number): string {
    return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.png`;
}

export function initShutter(): void {
    const canvas = document.getElementById('frameCanvas') as HTMLCanvasElement | null;
    const shutterCta = document.getElementById('shutterCta');

    if (!canvas || !shutterCta) return;

    const ctx = canvas.getContext('2d')!;
    let animationTriggered = false;

    // ── Preload all frames ──────────────────────────────────
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    function onAllLoaded(): void {
        drawFrame(0); // show first frame immediately
    }

    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = frameSrc(i);
        img.onload = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) onAllLoaded();
        };
        frames.push(img);
    }

    // ── Resize canvas to fill viewport ─────────────────────
    function resize(): void {
        canvas!.width = window.innerWidth;
        canvas!.height = window.innerHeight;
        // Re-draw current frame after resize
        if (frames[0]?.complete) drawFrame(0);
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Draw a single frame (cover-fit) ────────────────────
    function drawFrame(index: number): void {
        const img = frames[index];
        if (!img || !img.complete) return;

        const cw = canvas!.width;
        const ch = canvas!.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // "cover" fit – fill canvas while maintaining aspect ratio
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    // ── Play the frame sequence ────────────────────────────
    function playSequence(): void {
        if (animationTriggered) return;
        animationTriggered = true;

        // Fade out the CTA immediately
        gsap.to(shutterCta, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
        });

        let currentFrame = 0;
        const interval = 1000 / FPS;
        let lastTime = performance.now();

        function tick(now: number): void {
            if (currentFrame >= FRAME_COUNT) {
                // Animation done — fade out canvas, then clean up
                gsap.to(canvas, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        canvas!.remove();
                        shutterCta!.remove();
                        window.removeEventListener('resize', resize);
                    },
                });

                // Smooth-reveal main content
                gsap.fromTo(
                    'main',
                    { opacity: 0.8, scale: 0.98 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
                );
                return;
            }

            const delta = now - lastTime;
            if (delta >= interval) {
                drawFrame(currentFrame);
                currentFrame++;
                lastTime = now - (delta % interval);
            }
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    // ── Triggers (same as original shutter) ────────────────

    // Scroll
    window.addEventListener(
        'wheel',
        (e: WheelEvent) => {
            if (!animationTriggered && e.deltaY > 0) playSequence();
        },
        { passive: true }
    );

    // Touch swipe up
    let touchStartY = 0;
    window.addEventListener(
        'touchstart',
        (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        },
        { passive: true }
    );

    window.addEventListener(
        'touchmove',
        (e: TouchEvent) => {
            const delta = touchStartY - e.touches[0].clientY;
            if (!animationTriggered && delta > 30) playSequence();
        },
        { passive: true }
    );

    // CTA click
    shutterCta.addEventListener('click', playSequence);

    // Keyboard
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (!animationTriggered && (e.key === 'ArrowDown' || e.key === ' ')) {
            e.preventDefault();
            playSequence();
        }
    });

    // Expose for smooth scroll integration
    (window as any).__shutterOpened = () => animationTriggered;
    (window as any).__openShutter = playSequence;
}
